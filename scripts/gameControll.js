/* 
  Here the game sequence of action is defined and controlled.
  The setupGame function starts the game and is triggered on the playerInputHandle.js. 
*/

game = {
	running: true,
	turnToPlay: '',
  battlePhase: false,
  effectsPhase: false,
  summonsRemaining: 0,
  spellsRemaining: 0,
	turnNumber: 0,
}

const gameControl = {
	setupGame: () => {
    game.running = true
    player.life = 30
    enemy.life = 30
		genericGameFunctions.shuffle(enemy.deck)
		genericGameFunctions.shuffle(player.deck)
    genericGameFunctions.draw(player, 2)
    genericGameFunctions.draw(enemy, 2)
    setTimeout(() => {
      genericGameFunctions.draw(player, 1)
      genericGameFunctions.draw(enemy, 1)
    }, 1000)
    refreshUi()
    setTimeout(() => {
      gameControl.startPlayerTurn()
    }, 2000)
	},
  startPlayerTurn: () => {
    game.turnToPlay = 'player'
    genericGameFunctions.draw(player, 1)
    let endTurnContainer = document.getElementById('endTurnContainer')
    endTurnContainer.style.display = 'block'
    game.summonsRemaining = 1
    game.spellsRemaining = 1
    player.canClick = true
  },
  startEnemyTurn: () => {
    game.turnToPlay = 'enemy'
    genericGameFunctions.draw(enemy, 1)
    player.canClick = false
    game.summonsRemaining = 1
    game.spellsRemaining = 1
    aiMethods.manageTurn()
  },
  startNextTurn: () => {
    if(gameControl.checkIfThereIsWinner()) return
    game.turnNumber ++
    if(game.turnToPlay == 'enemy'){
      gameControl.startPlayerTurn()
      return
    }
    if(game.turnToPlay == 'player'){
      gameControl.startEnemyTurn()
      return
    } 
  },
  endTurn: () => {
    let attacker, target
    let endTurnContainer = document.getElementById('endTurnContainer')
    endTurnContainer.style.display = 'none'
    if(game.turnToPlay == 'player'){
      attacker = player
      target = enemy
    } 
    if(game.turnToPlay == 'enemy'){
      attacker = enemy
      target = player
    } 
    gameControl.startBattlePhase(attacker, target, 0)
    console.log(`Strating battle Phase, ${target.name} being attacked.`)
  },
  startBattlePhase: (attacker, target, count) => {
    if(game.turnNumber == 0) {
      gameControl.startNextTurn()
      return
    }
    if(count < 5){
      game.battlePhase = true
      uiAnimations.battle(attacker, count)
      setTimeout( () => {
      if(attacker.field[count] != 'blank'){
        if(target.field[count] != 'blank') gameControl.fight(target, attacker, count)
        else gameControl.directAtack(target, attacker, count)
      }
          count++
          gameControl.startBattlePhase(attacker, target, count)
      }, 800)
    }else{
      setTimeout(
        () => {
          gameControl.startNextTurn()
          game.battlePhase = false
          return
        }
      , 4000)
    }
  },
  fight: (target, attacker, index) => {
    if(attacker.field[index].atk < target.field[index].def){
      genericGameFunctions.dealDamage(attacker, 2)
      return
    } 
    if(attacker.field[index].atk > target.field[index].def){
      genericGameFunctions.killUnit(target, index)
    }
  },
  directAtack: (target, attacker, index) => {
    genericGameFunctions.dealDamage(target, attacker.field[index].atk)
  },
  checkIfThereIsWinner: () => {
    if(player.life <= 0 && enemy.life <= 0) gameControl.finishGame()
    if(player.life <= 0 && enemy.life > 0) gameControl.finishGame('enemy')
    if(player.life > 0 && enemy.life <= 0) gameControl.finishGame('player')
    
    if(player.life <= 0 || enemy.life <= 0) return true
    else return false
  },
  finishGame(winner){
    game.running = false
    player.canClick = false
    if(!winner) uiAnimations.warnPlayer('The match tied')
    if(winner == 'enemy') uiAnimations.warnPlayer('Your opponent won the match')
    if(winner == 'player') uiAnimations.warnPlayer('You won the match')
  }
}
