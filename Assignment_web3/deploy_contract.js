var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/9b02a81a69074206bd1e97a7b834b0a2')

const account1 = '0x9b64Ec623E24d67dB5C5a38AE93BE98a873bD731' // account address 1

const privateKey1 = Buffer.from('privatekey', 'hex')

// Deploy the contract
web3.eth.getTransactionCount(account1, (err, txCount) => {
  const data = '0x608060405234801561001057600080fd5b5061020e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063653721471461003b578063771602f714610059575b600080fd5b610043610089565b6040516100509190610112565b60405180910390f35b610073600480360381019061006e91906100c3565b61008f565b6040516100809190610112565b60405180910390f35b60005481565b6000818361009d919061012d565b600081905550600054905092915050565b6000813590506100bd816101c1565b92915050565b600080604083850312156100da576100d96101bc565b5b60006100e8858286016100ae565b92505060206100f9858286016100ae565b9150509250929050565b61010c81610183565b82525050565b60006020820190506101276000830184610103565b92915050565b600061013882610183565b915061014383610183565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156101785761017761018d565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600080fd5b6101ca81610183565b81146101d557600080fd5b5056fea2646970667358221220d58eba4e846a3d460efa555156c43328ac4e72fcc7d24e29179da722121b385864736f6c63430008070033'
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    data: data
  }

  const tx = new Tx(txObject, {chain:'ropsten', hardfork: 'petersburg'})
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
    // Use this txHash to find the contract on Etherscan!
  })
})
