function refreshUi(){
  uiRefreshMethods.refreshTurnShower()
  uiRefreshMethods.refreshLifePoints()
  uiRefreshMethods.refreshCardsInHands()
  uiRefreshMethods.refreshCardsInField()
  uiRefreshMethods.refreshDecks()
  uiRefreshMethods.refreshDiscartPile()
  //Preventing default:
  document.getElementById('body').oncontextmenu = () => {return false}
}

const uiRefreshMethods = {
  //Interface:
  refreshCardsInHands: () => {
    let uiEnemyHand = document.querySelector('#enemyHand')
    let uiPlayerHand = document.querySelector('#playerHand')

    //Cleaning the hand:
    uiEnemyHand.innerHTML = ''
    uiPlayerHand.innerHTML = ''

    //Drawing the new data:
    enemy.hand.forEach(e => {
      let enemyCard = document.createElement('div')
      let enemyCardImage = document.createElement('img')

      uiEnemyHand.appendChild(enemyCard)
      enemyCard.appendChild(enemyCardImage)

      enemyCard.classList.add('enemyCardInHand')
      enemyCardImage.classList.add('cardImg')
      enemyCardImage.src = './cardsImg/backOfTheCards.png'
    })
    player.hand.forEach((e, i) => {
      let playerCard = document.createElement('div')
      let playerCardImage = document.createElement('img')
      let pointsContainer = document.createElement('div')

      playerCard.appendChild(playerCardImage)
      uiPlayerHand.appendChild(playerCard)

      playerCard.classList.add('card')
      playerCardImage.classList.add('cardImg')
      
      playerCardImage.src = e.imgLink
      
      if(e.type == 'unit'){
        let atkPointsContainer = document.createElement('div')
        let defPointsContainer = document.createElement('div')
        let atkPoints = document.createElement('p')
        let defPoints = document.createElement('p')

        atkPoints.textContent = e.atk
        defPoints.textContent = e.def
        
        pointsContainer.appendChild(atkPointsContainer)
        pointsContainer.appendChild(defPointsContainer)
        atkPointsContainer.appendChild(atkPoints)
        defPointsContainer.appendChild(defPoints)
        
        pointsContainer.classList.add('pointsContainer')
        atkPointsContainer.classList.add('atkPointsContainer')
        defPointsContainer.classList.add('defPointsContainer')

        playerCard.appendChild(pointsContainer)
      }
      if(e.type == 'spell'){
        let spellColorContainer = document.createElement('div')

        spellColorContainer.classList.add('spellColorContainer')

        playerCard.appendChild(spellColorContainer )
      }

      if(player.preparingToSummon[0] === i) playerCard.style.border = 'red 2px solid'

      playerCard.onclick = () => {
        playerMethods.selectingCardInHand(i)
        refreshUi()
      }
      playerCard.oncontextmenu = () => {
        cardDetailsUi.showCardDetail(e.id)
      }
    })
  },
  refreshDecks: () => {
    let uiEnemyDeckCount = document.querySelector('#enemyDeckCount')
    let uiPlayerDeckCount = document.querySelector('#playerDeckCount')

    uiEnemyDeckCount.textContent = enemy.deck.length
    uiPlayerDeckCount.textContent = player.deck.length
  },
  refreshTurnShower: () => {
    uiEnemyInterface = document.getElementById('enemyInterface')
    uiPlayerInterface = document.getElementById('playerInterface')
    
    uiEnemyTurnShower = document.getElementById('enemyTurnShower')
    uiPlayerTurnShower = document.getElementById('playerTurnShower')

    if(game.turnToPlay == 'player'){
      uiEnemyTurnShower.src = './uiElements/defenseTurnToken.png'
      uiPlayerTurnShower.src = './uiElements/atackTurnToken.png'
    }else{
      if(game.turnToPlay == 'enemy'){
        uiPlayerTurnShower.src = './uiElements/defenseTurnToken.png'
        uiEnemyTurnShower.src = './uiElements/atackTurnToken.png'
      }
    }
  },

  //Field:
  refreshLifePoints: () => {
    let uiEnemyLife = document.querySelector('#enemyLifePoints')
    let uiPlayerLife = document.querySelector('#playerLifePoints')
    uiEnemyLife.textContent = enemy.life
    uiPlayerLife.textContent = player.life
  },
  refreshCardsInField: () => {
    let uiEnemyField = document.querySelector('#enemyField')
    let uiPlayerField = document.querySelector('#playerField')
    let turnInformationText = document.querySelector('#turnInformationText')

    //Showing who is turn to play
    if(game.turnToPlay == 'player')turnInformationText.textContent = 'Your turn'
    if(game.turnToPlay == 'enemy')turnInformationText.textContent = 'Enemy turn'
    
    //Cleaning the field:
    uiEnemyField.innerHTML = ''
    uiPlayerField.innerHTML = ''

    //Rendering player units
    player.field.forEach((e, i) => {
      let cardInField = document.createElement('div')
      cardInField.id = `playerCardInField${i}`
      cardInField.classList.add('cardInField')
      let cardImage = document.createElement('img')
      let pointsContainer = document.createElement('div')

      if(e.type == 'unit'){
        let atkPointsContainer = document.createElement('div')
        let defPointsContainer = document.createElement('div')
        let atkPoints = document.createElement('p')
        let defPoints = document.createElement('p')

        atkPoints.textContent = e.atk
        defPoints.textContent = e.def
        
        pointsContainer.appendChild(atkPointsContainer)
        pointsContainer.appendChild(defPointsContainer)
        atkPointsContainer.appendChild(atkPoints)
        defPointsContainer.appendChild(defPoints)
        
        pointsContainer.classList.add('pointsContainer')
        atkPointsContainer.classList.add('atkPointsContainer')
        defPointsContainer.classList.add('defPointsContainer')

        cardInField.appendChild(pointsContainer)
      }
      if(e.type == 'spell'){
        let spellColorContainer = document.createElement('div')

        spellColorContainer.classList.add('spellColorContainer')

        cardInField.appendChild(spellColorContainer )
      }

      if(e == 'blank') cardImage.src = './cardsImg/blankCard.png' 
      else cardImage.src = e.imgLink

      cardInField.appendChild(cardImage)
      uiPlayerField.appendChild(cardInField)

      cardInField.onclick = () => {playerMethods.selectingPositionInField(i)}
      
      cardInField.oncontextmenu = () => {
        if(e != 'blank') cardDetailsUi.showCardDetail(e.id)
      }
    })

    //Rendering enemy field
    enemy.field.forEach((e, i) => {
      let cardInField = document.createElement('div')
      cardInField.id = `enemyCardInField${i}`
      cardInField.classList.add('cardInField')
      let cardImage = document.createElement('img')
      let pointsContainer = document.createElement('div')

      if(e == 'blank') cardImage.src = './cardsImg/blankCard.png' 
      else cardImage.src = e.imgLink

      cardInField.appendChild(cardImage)
      uiEnemyField.appendChild(cardInField)

      if(e.type == 'unit'){
        let atkPointsContainer = document.createElement('div')
        let defPointsContainer = document.createElement('div')
        let atkPoints = document.createElement('p')
        let defPoints = document.createElement('p')
  
        atkPoints.textContent = e.atk
        defPoints.textContent = e.def
          
        pointsContainer.appendChild(atkPointsContainer)
        pointsContainer.appendChild(defPointsContainer)
        atkPointsContainer.appendChild(atkPoints)
        defPointsContainer.appendChild(defPoints)
          
        pointsContainer.classList.add('pointsContainer')
        atkPointsContainer.classList.add('atkPointsContainer')
        defPointsContainer.classList.add('defPointsContainer')
  
        cardInField.appendChild(pointsContainer)
      }
      if(e.type == 'spell'){
        let spellColorContainer = document.createElement('div')
  
        spellColorContainer.classList.add('spellColorContainer')
  
        cardInField.appendChild(spellColorContainer )
      }
  
      cardInField.onclick = () => {playerMethods.selectingPositionInField(i)}
        
      cardInField.oncontextmenu = () => {
        if(e != 'blank') cardDetailsUi.showCardDetail(e.id)
      }
    })
  },
  refreshDiscartPile: () => {
    let uiEnemyAmountDiscartPileCards = document.querySelector('#enemyDiscartPileCount')
    let uiPlayerAmountDiscartPileCards = document.querySelector('#playerDiscartPileCount')
    
    let playerDiscartPile = document.querySelector('#playerDiscartPile')
    let enemyDiscartPile = document.querySelector('#enemyDiscartPile')
    
    //playerDiscartPile.onclick = uiAnimations.showDiscartPile(player)
    //enemyDiscartPile.onclick = uiAnimations.showDiscartPile(enemy)

    uiEnemyAmountDiscartPileCards.textContent = enemy.discartPile.length
    uiPlayerAmountDiscartPileCards.textContent = player.discartPile.length
  }
}