const makeNameUrlFriendly = (pledgeName) => {
  let pledgeWithoutCommas = pledgeName.replace(/\,/g, "")
  return pledgeWithoutCommas.replace(/\./g, "").toLowerCase().split(' ').join('-');
}
export default makeNameUrlFriendly;