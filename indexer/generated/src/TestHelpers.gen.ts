/* TypeScript file generated from TestHelpers.res by genType. */

/* eslint-disable */
/* tslint:disable */

const TestHelpersJS = require('./TestHelpers.res.js');

import type {MetaMorphoFactory_CreateMetaMorpho_event as Types_MetaMorphoFactory_CreateMetaMorpho_event} from './Types.gen';

import type {MetaMorpho_Deposit_event as Types_MetaMorpho_Deposit_event} from './Types.gen';

import type {MetaMorpho_ReallocateSupply_event as Types_MetaMorpho_ReallocateSupply_event} from './Types.gen';

import type {MetaMorpho_ReallocateWithdraw_event as Types_MetaMorpho_ReallocateWithdraw_event} from './Types.gen';

import type {MetaMorpho_RevokePendingCap_event as Types_MetaMorpho_RevokePendingCap_event} from './Types.gen';

import type {MetaMorpho_SetCap_event as Types_MetaMorpho_SetCap_event} from './Types.gen';

import type {MetaMorpho_SetFee_event as Types_MetaMorpho_SetFee_event} from './Types.gen';

import type {MetaMorpho_SetSupplyQueue_event as Types_MetaMorpho_SetSupplyQueue_event} from './Types.gen';

import type {MetaMorpho_SubmitCap_event as Types_MetaMorpho_SubmitCap_event} from './Types.gen';

import type {MetaMorpho_UpdateLastTotalAssets_event as Types_MetaMorpho_UpdateLastTotalAssets_event} from './Types.gen';

import type {MetaMorpho_Withdraw_event as Types_MetaMorpho_Withdraw_event} from './Types.gen';

import type {t as Address_t} from 'envio/src/Address.gen';

import type {t as TestHelpers_MockDb_t} from './TestHelpers_MockDb.gen';

/** The arguements that get passed to a "processEvent" helper function */
export type EventFunctions_eventProcessorArgs<event> = {
  readonly event: event; 
  readonly mockDb: TestHelpers_MockDb_t; 
  readonly chainId?: number
};

export type EventFunctions_eventProcessor<event> = (_1:EventFunctions_eventProcessorArgs<event>) => Promise<TestHelpers_MockDb_t>;

export type EventFunctions_MockBlock_t = {
  readonly hash?: string; 
  readonly number?: number; 
  readonly timestamp?: number
};

export type EventFunctions_MockTransaction_t = { readonly hash?: string };

export type EventFunctions_mockEventData = {
  readonly chainId?: number; 
  readonly srcAddress?: Address_t; 
  readonly logIndex?: number; 
  readonly block?: EventFunctions_MockBlock_t; 
  readonly transaction?: EventFunctions_MockTransaction_t
};

export type MetaMorpho_SetCap_createMockArgs = {
  readonly caller?: Address_t; 
  readonly id?: string; 
  readonly cap?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type MetaMorpho_SubmitCap_createMockArgs = {
  readonly caller?: Address_t; 
  readonly id?: string; 
  readonly cap?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type MetaMorpho_RevokePendingCap_createMockArgs = {
  readonly caller?: Address_t; 
  readonly id?: string; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type MetaMorpho_ReallocateSupply_createMockArgs = {
  readonly caller?: Address_t; 
  readonly id?: string; 
  readonly suppliedAssets?: bigint; 
  readonly suppliedShares?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type MetaMorpho_ReallocateWithdraw_createMockArgs = {
  readonly caller?: Address_t; 
  readonly id?: string; 
  readonly withdrawnAssets?: bigint; 
  readonly withdrawnShares?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type MetaMorpho_SetSupplyQueue_createMockArgs = {
  readonly caller?: Address_t; 
  readonly newSupplyQueue?: string[]; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type MetaMorpho_UpdateLastTotalAssets_createMockArgs = { readonly updatedTotalAssets?: bigint; readonly mockEventData?: EventFunctions_mockEventData };

export type MetaMorpho_SetFee_createMockArgs = {
  readonly caller?: Address_t; 
  readonly newFee?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type MetaMorpho_Deposit_createMockArgs = {
  readonly sender?: Address_t; 
  readonly owner?: Address_t; 
  readonly assets?: bigint; 
  readonly shares?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type MetaMorpho_Withdraw_createMockArgs = {
  readonly sender?: Address_t; 
  readonly receiver?: Address_t; 
  readonly owner?: Address_t; 
  readonly assets?: bigint; 
  readonly shares?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type MetaMorphoFactory_CreateMetaMorpho_createMockArgs = {
  readonly metaMorpho?: Address_t; 
  readonly caller?: Address_t; 
  readonly initialOwner?: Address_t; 
  readonly initialTimelock?: bigint; 
  readonly asset?: Address_t; 
  readonly name?: string; 
  readonly symbol?: string; 
  readonly salt?: string; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export const MockDb_createMockDb: () => TestHelpers_MockDb_t = TestHelpersJS.MockDb.createMockDb as any;

export const Addresses_mockAddresses: Address_t[] = TestHelpersJS.Addresses.mockAddresses as any;

export const Addresses_defaultAddress: Address_t = TestHelpersJS.Addresses.defaultAddress as any;

export const MetaMorpho_SetCap_processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_SetCap_event> = TestHelpersJS.MetaMorpho.SetCap.processEvent as any;

export const MetaMorpho_SetCap_createMockEvent: (args:MetaMorpho_SetCap_createMockArgs) => Types_MetaMorpho_SetCap_event = TestHelpersJS.MetaMorpho.SetCap.createMockEvent as any;

export const MetaMorpho_SubmitCap_processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_SubmitCap_event> = TestHelpersJS.MetaMorpho.SubmitCap.processEvent as any;

export const MetaMorpho_SubmitCap_createMockEvent: (args:MetaMorpho_SubmitCap_createMockArgs) => Types_MetaMorpho_SubmitCap_event = TestHelpersJS.MetaMorpho.SubmitCap.createMockEvent as any;

export const MetaMorpho_RevokePendingCap_processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_RevokePendingCap_event> = TestHelpersJS.MetaMorpho.RevokePendingCap.processEvent as any;

export const MetaMorpho_RevokePendingCap_createMockEvent: (args:MetaMorpho_RevokePendingCap_createMockArgs) => Types_MetaMorpho_RevokePendingCap_event = TestHelpersJS.MetaMorpho.RevokePendingCap.createMockEvent as any;

export const MetaMorpho_ReallocateSupply_processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_ReallocateSupply_event> = TestHelpersJS.MetaMorpho.ReallocateSupply.processEvent as any;

export const MetaMorpho_ReallocateSupply_createMockEvent: (args:MetaMorpho_ReallocateSupply_createMockArgs) => Types_MetaMorpho_ReallocateSupply_event = TestHelpersJS.MetaMorpho.ReallocateSupply.createMockEvent as any;

export const MetaMorpho_ReallocateWithdraw_processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_ReallocateWithdraw_event> = TestHelpersJS.MetaMorpho.ReallocateWithdraw.processEvent as any;

export const MetaMorpho_ReallocateWithdraw_createMockEvent: (args:MetaMorpho_ReallocateWithdraw_createMockArgs) => Types_MetaMorpho_ReallocateWithdraw_event = TestHelpersJS.MetaMorpho.ReallocateWithdraw.createMockEvent as any;

export const MetaMorpho_SetSupplyQueue_processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_SetSupplyQueue_event> = TestHelpersJS.MetaMorpho.SetSupplyQueue.processEvent as any;

export const MetaMorpho_SetSupplyQueue_createMockEvent: (args:MetaMorpho_SetSupplyQueue_createMockArgs) => Types_MetaMorpho_SetSupplyQueue_event = TestHelpersJS.MetaMorpho.SetSupplyQueue.createMockEvent as any;

export const MetaMorpho_UpdateLastTotalAssets_processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_UpdateLastTotalAssets_event> = TestHelpersJS.MetaMorpho.UpdateLastTotalAssets.processEvent as any;

export const MetaMorpho_UpdateLastTotalAssets_createMockEvent: (args:MetaMorpho_UpdateLastTotalAssets_createMockArgs) => Types_MetaMorpho_UpdateLastTotalAssets_event = TestHelpersJS.MetaMorpho.UpdateLastTotalAssets.createMockEvent as any;

export const MetaMorpho_SetFee_processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_SetFee_event> = TestHelpersJS.MetaMorpho.SetFee.processEvent as any;

export const MetaMorpho_SetFee_createMockEvent: (args:MetaMorpho_SetFee_createMockArgs) => Types_MetaMorpho_SetFee_event = TestHelpersJS.MetaMorpho.SetFee.createMockEvent as any;

export const MetaMorpho_Deposit_processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_Deposit_event> = TestHelpersJS.MetaMorpho.Deposit.processEvent as any;

export const MetaMorpho_Deposit_createMockEvent: (args:MetaMorpho_Deposit_createMockArgs) => Types_MetaMorpho_Deposit_event = TestHelpersJS.MetaMorpho.Deposit.createMockEvent as any;

export const MetaMorpho_Withdraw_processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_Withdraw_event> = TestHelpersJS.MetaMorpho.Withdraw.processEvent as any;

export const MetaMorpho_Withdraw_createMockEvent: (args:MetaMorpho_Withdraw_createMockArgs) => Types_MetaMorpho_Withdraw_event = TestHelpersJS.MetaMorpho.Withdraw.createMockEvent as any;

export const MetaMorphoFactory_CreateMetaMorpho_processEvent: EventFunctions_eventProcessor<Types_MetaMorphoFactory_CreateMetaMorpho_event> = TestHelpersJS.MetaMorphoFactory.CreateMetaMorpho.processEvent as any;

export const MetaMorphoFactory_CreateMetaMorpho_createMockEvent: (args:MetaMorphoFactory_CreateMetaMorpho_createMockArgs) => Types_MetaMorphoFactory_CreateMetaMorpho_event = TestHelpersJS.MetaMorphoFactory.CreateMetaMorpho.createMockEvent as any;

export const Addresses: { mockAddresses: Address_t[]; defaultAddress: Address_t } = TestHelpersJS.Addresses as any;

export const MetaMorpho: {
  Deposit: {
    processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_Deposit_event>; 
    createMockEvent: (args:MetaMorpho_Deposit_createMockArgs) => Types_MetaMorpho_Deposit_event
  }; 
  ReallocateWithdraw: {
    processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_ReallocateWithdraw_event>; 
    createMockEvent: (args:MetaMorpho_ReallocateWithdraw_createMockArgs) => Types_MetaMorpho_ReallocateWithdraw_event
  }; 
  SetSupplyQueue: {
    processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_SetSupplyQueue_event>; 
    createMockEvent: (args:MetaMorpho_SetSupplyQueue_createMockArgs) => Types_MetaMorpho_SetSupplyQueue_event
  }; 
  SetFee: {
    processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_SetFee_event>; 
    createMockEvent: (args:MetaMorpho_SetFee_createMockArgs) => Types_MetaMorpho_SetFee_event
  }; 
  Withdraw: {
    processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_Withdraw_event>; 
    createMockEvent: (args:MetaMorpho_Withdraw_createMockArgs) => Types_MetaMorpho_Withdraw_event
  }; 
  SetCap: {
    processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_SetCap_event>; 
    createMockEvent: (args:MetaMorpho_SetCap_createMockArgs) => Types_MetaMorpho_SetCap_event
  }; 
  RevokePendingCap: {
    processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_RevokePendingCap_event>; 
    createMockEvent: (args:MetaMorpho_RevokePendingCap_createMockArgs) => Types_MetaMorpho_RevokePendingCap_event
  }; 
  UpdateLastTotalAssets: {
    processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_UpdateLastTotalAssets_event>; 
    createMockEvent: (args:MetaMorpho_UpdateLastTotalAssets_createMockArgs) => Types_MetaMorpho_UpdateLastTotalAssets_event
  }; 
  SubmitCap: {
    processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_SubmitCap_event>; 
    createMockEvent: (args:MetaMorpho_SubmitCap_createMockArgs) => Types_MetaMorpho_SubmitCap_event
  }; 
  ReallocateSupply: {
    processEvent: EventFunctions_eventProcessor<Types_MetaMorpho_ReallocateSupply_event>; 
    createMockEvent: (args:MetaMorpho_ReallocateSupply_createMockArgs) => Types_MetaMorpho_ReallocateSupply_event
  }
} = TestHelpersJS.MetaMorpho as any;

export const MetaMorphoFactory: { CreateMetaMorpho: { processEvent: EventFunctions_eventProcessor<Types_MetaMorphoFactory_CreateMetaMorpho_event>; createMockEvent: (args:MetaMorphoFactory_CreateMetaMorpho_createMockArgs) => Types_MetaMorphoFactory_CreateMetaMorpho_event } } = TestHelpersJS.MetaMorphoFactory as any;

export const MockDb: { createMockDb: () => TestHelpers_MockDb_t } = TestHelpersJS.MockDb as any;
