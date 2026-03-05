module ContractType = {
  @genType
  type t = 
    | @as("MetaMorpho") MetaMorpho
    | @as("MetaMorphoFactory") MetaMorphoFactory

  let name = "CONTRACT_TYPE"
  let variants = [
    MetaMorpho,
    MetaMorphoFactory,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

module EntityType = {
  @genType
  type t = 
    | @as("CapChange") CapChange
    | @as("LPFlow") LPFlow
    | @as("Reallocation") Reallocation
    | @as("Vault") Vault
    | @as("VaultMarket") VaultMarket
    | @as("VaultSnapshot") VaultSnapshot
    | @as("dynamic_contract_registry") DynamicContractRegistry

  let name = "ENTITY_TYPE"
  let variants = [
    CapChange,
    LPFlow,
    Reallocation,
    Vault,
    VaultMarket,
    VaultSnapshot,
    DynamicContractRegistry,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

module CapChangeType = {
  @genType
  type t = 
    | @as("SET") SET
    | @as("SUBMIT") SUBMIT
    | @as("REVOKE") REVOKE

  let name = "CapChangeType"
  let variants = [
    SET,
    SUBMIT,
    REVOKE,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

module FlowType = {
  @genType
  type t = 
    | @as("DEPOSIT") DEPOSIT
    | @as("WITHDRAW") WITHDRAW

  let name = "FlowType"
  let variants = [
    DEPOSIT,
    WITHDRAW,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

module ReallocationSide = {
  @genType
  type t = 
    | @as("SUPPLY") SUPPLY
    | @as("WITHDRAW") WITHDRAW

  let name = "ReallocationSide"
  let variants = [
    SUPPLY,
    WITHDRAW,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

let allEnums = ([
  ContractType.config->Internal.fromGenericEnumConfig,
  EntityType.config->Internal.fromGenericEnumConfig,
  CapChangeType.config->Internal.fromGenericEnumConfig,
  FlowType.config->Internal.fromGenericEnumConfig,
  ReallocationSide.config->Internal.fromGenericEnumConfig,
])
