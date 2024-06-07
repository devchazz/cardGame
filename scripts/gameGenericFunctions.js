/*
  On this file we handle:
    - Life points management; 
    - Drawing cards; 
    - Summonings;
    - Shuffle;
    - Unit atacking
    - Tossing.
*/

const genericGameFunctions = {
  dealDamage: (target, value) => {
    if (value == 0) return;
    setTimeout(() => {
      target.life -= 1;
      uiRefreshMethods.refreshLifePoints();
      value -= 1;
      genericGameFunctions.dealDamage(target, value);
    }, 100);
  },
  heal: (target, value) => {
    if (value == 0) return;
    setTimeout(() => {
      target.life += 1;
      uiRefreshMethods.refreshLifePoints();
      value -= 1;
      genericGameFunctions.heal(target, value);
    }, 100);
  },

  //Summons:
  summon: (target, unitHandPosition, unitSummonPosittion) => {
    if (player.canClick == false) return;
    if (
      target.hand[unitHandPosition].type == "unit" &&
      game.summonsRemaining <= 0
    ) {
      player.preparingToSummon[0] = null;
      player.preparingToSummon[1] = null;
      return;
    }
    if (
      target.hand[unitHandPosition].type == "spell" &&
      game.spellsRemaining <= 0
    ) {
      player.preparingToSummon[0] = null;
      player.preparingToSummon[1] = null;
      return;
    }
    if (target.hand[unitHandPosition].type == "unit")
      game.summonsRemaining -= 1;
    if (target.hand[unitHandPosition].type == "spell")
      game.spellsRemaining -= 1;
    target.field[unitSummonPosittion] = target.hand[unitHandPosition];
    target.hand[unitHandPosition] = null;
    target.hand = target.hand.filter((e) => {
      if (e) return e;
    });
    player.preparingToSummon[0] = null;
    player.preparingToSummon[1] = null;
    genericGameFunctions.activateEffect(unitSummonPosittion, target);
    if (player.hand.length == 0 && game.turn == "player") gameControl.endTurn();
    refreshUi();
  },
  summonFromDeck: (target, unitId, unitSummonPosittion) => {
    let cardToSummon = target.deck.filter((e) => e.id == unitId);
    target.field[unitSummonPosittion] = cardToSummon[0];
    genericGameFunctions.removeCopyOnDeck(target, unitId);
    genericGameFunctions.activateEffect(unitSummonPosittion, target);
  },
  specialSummon: (target, id, unitSummonPosittion) => {
    let cardToSummon = Object.assign({}, cards[id]);
    target.field[unitSummonPosittion] = cardToSummon;
    genericGameFunctions.activateEffect(unitSummonPosittion, target);
  },
  createCardInHand: (target, id) => {
    let cardToGet = Object.assign({}, cards[id]);
    if (target.hand.length < 6) {
      let lastPlace = target.hand.length;
      target.hand[lastPlace] = cardToGet;
    }
  },
  findFreeSpaceOnTheField: (target) => {
    let bestPosition = null;
    for (i = 0; i < 5; i++) {
      if (target.field[i] == "blank") bestPosition = i;
    }
    return bestPosition;
  },
  removeCopyOnDeck: (target, unitId) => {
    for (let i = 0; i < target.deck.length; i++) {
      if (target.deck[i].id == unitId) {
        target.deck.splice(i, 1);
        return;
      }
    }
  },

  //Battle and unit actions:
  killUnit: (target, position) => {
    if (target.field[position] != "blank") {
      uiAnimations.killUnit(target, position);
      target.discartPile.push(target.field[position]);
      target.field[position] = "blank";
      refreshUi();
    }
  },
  activateEffect: (index, target) => {
    if (target.field[index] == "blank") return;
    if (target.field[index].effect) {
      cardEffects.handlingEffect(target.field[index].effect, target, index);

      if ((game.turn = "enemy" || target.field[index].type == "spell")) {
        cardDetailsUi.showCardDetail(target.field[index].id);
        setTimeout(() => {
          cardDetailsUi.closeCardDetail();
        }, 2000);
      }
      if (target.field[index].type == "spell") {
        setTimeout(() => {
          genericGameFunctions.killUnit(target, index);
        }, 3000);
      }
    }
    gameControl.checkIfThereIsWinner();
  },

  //Deck actions:
  draw: (target, amount) => {
    if (amount <= 0) return;
    if (target.hand.length >= 6) return;
    if (amount > 0) {
      if (target.deck.length == 0) {
        alert("Deck empty");
        return;
      } else {
        target.hand.push(target.deck[0]);
        target.deck.shift();
        refreshUi();
        amount--;
        genericGameFunctions.draw(target, amount);
      }
    }
  },
  toss: (target) => {
    //let bestPlaceToGo = null
    for (i = 0; i < 5; i++) if (target.field[i] == "blank") bestPlaceToGo = i;
    //if(target.deck[0].effect == 'darkness' && bestPlaceToGo != null) genericGameFunctions.summonFromDeck(target, target.deck[0].id, bestPlaceToGo)
    target.deck.shift();
  },
  shuffle: (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  },
};
