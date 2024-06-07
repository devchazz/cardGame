const galleryContainer = document.getElementById('cardGalleryContainer')

cards.forEach(e => {
  let card = document.createElement('div')
  let cardImage = document.createElement('img')
  let descriptionAndPointsContainer = document.createElement('div')
  let pointsContainer = document.createElement('div')
  let cardName = document.createElement('h3')
  let cardDescription = document.createElement('p')

  card.appendChild(cardImage)
  descriptionAndPointsContainer.appendChild(cardName)
  descriptionAndPointsContainer.appendChild(cardDescription)
  descriptionAndPointsContainer.appendChild(pointsContainer)
  card.appendChild(descriptionAndPointsContainer)
  galleryContainer.appendChild(card)

  card.classList.add('cardContainer')
  descriptionAndPointsContainer.classList.add('descriptionAndPointsContainer')
  cardDescription.classList.add('cardDescription')
  pointsContainer.classList.add('pointsContainer')

  cardName.textContent = e.name
  cardImage.src = e.imgLink
  cardDescription.textContent = 'Effect: ' + cardDetailsUi.checkDescription(e.effect)  

  if(e.type == 'unit'){
    let atkPointsContainer = document.createElement('div')
    let defPointsContainer = document.createElement('div')
    let atkPoints = document.createElement('p')
    let defPoints = document.createElement('p')

    atkPoints.textContent = 'Atk:' + e.atk
    defPoints.textContent = 'Def:' + e.def
        
    pointsContainer.appendChild(atkPointsContainer)
    pointsContainer.appendChild(defPointsContainer)
    atkPointsContainer.appendChild(atkPoints)
    defPointsContainer.appendChild(defPoints)
  }
  if(e.type == 'spell'){
    let spellColorContainer = document.createElement('div')
    spellColorContainer.classList.add('spellColorContainer')
    card.appendChild(spellColorContainer)
  }
})
