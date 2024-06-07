const cardEffects = {
  handlingEffect: (effect, target, index) => {
    switch (effect) {
      //UNIT ONES:
      case 'heal':
        cardEffects.heal(target)
        break
      case 'poison':
        cardEffects.poison(target, index)
        break
      case 'call':
        cardEffects.call(target, index)
        break
      case 'frost':
        cardEffects.frost(target, index)
        break
      case 'burn':
        cardEffects.burn(target)
        break
      
      //SPECIAL UNITS:
      //Plants:
      case 'createPinkPlant':
        cardEffects.createPinkPlant(target, index)
        break
      //Soldiers:
      case 'elfArcher':
        cardEffects.elfArcher(target)
        break
      //Nightmare:
      case 'timeTerrorBunny':
        cardEffects.timeTerrorBunny(target, index)
        break
      case 'cursedGirl':
        cardEffects.cursedGirl(target)
        break
      case 'sadGhost':
        cardEffects.sadGhost(target, index)
        break
      //Wizzard:
      case 'blueWizzard':
        cardEffects.blueWizzard(target)
        break

      //SPELL ONES:
      case 'blueFlowerShield':
        cardEffects.blueFlowerShield(target)
        break
      case 'bloodMoonDance':
        cardEffects.bloodMoonDance(target)
        break
      case 'explosion':
        cardEffects.explosion(target, index)
        break
      case 'infestation':
        cardEffects.infestation(target)
        break
      case 'theBigTree':
        cardEffects.theBigTree(target)
        break
      case 'portal':
        cardEffects.portal(target)
        break
      default:
        console.log('Effect not founded.')
        break
    }
  },

  //UNITS:
  //BASIC:
  heal: (target) => genericGameFunctions.heal(target, 3),
  poison: (target, index) => {
    if(target == player && enemy.field[index] != 'blank'){
      if(enemy.field[index].effect != 'imune') enemy.field[index].def = 0
    }
    if(target == enemy && player.field[index] != 'blank'){
      if(player.field[index].effect != 'imune') player.field[index].def = 0
    }
  },
  frost: (target, index) => {
    if(target == player && enemy.field[index] != 'blank'){
      if(enemy.field[index].effect != 'imune') enemy.field[index].atk = 0
    } 
    if(target == enemy && player.field[index] != 'blank'){
      if(player.field[index].effect != 'imune') player.field[index].atk = 0
    }  
  },
  call: (target, index) => {
    let monsterCalling = target.field[index]
    let monsterCalled = target.deck.filter(e => e.id == monsterCalling.id)
    let bestPlaceToGo = null
    for(i=0; i<5; i++) if(target.field[i] == 'blank') bestPlaceToGo = i
    if(bestPlaceToGo != null && monsterCalled[0]){
      genericGameFunctions.summonFromDeck(target, monsterCalling.id, bestPlaceToGo)
    }
  },
  burn: (target) => {
    if(target == enemy)  genericGameFunctions.dealDamage(player, 3)
    if(target == player) genericGameFunctions.dealDamage(enemy, 3)
  },

  //SPECIFICS:
  elfArcher: (target) => {
    let totalCards = 0
    for(i=0; i<5; i++){
      if(target.field[i] != 'blank') totalCards++
    }
    if(target == enemy)  genericGameFunctions.dealDamage(player, totalCards)
    if(target == player) genericGameFunctions.dealDamage(enemy, totalCards)
  },
  timeTerrorBunny: (target, index) => {
    let numberOfUnitsDead = 0
    target.discartPile.forEach(e => {
      if(e.type == 'unit') numberOfUnitsDead++ 
    })
    target.field[index].atk += numberOfUnitsDead
    target.field[index].def += numberOfUnitsDead
  },
  cursedGirl: (target) => {
    let deadCardToTake = null
    for(i=0; i<target.discartPile.length; i++){
      if(target.discartPile[i].type == 'unit'){
        if(deadCardToTake == null) {
          deadCardToTake = target.discartPile[i]
        }else{
          if(target.discartPile[i].def < deadCardToTake.def){
            deadCardToTake = target.discartPile[i]
          }
        }
      } 
    }

    if(deadCardToTake == null) return
    genericGameFunctions.createCardInHand(target, deadCardToTake.id)
  },
  blueWizzard: (target) => {
    
  },
  createPinkPlant: (target) => {
    let freeSpace = genericGameFunctions.findFreeSpaceOnTheField(target)
    if(freeSpace != null) genericGameFunctions.specialSummon(target, 2, freeSpace)
  },
  sadGhost: (target, index) => {
    let numerOfGhosts = 0
    target.discartPile.push(Object.assign({}, cards[13]))

    for(i=0; i<target.discartPile.length; i++){
      if(target.discartPile[i].id == 13) numerOfGhosts++
    }

    target.field[index].atk += numerOfGhosts
  },
  
  //SPELL ONES:
  theBigTree: (target) => {
    for(let i=0; i<target.deck.length; i++){
      if(target.deck[i].name.includes('Plant')){
        target.deck[i].atk += 1
        target.deck[i].def += 1
      }
    }
    for(let i=0; i<target.hand.length; i++){
      if(target.hand[i].name.includes('Plant')){
        target.hand[i].atk += 1
        target.hand[i].def += 1
      }
    }
    for(let i=0; i<target.field.length; i++){
      if(target.field[i] != 'blank'){
        if(target.field[i].name.includes('Plant')){
          target.field[i].atk += 2
          target.field[i].def += 2
        }
      }
    }
  },
  portal: (target) => {
    let weakCard = null
    let bestPosition = genericGameFunctions.findFreeSpaceOnTheField(target)
    if(bestPosition == null) return
    if(!target.deck[0]) return
    for(i=0; i<target.deck.length ; i++){
      if(target.deck[i].type == 'unit'){
        if(weakCard == null) weakCard = target.deck[i]
        else if(target.deck[i].def < weakCard.def) weakCard = target.deck[i]
      }  
    }
    if(weakCard == null) return
    genericGameFunctions.summonFromDeck(target, weakCard.id, bestPosition)
  },
  blueFlowerShield: (target) => {
    genericGameFunctions.heal(target, 4)
    genericGameFunctions.draw(target, 1)
  },
  bloodMoonDance: (target) => {
    if(target.life > 2) genericGameFunctions.dealDamage(target, 2)
    else target.life = 1

    let bestPosition = genericGameFunctions.findFreeSpaceOnTheField(target)
    let deadCardToSummon = null
    for(i=0; i<target.discartPile.length; i++){
      if(target.discartPile[i].type == 'unit') deadCardToSummon = target.discartPile[i]
    }

    if(deadCardToSummon == null || bestPosition == null) return

    genericGameFunctions.specialSummon(target, deadCardToSummon.id, bestPosition)
  },
  explosion: (target, index) => {
    if(target == enemy)  genericGameFunctions.killUnit(player, index)
    if(target == player) genericGameFunctions.killUnit(enemy, index)
  },
  infestation: (target) => {
    if(target == enemy){
      player.deck.unshift(new Card(8, 'Parasite', 'unit', './cardsImg/parasite.png', 3, 3, null))
    }
    if(target == player){
      enemy.deck.unshift(new Card(8, 'Parasite', 'unit', './cardsImg/parasite.png', 3, 3, null))
    }
  }
}