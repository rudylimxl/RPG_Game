// const { message } = require("prompt");

const constructAssetUrl = (name, type) => {
  return `https://storage.cloud.google.com/rpg_game1_asset/${name}.${type}`;
};

//get start button from DOM
const startButton = document.querySelector(".btn1");
const charArray = ["Knight", "Wizard", "Orc"];
const charUrl = {
  base: "https://storage.cloud.google.com/rpg_game1_asset/human.gif",
  Knight: "https://storage.cloud.google.com/rpg_game1_asset/knight.gif",
  Wizard: "https://storage.cloud.google.com/rpg_game1_asset/wizard.gif",
  Orc: "https://storage.cloud.google.com/rpg_game1_asset/orc.gif",
};

const charDesc = {
  Knight: "The Knight is trained in the ways of weapons and armor.",
  Wizard: " The Wizard is a master the arcane arts and elementals.",
  Orc: "The Orc is famous for his strength and ferocity in battle.",
};

const charStats = {
  Knight:
    "<tr> <th>Stat</th> <th>Value</th> </tr> <tr> <td>HP</td> <td>70</td> </tr> <tr> <td>Def</td> <td>4</td> </tr> <tr> <td>Luck</td> <td>15</td> </tr>",
  Wizard:
    "<tr> <th>Stat</th> <th>Value</th> </tr> <tr> <td>HP</td> <td>50</td> </tr> <tr> <td>Def</td> <td>1</td> </tr> <tr> <td>Luck</td> <td>35</td> </tr>",
  Orc: "<tr> <th>Stat</th> <th>Value</th> </tr> <tr> <td>HP</td> <td>110</td> </tr> <tr> <td>Def</td> <td>2</td> </tr> <tr> <td>Luck</td> <td>5</td> </tr>",
};

const weaponArr = {
  Knight: "https://storage.cloud.google.com/rpg_game1_asset/sword_.png",
  Wizard: "https://storage.cloud.google.com/rpg_game1_asset/staff_.png",
  Orc: "https://storage.cloud.google.com/rpg_game1_asset/hammer_.png",
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

let charCurrentItems = [];

let charBonusAtk = 0;
let charBonusArmor = 0;
let charBonusHP = 0;
let charBonusAP = 0;

let charSelected = "";

//change char callback fn
const changeChar = (event) => {
  const img = document.querySelector("#charImage");
  const char = event.target.id;
  img.setAttribute("src", charUrl[char]);
  charSelected = char;
  const gameGo = document.querySelector(".goButton");
  gameGo.addEventListener("click", goMap);
  gameGo.innerText = `Cool ${char} outift! Let's go!!`;
  const weaponImg = document.querySelector(".weaponImg");
  const weaponUrl = weaponArr[`${charSelected}`];
  weaponImg.setAttribute("src", `${weaponUrl}`);

  const weaponP = document.querySelector(".weaponP");
  const weaponInnerText = weaponDesc[`${charSelected}`];
  console.log(weaponInnerText);
  weaponP.innerText = weaponInnerText;

  const charP = document.querySelector(".charP");
  const charInnerText = charDesc[`${charSelected}`];
  charP.innerText = charInnerText;

  const charT = document.querySelector(".charTable");
  const charTHTML = charStats[`${charSelected}`];
  charT.innerHTML = charTHTML;
};

//startGame callback fn
const startChar = () => {
  const gameBody = document.createElement("div");
  gameBody.classList.add("charContainer");
  gameBody.innerText = "Create your character!";
  document.body.innerHTML = "";
  document.body.appendChild(gameBody);

  const charSelector = document.createElement("div");
  charSelector.classList.add("charSelectBar");
  gameBody.appendChild(charSelector);
  const charButtonDiv = document.createElement("div");
  charButtonDiv.classList.add("charButtonDiv");
  charSelector.appendChild(charButtonDiv);
  for (let char of charArray) {
    const charButtons = document.createElement("div");
    charButtons.classList.add("charButton");
    charButtons.setAttribute("id", `${char}`);
    charButtons.innerText = `${char}`;
    charButtons.addEventListener("click", changeChar);
    charButtonDiv.appendChild(charButtons);
  }

  const charStat = document.createElement("div");
  charStat.classList.add("charStat");
  charSelector.appendChild(charStat);

  const charImg = document.createElement("img");
  charImg.setAttribute("src", charUrl.base);
  charImg.setAttribute("id", "charImage");
  charStat.appendChild(charImg);

  const charClassDetail = document.createElement("div");
  charClassDetail.classList.add("charClassDetail");
  charClassDetail.innerText = "Stats";
  charStat.appendChild(charClassDetail);

  const charP = document.createElement("p");
  charP.classList.add("charP");
  charP.innerText = "";
  charClassDetail.appendChild(charP);

  const charTable = document.createElement("table");
  charTable.classList.add("charTable");
  charTable.innerHTML = "";
  charClassDetail.appendChild(charTable);

  const charWeapon = document.createElement("div");
  charWeapon.classList.add("charWeapon");
  charWeapon.innerText = `Weapon`;
  charStat.appendChild(charWeapon);

  const weaponImg = document.createElement("img");
  weaponImg.classList.add("weaponImg");
  charWeapon.appendChild(weaponImg);

  const weaponP = document.createElement("p");
  weaponP.classList.add("weaponP");
  charWeapon.appendChild(weaponP);

  const gameGoButton = document.createElement("button");
  gameGoButton.classList.add("goButton");
  gameGoButton.innerText = `Choose a class! 
  It's dangerous out there, you need some equipments.`;
  charSelector.appendChild(gameGoButton);
};

startButton.addEventListener("click", startChar);

////////////////////////////////////////////////////////////////////
//page 3 - maps
////////////////////////////////////////////////////////////////////

let currentMapProgress = 0;

//draw map path on canvas
const drawMapPath = (num) => {
  const canvas = document.querySelector("#mapCanvas");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(134, 390);
  ctx.lineTo(100, 280);
  ctx.strokeStyle = num > 0 ? "gray" : "red";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 280);
  ctx.lineTo(80, 150);
  ctx.strokeStyle = num > 1 ? "gray" : "red";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(80, 150);
  ctx.quadraticCurveTo(100, 70, 350, 50);
  ctx.strokeStyle = num > 2 ? "gray" : "red";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(350, 50);
  ctx.quadraticCurveTo(500, 40, 560, 150);
  ctx.strokeStyle = num > 3 ? "gray" : "red";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(560, 150);
  ctx.quadraticCurveTo(700, 200, 540, 370);
  ctx.strokeStyle = num > 4 ? "gray" : "red";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(540, 370);
  ctx.quadraticCurveTo(390, 340, 370, 240);
  ctx.strokeStyle = num > 5 ? "gray" : "red";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.stroke();
};

////////// event listeners
const addMapBtnListener = (id, type) => {
  const btn = document.querySelector(`#map-btn${id}`);
  btn.addEventListener("click", type, { once: true });
  btn.classList.toggle("nodeVisited");
};

const mapBtnEventListenerToHome = () => {
  currentMapProgress += 1;
  goHome();
};

const mapBtnEventListenerToForest = () => {
  currentMapProgress += 1;
  return goFight();
};

const mapBtnEventListenerToTavern = () => {
  currentMapProgress += 1;
  return goTavern();
};

const mapBtnEventListenerToTower = () => {
  currentMapProgress += 1;
  return goFight();
};

const mapBtnEventListenerToCave = () => {
  currentMapProgress += 1;
  return goFight();
};

const mapBtnEventListenerToVillage = () => {
  currentMapProgress += 1;
  return goFight();
};

const mapBtnEventListenerToGraveyard = () => {
  currentMapProgress += 1;
  return goFight();
};

///// map HTML
const mapHtml = `
<div class="mapContainer">
<canvas id="mapCanvas" height="450" width="750"></canvas>
<button class="nodeButton nodeVisited" id="map-btn0" title="Home"></button>
<button class="nodeButton nodeVisited" id="map-btn1" title="Forest"></button>
<button class="nodeButton nodeVisited" id="map-btn2" title="Tavern"></button>
<button class="nodeButton nodeVisited" id="map-btn3" title="Tower"></button>
<button class="nodeButton nodeVisited" id="map-btn4" title="Cave"></button>
<button class="nodeButton nodeVisited" id="map-btn5" title="Village"></button>
<button class="nodeButton nodeVisited" id="map-btn6" title="Graveyard"></button>
<div class="itemBar"></div>
</div>
`;

const renderItemsBar = (itemArr) => {
  const itemBar = document.querySelector(".itemBar");
  for (let i of itemArr) {
    const item = document.createElement("img");
    const itemUrl = constructAssetUrl(i, "png");
    item.setAttribute("src", itemUrl);
    item.setAttribute("title", i);
    itemBar.appendChild(item);
  }
};

const nodes = [
  mapBtnEventListenerToHome,
  mapBtnEventListenerToForest,
  mapBtnEventListenerToTavern,
  mapBtnEventListenerToTower,
  mapBtnEventListenerToCave,
  mapBtnEventListenerToVillage,
  mapBtnEventListenerToGraveyard,
];

const goMap = () => {
  document.body.innerHTML = "";
  document.body.innerHTML = mapHtml;
  drawMapPath(currentMapProgress);
  addMapBtnListener(currentMapProgress, nodes[currentMapProgress]);
  renderItemsBar(charCurrentItems);
};

////////////// 3.1 Home
const homeHtml = `<div class="homeContainer">
<h2 class="homeText">
  Home sweet home! You found some items in the storeroom. Choose one.
</h2>
<div class="homeItemContainer">
  <button class="homeItem"></button>
  <button class="homeItem"></button>
  <button class="homeItem"></button>
</div>
</div>`;

const rollItem = () => {
  const randomIndex = Math.floor(Math.random() * itemArray.length);
  return itemArray[randomIndex];
};

const pickItem = (event) => {
  //trigger effect
  charCurrentItems.push(event.target.id);
  const itemIndex = itemArray.findIndex((e) => event.target.id === e.name);
  itemArray[itemIndex].fn();
  goMap();
};

const goHome = () => {
  document.body.innerHTML = "";
  document.body.innerHTML = homeHtml;

  const items = document.querySelectorAll(".homeItem");
  for (let i of items) {
    const selectedItem = rollItem();
    i.style.background =
      `url("` + constructAssetUrl(selectedItem.name, `png`) + `")`;
    i.style.backgroundRepeat = "no-repeat";
    i.style.backgroundPosition = "top center";
    i.style.backgroundColor = "lightgray";
    i.setAttribute("id", `${selectedItem.name}`);
    i.innerText = `${selectedItem.name}
    ${selectedItem.effect}`;
    i.addEventListener("click", pickItem);
  }
};

////////////////// 3.3 Tavern
const tavernHtml = `<div class="homeContainer" id="tavern">
<h2 class="homeText">
  You find a tavern offering a selection of equipments. Select one.
</h2>
<div class="homeItemContainer">
  <button class="homeItem"></button>
  <button class="homeItem"></button>
  <button class="homeItem"></button>
</div>
</div>`;

const goTavern = () => {
  document.body.innerHTML = "";
  document.body.innerHTML = tavernHtml;

  const items = document.querySelectorAll(".homeItem");
  for (let i of items) {
    const selectedItem = rollItem();
    i.style.background =
      `url("` + constructAssetUrl(selectedItem.name, `png`) + `")`;
    i.style.backgroundRepeat = "no-repeat";
    i.style.backgroundPosition = "top center";
    i.style.backgroundColor = "lightgray";
    i.setAttribute("id", `${selectedItem.name}`);
    i.innerText = `${selectedItem.name}
    ${selectedItem.effect}`;
    i.addEventListener("click", pickItem);
  }
};

////////////////////////////////////////////////////////////////////
//page 4 - fights
////////////////////////////////////////////////////////////////////
const fightHtml = ` 
<div class="fightContainer">
<div class="charFightContainer">
  <div class="healthBar">
    <p>Char</p>
    <p class="charHealthBarDisplay"> </p>
    <p class="charHealth"> a </p>
  </div>
  <div class="charToon">
    <img
      src=""
      id="charToon"
    />
  </div>
  <div class="cardContainer">
    <button id="charAtkBtn">Attack</button>
    <button id="charDefBtn">Defend</button>
    <button id="charSklBtn">Skill</button>
  </div>
  <div class="apBar">
    <p class = "charAP"></p>
  </div>
  <div class="diceContainer">
    <img src="" class="dice" id="dice1">
    <img src="" class="dice" id="dice2">
    <img src="" class="dice" id="dice3">
  </div>
</div>
<div class="enemyContainer">
  <div class="enemyHealthBar">
    <p>Enemy</p>
    <p class="enemyHealthBarDisplay"> </p>  
    <p class="enemyHealth"> a </p>
  </div>
  <div class="enemyToon">
    <img
      src="https://storage.cloud.google.com/rpg_game1_asset/bigdemonleft.gif"
      id="enemyToon"
    />
  </div>
</div>
<div class="battleLogContainer">
  <ul class="battleLog"> 
    <li> Battle Started! </li>
  </ul>
</div>
</div>`;

//////////////////////////variables
let charMaxHealth = 20; //change
let enemyMaxHealth = 20; //change

let charCurrentHealth = 20; //change
let enemyCurrentHealth = 40; //change

let charAttack = 0;
let charAttackArr = []; //each char attack different number of times
let enemyAttack = 3; //change

let charAP = 3;

////////////////////////////functions
const setCharToon = () => {
  const charToon = document.querySelector("#charToon");
  const charLower = charSelected.toLowerCase();
  const charUrl = `https://storage.cloud.google.com/rpg_game1_asset/${charLower}.gif`;
  charToon.setAttribute("src", charUrl);
};

const renderDice1 = (result) => {
  const diceDisplay1 = document.querySelector("#dice1");
  const diceDisplay2 = document.querySelector("#dice2");
  const diceDisplay3 = document.querySelector("#dice3");
  const url = `https://storage.cloud.google.com/rpg_game1_asset/d${charSelected}_${result}.gif`;
  diceDisplay1.setAttribute("src", ""); //to clear display of all existing dices
  diceDisplay2.setAttribute("src", "");
  diceDisplay3.setAttribute("src", "");
  diceDisplay1.setAttribute("src", url);
};

const renderDice2 = (result) => {
  if (charSelected === "Knight" || charSelected === "Wizard") {
    const diceDisplay2 = document.querySelector("#dice2");
    const url = `https://storage.cloud.google.com/rpg_game1_asset/d${charSelected}_${result}.gif`;
    diceDisplay2.setAttribute("src", url);
  }
};

const renderDice3 = (result) => {
  if (charSelected === "Wizard") {
    const diceDisplay3 = document.querySelector("#dice3");
    const url = `https://storage.cloud.google.com/rpg_game1_asset/d${charSelected}_${result}.gif`;
    diceDisplay3.setAttribute("src", url);
  }
};

const setDiceDisplay = () => {
  const diceDisplay1 = document.querySelector("#dice1");
  const diceDisplay2 = document.querySelector("#dice2");
  const diceDisplay3 = document.querySelector("#dice3");
  if (charSelected === "Knight") {
    diceDisplay1.setAttribute(
      "src",
      "https://storage.cloud.google.com/rpg_game1_asset/dKnight_.gif"
    );
    diceDisplay2.setAttribute(
      "src",
      "https://storage.cloud.google.com/rpg_game1_asset/dKnight_.gif"
    );
  } else if (charSelected === "Wizard") {
    diceDisplay1.setAttribute(
      "src",
      "https://storage.cloud.google.com/rpg_game1_asset/dWizard_.gif"
    );
    diceDisplay2.setAttribute(
      "src",
      "https://storage.cloud.google.com/rpg_game1_asset/dWizard_.gif"
    );
    diceDisplay3.setAttribute(
      "src",
      "https://storage.cloud.google.com/rpg_game1_asset/dWizard_.gif"
    );
  } else {
    diceDisplay1.setAttribute(
      "src",
      "https://storage.cloud.google.com/rpg_game1_asset/dOrc_.gif"
    );
  }
};

const setCharAttack = () => {
  charSelected === "Knight"
    ? (charAttack = 6)
    : charSelected === "Wizard"
    ? (charAttack = 4)
    : (charAttack = 12);
};

const resetCurrentHealth = () => {
  charCurrentHealth = 20;
  enemyCurrentHealth = 40;
};

const rollAttackDice = () => {
  return Math.ceil(Math.random() * charAttack);
};

const rollAllAttackDice = () => {
  if (charSelected === "Knight") {
    charAttackArr[0] = rollAttackDice();
    charAttackArr[1] = rollAttackDice();
  } else if (charSelected === "Wizard") {
    charAttackArr[0] = rollAttackDice();
    charAttackArr[1] = rollAttackDice();
    charAttackArr[2] = rollAttackDice();
  } else {
    charAttackArr[0] = rollAttackDice();
  }
};

const renderCharHealthBar = () => {
  const bar = document.querySelector(".charHealthBarDisplay");
  const num = document.querySelector(".charHealth");
  const health = "|".repeat(charCurrentHealth);
  bar.innerText = health;
  num.innerText = charCurrentHealth;
};

const renderEnemyHealthBar = () => {
  const bar = document.querySelector(".enemyHealthBarDisplay");
  const health = "|".repeat(enemyCurrentHealth > 0 ? enemyCurrentHealth : 0);
  bar.innerText = health;
};

const renderCharAP = (num) => {
  const charAP = document.querySelector(".charAP");
  charAP.innerText = `AP = ${num}`;
};

const updateBattleLog = (message) => {
  const log = document.querySelector(".battleLog");
  const add = document.createElement("li");
  add.innerText = message;
  log.appendChild(add);
};

const removeEventListener = () => {
  //change to remove all button later
  const btn = document.querySelector("#charAtkBtn");
  btn.removeEventListener("click", charAttackMove);
};

const charAttackMove = () => {
  const enemyHealthDisplay = document.querySelector(".enemyHealth");
  const enemyToon = document.querySelector("#enemyToon");
  console.log(charSelected);
  rollAllAttackDice(); //determine multiple attack dices this turn
  console.log(charAttackArr);
  const thisTurnAttack = charAttackArr.reduce((total, dice) => total + dice); //compute total damage
  console.log(thisTurnAttack);

  //render dices
  renderDice1(charAttackArr[0]);
  setTimeout(renderDice2(charAttackArr[1]), 500);
  setTimeout(renderDice3(charAttackArr[2]), 500);

  //logic for actual fight
  if (enemyCurrentHealth <= 0) {
  } else if (enemyCurrentHealth - thisTurnAttack <= 0) {
    enemyCurrentHealth -= thisTurnAttack;
    renderEnemyHealthBar();
    enemyHealthDisplay.innerHTML = 0;
    enemyToon.setAttribute(
      "src",
      "https://storage.cloud.google.com/rpg_game1_asset/bigdemondeath.gif"
    );
    setTimeout(() => {
      updateBattleLog(`Char won the battle!`);
      updateBattleLog(`Going back to the map...`);
    }, 1400);
    setTimeout(goMap, 5500);
    removeEventListener();
  } else {
    enemyCurrentHealth -= thisTurnAttack;
    enemyHealthDisplay.innerHTML = enemyCurrentHealth;
    renderEnemyHealthBar();
  }

  //render health bar
  if (charAP > 1) {
    charAP -= 1;
    renderCharAP(charAP);
    updateBattleLog(`Char attacked for ${thisTurnAttack} total damage!`);
  } else {
    charAP -= 1;
    renderCharAP(charAP);
    updateBattleLog(`Char attacked for ${thisTurnAttack} total damage!`);
    //enemyAttack
    setTimeout(() => {}, 1000);
    updateBattleLog(`Enemy attacked for 5 damage!`);
    charCurrentHealth -= 5;
    renderCharHealthBar();
    charAP = 3;
    renderCharAP(charAP);
  }
};

const goFight = () => {
  //previously goGame
  document.body.innerHTML = "";
  document.body.innerHTML = fightHtml;
  const charHealthDisplay = document.querySelector(".charHealth");
  const enemyHealthDisplay = document.querySelector(".enemyHealth");
  const charAtkBtn = document.querySelector("#charAtkBtn");
  charAtkBtn.addEventListener("click", charAttackMove);
  setDiceDisplay();
  setCharToon();
  renderCharHealthBar();
  renderEnemyHealthBar();
  renderCharAP(charAP);
  resetCurrentHealth();

  charHealthDisplay.innerText = charCurrentHealth;
  enemyHealthDisplay.innerText = enemyCurrentHealth;
  setCharAttack();
};
