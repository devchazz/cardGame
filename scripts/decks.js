class Card {
  constructor(id, name, type, imgLink, atk, def, effect) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.imgLink = imgLink;
    this.atk = atk;
    this.def = def;
    this.effect = effect;
  }
}

//All cards
const cards = [
  new Card(0, "Fire Plant", "unit", "./cardsImg/orangePlant.png", 4, 2, "burn"),
  new Card(1, "Purple Plant", "unit", "./cardsImg/purplePlant.png", 5, 5, null),
  new Card(
    2,
    "Plant of life",
    "unit",
    "./cardsImg/pinkPlant.png",
    2,
    4,
    "heal"
  ),
  new Card(3, "Spider", "unit", "./cardsImg/redSpider.png", 3, 3, "call"),
  new Card(4, "Cursed Wolf", "unit", "./cardsImg/purpleWolf.png", 4, 2, "call"),
  new Card(5, "Snake", "unit", "./cardsImg/snake.png", 3, 1, "poison"),
  new Card(6, "Florest", "spell", "./cardsImg/tree.png", 0, 0, "theBigTree"),
  new Card(7, "Parasite", "unit", "./cardsImg/parasite.png", 3, 3, null),
  new Card(8, "Blue Robot", "unit", "./cardsImg/blueRobot.png", 3, 1, "call"),
  new Card(
    9,
    "The Archer",
    "unit",
    "./cardsImg/greenArcher.png",
    6,
    3,
    "elfArcher"
  ),
  new Card(
    10,
    "Time Terror Bunny",
    "unit",
    "./cardsImg/timeTerrorBunny.png",
    1,
    1,
    "timeTerrorBunny"
  ),
  new Card(
    11,
    "Cursed Girl",
    "unit",
    "./cardsImg/darkestGirl.png",
    3,
    1,
    "cursedGirl"
  ),
  new Card(
    12,
    "Sad Ghost",
    "unit",
    "./cardsImg/sadGhost.png",
    4,
    1,
    "sadGhost"
  ),
  new Card(13, "Skeleton", "unit", "./cardsImg/skeleton.png", 5, 5, null),
  new Card(
    14,
    "Scientist",
    "unit",
    "./cardsImg/scients.png",
    2,
    6,
    "drawStrongestRobot"
  ),
  new Card(
    15,
    "Flower Shield",
    "spell",
    "./cardsImg/blueFlowerShield.png",
    0,
    0,
    "blueFlowerShield"
  ),
  new Card(
    16,
    "Blood Moon Dance",
    "spell",
    "./cardsImg/bloodMoonDance.png",
    0,
    0,
    "bloodMoonDance"
  ),
  new Card(
    17,
    "Explosion",
    "spell",
    "./cardsImg/explosion.png",
    0,
    0,
    "explosion"
  ),
  new Card(
    18,
    "Infestation",
    "spell",
    "./cardsImg/parasiteSpell.png",
    0,
    0,
    "infestation"
  ),
  new Card(19, "The Portal", "spell", "./cardsImg/portal.png", 0, 0, "portal"),
  new Card(
    20,
    "The Flower Picker",
    "unit",
    "./cardsImg/ariel.png",
    2,
    2,
    "createPinkPlant"
  ),
  new Card(
    21,
    "Controll Panel",
    "spell",
    "./cardsImg/girlInTheControllPanel.png",
    0,
    0,
    "girlInTheControllPanel"
  ),
  new Card(
    22,
    "Mysterious Wizard",
    "unit",
    "./cardsImg/blueWizzard.png",
    4,
    4,
    "wizard"
  ),
  new Card(
    23,
    "Mystical Night",
    "spell",
    "./cardsImg/lovelyNight.png",
    0,
    0,
    "mysticalNight"
  ),
  new Card(24, "Badbi", "unit", "", 5, 4, "badbi"),
];

fullDecks = {
  flowerDeck: [
    Object.assign({}, cards[0]),
    Object.assign({}, cards[0]),
    Object.assign({}, cards[1]),
    Object.assign({}, cards[1]),
    Object.assign({}, cards[2]),
    Object.assign({}, cards[2]),
    Object.assign({}, cards[3]),
    Object.assign({}, cards[3]),
    Object.assign({}, cards[5]),
    Object.assign({}, cards[5]),
    Object.assign({}, cards[9]),
    Object.assign({}, cards[9]),
    Object.assign({}, cards[20]),
    Object.assign({}, cards[20]),
    Object.assign({}, cards[20]),

    Object.assign({}, cards[6]),
    Object.assign({}, cards[6]),
    Object.assign({}, cards[17]),
    Object.assign({}, cards[15]),
    Object.assign({}, cards[15]),
  ],
  nightmare: [
    Object.assign({}, cards[10]),
    Object.assign({}, cards[10]),
    Object.assign({}, cards[10]),
    Object.assign({}, cards[11]),
    Object.assign({}, cards[11]),
    Object.assign({}, cards[12]),
    Object.assign({}, cards[12]),
    Object.assign({}, cards[12]),
    Object.assign({}, cards[13]),
    Object.assign({}, cards[13]),
    Object.assign({}, cards[4]),
    Object.assign({}, cards[4]),

    Object.assign({}, cards[16]),
    Object.assign({}, cards[16]),
    Object.assign({}, cards[16]),
    Object.assign({}, cards[18]),
    Object.assign({}, cards[18]),
    Object.assign({}, cards[19]),
    Object.assign({}, cards[19]),
    Object.assign({}, cards[19]),
  ],
  robots: [
    Object.assign({}, cards[8]),
    Object.assign({}, cards[8]),
    Object.assign({}, cards[14]),
    Object.assign({}, cards[14]),

    Object.assign({}, cards[21]),
    Object.assign({}, cards[21]),
  ],
  spellCasters: [
    Object.assign({}, cards[22]),
    Object.assign({}, cards[22]),
    Object.assign({}, cards[22]),

    Object.assign({}, cards[23]),
    Object.assign({}, cards[23]),
  ],
};

enemy = {
  name: "enemy",
  life: 30,
  deck: fullDecks.nightmare,
  hand: [],
  field: ["blank", "blank", "blank", "blank", "blank"],
  discartPile: [Object.assign({}, cards[13]), Object.assign({}, cards[13])],
};

player = {
  name: "player",
  life: 30,
  deck: fullDecks.flowerDeck,
  hand: [],
  field: ["blank", "blank", "blank", "blank", "blank"],
  discartPile: [],

  canClick: false,
  preparingToSummon: [null, null],
};
