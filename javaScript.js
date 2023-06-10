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

let charSelected = "";

//change char callback fn
const changeChar = (event) => {
  const img = document.querySelector("#charImage");
  const char = event.target.id;
  img.setAttribute("src", charUrl[char]);
  charSelected = char;
  const gameGo = document.querySelector(".goButton");
  gameGo.addEventListener("click", goGame);
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

////////////////////////////////////////////////////////////////////
//page 4 - fights
////////////////////////////////////////////////////////////////////
const fightHtml = ` <div class="fightContainer">
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
</div>`;

//////////////////////////variables
let charMaxHealth = 20; //change
let enemyMaxHealth = 20; //change

let charCurrentHealth = 20; //change
let enemyCurrentHealth = 40; //change

let charAttack = 0;
let charAttackArr = []; //each char attack different number of times
let enemyAttack = 3; //change

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
  const health = "|".repeat(charCurrentHealth);
  bar.innerText = health;
};

const renderEnemyHealthBar = () => {
  const bar = document.querySelector(".enemyHealthBarDisplay");
  const health = "|".repeat(enemyCurrentHealth > 0 ? enemyCurrentHealth : 0);
  bar.innerText = health;
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
      alert("You Win!");
    }, 500);
  } else {
    enemyCurrentHealth -= thisTurnAttack;
    enemyHealthDisplay.innerHTML = enemyCurrentHealth;
    renderEnemyHealthBar();
  }

  //render health bar
  renderCharHealthBar();
};

const goGame = () => {
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

  charHealthDisplay.innerText = charCurrentHealth;
  enemyHealthDisplay.innerText = enemyCurrentHealth;
  setCharAttack();
};
