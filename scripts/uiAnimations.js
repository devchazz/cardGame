const uiAnimations = {
  //Use to finish the game:
  warnPlayer: message => {
    let permamentMessageContainer = document.getElementById('permanenetMessageContainer')
    let permamentMessage = document.getElementById('permanentWarning')
    let button1 = document.getElementById('afterMatchOption1')
    let button2 = document.getElementById('afterMatchOption2')
    permamentMessage.textContent = message

    switch (message) {
      case 'The match tied':
      case 'Your opponent won the match':
        button1.innerText = 'Try Again'
        button2.innerText = 'Go back to the menu'
        break;
      case 'You won the match':
        button1.innerText = 'Play it agaian'
        button2.innerText = 'Go back to the menu'
        break
      default:
        break;
    }

    permamentMessageContainer.style.display = 'flex'
  },
  battle: (attacker, index) => {
    let playerCardInAtackPosition = document.getElementById(`playerCardInField${index}`)
    let enemyCardInAtackPosition = document.getElementById(`enemyCardInField${index}`)
    if(attacker.name == 'enemy'){
      if(enemy.field[index] == 'blank') return
      if(enemy.field[index].type != 'unit') return
      setTimeout(() => {
        if(index == 0) document.getElementById(`enemyCardInField0`).style.border = 'red 2px solid'
        enemyCardInAtackPosition.style.border = 'red 2px solid'
        if(index == 0) document.getElementById(`enemyCardInField0`).style.marginTop = '80px'
        enemyCardInAtackPosition.style.marginTop = '80px'
      }, 350)
      setTimeout(() => {
        if(index == 0) document.getElementById(`enemyCardInField0`).style.marginTop = '5px'
        if(index == 0) document.getElementById(`enemyCardInField0`).style.border = 'white 2px solid'
        enemyCardInAtackPosition.style.marginTop = '5px'
        enemyCardInAtackPosition.style.border = 'white 2px solid'
      }, 700);
    }
    if(attacker.name == 'player'){
      if(player.field[index] == 'blank') return
      if(player.field[index].type != 'unit') return
      setTimeout(() => {
        if(index == 0) document.getElementById(`playerCardInField0`).style.border = 'red 2px solid'
        playerCardInAtackPosition.style.border = 'red 2px solid'
        if(index == 0) document.getElementById(`playerCardInField0`).style.marginBottom = '80px'
        playerCardInAtackPosition.style.marginBottom = '80px'
      }, 400)
      setTimeout(() => {
        if(index == 0) document.getElementById(`playerCardInField0`).style.marginBottom = '5px'
        if(index == 0) document.getElementById(`playerCardInField0`).style.border = 'white 2px solid'
        playerCardInAtackPosition.style.marginBottom = '5px'
        playerCardInAtackPosition.style.border = 'white 2px solid'
        refreshUi()
      }, 800);
    }
  },
  killUnit(target, position){ //NOT WORKING YET
    let playerCardSelected = document.getElementById(`playerCardInField${position}`)
    let enemyCardSelected = document.getElementById(`enemyCardInField${position}`)

    if(target == player){
      playerCardSelected.style.backgroundColor = 'white'
    }
    if(target == enemy){
      enemyCardSelected.style.backgroundColor = 'white'
    }
  },
  effect: (index) => {
    let playerCardSelected = document.getElementById(`playerCardInField${index}`)
    let enemyCardSelected = document.getElementById(`enemyCardInField${index}`)
    
    if(player.field[index] != 'blank'){
      playerCardSelected.style.border = '2px '+ uiAnimations.checkColorEffect(player.field[index].effect) + ' solid'
    }else{  
      playerCardSelected.style.border = '2px blue solid'
    }

    if(enemy.field[index] != 'blank'){
      enemyCardSelected.style.border = '2px '+ uiAnimations.checkColorEffect(enemy.field[index].effect) + ' solid'
    }else{      
      enemyCardSelected.style.border = '2px blue solid'
    }
  }
}
