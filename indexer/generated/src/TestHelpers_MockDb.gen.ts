/* TypeScript file generated from TestHelpers_MockDb.res by genType. */

/* eslint-disable */
/* tslint:disable */

const TestHelpers_MockDbJS = require('./TestHelpers_MockDb.res.js');

import type {CapChange_t as Entities_CapChange_t} from '../src/db/Entities.gen';

import type {DynamicContractRegistry_t as InternalTable_DynamicContractRegistry_t} from 'envio/src/db/InternalTable.gen';

import type {LPFlow_t as Entities_LPFlow_t} from '../src/db/Entities.gen';

import type {RawEvents_t as InternalTable_RawEvents_t} from 'envio/src/db/InternalTable.gen';

import type {Reallocation_t as Entities_Reallocation_t} from '../src/db/Entities.gen';

import type {VaultMarket_t as Entities_VaultMarket_t} from '../src/db/Entities.gen';

import type {VaultSnapshot_t as Entities_VaultSnapshot_t} from '../src/db/Entities.gen';

import type {Vault_t as Entities_Vault_t} from '../src/db/Entities.gen';

import type {eventLog as Types_eventLog} from './Types.gen';

import type {rawEventsKey as InMemoryStore_rawEventsKey} from 'envio/src/InMemoryStore.gen';

/** The mockDb type is simply an InMemoryStore internally. __dbInternal__ holds a reference
to an inMemoryStore and all the the accessor methods point to the reference of that inMemory
store */
export abstract class inMemoryStore { protected opaque!: any }; /* simulate opaque types */

export type t = {
  readonly __dbInternal__: inMemoryStore; 
  readonly entities: entities; 
  readonly rawEvents: storeOperations<InMemoryStore_rawEventsKey,InternalTable_RawEvents_t>; 
  readonly dynamicContractRegistry: entityStoreOperations<InternalTable_DynamicContractRegistry_t>; 
  readonly processEvents: (_1:Types_eventLog<unknown>[]) => Promise<t>
};

export type entities = {
  readonly CapChange: entityStoreOperations<Entities_CapChange_t>; 
  readonly LPFlow: entityStoreOperations<Entities_LPFlow_t>; 
  readonly Reallocation: entityStoreOperations<Entities_Reallocation_t>; 
  readonly Vault: entityStoreOperations<Entities_Vault_t>; 
  readonly VaultMarket: entityStoreOperations<Entities_VaultMarket_t>; 
  readonly VaultSnapshot: entityStoreOperations<Entities_VaultSnapshot_t>
};

export type entityStoreOperations<entity> = storeOperations<string,entity>;

export type storeOperations<entityKey,entity> = {
  readonly getAll: () => entity[]; 
  readonly get: (_1:entityKey) => (undefined | entity); 
  readonly set: (_1:entity) => t; 
  readonly delete: (_1:entityKey) => t
};

/** The constructor function for a mockDb. Call it and then set up the inital state by calling
any of the set functions it provides access to. A mockDb will be passed into a processEvent 
helper. Note, process event helpers will not mutate the mockDb but return a new mockDb with
new state so you can compare states before and after. */
export const createMockDb: () => t = TestHelpers_MockDbJS.createMockDb as any;
