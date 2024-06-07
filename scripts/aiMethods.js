//ENEMY AI SUMMONING:
const aiMethods = {
  manageTurn: () => {
    console.log(enemy.hand)
    setTimeout(() => {
      aiMethods.summonUnit()
    }, 500)
    setTimeout(() => {
      aiMethods.summonSpell()
    }, 3700)
    setTimeout(() => {
      gameControl.endTurn()
      refreshUi()
    }, 7000)
  },
  summonUnit: () => {
    enemyUnitsInHand = enemy.hand.filter(e => { if(e.type == 'unit') return e })
    bestCard = aiMethods.findBestCardInHand()
    bestSpot = aiMethods.findTheBestSpotInTheField(bestCard)

    if(bestCard == null || bestSpot == null) return
    aiMethods.summonAI(enemy, bestCard, bestSpot)
  },
  summonAI: (target, unitHandPosition, unitSummonPosittion) => {
    target.field[unitSummonPosittion] = target.hand[unitHandPosition]
    target.hand[unitHandPosition] = null 
    target.hand = target.hand.filter(e => {if(e) return e})
    genericGameFunctions.activateEffect(unitSummonPosittion, target)
    game.movesRemaining -= 1
    refreshUi()   
  },
  summonSpell: () => {
    spellInHand = null
    for(i = 0; i<enemy.hand.length; i++){
      if(enemy.hand[i].type == 'spell') spellInHand = i
    }
    if(spellInHand != null){
      aiMethods.summonAI(enemy, spellInHand, aiMethods.findTheBestSpotInTheFieldToSpell())
    } 
  },
  findBestCardInHand: () => {
    let bestCardForNow = null
    for(i=0; i<enemy.hand.length; i++){
      if(enemy.hand[i].type == 'unit'){
        if(bestCardForNow == null){
          bestCardForNow = i
        }else{
          if(enemy.hand[i].atk > enemy.hand[bestCardForNow].atk) bestCardForNow = i
        } 
      }
      i++
    }
    return bestCardForNow
  },
  findTheBestSpotInTheField: (bestCard) => {
    let bestPosition = null
    if(bestCard == null) return
    let blanckSlots = []
    for(i=0; i<5; i++) if(enemy.field[i] == 'blank') blanckSlots.push(i)
    for(i=0; i<blanckSlots.length; i++){
      if(player.field[blanckSlots[i]] != 'blank'){
        if(enemy.hand[bestCard].atk > player.field[blanckSlots[i]].def){
          bestPosition = blanckSlots[i]
          return bestPosition
        } 
      }
    }
    if(blanckSlots[0] != undefined) bestPosition = blanckSlots[0]
    return bestPosition
  },
  findTheBestSpotInTheFieldToSpell: () => {
    let bestPosition = null
    for(i=0; i<5; i++) if(enemy.field[i] == 'blank') bestPosition = i
    if(bestPosition != null) return bestPosition
  }
}