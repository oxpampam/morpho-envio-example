
type hyperSyncConfig = {endpointUrl: string}
type hyperFuelConfig = {endpointUrl: string}

@genType.opaque
type rpcConfig = {
  syncConfig: Config.sourceSync,
}

@genType
type syncSource = HyperSync(hyperSyncConfig) | HyperFuel(hyperFuelConfig) | Rpc(rpcConfig)

@genType.opaque
type aliasAbi = Ethers.abi

type eventName = string

type contract = {
  name: string,
  abi: aliasAbi,
  addresses: array<string>,
  events: array<eventName>,
}

type configYaml = {
  syncSource,
  startBlock: int,
  confirmedBlockThreshold: int,
  contracts: dict<contract>,
  lowercaseAddresses: bool,
}

let publicConfig = ChainMap.fromArrayUnsafe([
  {
    let contracts = Js.Dict.fromArray([
      (
        "MetaMorphoFactory",
        {
          name: "MetaMorphoFactory",
          abi: Types.MetaMorphoFactory.abi,
          addresses: [
            "0xa9c3d3a366466fa809d1ae982fb2c46e5fc41101",
            "0x1897a8997241c1cd4bd0698647e4eb7213535c24",
          ],
          events: [
            Types.MetaMorphoFactory.CreateMetaMorpho.name,
          ],
        }
      ),
      (
        "MetaMorpho",
        {
          name: "MetaMorpho",
          abi: Types.MetaMorpho.abi,
          addresses: [
          ],
          events: [
            Types.MetaMorpho.SetCap.name,
            Types.MetaMorpho.SubmitCap.name,
            Types.MetaMorpho.RevokePendingCap.name,
            Types.MetaMorpho.ReallocateSupply.name,
            Types.MetaMorpho.ReallocateWithdraw.name,
            Types.MetaMorpho.SetSupplyQueue.name,
            Types.MetaMorpho.UpdateLastTotalAssets.name,
            Types.MetaMorpho.SetFee.name,
            Types.MetaMorpho.Deposit.name,
            Types.MetaMorpho.Withdraw.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=1)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://1.hypersync.xyz"}),
        startBlock: 18900000,
        contracts,
        lowercaseAddresses: false
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "MetaMorphoFactory",
        {
          name: "MetaMorphoFactory",
          abi: Types.MetaMorphoFactory.abi,
          addresses: [
            "0xa9c3d3a366466fa809d1ae982fb2c46e5fc41101",
            "0x1897a8997241c1cd4bd0698647e4eb7213535c24",
          ],
          events: [
            Types.MetaMorphoFactory.CreateMetaMorpho.name,
          ],
        }
      ),
      (
        "MetaMorpho",
        {
          name: "MetaMorpho",
          abi: Types.MetaMorpho.abi,
          addresses: [
          ],
          events: [
            Types.MetaMorpho.SetCap.name,
            Types.MetaMorpho.SubmitCap.name,
            Types.MetaMorpho.RevokePendingCap.name,
            Types.MetaMorpho.ReallocateSupply.name,
            Types.MetaMorpho.ReallocateWithdraw.name,
            Types.MetaMorpho.SetSupplyQueue.name,
            Types.MetaMorpho.UpdateLastTotalAssets.name,
            Types.MetaMorpho.SetFee.name,
            Types.MetaMorpho.Deposit.name,
            Types.MetaMorpho.Withdraw.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=8453)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://8453.hypersync.xyz"}),
        startBlock: 13977000,
        contracts,
        lowercaseAddresses: false
      }
    )
  },
])

@genType
let getGeneratedByChainId: int => configYaml = chainId => {
  let chain = ChainMap.Chain.makeUnsafe(~chainId)
  if !(publicConfig->ChainMap.has(chain)) {
    Js.Exn.raiseError(
      "No chain with id " ++ chain->ChainMap.Chain.toString ++ " found in config.yaml",
    )
  }
  publicConfig->ChainMap.get(chain)
}
