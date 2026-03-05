@val external require: string => unit = "require"

let registerContractHandlers = (
  ~contractName,
  ~handlerPathRelativeToRoot,
  ~handlerPathRelativeToConfig,
) => {
  try {
    require(`../${Path.relativePathToRootFromGenerated}/${handlerPathRelativeToRoot}`)
  } catch {
  | exn =>
    let params = {
      "Contract Name": contractName,
      "Expected Handler Path": handlerPathRelativeToConfig,
      "Code": "EE500",
    }
    let logger = Logging.createChild(~params)

    let errHandler = exn->ErrorHandling.make(~msg="Failed to import handler file", ~logger)
    errHandler->ErrorHandling.log
    errHandler->ErrorHandling.raiseExn
  }
}

let makeGeneratedConfig = () => {
  let chains = [
    {
      let contracts = [
        {
          Config.name: "MetaMorphoFactory",
          abi: Types.MetaMorphoFactory.abi,
          addresses: [
            "0xa9c3d3a366466fa809d1ae982fb2c46e5fc41101"->Address.Evm.fromStringOrThrow
,
            "0x1897a8997241c1cd4bd0698647e4eb7213535c24"->Address.Evm.fromStringOrThrow
,
          ],
          events: [
            (Types.MetaMorphoFactory.CreateMetaMorpho.register() :> Internal.eventConfig),
          ],
          startBlock: None,
        },
        {
          Config.name: "MetaMorpho",
          abi: Types.MetaMorpho.abi,
          addresses: [
          ],
          events: [
            (Types.MetaMorpho.SetCap.register() :> Internal.eventConfig),
            (Types.MetaMorpho.SubmitCap.register() :> Internal.eventConfig),
            (Types.MetaMorpho.RevokePendingCap.register() :> Internal.eventConfig),
            (Types.MetaMorpho.ReallocateSupply.register() :> Internal.eventConfig),
            (Types.MetaMorpho.ReallocateWithdraw.register() :> Internal.eventConfig),
            (Types.MetaMorpho.SetSupplyQueue.register() :> Internal.eventConfig),
            (Types.MetaMorpho.UpdateLastTotalAssets.register() :> Internal.eventConfig),
            (Types.MetaMorpho.SetFee.register() :> Internal.eventConfig),
            (Types.MetaMorpho.Deposit.register() :> Internal.eventConfig),
            (Types.MetaMorpho.Withdraw.register() :> Internal.eventConfig),
          ],
          startBlock: None,
        },
      ]
      let chain = ChainMap.Chain.makeUnsafe(~chainId=1)
      {
        Config.maxReorgDepth: 200,
        startBlock: 18900000,
        id: 1,
        contracts,
        sources: NetworkSources.evm(~chain, ~contracts=[{name: "MetaMorphoFactory",events: [Types.MetaMorphoFactory.CreateMetaMorpho.register()],abi: Types.MetaMorphoFactory.abi}, {name: "MetaMorpho",events: [Types.MetaMorpho.SetCap.register(), Types.MetaMorpho.SubmitCap.register(), Types.MetaMorpho.RevokePendingCap.register(), Types.MetaMorpho.ReallocateSupply.register(), Types.MetaMorpho.ReallocateWithdraw.register(), Types.MetaMorpho.SetSupplyQueue.register(), Types.MetaMorpho.UpdateLastTotalAssets.register(), Types.MetaMorpho.SetFee.register(), Types.MetaMorpho.Deposit.register(), Types.MetaMorpho.Withdraw.register()],abi: Types.MetaMorpho.abi}], ~hyperSync=Some("https://1.hypersync.xyz"), ~allEventSignatures=[Types.MetaMorphoFactory.eventSignatures, Types.MetaMorpho.eventSignatures]->Belt.Array.concatMany, ~shouldUseHypersyncClientDecoder=true, ~rpcs=[], ~lowercaseAddresses=false)
      }
    },
    {
      let contracts = [
        {
          Config.name: "MetaMorphoFactory",
          abi: Types.MetaMorphoFactory.abi,
          addresses: [
            "0xa9c3d3a366466fa809d1ae982fb2c46e5fc41101"->Address.Evm.fromStringOrThrow
,
            "0x1897a8997241c1cd4bd0698647e4eb7213535c24"->Address.Evm.fromStringOrThrow
,
          ],
          events: [
            (Types.MetaMorphoFactory.CreateMetaMorpho.register() :> Internal.eventConfig),
          ],
          startBlock: None,
        },
        {
          Config.name: "MetaMorpho",
          abi: Types.MetaMorpho.abi,
          addresses: [
          ],
          events: [
            (Types.MetaMorpho.SetCap.register() :> Internal.eventConfig),
            (Types.MetaMorpho.SubmitCap.register() :> Internal.eventConfig),
            (Types.MetaMorpho.RevokePendingCap.register() :> Internal.eventConfig),
            (Types.MetaMorpho.ReallocateSupply.register() :> Internal.eventConfig),
            (Types.MetaMorpho.ReallocateWithdraw.register() :> Internal.eventConfig),
            (Types.MetaMorpho.SetSupplyQueue.register() :> Internal.eventConfig),
            (Types.MetaMorpho.UpdateLastTotalAssets.register() :> Internal.eventConfig),
            (Types.MetaMorpho.SetFee.register() :> Internal.eventConfig),
            (Types.MetaMorpho.Deposit.register() :> Internal.eventConfig),
            (Types.MetaMorpho.Withdraw.register() :> Internal.eventConfig),
          ],
          startBlock: None,
        },
      ]
      let chain = ChainMap.Chain.makeUnsafe(~chainId=8453)
      {
        Config.maxReorgDepth: 200,
        startBlock: 13977000,
        id: 8453,
        contracts,
        sources: NetworkSources.evm(~chain, ~contracts=[{name: "MetaMorphoFactory",events: [Types.MetaMorphoFactory.CreateMetaMorpho.register()],abi: Types.MetaMorphoFactory.abi}, {name: "MetaMorpho",events: [Types.MetaMorpho.SetCap.register(), Types.MetaMorpho.SubmitCap.register(), Types.MetaMorpho.RevokePendingCap.register(), Types.MetaMorpho.ReallocateSupply.register(), Types.MetaMorpho.ReallocateWithdraw.register(), Types.MetaMorpho.SetSupplyQueue.register(), Types.MetaMorpho.UpdateLastTotalAssets.register(), Types.MetaMorpho.SetFee.register(), Types.MetaMorpho.Deposit.register(), Types.MetaMorpho.Withdraw.register()],abi: Types.MetaMorpho.abi}], ~hyperSync=Some("https://8453.hypersync.xyz"), ~allEventSignatures=[Types.MetaMorphoFactory.eventSignatures, Types.MetaMorpho.eventSignatures]->Belt.Array.concatMany, ~shouldUseHypersyncClientDecoder=true, ~rpcs=[], ~lowercaseAddresses=false)
      }
    },
  ]

  Config.make(
    ~shouldRollbackOnReorg=true,
    ~shouldSaveFullHistory=false,
    ~multichain=if (
      Env.Configurable.isUnorderedMultichainMode->Belt.Option.getWithDefault(
        Env.Configurable.unstable__temp_unordered_head_mode->Belt.Option.getWithDefault(
          false,
        ),
      )
    ) {
      Unordered
    } else {
      Ordered
    },
    ~chains,
    ~enableRawEvents=false,
    ~batchSize=?Env.batchSize,
    ~preloadHandlers=false,
    ~lowercaseAddresses=false,
    ~shouldUseHypersyncClientDecoder=true,
  )
}

let configWithoutRegistrations = makeGeneratedConfig()

let registerAllHandlers = () => {
  EventRegister.startRegistration(
    ~ecosystem=configWithoutRegistrations.ecosystem,
    ~multichain=configWithoutRegistrations.multichain,
    ~preloadHandlers=configWithoutRegistrations.preloadHandlers,
  )

  registerContractHandlers(
    ~contractName="MetaMorpho",
    ~handlerPathRelativeToRoot="src/EventHandlers.ts",
    ~handlerPathRelativeToConfig="src/EventHandlers.ts",
  )
  registerContractHandlers(
    ~contractName="MetaMorphoFactory",
    ~handlerPathRelativeToRoot="src/EventHandlers.ts",
    ~handlerPathRelativeToConfig="src/EventHandlers.ts",
  )

  EventRegister.finishRegistration()
}

let initialSql = Db.makeClient()
let storagePgSchema = Env.Db.publicSchema
let makeStorage = (~sql, ~pgSchema=storagePgSchema, ~isHasuraEnabled=Env.Hasura.enabled) => {
  PgStorage.make(
    ~sql,
    ~pgSchema,
    ~pgHost=Env.Db.host,
    ~pgUser=Env.Db.user,
    ~pgPort=Env.Db.port,
    ~pgDatabase=Env.Db.database,
    ~pgPassword=Env.Db.password,
    ~onInitialize=?{
      if isHasuraEnabled {
        Some(
          () => {
            Hasura.trackDatabase(
              ~endpoint=Env.Hasura.graphqlEndpoint,
              ~auth={
                role: Env.Hasura.role,
                secret: Env.Hasura.secret,
              },
              ~pgSchema=storagePgSchema,
              ~userEntities=Entities.userEntities,
              ~responseLimit=Env.Hasura.responseLimit,
              ~schema=Db.schema,
              ~aggregateEntities=Env.Hasura.aggregateEntities,
            )->Promise.catch(err => {
              Logging.errorWithExn(
                err->Utils.prettifyExn,
                `EE803: Error tracking tables`,
              )->Promise.resolve
            })
          },
        )
      } else {
        None
      }
    },
    ~onNewTables=?{
      if isHasuraEnabled {
        Some(
          (~tableNames) => {
            Hasura.trackTables(
              ~endpoint=Env.Hasura.graphqlEndpoint,
              ~auth={
                role: Env.Hasura.role,
                secret: Env.Hasura.secret,
              },
              ~pgSchema=storagePgSchema,
              ~tableNames,
            )->Promise.catch(err => {
              Logging.errorWithExn(
                err->Utils.prettifyExn,
                `EE804: Error tracking new tables`,
              )->Promise.resolve
            })
          },
        )
      } else {
        None
      }
    },
    ~isHasuraEnabled,
  )
}

let codegenPersistence = Persistence.make(
  ~userEntities=Entities.userEntities,
  ~allEnums=Enums.allEnums,
  ~storage=makeStorage(~sql=initialSql),
  ~sql=initialSql,
)

%%private(let indexer: ref<option<Indexer.t>> = ref(None))
let getIndexer = () => {
  switch indexer.contents {
  | Some(indexer) => indexer
  | None =>
    let i = {
      Indexer.registrations: registerAllHandlers(),
      // Need to recreate initial config one more time,
      // since configWithoutRegistrations called register for event
      // before they were ready
      config: makeGeneratedConfig(),
      persistence: codegenPersistence,
    }
    indexer := Some(i)
    i
  }
}
