  @genType
module MetaMorpho = {
  module SetCap = Types.MakeRegister(Types.MetaMorpho.SetCap)
  module SubmitCap = Types.MakeRegister(Types.MetaMorpho.SubmitCap)
  module RevokePendingCap = Types.MakeRegister(Types.MetaMorpho.RevokePendingCap)
  module ReallocateSupply = Types.MakeRegister(Types.MetaMorpho.ReallocateSupply)
  module ReallocateWithdraw = Types.MakeRegister(Types.MetaMorpho.ReallocateWithdraw)
  module SetSupplyQueue = Types.MakeRegister(Types.MetaMorpho.SetSupplyQueue)
  module UpdateLastTotalAssets = Types.MakeRegister(Types.MetaMorpho.UpdateLastTotalAssets)
  module SetFee = Types.MakeRegister(Types.MetaMorpho.SetFee)
  module Deposit = Types.MakeRegister(Types.MetaMorpho.Deposit)
  module Withdraw = Types.MakeRegister(Types.MetaMorpho.Withdraw)
}

  @genType
module MetaMorphoFactory = {
  module CreateMetaMorpho = Types.MakeRegister(Types.MetaMorphoFactory.CreateMetaMorpho)
}

@genType /** Register a Block Handler. It'll be called for every block by default. */
let onBlock: (
  Envio.onBlockOptions<Types.chain>,
  Envio.onBlockArgs<Types.handlerContext> => promise<unit>,
) => unit = (
  EventRegister.onBlock: (unknown, Internal.onBlockArgs => promise<unit>) => unit
)->Utils.magic
