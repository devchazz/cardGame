const cardDetailsUi = {
  showCardDetail: (cardId) => {
    let bigCardShowerCointainer = document.getElementById(
      "bigCardShowerCointainer"
    );
    let bigCard = document.getElementById("cardImageShowerBig");
    let bigCardDescription = document.getElementById("cardShowerDescription");
    let bigCardName = document.getElementById("cardShowerName");
    let bigCardType = document.getElementById("cardShowerType");

    bigCardShowerCointainer.style.display = "flex";
    bigCardName.textContent = cards[cardId].name;
    bigCard.src = cards[cardId].imgLink;
    bigCardDescription.textContent = cardDetailsUi.checkDescription(
      cards[cardId].effect
    );
    if (cards[cardId].type == "unit")
      bigCardType.textContent = `Atk: ${cards[cardId].atk} / Def: ${cards[cardId].def}`;
    else bigCardType.textContent = `Spell Card`;
  },
  closeCardDetail: () =>
    (document.getElementById("bigCardShowerCointainer").style.display = "none"),
  checkDescription: (effect) => {
    switch (effect) {
      //UNITS:
      //BASICS:
      case "heal":
        return "Heals the owner by 3.";
      case "poison":
        return "Reduces the defense of the monster in the opposite side to 0.";
      case "frost":
        return "Reduces the atack of the monster in the opposite side to 0.";
      case "call":
        return "Calls one copy of this card from the deck to the field.";
      case "burn":
        return "Deals 2 direct damage to the opponent.";

      //SPECIALS:
      //Plants:
      case "createPinkPlant":
        return 'Create one "Plant of Life" on your side of the field.';
      case "elfArcher":
        return "Deal 1 point of damage to your opponent for each card that you have in the field.";
      //Nightmare:
      case "timeTerrorBunny":
        return "I recieve +1/+1 for each unit that you have in your discart pile.";
      case "cursedGirl":
        return "Create a copy of the unit with less defense in on your discart pile on your hand.";
      case "sadGhost":
        return "Create a copy of myself on your discart pile. For each other ghost on your discart pile, gives me +1/+0";
      //Magic:
      case "blueWizzard":
        return "";
      //Others:
      case "badbi":
        return "";

      //SPELLS:
      case "blueFlowerShield":
        return "Heal 4, draw 1.";
      case "explosion":
        return "Kills the unit in the opposite side.";
      case "bloodMoonDance":
        return "Pay 2 life points to summon a copy of the unit on the top of your discart pile.";
      case "infestation":
        return "Plant 1 parasite on top of the opponent deck.";
      case "theBigTree":
        return "Gives +2/+2 to all plants in your field, and +1/+1 in your deck or hand.";
      case "portal":
        return "Calls the card with less defense in your deck direct to the field.";

      default:
        return "This card has no effects.";
    }
  },
};
