const calculateGasPrice = async (web3) => {
  const defaultGasPrice = 42000000000;
  let ourGasPrice;
  console.log(web3.eth)
  // Get and set current gas price to ensure reasonable transaction time
  const currentGasPrice = await web3.eth.getGasPrice();
  console.log(currentGasPrice)
  if (currentGasPrice > defaultGasPrice ) {
    ourGasPrice = currentGasPrice
  } else {
    ourGasPrice = defaultGasPrice
  }
  return ourGasPrice
}

export default calculateGasPrice;