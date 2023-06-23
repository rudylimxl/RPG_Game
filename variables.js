//get start button from DOM
const startButton = document.querySelector(".btn1");
const charArray = ["Knight", "Wizard", "Orc"];
const charUrl = {
  base: "assets/human.gif",
  Knight: "assets/knight.gif",
  Wizard: "assets/wizard.gif",
  Orc: "assets/orc.gif",
};

const charDesc = {
  Knight: "The Knight is trained in the ways of weapons and armor.",
  Wizard: " The Wizard is a master the arcane arts and elementals.",
  Orc: "The Orc is famous for his strength and ferocity in battle.",
};

const charStats = {
  Knight:
    "<tr> <th>Stat</th> <th>Value</th> </tr> <tr> <td>HP</td> <td>25</td> </tr> <tr> <td>Def</td> <td>3</td> </tr> <tr> <td>Luck</td> <td>15</td> </tr>",
  Wizard:
    "<tr> <th>Stat</th> <th>Value</th> </tr> <tr> <td>HP</td> <td>20</td> </tr> <tr> <td>Def</td> <td>1</td> </tr> <tr> <td>Luck</td> <td>35</td> </tr>",
  Orc: "<tr> <th>Stat</th> <th>Value</th> </tr> <tr> <td>HP</td> <td>30</td> </tr> <tr> <td>Def</td> <td>0</td> </tr> <tr> <td>Luck</td> <td>5</td> </tr>",
};

const weaponArr = {
  Knight: "assets/sword_.png",
  Wizard: "assets/staff_.png",
  Orc: "assets/hammer_.png",
};

const weaponDesc = {
  Knight: "A really sharp sword, slashes twice. 2d6 damage.",
  Wizard: "This staff shoots out multiple fireballs. 3d4 damage.",
  Orc: "A heavy hammer. 1d12 damage.",
};

const weaponNumAttack = {
  Knight: 2,
  Wizard: 3,
  Orc: 1,
};

const weaponAttackDmg = {
  Knight: 6,
  Wizard: 4,
  Orc: 12,
};

const itemArray = [
  {
    name: "Armor",
    effect: "Def+3",
    fn: () => {
      charBonusArmor += 3;
    },
  },
  {
    name: "Banana",
    effect: "HP+5",
    fn: () => {
      charBonusHP += 5;
    },
  },
  {
    name: "Book",
    effect: "Atk+1",
    fn: () => {
      charBonusAtk += 1;
    },
  },
  {
    name: "Boots",
    effect: "Def+1",
    fn: () => {
      charBonusArmor += 1;
    },
  },
  {
    name: "Broadsword",
    effect: "Atk+4",
    fn: () => {
      charBonusAtk += 4;
    },
  },
  {
    name: "Cap",
    effect: "Def+1",
    fn: () => {
      charBonusArmor += 1;
    },
  },
  {
    name: "Cheese",
    effect: "HP+5",
    fn: () => {
      charBonusHP += 5;
    },
  },
  {
    name: "Club",
    effect: "Atk+1",
    fn: () => {
      charBonusAtk += 1;
    },
  },
  {
    name: "Daggers",
    effect: "Atk+2",
    fn: () => {
      charBonusAtk += 2;
    },
  },
  {
    name: "Gloves",
    effect: "Def+1",
    fn: () => {
      charBonusArmor += 1;
    },
  },
  {
    name: "Helmet",
    effect: "Def+2",
    fn: () => {
      charBonusArmor += 2;
    },
  },
  {
    name: "Knife",
    effect: "Atk+1",
    fn: () => {
      charBonusAtk += 1;
    },
  },
  {
    name: "Meat",
    effect: "HP+1",
    fn: () => {
      charBonusHP += 1;
    },
  },
  {
    name: "Potion",
    effect: "AP+1",
    fn: () => {
      charBonusAP += 1;
    },
  },
  {
    name: "Scimitar",
    effect: "Atk+3",
    fn: () => {
      charBonusAtk += 3;
    },
  },
  {
    name: "Shield",
    effect: "Def+1",
    fn: () => {
      charBonusArmor += 1;
    },
  },
  {
    name: "Shirt",
    effect: "Def+1",
    fn: () => {
      charBonusArmor += 1;
    },
  },
  {
    name: "Tome",
    effect: "AP+1,Atk+1",
    fn: () => {
      charBonusAtk += 1;
      charBonusAP += 1;
    },
  },
  {
    name: "Wand",
    effect: "Atk+2",
    fn: () => {
      charBonusAtk += 2;
    },
  },
];

////enemy list and stats
const normalEnemiesArr = [
  "Demon",
  "Dragon",
  "Goblin",
  "Warrior",
  "Bigdemon",
  "Necromancer",
  "Ghost",
];

const enemyActionsArr = [
  { atk: 1.2, def: 0 },
  { atk: 1.1, def: 0 },
  { atk: 0.5, def: 0.5 },
  { atk: 0.6, def: 0.7 },
];

let currentEnemy = "";
let enemyHP = 40;
let enemyAtk = 5;
let enemyDef = 10;
const enemyHpScaling = [1, 1, 1, 1.4, 1.4, 1.5, 2, 2];
const enemyAtkScaling = [1, 1, 1, 1.2, 1.3, 1.4, 1.5, 1.6];
const enemyDefScaling = [1, 1, 1, 1.2, 1.3, 1.4, 1.5, 1.6];

//initialize enemy fight stat
let enemyCurrentHealth = 0;
let enemyCurrentAtk = 0;

///char stats
let charCurrentItems = [];
let charHP = 20;

let charBonusAtk = 0;
let charBonusArmor = 0;
let charBonusHP = 0;
let charBonusAP = 0;

let charAttack = 0;
let charDef = 3;
let charAttackArr = []; //each char attack different number of times

let charAP = 3;

let charSelected = "";

//initialize char fight stats
let charFightMaxHP = charHP + charBonusHP; //only used to display max health value
let charCurrentHealth = charHP + charBonusHP;
let charCurrentBonusAtk = charBonusAtk;
let charCurrentDef = charDef + charBonusArmor;
let charCurrentBonusDef = charBonusArmor;
let charFightAP = charAP + charBonusAP;
let charDefThisTurn = 0;
let charAtkThisTurn = 0;
let enemyDefThisTurn = 0;
let enemyAtkThisTurn = 0;
