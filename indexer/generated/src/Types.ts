// This file is to dynamically generate TS types
// which we can't get using GenType
// Use @genType.import to link the types back to ReScript code

import type { Logger, EffectCaller } from "envio";
import type * as Entities from "./db/Entities.gen.ts";

export type LoaderContext = {
  /**
   * Access the logger instance with event as a context. The logs will be displayed in the console and Envio Hosted Service.
   */
  readonly log: Logger;
  /**
   * Call the provided Effect with the given input.
   * Effects are the best for external calls with automatic deduplication, error handling and caching.
   * Define a new Effect using createEffect outside of the handler.
   */
  readonly effect: EffectCaller;
  /**
   * True when the handlers run in preload mode - in parallel for the whole batch.
   * Handlers run twice per batch of events, and the first time is the "preload" run
   * During preload entities aren't set, logs are ignored and exceptions are silently swallowed.
   * Preload mode is the best time to populate data to in-memory cache.
   * After preload the handler will run for the second time in sequential order of events.
   */
  readonly isPreload: boolean;
  /**
   * Per-chain state information accessible in event handlers and block handlers.
   * Each chain ID maps to an object containing chain-specific state:
   * - isReady: true when the chain has completed initial sync and is processing live events,
   *            false during historical synchronization
   */
  readonly chains: {
    [chainId: string]: {
      readonly isReady: boolean;
    };
  };
  readonly CapChange: {
    /**
     * Load the entity CapChange from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.CapChange_t | undefined>,
    /**
     * Load the entity CapChange from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.CapChange_t>,
    readonly getWhere: Entities.CapChange_indexedFieldOperations,
    /**
     * Returns the entity CapChange from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.CapChange_t) => Promise<Entities.CapChange_t>,
    /**
     * Set the entity CapChange in the storage.
     */
    readonly set: (entity: Entities.CapChange_t) => void,
    /**
     * Delete the entity CapChange from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly LPFlow: {
    /**
     * Load the entity LPFlow from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.LPFlow_t | undefined>,
    /**
     * Load the entity LPFlow from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.LPFlow_t>,
    readonly getWhere: Entities.LPFlow_indexedFieldOperations,
    /**
     * Returns the entity LPFlow from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.LPFlow_t) => Promise<Entities.LPFlow_t>,
    /**
     * Set the entity LPFlow in the storage.
     */
    readonly set: (entity: Entities.LPFlow_t) => void,
    /**
     * Delete the entity LPFlow from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Reallocation: {
    /**
     * Load the entity Reallocation from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Reallocation_t | undefined>,
    /**
     * Load the entity Reallocation from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Reallocation_t>,
    readonly getWhere: Entities.Reallocation_indexedFieldOperations,
    /**
     * Returns the entity Reallocation from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Reallocation_t) => Promise<Entities.Reallocation_t>,
    /**
     * Set the entity Reallocation in the storage.
     */
    readonly set: (entity: Entities.Reallocation_t) => void,
    /**
     * Delete the entity Reallocation from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Vault: {
    /**
     * Load the entity Vault from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Vault_t | undefined>,
    /**
     * Load the entity Vault from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Vault_t>,
    readonly getWhere: Entities.Vault_indexedFieldOperations,
    /**
     * Returns the entity Vault from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Vault_t) => Promise<Entities.Vault_t>,
    /**
     * Set the entity Vault in the storage.
     */
    readonly set: (entity: Entities.Vault_t) => void,
    /**
     * Delete the entity Vault from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly VaultMarket: {
    /**
     * Load the entity VaultMarket from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.VaultMarket_t | undefined>,
    /**
     * Load the entity VaultMarket from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.VaultMarket_t>,
    readonly getWhere: Entities.VaultMarket_indexedFieldOperations,
    /**
     * Returns the entity VaultMarket from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.VaultMarket_t) => Promise<Entities.VaultMarket_t>,
    /**
     * Set the entity VaultMarket in the storage.
     */
    readonly set: (entity: Entities.VaultMarket_t) => void,
    /**
     * Delete the entity VaultMarket from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly VaultSnapshot: {
    /**
     * Load the entity VaultSnapshot from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.VaultSnapshot_t | undefined>,
    /**
     * Load the entity VaultSnapshot from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.VaultSnapshot_t>,
    readonly getWhere: Entities.VaultSnapshot_indexedFieldOperations,
    /**
     * Returns the entity VaultSnapshot from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.VaultSnapshot_t) => Promise<Entities.VaultSnapshot_t>,
    /**
     * Set the entity VaultSnapshot in the storage.
     */
    readonly set: (entity: Entities.VaultSnapshot_t) => void,
    /**
     * Delete the entity VaultSnapshot from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
};

export type HandlerContext = {
  /**
   * Access the logger instance with event as a context. The logs will be displayed in the console and Envio Hosted Service.
   */
  readonly log: Logger;
  /**
   * Call the provided Effect with the given input.
   * Effects are the best for external calls with automatic deduplication, error handling and caching.
   * Define a new Effect using createEffect outside of the handler.
   */
  readonly effect: EffectCaller;
  /**
   * Per-chain state information accessible in event handlers and block handlers.
   * Each chain ID maps to an object containing chain-specific state:
   * - isReady: true when the chain has completed initial sync and is processing live events,
   *            false during historical synchronization
   */
  readonly chains: {
    [chainId: string]: {
      readonly isReady: boolean;
    };
  };
  readonly CapChange: {
    /**
     * Load the entity CapChange from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.CapChange_t | undefined>,
    /**
     * Load the entity CapChange from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.CapChange_t>,
    /**
     * Returns the entity CapChange from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.CapChange_t) => Promise<Entities.CapChange_t>,
    /**
     * Set the entity CapChange in the storage.
     */
    readonly set: (entity: Entities.CapChange_t) => void,
    /**
     * Delete the entity CapChange from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly LPFlow: {
    /**
     * Load the entity LPFlow from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.LPFlow_t | undefined>,
    /**
     * Load the entity LPFlow from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.LPFlow_t>,
    /**
     * Returns the entity LPFlow from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.LPFlow_t) => Promise<Entities.LPFlow_t>,
    /**
     * Set the entity LPFlow in the storage.
     */
    readonly set: (entity: Entities.LPFlow_t) => void,
    /**
     * Delete the entity LPFlow from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Reallocation: {
    /**
     * Load the entity Reallocation from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Reallocation_t | undefined>,
    /**
     * Load the entity Reallocation from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Reallocation_t>,
    /**
     * Returns the entity Reallocation from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Reallocation_t) => Promise<Entities.Reallocation_t>,
    /**
     * Set the entity Reallocation in the storage.
     */
    readonly set: (entity: Entities.Reallocation_t) => void,
    /**
     * Delete the entity Reallocation from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Vault: {
    /**
     * Load the entity Vault from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Vault_t | undefined>,
    /**
     * Load the entity Vault from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Vault_t>,
    /**
     * Returns the entity Vault from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Vault_t) => Promise<Entities.Vault_t>,
    /**
     * Set the entity Vault in the storage.
     */
    readonly set: (entity: Entities.Vault_t) => void,
    /**
     * Delete the entity Vault from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly VaultMarket: {
    /**
     * Load the entity VaultMarket from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.VaultMarket_t | undefined>,
    /**
     * Load the entity VaultMarket from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.VaultMarket_t>,
    /**
     * Returns the entity VaultMarket from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.VaultMarket_t) => Promise<Entities.VaultMarket_t>,
    /**
     * Set the entity VaultMarket in the storage.
     */
    readonly set: (entity: Entities.VaultMarket_t) => void,
    /**
     * Delete the entity VaultMarket from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly VaultSnapshot: {
    /**
     * Load the entity VaultSnapshot from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.VaultSnapshot_t | undefined>,
    /**
     * Load the entity VaultSnapshot from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.VaultSnapshot_t>,
    /**
     * Returns the entity VaultSnapshot from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.VaultSnapshot_t) => Promise<Entities.VaultSnapshot_t>,
    /**
     * Set the entity VaultSnapshot in the storage.
     */
    readonly set: (entity: Entities.VaultSnapshot_t) => void,
    /**
     * Delete the entity VaultSnapshot from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
};
