/* TypeScript file generated from Types.res by genType. */

/* eslint-disable */
/* tslint:disable */

import type {CapChange_t as Entities_CapChange_t} from '../src/db/Entities.gen';

import type {HandlerContext as $$handlerContext} from './Types.ts';

import type {HandlerWithOptions as $$fnWithEventConfig} from './bindings/OpaqueTypes.ts';

import type {LPFlow_t as Entities_LPFlow_t} from '../src/db/Entities.gen';

import type {LoaderContext as $$loaderContext} from './Types.ts';

import type {Reallocation_t as Entities_Reallocation_t} from '../src/db/Entities.gen';

import type {SingleOrMultiple as $$SingleOrMultiple_t} from './bindings/OpaqueTypes';

import type {VaultMarket_t as Entities_VaultMarket_t} from '../src/db/Entities.gen';

import type {VaultSnapshot_t as Entities_VaultSnapshot_t} from '../src/db/Entities.gen';

import type {Vault_t as Entities_Vault_t} from '../src/db/Entities.gen';

import type {entityHandlerContext as Internal_entityHandlerContext} from 'envio/src/Internal.gen';

import type {eventOptions as Internal_eventOptions} from 'envio/src/Internal.gen';

import type {genericContractRegisterArgs as Internal_genericContractRegisterArgs} from 'envio/src/Internal.gen';

import type {genericContractRegister as Internal_genericContractRegister} from 'envio/src/Internal.gen';

import type {genericEvent as Internal_genericEvent} from 'envio/src/Internal.gen';

import type {genericHandlerArgs as Internal_genericHandlerArgs} from 'envio/src/Internal.gen';

import type {genericHandlerWithLoader as Internal_genericHandlerWithLoader} from 'envio/src/Internal.gen';

import type {genericHandler as Internal_genericHandler} from 'envio/src/Internal.gen';

import type {genericLoaderArgs as Internal_genericLoaderArgs} from 'envio/src/Internal.gen';

import type {genericLoader as Internal_genericLoader} from 'envio/src/Internal.gen';

import type {logger as Envio_logger} from 'envio/src/Envio.gen';

import type {noEventFilters as Internal_noEventFilters} from 'envio/src/Internal.gen';

import type {t as Address_t} from 'envio/src/Address.gen';

export type id = string;
export type Id = id;

export type contractRegistrations = {
  readonly log: Envio_logger; 
  readonly addMetaMorpho: (_1:Address_t) => void; 
  readonly addMetaMorphoFactory: (_1:Address_t) => void
};

export type entityLoaderContext<entity,indexedFieldOperations> = {
  readonly get: (_1:id) => Promise<(undefined | entity)>; 
  readonly getOrThrow: (_1:id, message:(undefined | string)) => Promise<entity>; 
  readonly getWhere: indexedFieldOperations; 
  readonly getOrCreate: (_1:entity) => Promise<entity>; 
  readonly set: (_1:entity) => void; 
  readonly deleteUnsafe: (_1:id) => void
};

export type loaderContext = $$loaderContext;

export type entityHandlerContext<entity> = Internal_entityHandlerContext<entity>;

export type handlerContext = $$handlerContext;

export type capChange = Entities_CapChange_t;
export type CapChange = capChange;

export type lPFlow = Entities_LPFlow_t;
export type LPFlow = lPFlow;

export type reallocation = Entities_Reallocation_t;
export type Reallocation = reallocation;

export type vault = Entities_Vault_t;
export type Vault = vault;

export type vaultMarket = Entities_VaultMarket_t;
export type VaultMarket = vaultMarket;

export type vaultSnapshot = Entities_VaultSnapshot_t;
export type VaultSnapshot = vaultSnapshot;

export type Transaction_t = { readonly hash: string };

export type Block_t = {
  readonly number: number; 
  readonly timestamp: number; 
  readonly hash: string
};

export type AggregatedBlock_t = {
  readonly hash: string; 
  readonly number: number; 
  readonly timestamp: number
};

export type AggregatedTransaction_t = { readonly hash: string };

export type eventLog<params> = Internal_genericEvent<params,Block_t,Transaction_t>;
export type EventLog<params> = eventLog<params>;

export type SingleOrMultiple_t<a> = $$SingleOrMultiple_t<a>;

export type HandlerTypes_args<eventArgs,context> = { readonly event: eventLog<eventArgs>; readonly context: context };

export type HandlerTypes_contractRegisterArgs<eventArgs> = Internal_genericContractRegisterArgs<eventLog<eventArgs>,contractRegistrations>;

export type HandlerTypes_contractRegister<eventArgs> = Internal_genericContractRegister<HandlerTypes_contractRegisterArgs<eventArgs>>;

export type HandlerTypes_loaderArgs<eventArgs> = Internal_genericLoaderArgs<eventLog<eventArgs>,loaderContext>;

export type HandlerTypes_loader<eventArgs,loaderReturn> = Internal_genericLoader<HandlerTypes_loaderArgs<eventArgs>,loaderReturn>;

export type HandlerTypes_handlerArgs<eventArgs,loaderReturn> = Internal_genericHandlerArgs<eventLog<eventArgs>,handlerContext,loaderReturn>;

export type HandlerTypes_handler<eventArgs,loaderReturn> = Internal_genericHandler<HandlerTypes_handlerArgs<eventArgs,loaderReturn>>;

export type HandlerTypes_loaderHandler<eventArgs,loaderReturn,eventFilters> = Internal_genericHandlerWithLoader<HandlerTypes_loader<eventArgs,loaderReturn>,HandlerTypes_handler<eventArgs,loaderReturn>,eventFilters>;

export type HandlerTypes_eventConfig<eventFilters> = Internal_eventOptions<eventFilters>;

export type fnWithEventConfig<fn,eventConfig> = $$fnWithEventConfig<fn,eventConfig>;

export type handlerWithOptions<eventArgs,loaderReturn,eventFilters> = fnWithEventConfig<HandlerTypes_handler<eventArgs,loaderReturn>,HandlerTypes_eventConfig<eventFilters>>;

export type contractRegisterWithOptions<eventArgs,eventFilters> = fnWithEventConfig<HandlerTypes_contractRegister<eventArgs>,HandlerTypes_eventConfig<eventFilters>>;

export type MetaMorpho_chainId = 1 | 8453;

export type MetaMorpho_SetCap_eventArgs = {
  readonly caller: Address_t; 
  readonly id: string; 
  readonly cap: bigint
};

export type MetaMorpho_SetCap_block = Block_t;

export type MetaMorpho_SetCap_transaction = Transaction_t;

export type MetaMorpho_SetCap_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorpho_SetCap_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorpho_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorpho_SetCap_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorpho_SetCap_block
};

export type MetaMorpho_SetCap_loaderArgs = Internal_genericLoaderArgs<MetaMorpho_SetCap_event,loaderContext>;

export type MetaMorpho_SetCap_loader<loaderReturn> = Internal_genericLoader<MetaMorpho_SetCap_loaderArgs,loaderReturn>;

export type MetaMorpho_SetCap_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorpho_SetCap_event,handlerContext,loaderReturn>;

export type MetaMorpho_SetCap_handler<loaderReturn> = Internal_genericHandler<MetaMorpho_SetCap_handlerArgs<loaderReturn>>;

export type MetaMorpho_SetCap_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorpho_SetCap_event,contractRegistrations>>;

export type MetaMorpho_SetCap_eventFilter = { readonly caller?: SingleOrMultiple_t<Address_t>; readonly id?: SingleOrMultiple_t<string> };

export type MetaMorpho_SetCap_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: MetaMorpho_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type MetaMorpho_SetCap_eventFiltersDefinition = 
    MetaMorpho_SetCap_eventFilter
  | MetaMorpho_SetCap_eventFilter[];

export type MetaMorpho_SetCap_eventFilters = 
    MetaMorpho_SetCap_eventFilter
  | MetaMorpho_SetCap_eventFilter[]
  | ((_1:MetaMorpho_SetCap_eventFiltersArgs) => MetaMorpho_SetCap_eventFiltersDefinition);

export type MetaMorpho_SubmitCap_eventArgs = {
  readonly caller: Address_t; 
  readonly id: string; 
  readonly cap: bigint
};

export type MetaMorpho_SubmitCap_block = Block_t;

export type MetaMorpho_SubmitCap_transaction = Transaction_t;

export type MetaMorpho_SubmitCap_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorpho_SubmitCap_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorpho_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorpho_SubmitCap_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorpho_SubmitCap_block
};

export type MetaMorpho_SubmitCap_loaderArgs = Internal_genericLoaderArgs<MetaMorpho_SubmitCap_event,loaderContext>;

export type MetaMorpho_SubmitCap_loader<loaderReturn> = Internal_genericLoader<MetaMorpho_SubmitCap_loaderArgs,loaderReturn>;

export type MetaMorpho_SubmitCap_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorpho_SubmitCap_event,handlerContext,loaderReturn>;

export type MetaMorpho_SubmitCap_handler<loaderReturn> = Internal_genericHandler<MetaMorpho_SubmitCap_handlerArgs<loaderReturn>>;

export type MetaMorpho_SubmitCap_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorpho_SubmitCap_event,contractRegistrations>>;

export type MetaMorpho_SubmitCap_eventFilter = { readonly caller?: SingleOrMultiple_t<Address_t>; readonly id?: SingleOrMultiple_t<string> };

export type MetaMorpho_SubmitCap_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: MetaMorpho_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type MetaMorpho_SubmitCap_eventFiltersDefinition = 
    MetaMorpho_SubmitCap_eventFilter
  | MetaMorpho_SubmitCap_eventFilter[];

export type MetaMorpho_SubmitCap_eventFilters = 
    MetaMorpho_SubmitCap_eventFilter
  | MetaMorpho_SubmitCap_eventFilter[]
  | ((_1:MetaMorpho_SubmitCap_eventFiltersArgs) => MetaMorpho_SubmitCap_eventFiltersDefinition);

export type MetaMorpho_RevokePendingCap_eventArgs = { readonly caller: Address_t; readonly id: string };

export type MetaMorpho_RevokePendingCap_block = Block_t;

export type MetaMorpho_RevokePendingCap_transaction = Transaction_t;

export type MetaMorpho_RevokePendingCap_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorpho_RevokePendingCap_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorpho_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorpho_RevokePendingCap_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorpho_RevokePendingCap_block
};

export type MetaMorpho_RevokePendingCap_loaderArgs = Internal_genericLoaderArgs<MetaMorpho_RevokePendingCap_event,loaderContext>;

export type MetaMorpho_RevokePendingCap_loader<loaderReturn> = Internal_genericLoader<MetaMorpho_RevokePendingCap_loaderArgs,loaderReturn>;

export type MetaMorpho_RevokePendingCap_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorpho_RevokePendingCap_event,handlerContext,loaderReturn>;

export type MetaMorpho_RevokePendingCap_handler<loaderReturn> = Internal_genericHandler<MetaMorpho_RevokePendingCap_handlerArgs<loaderReturn>>;

export type MetaMorpho_RevokePendingCap_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorpho_RevokePendingCap_event,contractRegistrations>>;

export type MetaMorpho_RevokePendingCap_eventFilter = { readonly caller?: SingleOrMultiple_t<Address_t>; readonly id?: SingleOrMultiple_t<string> };

export type MetaMorpho_RevokePendingCap_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: MetaMorpho_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type MetaMorpho_RevokePendingCap_eventFiltersDefinition = 
    MetaMorpho_RevokePendingCap_eventFilter
  | MetaMorpho_RevokePendingCap_eventFilter[];

export type MetaMorpho_RevokePendingCap_eventFilters = 
    MetaMorpho_RevokePendingCap_eventFilter
  | MetaMorpho_RevokePendingCap_eventFilter[]
  | ((_1:MetaMorpho_RevokePendingCap_eventFiltersArgs) => MetaMorpho_RevokePendingCap_eventFiltersDefinition);

export type MetaMorpho_ReallocateSupply_eventArgs = {
  readonly caller: Address_t; 
  readonly id: string; 
  readonly suppliedAssets: bigint; 
  readonly suppliedShares: bigint
};

export type MetaMorpho_ReallocateSupply_block = Block_t;

export type MetaMorpho_ReallocateSupply_transaction = Transaction_t;

export type MetaMorpho_ReallocateSupply_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorpho_ReallocateSupply_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorpho_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorpho_ReallocateSupply_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorpho_ReallocateSupply_block
};

export type MetaMorpho_ReallocateSupply_loaderArgs = Internal_genericLoaderArgs<MetaMorpho_ReallocateSupply_event,loaderContext>;

export type MetaMorpho_ReallocateSupply_loader<loaderReturn> = Internal_genericLoader<MetaMorpho_ReallocateSupply_loaderArgs,loaderReturn>;

export type MetaMorpho_ReallocateSupply_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorpho_ReallocateSupply_event,handlerContext,loaderReturn>;

export type MetaMorpho_ReallocateSupply_handler<loaderReturn> = Internal_genericHandler<MetaMorpho_ReallocateSupply_handlerArgs<loaderReturn>>;

export type MetaMorpho_ReallocateSupply_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorpho_ReallocateSupply_event,contractRegistrations>>;

export type MetaMorpho_ReallocateSupply_eventFilter = { readonly caller?: SingleOrMultiple_t<Address_t>; readonly id?: SingleOrMultiple_t<string> };

export type MetaMorpho_ReallocateSupply_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: MetaMorpho_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type MetaMorpho_ReallocateSupply_eventFiltersDefinition = 
    MetaMorpho_ReallocateSupply_eventFilter
  | MetaMorpho_ReallocateSupply_eventFilter[];

export type MetaMorpho_ReallocateSupply_eventFilters = 
    MetaMorpho_ReallocateSupply_eventFilter
  | MetaMorpho_ReallocateSupply_eventFilter[]
  | ((_1:MetaMorpho_ReallocateSupply_eventFiltersArgs) => MetaMorpho_ReallocateSupply_eventFiltersDefinition);

export type MetaMorpho_ReallocateWithdraw_eventArgs = {
  readonly caller: Address_t; 
  readonly id: string; 
  readonly withdrawnAssets: bigint; 
  readonly withdrawnShares: bigint
};

export type MetaMorpho_ReallocateWithdraw_block = Block_t;

export type MetaMorpho_ReallocateWithdraw_transaction = Transaction_t;

export type MetaMorpho_ReallocateWithdraw_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorpho_ReallocateWithdraw_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorpho_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorpho_ReallocateWithdraw_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorpho_ReallocateWithdraw_block
};

export type MetaMorpho_ReallocateWithdraw_loaderArgs = Internal_genericLoaderArgs<MetaMorpho_ReallocateWithdraw_event,loaderContext>;

export type MetaMorpho_ReallocateWithdraw_loader<loaderReturn> = Internal_genericLoader<MetaMorpho_ReallocateWithdraw_loaderArgs,loaderReturn>;

export type MetaMorpho_ReallocateWithdraw_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorpho_ReallocateWithdraw_event,handlerContext,loaderReturn>;

export type MetaMorpho_ReallocateWithdraw_handler<loaderReturn> = Internal_genericHandler<MetaMorpho_ReallocateWithdraw_handlerArgs<loaderReturn>>;

export type MetaMorpho_ReallocateWithdraw_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorpho_ReallocateWithdraw_event,contractRegistrations>>;

export type MetaMorpho_ReallocateWithdraw_eventFilter = { readonly caller?: SingleOrMultiple_t<Address_t>; readonly id?: SingleOrMultiple_t<string> };

export type MetaMorpho_ReallocateWithdraw_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: MetaMorpho_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type MetaMorpho_ReallocateWithdraw_eventFiltersDefinition = 
    MetaMorpho_ReallocateWithdraw_eventFilter
  | MetaMorpho_ReallocateWithdraw_eventFilter[];

export type MetaMorpho_ReallocateWithdraw_eventFilters = 
    MetaMorpho_ReallocateWithdraw_eventFilter
  | MetaMorpho_ReallocateWithdraw_eventFilter[]
  | ((_1:MetaMorpho_ReallocateWithdraw_eventFiltersArgs) => MetaMorpho_ReallocateWithdraw_eventFiltersDefinition);

export type MetaMorpho_SetSupplyQueue_eventArgs = { readonly caller: Address_t; readonly newSupplyQueue: string[] };

export type MetaMorpho_SetSupplyQueue_block = Block_t;

export type MetaMorpho_SetSupplyQueue_transaction = Transaction_t;

export type MetaMorpho_SetSupplyQueue_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorpho_SetSupplyQueue_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorpho_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorpho_SetSupplyQueue_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorpho_SetSupplyQueue_block
};

export type MetaMorpho_SetSupplyQueue_loaderArgs = Internal_genericLoaderArgs<MetaMorpho_SetSupplyQueue_event,loaderContext>;

export type MetaMorpho_SetSupplyQueue_loader<loaderReturn> = Internal_genericLoader<MetaMorpho_SetSupplyQueue_loaderArgs,loaderReturn>;

export type MetaMorpho_SetSupplyQueue_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorpho_SetSupplyQueue_event,handlerContext,loaderReturn>;

export type MetaMorpho_SetSupplyQueue_handler<loaderReturn> = Internal_genericHandler<MetaMorpho_SetSupplyQueue_handlerArgs<loaderReturn>>;

export type MetaMorpho_SetSupplyQueue_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorpho_SetSupplyQueue_event,contractRegistrations>>;

export type MetaMorpho_SetSupplyQueue_eventFilter = { readonly caller?: SingleOrMultiple_t<Address_t> };

export type MetaMorpho_SetSupplyQueue_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: MetaMorpho_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type MetaMorpho_SetSupplyQueue_eventFiltersDefinition = 
    MetaMorpho_SetSupplyQueue_eventFilter
  | MetaMorpho_SetSupplyQueue_eventFilter[];

export type MetaMorpho_SetSupplyQueue_eventFilters = 
    MetaMorpho_SetSupplyQueue_eventFilter
  | MetaMorpho_SetSupplyQueue_eventFilter[]
  | ((_1:MetaMorpho_SetSupplyQueue_eventFiltersArgs) => MetaMorpho_SetSupplyQueue_eventFiltersDefinition);

export type MetaMorpho_UpdateLastTotalAssets_eventArgs = { readonly updatedTotalAssets: bigint };

export type MetaMorpho_UpdateLastTotalAssets_block = Block_t;

export type MetaMorpho_UpdateLastTotalAssets_transaction = Transaction_t;

export type MetaMorpho_UpdateLastTotalAssets_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorpho_UpdateLastTotalAssets_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorpho_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorpho_UpdateLastTotalAssets_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorpho_UpdateLastTotalAssets_block
};

export type MetaMorpho_UpdateLastTotalAssets_loaderArgs = Internal_genericLoaderArgs<MetaMorpho_UpdateLastTotalAssets_event,loaderContext>;

export type MetaMorpho_UpdateLastTotalAssets_loader<loaderReturn> = Internal_genericLoader<MetaMorpho_UpdateLastTotalAssets_loaderArgs,loaderReturn>;

export type MetaMorpho_UpdateLastTotalAssets_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorpho_UpdateLastTotalAssets_event,handlerContext,loaderReturn>;

export type MetaMorpho_UpdateLastTotalAssets_handler<loaderReturn> = Internal_genericHandler<MetaMorpho_UpdateLastTotalAssets_handlerArgs<loaderReturn>>;

export type MetaMorpho_UpdateLastTotalAssets_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorpho_UpdateLastTotalAssets_event,contractRegistrations>>;

export type MetaMorpho_UpdateLastTotalAssets_eventFilter = {};

export type MetaMorpho_UpdateLastTotalAssets_eventFilters = Internal_noEventFilters;

export type MetaMorpho_SetFee_eventArgs = { readonly caller: Address_t; readonly newFee: bigint };

export type MetaMorpho_SetFee_block = Block_t;

export type MetaMorpho_SetFee_transaction = Transaction_t;

export type MetaMorpho_SetFee_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorpho_SetFee_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorpho_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorpho_SetFee_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorpho_SetFee_block
};

export type MetaMorpho_SetFee_loaderArgs = Internal_genericLoaderArgs<MetaMorpho_SetFee_event,loaderContext>;

export type MetaMorpho_SetFee_loader<loaderReturn> = Internal_genericLoader<MetaMorpho_SetFee_loaderArgs,loaderReturn>;

export type MetaMorpho_SetFee_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorpho_SetFee_event,handlerContext,loaderReturn>;

export type MetaMorpho_SetFee_handler<loaderReturn> = Internal_genericHandler<MetaMorpho_SetFee_handlerArgs<loaderReturn>>;

export type MetaMorpho_SetFee_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorpho_SetFee_event,contractRegistrations>>;

export type MetaMorpho_SetFee_eventFilter = { readonly caller?: SingleOrMultiple_t<Address_t> };

export type MetaMorpho_SetFee_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: MetaMorpho_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type MetaMorpho_SetFee_eventFiltersDefinition = 
    MetaMorpho_SetFee_eventFilter
  | MetaMorpho_SetFee_eventFilter[];

export type MetaMorpho_SetFee_eventFilters = 
    MetaMorpho_SetFee_eventFilter
  | MetaMorpho_SetFee_eventFilter[]
  | ((_1:MetaMorpho_SetFee_eventFiltersArgs) => MetaMorpho_SetFee_eventFiltersDefinition);

export type MetaMorpho_Deposit_eventArgs = {
  readonly sender: Address_t; 
  readonly owner: Address_t; 
  readonly assets: bigint; 
  readonly shares: bigint
};

export type MetaMorpho_Deposit_block = Block_t;

export type MetaMorpho_Deposit_transaction = Transaction_t;

export type MetaMorpho_Deposit_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorpho_Deposit_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorpho_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorpho_Deposit_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorpho_Deposit_block
};

export type MetaMorpho_Deposit_loaderArgs = Internal_genericLoaderArgs<MetaMorpho_Deposit_event,loaderContext>;

export type MetaMorpho_Deposit_loader<loaderReturn> = Internal_genericLoader<MetaMorpho_Deposit_loaderArgs,loaderReturn>;

export type MetaMorpho_Deposit_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorpho_Deposit_event,handlerContext,loaderReturn>;

export type MetaMorpho_Deposit_handler<loaderReturn> = Internal_genericHandler<MetaMorpho_Deposit_handlerArgs<loaderReturn>>;

export type MetaMorpho_Deposit_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorpho_Deposit_event,contractRegistrations>>;

export type MetaMorpho_Deposit_eventFilter = { readonly sender?: SingleOrMultiple_t<Address_t>; readonly owner?: SingleOrMultiple_t<Address_t> };

export type MetaMorpho_Deposit_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: MetaMorpho_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type MetaMorpho_Deposit_eventFiltersDefinition = 
    MetaMorpho_Deposit_eventFilter
  | MetaMorpho_Deposit_eventFilter[];

export type MetaMorpho_Deposit_eventFilters = 
    MetaMorpho_Deposit_eventFilter
  | MetaMorpho_Deposit_eventFilter[]
  | ((_1:MetaMorpho_Deposit_eventFiltersArgs) => MetaMorpho_Deposit_eventFiltersDefinition);

export type MetaMorpho_Withdraw_eventArgs = {
  readonly sender: Address_t; 
  readonly receiver: Address_t; 
  readonly owner: Address_t; 
  readonly assets: bigint; 
  readonly shares: bigint
};

export type MetaMorpho_Withdraw_block = Block_t;

export type MetaMorpho_Withdraw_transaction = Transaction_t;

export type MetaMorpho_Withdraw_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorpho_Withdraw_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorpho_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorpho_Withdraw_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorpho_Withdraw_block
};

export type MetaMorpho_Withdraw_loaderArgs = Internal_genericLoaderArgs<MetaMorpho_Withdraw_event,loaderContext>;

export type MetaMorpho_Withdraw_loader<loaderReturn> = Internal_genericLoader<MetaMorpho_Withdraw_loaderArgs,loaderReturn>;

export type MetaMorpho_Withdraw_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorpho_Withdraw_event,handlerContext,loaderReturn>;

export type MetaMorpho_Withdraw_handler<loaderReturn> = Internal_genericHandler<MetaMorpho_Withdraw_handlerArgs<loaderReturn>>;

export type MetaMorpho_Withdraw_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorpho_Withdraw_event,contractRegistrations>>;

export type MetaMorpho_Withdraw_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly receiver?: SingleOrMultiple_t<Address_t>; 
  readonly owner?: SingleOrMultiple_t<Address_t>
};

export type MetaMorpho_Withdraw_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: MetaMorpho_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type MetaMorpho_Withdraw_eventFiltersDefinition = 
    MetaMorpho_Withdraw_eventFilter
  | MetaMorpho_Withdraw_eventFilter[];

export type MetaMorpho_Withdraw_eventFilters = 
    MetaMorpho_Withdraw_eventFilter
  | MetaMorpho_Withdraw_eventFilter[]
  | ((_1:MetaMorpho_Withdraw_eventFiltersArgs) => MetaMorpho_Withdraw_eventFiltersDefinition);

export type MetaMorphoFactory_chainId = 1 | 8453;

export type MetaMorphoFactory_CreateMetaMorpho_eventArgs = {
  readonly metaMorpho: Address_t; 
  readonly caller: Address_t; 
  readonly initialOwner: Address_t; 
  readonly initialTimelock: bigint; 
  readonly asset: Address_t; 
  readonly name: string; 
  readonly symbol: string; 
  readonly salt: string
};

export type MetaMorphoFactory_CreateMetaMorpho_block = Block_t;

export type MetaMorphoFactory_CreateMetaMorpho_transaction = Transaction_t;

export type MetaMorphoFactory_CreateMetaMorpho_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: MetaMorphoFactory_CreateMetaMorpho_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: MetaMorphoFactory_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: MetaMorphoFactory_CreateMetaMorpho_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: MetaMorphoFactory_CreateMetaMorpho_block
};

export type MetaMorphoFactory_CreateMetaMorpho_loaderArgs = Internal_genericLoaderArgs<MetaMorphoFactory_CreateMetaMorpho_event,loaderContext>;

export type MetaMorphoFactory_CreateMetaMorpho_loader<loaderReturn> = Internal_genericLoader<MetaMorphoFactory_CreateMetaMorpho_loaderArgs,loaderReturn>;

export type MetaMorphoFactory_CreateMetaMorpho_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<MetaMorphoFactory_CreateMetaMorpho_event,handlerContext,loaderReturn>;

export type MetaMorphoFactory_CreateMetaMorpho_handler<loaderReturn> = Internal_genericHandler<MetaMorphoFactory_CreateMetaMorpho_handlerArgs<loaderReturn>>;

export type MetaMorphoFactory_CreateMetaMorpho_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<MetaMorphoFactory_CreateMetaMorpho_event,contractRegistrations>>;

export type MetaMorphoFactory_CreateMetaMorpho_eventFilter = {
  readonly metaMorpho?: SingleOrMultiple_t<Address_t>; 
  readonly caller?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type MetaMorphoFactory_CreateMetaMorpho_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: MetaMorphoFactory_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type MetaMorphoFactory_CreateMetaMorpho_eventFiltersDefinition = 
    MetaMorphoFactory_CreateMetaMorpho_eventFilter
  | MetaMorphoFactory_CreateMetaMorpho_eventFilter[];

export type MetaMorphoFactory_CreateMetaMorpho_eventFilters = 
    MetaMorphoFactory_CreateMetaMorpho_eventFilter
  | MetaMorphoFactory_CreateMetaMorpho_eventFilter[]
  | ((_1:MetaMorphoFactory_CreateMetaMorpho_eventFiltersArgs) => MetaMorphoFactory_CreateMetaMorpho_eventFiltersDefinition);

export type chainId = number;

export type chain = 1 | 8453;
