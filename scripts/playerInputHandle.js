const playerMethods = {
  selectingCardInHand: (position) => {
    if(player.canClick == false) return
    player.preparingToSummon[0] = position
  },
  selectingPositionInField: (position) => {
    if(player.preparingToSummon[0] != null) player.preparingToSummon[1] = position
  },
  checkIfIsSummoning: () => {
    if(player.preparingToSummon[0] == null || player.preparingToSummon[1] == null) return
    genericGameFunctions.summon(player, player.preparingToSummon[0], player.preparingToSummon[1])
    player.preparingToSummon[0] = null
    player.preparingToSummon[1] = null
  }
}