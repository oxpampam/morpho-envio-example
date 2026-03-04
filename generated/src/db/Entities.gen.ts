/* TypeScript file generated from Entities.res by genType. */

/* eslint-disable */
/* tslint:disable */

import type {CapChangeType_t as Enums_CapChangeType_t} from './Enums.gen';

import type {FlowType_t as Enums_FlowType_t} from './Enums.gen';

import type {ReallocationSide_t as Enums_ReallocationSide_t} from './Enums.gen';

export type id = string;

export type whereOperations<entity,fieldType> = {
  readonly eq: (_1:fieldType) => Promise<entity[]>; 
  readonly gt: (_1:fieldType) => Promise<entity[]>; 
  readonly lt: (_1:fieldType) => Promise<entity[]>
};

export type CapChange_t = {
  readonly changeType: Enums_CapChangeType_t; 
  readonly id: id; 
  readonly marketId: string; 
  readonly newCap: bigint; 
  readonly oldCap: bigint; 
  readonly timestamp: number; 
  readonly vault_id: id
};

export type CapChange_indexedFieldOperations = {
  readonly marketId: whereOperations<CapChange_t,string>; 
  readonly timestamp: whereOperations<CapChange_t,number>; 
  readonly vault_id: whereOperations<CapChange_t,id>
};

export type LPFlow_t = {
  readonly assets: bigint; 
  readonly blockNumber: number; 
  readonly flowType: Enums_FlowType_t; 
  readonly id: id; 
  readonly owner: string; 
  readonly sender: string; 
  readonly shares: bigint; 
  readonly timestamp: number; 
  readonly txHash: string; 
  readonly vault_id: id
};

export type LPFlow_indexedFieldOperations = {
  readonly blockNumber: whereOperations<LPFlow_t,number>; 
  readonly owner: whereOperations<LPFlow_t,string>; 
  readonly sender: whereOperations<LPFlow_t,string>; 
  readonly timestamp: whereOperations<LPFlow_t,number>; 
  readonly vault_id: whereOperations<LPFlow_t,id>
};

export type Reallocation_t = {
  readonly assets: bigint; 
  readonly caller: string; 
  readonly id: id; 
  readonly marketId: string; 
  readonly shares: bigint; 
  readonly side: Enums_ReallocationSide_t; 
  readonly timestamp: number; 
  readonly txHash: string; 
  readonly vault_id: id
};

export type Reallocation_indexedFieldOperations = {
  readonly caller: whereOperations<Reallocation_t,string>; 
  readonly marketId: whereOperations<Reallocation_t,string>; 
  readonly timestamp: whereOperations<Reallocation_t,number>; 
  readonly txHash: whereOperations<Reallocation_t,string>; 
  readonly vault_id: whereOperations<Reallocation_t,id>
};

export type Vault_t = {
  readonly address: string; 
  readonly asset: string; 
  readonly chainId: number; 
  readonly createdAt: number; 
  readonly createdTxHash: string; 
  readonly curator: string; 
  readonly fee: bigint; 
  readonly id: id; 
  readonly name: string; 
  readonly owner: string; 
  readonly supplyQueue: string[]; 
  readonly symbol: string; 
  readonly timelock: bigint; 
  readonly tvl: bigint
};

export type Vault_indexedFieldOperations = {
  readonly address: whereOperations<Vault_t,string>; 
  readonly asset: whereOperations<Vault_t,string>; 
  readonly chainId: whereOperations<Vault_t,number>; 
  readonly curator: whereOperations<Vault_t,string>; 
  readonly owner: whereOperations<Vault_t,string>
};

export type VaultMarket_t = {
  readonly cap: bigint; 
  readonly currentAllocation: bigint; 
  readonly id: id; 
  readonly lastUpdated: number; 
  readonly marketId: string; 
  readonly utilizationBps: bigint; 
  readonly vault_id: id
};

export type VaultMarket_indexedFieldOperations = { readonly marketId: whereOperations<VaultMarket_t,string>; readonly vault_id: whereOperations<VaultMarket_t,id> };

export type VaultSnapshot_t = {
  readonly id: id; 
  readonly timestamp: number; 
  readonly totalAssets: bigint; 
  readonly vault_id: id
};

export type VaultSnapshot_indexedFieldOperations = { readonly timestamp: whereOperations<VaultSnapshot_t,number>; readonly vault_id: whereOperations<VaultSnapshot_t,id> };
