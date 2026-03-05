# Morpho Envio Example

A full-stack blockchain indexing example using [Envio HyperIndex](https://docs.envio.dev) to index MetaMorpho vaults on Ethereum and Base, with a Next.js dashboard for live data.

## Structure

```
morpho-envio-example/
├── indexer/          # Envio HyperIndex indexer
│   ├── config.yaml   # Multichain config (Ethereum + Base)
│   ├── schema.graphql
│   ├── src/          # Event handlers
│   └── abis/         # Contract ABIs
└── dashboard/        # Next.js dashboard
```

## Indexer

Indexes MetaMorpho vaults tracking:
- Vault creation and configuration
- Cap changes (supply cap management)
- Reallocations between markets
- LP deposits and withdrawals
- Daily TVL snapshots

### Running locally

```bash
cd indexer
pnpm install
pnpm codegen
pnpm dev
```

### Deploying to Envio Cloud

The `envio` branch is used for Envio Cloud deployments. Point Envio Cloud at this repo with `indexer/` as the project root.

> **Monorepo note:** Envio Cloud requires all indexer imports to be contained within the indexer directory. This repo uses `indexer/` as a self-contained workspace with its own `pnpm-workspace.yaml` referencing `generated`. The root workspace includes `indexer/generated` explicitly to satisfy pnpm's flat workspace resolution.

## Dashboard

```bash
cd dashboard
pnpm install
pnpm dev
```

Connects to the Envio Cloud GraphQL endpoint via `NEXT_PUBLIC_GRAPHQL_HTTP` and `NEXT_PUBLIC_GRAPHQL_WS`.
