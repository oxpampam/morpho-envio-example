open Table
open Enums.EntityType
type id = string

type internalEntity = Internal.entity
module type Entity = {
  type t
  let index: int
  let name: string
  let schema: S.t<t>
  let rowsSchema: S.t<array<t>>
  let table: Table.table
  let entityHistory: EntityHistory.t<t>
}
external entityModToInternal: module(Entity with type t = 'a) => Internal.entityConfig = "%identity"
external entityModsToInternal: array<module(Entity)> => array<Internal.entityConfig> = "%identity"
external entitiesToInternal: array<'a> => array<Internal.entity> = "%identity"

@get
external getEntityId: internalEntity => string = "id"

// Use InMemoryTable.Entity.getEntityIdUnsafe instead of duplicating the logic
let getEntityIdUnsafe = InMemoryTable.Entity.getEntityIdUnsafe

//shorthand for punning
let isPrimaryKey = true
let isNullable = true
let isArray = true
let isIndex = true

@genType
type whereOperations<'entity, 'fieldType> = {
  eq: 'fieldType => promise<array<'entity>>,
  gt: 'fieldType => promise<array<'entity>>,
  lt: 'fieldType => promise<array<'entity>>
}

module CapChange = {
  let name = (CapChange :> string)
  let index = 0
  @genType
  type t = {
    changeType: Enums.CapChangeType.t,
    id: id,
    marketId: string,
    newCap: bigint,
    oldCap: bigint,
    timestamp: int,
    vault_id: id,
  }

  let schema = S.object((s): t => {
    changeType: s.field("changeType", Enums.CapChangeType.config.schema),
    id: s.field("id", S.string),
    marketId: s.field("marketId", S.string),
    newCap: s.field("newCap", BigInt.schema),
    oldCap: s.field("oldCap", BigInt.schema),
    timestamp: s.field("timestamp", S.int),
    vault_id: s.field("vault_id", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("marketId") marketId: whereOperations<t, string>,
    
      @as("timestamp") timestamp: whereOperations<t, int>,
    
      @as("vault_id") vault_id: whereOperations<t, id>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "changeType", 
      Custom(Enums.CapChangeType.config.name),
      ~fieldSchema=Enums.CapChangeType.config.schema,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "marketId", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "newCap", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "oldCap", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "timestamp", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "vault", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Vault",
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module LPFlow = {
  let name = (LPFlow :> string)
  let index = 1
  @genType
  type t = {
    assets: bigint,
    blockNumber: int,
    flowType: Enums.FlowType.t,
    id: id,
    owner: string,
    sender: string,
    shares: bigint,
    timestamp: int,
    txHash: string,
    vault_id: id,
  }

  let schema = S.object((s): t => {
    assets: s.field("assets", BigInt.schema),
    blockNumber: s.field("blockNumber", S.int),
    flowType: s.field("flowType", Enums.FlowType.config.schema),
    id: s.field("id", S.string),
    owner: s.field("owner", S.string),
    sender: s.field("sender", S.string),
    shares: s.field("shares", BigInt.schema),
    timestamp: s.field("timestamp", S.int),
    txHash: s.field("txHash", S.string),
    vault_id: s.field("vault_id", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("blockNumber") blockNumber: whereOperations<t, int>,
    
      @as("owner") owner: whereOperations<t, string>,
    
      @as("sender") sender: whereOperations<t, string>,
    
      @as("timestamp") timestamp: whereOperations<t, int>,
    
      @as("vault_id") vault_id: whereOperations<t, id>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "assets", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "blockNumber", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "flowType", 
      Custom(Enums.FlowType.config.name),
      ~fieldSchema=Enums.FlowType.config.schema,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "owner", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "sender", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "shares", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "timestamp", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "txHash", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "vault", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Vault",
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module Reallocation = {
  let name = (Reallocation :> string)
  let index = 2
  @genType
  type t = {
    assets: bigint,
    caller: string,
    id: id,
    marketId: string,
    shares: bigint,
    side: Enums.ReallocationSide.t,
    timestamp: int,
    txHash: string,
    vault_id: id,
  }

  let schema = S.object((s): t => {
    assets: s.field("assets", BigInt.schema),
    caller: s.field("caller", S.string),
    id: s.field("id", S.string),
    marketId: s.field("marketId", S.string),
    shares: s.field("shares", BigInt.schema),
    side: s.field("side", Enums.ReallocationSide.config.schema),
    timestamp: s.field("timestamp", S.int),
    txHash: s.field("txHash", S.string),
    vault_id: s.field("vault_id", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("caller") caller: whereOperations<t, string>,
    
      @as("marketId") marketId: whereOperations<t, string>,
    
      @as("timestamp") timestamp: whereOperations<t, int>,
    
      @as("txHash") txHash: whereOperations<t, string>,
    
      @as("vault_id") vault_id: whereOperations<t, id>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "assets", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "caller", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "marketId", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "shares", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "side", 
      Custom(Enums.ReallocationSide.config.name),
      ~fieldSchema=Enums.ReallocationSide.config.schema,
      
      
      
      
      
      ),
      mkField(
      "timestamp", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "txHash", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "vault", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Vault",
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module Vault = {
  let name = (Vault :> string)
  let index = 3
  @genType
  type t = {
    address: string,
    asset: string,
    
    chainId: int,
    createdAt: int,
    createdTxHash: string,
    curator: string,
    fee: bigint,
    id: id,
    
    
    name: string,
    owner: string,
    
    
    supplyQueue: array<string>,
    symbol: string,
    timelock: bigint,
    tvl: bigint,
  }

  let schema = S.object((s): t => {
    address: s.field("address", S.string),
    asset: s.field("asset", S.string),
    
    chainId: s.field("chainId", S.int),
    createdAt: s.field("createdAt", S.int),
    createdTxHash: s.field("createdTxHash", S.string),
    curator: s.field("curator", S.string),
    fee: s.field("fee", BigInt.schema),
    id: s.field("id", S.string),
    
    
    name: s.field("name", S.string),
    owner: s.field("owner", S.string),
    
    
    supplyQueue: s.field("supplyQueue", S.array(S.string)),
    symbol: s.field("symbol", S.string),
    timelock: s.field("timelock", BigInt.schema),
    tvl: s.field("tvl", BigInt.schema),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("address") address: whereOperations<t, string>,
    
      @as("asset") asset: whereOperations<t, string>,
    
      @as("chainId") chainId: whereOperations<t, int>,
    
      @as("curator") curator: whereOperations<t, string>,
    
      @as("owner") owner: whereOperations<t, string>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "address", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "asset", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "chainId", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "createdAt", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "createdTxHash", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "curator", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "fee", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "name", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "owner", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "supplyQueue", 
      Text,
      ~fieldSchema=S.array(S.string),
      
      
      ~isArray,
      
      
      ),
      mkField(
      "symbol", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "timelock", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "tvl", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkDerivedFromField(
      "capChanges", 
      ~derivedFromEntity="CapChange",
      ~derivedFromField="vault",
      ),
      mkDerivedFromField(
      "lpFlows", 
      ~derivedFromEntity="LPFlow",
      ~derivedFromField="vault",
      ),
      mkDerivedFromField(
      "markets", 
      ~derivedFromEntity="VaultMarket",
      ~derivedFromField="vault",
      ),
      mkDerivedFromField(
      "reallocations", 
      ~derivedFromEntity="Reallocation",
      ~derivedFromField="vault",
      ),
      mkDerivedFromField(
      "snapshots", 
      ~derivedFromEntity="VaultSnapshot",
      ~derivedFromField="vault",
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module VaultMarket = {
  let name = (VaultMarket :> string)
  let index = 4
  @genType
  type t = {
    cap: bigint,
    currentAllocation: bigint,
    id: id,
    lastUpdated: int,
    marketId: string,
    utilizationBps: bigint,
    vault_id: id,
  }

  let schema = S.object((s): t => {
    cap: s.field("cap", BigInt.schema),
    currentAllocation: s.field("currentAllocation", BigInt.schema),
    id: s.field("id", S.string),
    lastUpdated: s.field("lastUpdated", S.int),
    marketId: s.field("marketId", S.string),
    utilizationBps: s.field("utilizationBps", BigInt.schema),
    vault_id: s.field("vault_id", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("marketId") marketId: whereOperations<t, string>,
    
      @as("vault_id") vault_id: whereOperations<t, id>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "cap", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "currentAllocation", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "lastUpdated", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "marketId", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "utilizationBps", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "vault", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Vault",
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

module VaultSnapshot = {
  let name = (VaultSnapshot :> string)
  let index = 5
  @genType
  type t = {
    id: id,
    timestamp: int,
    totalAssets: bigint,
    vault_id: id,
  }

  let schema = S.object((s): t => {
    id: s.field("id", S.string),
    timestamp: s.field("timestamp", S.int),
    totalAssets: s.field("totalAssets", BigInt.schema),
    vault_id: s.field("vault_id", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("timestamp") timestamp: whereOperations<t, int>,
    
      @as("vault_id") vault_id: whereOperations<t, id>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "timestamp", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      ~isIndex,
      
      ),
      mkField(
      "totalAssets", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "vault", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Vault",
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~schema, ~entityIndex=index)

  external castToInternal: t => Internal.entity = "%identity"
}

let userEntities = [
  module(CapChange),
  module(LPFlow),
  module(Reallocation),
  module(Vault),
  module(VaultMarket),
  module(VaultSnapshot),
]->entityModsToInternal

let allEntities =
  userEntities->Js.Array2.concat(
    [module(InternalTable.DynamicContractRegistry)]->entityModsToInternal,
  )

let byName =
  allEntities
  ->Js.Array2.map(entityConfig => {
    (entityConfig.name, entityConfig)
  })
  ->Js.Dict.fromArray
