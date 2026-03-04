/***** TAKE NOTE ******
This is a hack to get genType to work!

In order for genType to produce recursive types, it needs to be at the 
root module of a file. If it's defined in a nested module it does not 
work. So all the MockDb types and internal functions are defined in TestHelpers_MockDb
and only public functions are recreated and exported from this module.

the following module:
```rescript
module MyModule = {
  @genType
  type rec a = {fieldB: b}
  @genType and b = {fieldA: a}
}
```

produces the following in ts:
```ts
// tslint:disable-next-line:interface-over-type-literal
export type MyModule_a = { readonly fieldB: b };

// tslint:disable-next-line:interface-over-type-literal
export type MyModule_b = { readonly fieldA: MyModule_a };
```

fieldB references type b which doesn't exist because it's defined
as MyModule_b
*/

module MockDb = {
  @genType
  let createMockDb = TestHelpers_MockDb.createMockDb
}

@genType
module Addresses = {
  include TestHelpers_MockAddresses
}

module EventFunctions = {
  //Note these are made into a record to make operate in the same way
  //for Res, JS and TS.

  /**
  The arguements that get passed to a "processEvent" helper function
  */
  @genType
  type eventProcessorArgs<'event> = {
    event: 'event,
    mockDb: TestHelpers_MockDb.t,
    @deprecated("Set the chainId for the event instead")
    chainId?: int,
  }

  @genType
  type eventProcessor<'event> = eventProcessorArgs<'event> => promise<TestHelpers_MockDb.t>

  /**
  A function composer to help create individual processEvent functions
  */
  let makeEventProcessor = (~register) => args => {
    let {event, mockDb, ?chainId} =
      args->(Utils.magic: eventProcessorArgs<'event> => eventProcessorArgs<Internal.event>)

    // Have the line here, just in case the function is called with
    // a manually created event. We don't want to break the existing tests here.
    let _ =
      TestHelpers_MockDb.mockEventRegisters->Utils.WeakMap.set(event, register)
    TestHelpers_MockDb.makeProcessEvents(mockDb, ~chainId=?chainId)([event->(Utils.magic: Internal.event => Types.eventLog<unknown>)])
  }

  module MockBlock = {
    @genType
    type t = {
      hash?: string,
      number?: int,
      timestamp?: int,
    }

    let toBlock = (_mock: t) => {
      hash: _mock.hash->Belt.Option.getWithDefault("foo"),
      number: _mock.number->Belt.Option.getWithDefault(0),
      timestamp: _mock.timestamp->Belt.Option.getWithDefault(0),
    }->(Utils.magic: Types.AggregatedBlock.t => Internal.eventBlock)
  }

  module MockTransaction = {
    @genType
    type t = {
      hash?: string,
    }

    let toTransaction = (_mock: t) => {
      hash: _mock.hash->Belt.Option.getWithDefault("foo"),
    }->(Utils.magic: Types.AggregatedTransaction.t => Internal.eventTransaction)
  }

  @genType
  type mockEventData = {
    chainId?: int,
    srcAddress?: Address.t,
    logIndex?: int,
    block?: MockBlock.t,
    transaction?: MockTransaction.t,
  }

  /**
  Applies optional paramters with defaults for all common eventLog field
  */
  let makeEventMocker = (
    ~params: Internal.eventParams,
    ~mockEventData: option<mockEventData>,
    ~register: unit => Internal.eventConfig,
  ): Internal.event => {
    let {?block, ?transaction, ?srcAddress, ?chainId, ?logIndex} =
      mockEventData->Belt.Option.getWithDefault({})
    let block = block->Belt.Option.getWithDefault({})->MockBlock.toBlock
    let transaction = transaction->Belt.Option.getWithDefault({})->MockTransaction.toTransaction
    let event: Internal.event = {
      params,
      transaction,
      chainId: switch chainId {
      | Some(chainId) => chainId
      | None =>
        switch Generated.configWithoutRegistrations.defaultChain {
        | Some(chainConfig) => chainConfig.id
        | None =>
          Js.Exn.raiseError(
            "No default chain Id found, please add at least 1 chain to your config.yaml",
          )
        }
      },
      block,
      srcAddress: srcAddress->Belt.Option.getWithDefault(Addresses.defaultAddress),
      logIndex: logIndex->Belt.Option.getWithDefault(0),
    }
    // Since currently it's not possible to figure out the event config from the event
    // we store a reference to the register function by event in a weak map
    let _ = TestHelpers_MockDb.mockEventRegisters->Utils.WeakMap.set(event, register)
    event
  }
}


module MetaMorpho = {
  module SetCap = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorpho.SetCap.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorpho.SetCap.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("caller")
      caller?: Address.t,
      @as("id")
      id?: string,
      @as("cap")
      cap?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?caller,
        ?id,
        ?cap,
        ?mockEventData,
      } = args

      let params = 
      {
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       id: id->Belt.Option.getWithDefault("foo"),
       cap: cap->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.MetaMorpho.SetCap.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorpho.SetCap.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorpho.SetCap.event)
    }
  }

  module SubmitCap = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorpho.SubmitCap.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorpho.SubmitCap.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("caller")
      caller?: Address.t,
      @as("id")
      id?: string,
      @as("cap")
      cap?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?caller,
        ?id,
        ?cap,
        ?mockEventData,
      } = args

      let params = 
      {
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       id: id->Belt.Option.getWithDefault("foo"),
       cap: cap->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.MetaMorpho.SubmitCap.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorpho.SubmitCap.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorpho.SubmitCap.event)
    }
  }

  module RevokePendingCap = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorpho.RevokePendingCap.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorpho.RevokePendingCap.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("caller")
      caller?: Address.t,
      @as("id")
      id?: string,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?caller,
        ?id,
        ?mockEventData,
      } = args

      let params = 
      {
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       id: id->Belt.Option.getWithDefault("foo"),
      }
->(Utils.magic: Types.MetaMorpho.RevokePendingCap.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorpho.RevokePendingCap.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorpho.RevokePendingCap.event)
    }
  }

  module ReallocateSupply = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorpho.ReallocateSupply.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorpho.ReallocateSupply.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("caller")
      caller?: Address.t,
      @as("id")
      id?: string,
      @as("suppliedAssets")
      suppliedAssets?: bigint,
      @as("suppliedShares")
      suppliedShares?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?caller,
        ?id,
        ?suppliedAssets,
        ?suppliedShares,
        ?mockEventData,
      } = args

      let params = 
      {
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       id: id->Belt.Option.getWithDefault("foo"),
       suppliedAssets: suppliedAssets->Belt.Option.getWithDefault(0n),
       suppliedShares: suppliedShares->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.MetaMorpho.ReallocateSupply.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorpho.ReallocateSupply.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorpho.ReallocateSupply.event)
    }
  }

  module ReallocateWithdraw = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorpho.ReallocateWithdraw.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorpho.ReallocateWithdraw.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("caller")
      caller?: Address.t,
      @as("id")
      id?: string,
      @as("withdrawnAssets")
      withdrawnAssets?: bigint,
      @as("withdrawnShares")
      withdrawnShares?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?caller,
        ?id,
        ?withdrawnAssets,
        ?withdrawnShares,
        ?mockEventData,
      } = args

      let params = 
      {
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       id: id->Belt.Option.getWithDefault("foo"),
       withdrawnAssets: withdrawnAssets->Belt.Option.getWithDefault(0n),
       withdrawnShares: withdrawnShares->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.MetaMorpho.ReallocateWithdraw.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorpho.ReallocateWithdraw.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorpho.ReallocateWithdraw.event)
    }
  }

  module SetSupplyQueue = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorpho.SetSupplyQueue.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorpho.SetSupplyQueue.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("caller")
      caller?: Address.t,
      @as("newSupplyQueue")
      newSupplyQueue?: array<string>,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?caller,
        ?newSupplyQueue,
        ?mockEventData,
      } = args

      let params = 
      {
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newSupplyQueue: newSupplyQueue->Belt.Option.getWithDefault([]),
      }
->(Utils.magic: Types.MetaMorpho.SetSupplyQueue.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorpho.SetSupplyQueue.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorpho.SetSupplyQueue.event)
    }
  }

  module UpdateLastTotalAssets = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorpho.UpdateLastTotalAssets.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorpho.UpdateLastTotalAssets.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("updatedTotalAssets")
      updatedTotalAssets?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?updatedTotalAssets,
        ?mockEventData,
      } = args

      let params = 
      {
       updatedTotalAssets: updatedTotalAssets->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.MetaMorpho.UpdateLastTotalAssets.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorpho.UpdateLastTotalAssets.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorpho.UpdateLastTotalAssets.event)
    }
  }

  module SetFee = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorpho.SetFee.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorpho.SetFee.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("caller")
      caller?: Address.t,
      @as("newFee")
      newFee?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?caller,
        ?newFee,
        ?mockEventData,
      } = args

      let params = 
      {
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newFee: newFee->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.MetaMorpho.SetFee.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorpho.SetFee.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorpho.SetFee.event)
    }
  }

  module Deposit = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorpho.Deposit.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorpho.Deposit.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("sender")
      sender?: Address.t,
      @as("owner")
      owner?: Address.t,
      @as("assets")
      assets?: bigint,
      @as("shares")
      shares?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?sender,
        ?owner,
        ?assets,
        ?shares,
        ?mockEventData,
      } = args

      let params = 
      {
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       assets: assets->Belt.Option.getWithDefault(0n),
       shares: shares->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.MetaMorpho.Deposit.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorpho.Deposit.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorpho.Deposit.event)
    }
  }

  module Withdraw = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorpho.Withdraw.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorpho.Withdraw.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("sender")
      sender?: Address.t,
      @as("receiver")
      receiver?: Address.t,
      @as("owner")
      owner?: Address.t,
      @as("assets")
      assets?: bigint,
      @as("shares")
      shares?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?sender,
        ?receiver,
        ?owner,
        ?assets,
        ?shares,
        ?mockEventData,
      } = args

      let params = 
      {
       sender: sender->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       receiver: receiver->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       owner: owner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       assets: assets->Belt.Option.getWithDefault(0n),
       shares: shares->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.MetaMorpho.Withdraw.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorpho.Withdraw.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorpho.Withdraw.event)
    }
  }

}


module MetaMorphoFactory = {
  module CreateMetaMorpho = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.MetaMorphoFactory.CreateMetaMorpho.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.MetaMorphoFactory.CreateMetaMorpho.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("metaMorpho")
      metaMorpho?: Address.t,
      @as("caller")
      caller?: Address.t,
      @as("initialOwner")
      initialOwner?: Address.t,
      @as("initialTimelock")
      initialTimelock?: bigint,
      @as("asset")
      asset?: Address.t,
      @as("name")
      name?: string,
      @as("symbol")
      symbol?: string,
      @as("salt")
      salt?: string,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?metaMorpho,
        ?caller,
        ?initialOwner,
        ?initialTimelock,
        ?asset,
        ?name,
        ?symbol,
        ?salt,
        ?mockEventData,
      } = args

      let params = 
      {
       metaMorpho: metaMorpho->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       caller: caller->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       initialOwner: initialOwner->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       initialTimelock: initialTimelock->Belt.Option.getWithDefault(0n),
       asset: asset->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       name: name->Belt.Option.getWithDefault("foo"),
       symbol: symbol->Belt.Option.getWithDefault("foo"),
       salt: salt->Belt.Option.getWithDefault("foo"),
      }
->(Utils.magic: Types.MetaMorphoFactory.CreateMetaMorpho.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.MetaMorphoFactory.CreateMetaMorpho.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.MetaMorphoFactory.CreateMetaMorpho.event)
    }
  }

}

