import { MetaMorphoFactory, MetaMorpho } from "../generated";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Canonical vault ID: "{lowercaseAddress}-{chainId}" */
const toVaultId = (address: string, chainId: number) =>
  `${address.toLowerCase()}-${chainId}`;

/** Unique entity ID from tx-hash + log-index (safe across chains). */
const toEventId = (txHash: string, logIndex: number) =>
  `${txHash}-${logIndex}`;

/** Basis-points utilisation: (allocation * 10_000) / cap, or 0 if cap == 0. */
const utilizationBps = (allocation: bigint, cap: bigint): bigint =>
  cap > 0n ? (allocation * 10000n) / cap : 0n;

// ─── MetaMorphoFactory ────────────────────────────────────────────────────────

/**
 * Dynamic registration — tells Envio to start listening to this vault address
 * for all MetaMorpho events defined in config.yaml.
 * Must be a contractRegister (sync), not a handler.
 */
MetaMorphoFactory.CreateMetaMorpho.contractRegister(({ event, context }) => {
  context.addMetaMorpho(event.params.metaMorpho);
});

/**
 * Persist the new vault entity.
 * curator is seeded from initialOwner; update it if you index SetCurator later.
 */
MetaMorphoFactory.CreateMetaMorpho.handler(async ({ event, context }) => {
  const vaultId = toVaultId(event.params.metaMorpho, event.chainId);

  context.Vault.set({
    id: vaultId,
    address: event.params.metaMorpho.toLowerCase(),
    name: event.params.name,
    symbol: event.params.symbol,
    asset: event.params.asset.toLowerCase(),
    owner: event.params.initialOwner.toLowerCase(),
    curator: event.params.initialOwner.toLowerCase(), // refined by SetCurator if indexed
    tvl: 0n,
    fee: 0n,
    timelock: event.params.initialTimelock,
    supplyQueue: [],
    chainId: event.chainId,
    createdAt: event.block.timestamp,
    createdTxHash: event.transaction.hash,
  });
});

// ─── MetaMorpho — Cap management ──────────────────────────────────────────────

/**
 * SetCap — curator's cap decision takes effect (post-timelock).
 * Updates the live VaultMarket state and appends a CapChange audit record.
 */
MetaMorpho.SetCap.handler(async ({ event, context }) => {
  const vaultId = toVaultId(event.srcAddress, event.chainId);
  const marketId = event.params.id; // bytes32 Morpho market ID
  const vmId = `${vaultId}-${marketId}`;

  const prev = await context.VaultMarket.get(vmId);
  const oldCap = prev?.cap ?? 0n;
  const allocation = prev?.currentAllocation ?? 0n;
  const newCap = event.params.cap;

  context.VaultMarket.set({
    id: vmId,
    vault_id: vaultId,
    marketId,
    cap: newCap,
    currentAllocation: allocation,
    utilizationBps: utilizationBps(allocation, newCap),
    lastUpdated: event.block.timestamp,
  });

  context.CapChange.set({
    id: toEventId(event.transaction.hash, event.logIndex),
    vault_id: vaultId,
    marketId,
    oldCap,
    newCap,
    timestamp: event.block.timestamp,
    changeType: "SET",
  });
});

/**
 * SubmitCap — curator proposes a cap increase; timelock starts.
 * We don't change the live cap yet, just record the pending intent.
 */
MetaMorpho.SubmitCap.handler(async ({ event, context }) => {
  const vaultId = toVaultId(event.srcAddress, event.chainId);
  const marketId = event.params.id;
  const vmId = `${vaultId}-${marketId}`;

  const prev = await context.VaultMarket.get(vmId);

  context.CapChange.set({
    id: toEventId(event.transaction.hash, event.logIndex),
    vault_id: vaultId,
    marketId,
    oldCap: prev?.cap ?? 0n,
    newCap: event.params.cap,
    timestamp: event.block.timestamp,
    changeType: "SUBMIT",
  });
});

/**
 * RevokePendingCap — curator cancels a pending increase. ⚠ Red-flag signal.
 * Records a REVOKE entry with newCap = 0 (the pending value is discarded).
 */
MetaMorpho.RevokePendingCap.handler(async ({ event, context }) => {
  const vaultId = toVaultId(event.srcAddress, event.chainId);
  const marketId = event.params.id;
  const vmId = `${vaultId}-${marketId}`;

  const prev = await context.VaultMarket.get(vmId);

  context.CapChange.set({
    id: toEventId(event.transaction.hash, event.logIndex),
    vault_id: vaultId,
    marketId,
    oldCap: prev?.cap ?? 0n,
    newCap: 0n, // pending cap value is thrown away
    timestamp: event.block.timestamp,
    changeType: "REVOKE",
  });
});

// ─── MetaMorpho — Reallocation ────────────────────────────────────────────────

/**
 * ReallocateSupply — allocator moves assets INTO this market.
 * Increments currentAllocation and recomputes utilisation.
 */
MetaMorpho.ReallocateSupply.handler(async ({ event, context }) => {
  const vaultId = toVaultId(event.srcAddress, event.chainId);
  const marketId = event.params.id;
  const vmId = `${vaultId}-${marketId}`;

  const prev = await context.VaultMarket.get(vmId);
  const cap = prev?.cap ?? 0n;
  const newAllocation = (prev?.currentAllocation ?? 0n) + event.params.suppliedAssets;

  context.VaultMarket.set({
    id: vmId,
    vault_id: vaultId,
    marketId,
    cap,
    currentAllocation: newAllocation,
    utilizationBps: utilizationBps(newAllocation, cap),
    lastUpdated: event.block.timestamp,
  });

  context.Reallocation.set({
    id: toEventId(event.transaction.hash, event.logIndex),
    vault_id: vaultId,
    caller: event.params.caller.toLowerCase(),
    marketId,
    assets: event.params.suppliedAssets,
    shares: event.params.suppliedShares,
    side: "SUPPLY",
    timestamp: event.block.timestamp,
    txHash: event.transaction.hash,
  });
});

/**
 * ReallocateWithdraw — allocator pulls assets OUT of this market.
 * Decrements currentAllocation; clamps at 0 to guard against rounding.
 */
MetaMorpho.ReallocateWithdraw.handler(async ({ event, context }) => {
  const vaultId = toVaultId(event.srcAddress, event.chainId);
  const marketId = event.params.id;
  const vmId = `${vaultId}-${marketId}`;

  const prev = await context.VaultMarket.get(vmId);
  const cap = prev?.cap ?? 0n;
  const prevAllocation = prev?.currentAllocation ?? 0n;
  const newAllocation =
    prevAllocation > event.params.withdrawnAssets
      ? prevAllocation - event.params.withdrawnAssets
      : 0n;

  context.VaultMarket.set({
    id: vmId,
    vault_id: vaultId,
    marketId,
    cap,
    currentAllocation: newAllocation,
    utilizationBps: utilizationBps(newAllocation, cap),
    lastUpdated: event.block.timestamp,
  });

  context.Reallocation.set({
    id: toEventId(event.transaction.hash, event.logIndex),
    vault_id: vaultId,
    caller: event.params.caller.toLowerCase(),
    marketId,
    assets: event.params.withdrawnAssets,
    shares: event.params.withdrawnShares,
    side: "WITHDRAW",
    timestamp: event.block.timestamp,
    txHash: event.transaction.hash,
  });
});

/**
 * SetSupplyQueue — allocator reorders the deposit-priority queue.
 * Persisted on the Vault for front-end display.
 */
MetaMorpho.SetSupplyQueue.handler(async ({ event, context }) => {
  const vaultId = toVaultId(event.srcAddress, event.chainId);
  const vault = await context.Vault.get(vaultId);
  if (!vault) return;

  context.Vault.set({
    ...vault,
    supplyQueue: [...event.params.newSupplyQueue],
  });
});

// ─── MetaMorpho — TVL & snapshots ─────────────────────────────────────────────

/**
 * UpdateLastTotalAssets — Morpho's canonical TVL update.
 * - Updates Vault.tvl with the latest figure.
 * - Upserts a daily VaultSnapshot (last write per UTC-day wins).
 */
MetaMorpho.UpdateLastTotalAssets.handler(async ({ event, context }) => {
  const vaultId = toVaultId(event.srcAddress, event.chainId);
  const vault = await context.Vault.get(vaultId);
  if (!vault) return; // defensive; vault must exist before events

  context.Vault.set({
    ...vault,
    tvl: event.params.updatedTotalAssets,
  });

  // Bucket into UTC-day for daily time-series charting
  const dayTs = Math.floor(event.block.timestamp / 86400) * 86400;
  context.VaultSnapshot.set({
    id: `${vaultId}-${dayTs}`,
    vault_id: vaultId,
    totalAssets: event.params.updatedTotalAssets,
    timestamp: dayTs,
  });
});

// ─── MetaMorpho — Fee changes ─────────────────────────────────────────────────

/**
 * SetFee — ⚠ potential red-flag if fee increases.
 * Front-end can diff oldFee vs newFee to surface alerts.
 */
MetaMorpho.SetFee.handler(async ({ event, context }) => {
  const vaultId = toVaultId(event.srcAddress, event.chainId);
  const vault = await context.Vault.get(vaultId);
  if (!vault) return;

  context.Vault.set({
    ...vault,
    fee: event.params.newFee,
  });
});

// ─── MetaMorpho — LP flows (ERC-4626) ────────────────────────────────────────

/** Deposit — LP deposits assets, receives shares. */
MetaMorpho.Deposit.handler(async ({ event, context }) => {
  context.LPFlow.set({
    id: toEventId(event.transaction.hash, event.logIndex),
    vault_id: toVaultId(event.srcAddress, event.chainId),
    sender: event.params.sender.toLowerCase(),
    owner: event.params.owner.toLowerCase(),
    assets: event.params.assets,
    shares: event.params.shares,
    flowType: "DEPOSIT",
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    txHash: event.transaction.hash,
  });
});

/** Withdraw — LP burns shares, receives assets. */
MetaMorpho.Withdraw.handler(async ({ event, context }) => {
  context.LPFlow.set({
    id: toEventId(event.transaction.hash, event.logIndex),
    vault_id: toVaultId(event.srcAddress, event.chainId),
    sender: event.params.sender.toLowerCase(),
    owner: event.params.owner.toLowerCase(),
    assets: event.params.assets,
    shares: event.params.shares,
    flowType: "WITHDRAW",
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    txHash: event.transaction.hash,
  });
});
