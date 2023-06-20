// todo:
// 1 enemy logic
// 2 refactor functions
// 3 organization > split to different js files?
// 4 music
// 5 stretch goal: mobile layout

////////////////////////////////////////////////////////////////////
//page 4 - fights
////////////////////////////////////////////////////////////////////

////////////////////////////functions
const randomizeEnemy = () => {
  const randomIndex = Math.floor(Math.random() * normalEnemiesArr.length);
  currentEnemy = normalEnemiesArr[randomIndex];
  enemyCurrentHealth = Math.floor(enemyHP * enemyHpScaling[currentMapProgress]);
  enemyCurrentAtk = Math.ceil(
    enemyAttack * enemyAtkScaling[currentMapProgress]
  );
};

const setCharToon = () => {
  const charToon = document.querySelector("#charToon");
  const charLower = charSelected.toLowerCase();
  const charUrl = `assets/${charLower}.gif`;
  charToon.setAttribute("src", charUrl);
};

const setEnemyToon = () => {
  const enemyToon = document.querySelector("#enemyToon");
  const enemyLower = currentEnemy.toLowerCase() + "left";
  const enemyUrl = `assets/${enemyLower}.gif`;
  enemyToon.setAttribute("src", enemyUrl);
  const enemyName = document.querySelector("#enemyName");
  enemyName.innerText = currentEnemy;
};

const renderDice1 = (result) => {
  const diceDisplay1 = document.querySelector("#dice1");
  const diceDisplay2 = document.querySelector("#dice2");
  const diceDisplay3 = document.querySelector("#dice3");
  const url = `assets/d${charSelected}_${result}.gif`;
  diceDisplay1.setAttribute("src", ""); //to clear display of all existing dices
  diceDisplay2.setAttribute("src", "");
  diceDisplay3.setAttribute("src", "");
  diceDisplay1.setAttribute("src", url);
};

const renderDice2 = (result) => {
  if (charSelected === "Knight" || charSelected === "Wizard") {
    const diceDisplay2 = document.querySelector("#dice2");
    const url = `assets/d${charSelected}_${result}.gif`;
    diceDisplay2.setAttribute("src", url);
  }
};

const renderDice3 = (result) => {
  if (charSelected === "Wizard") {
    const diceDisplay3 = document.querySelector("#dice3");
    const url = `assets/d${charSelected}_${result}.gif`;
    diceDisplay3.setAttribute("src", url);
  }
};

const setDiceDisplay = () => {
  const diceDisplay1 = document.querySelector("#dice1");
  const diceDisplay2 = document.querySelector("#dice2");
  const diceDisplay3 = document.querySelector("#dice3");
  if (charSelected === "Knight") {
    diceDisplay1.setAttribute("src", "assets/dKnight_.gif");
    diceDisplay2.setAttribute("src", "assets/dKnight_.gif");
  } else if (charSelected === "Wizard") {
    diceDisplay1.setAttribute("src", "assets/dWizard_.gif");
    diceDisplay2.setAttribute("src", "assets/dWizard_.gif");
    diceDisplay3.setAttribute("src", "assets/dWizard_.gif");
  } else {
    diceDisplay1.setAttribute("src", "assets/dOrc_.gif");
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
  charCurrentHealth = charHP;
  enemyCurrentHealth = enemyHP;
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

//render HP number display
const renderCharHP = () => {
  const charHealthDisplay = document.querySelector(".charHealth");
  charHealthDisplay.innerText =
    charCurrentHealth <= 0
      ? `0 / ${charHP}`
      : `${charCurrentHealth} / ${charHP}`;
};

const renderEnemyHP = () => {
  const enemyHealthDisplay = document.querySelector(".enemyHealth");
  enemyHealthDisplay.innerText =
    enemyCurrentHealth <= 0
      ? `0 / ${enemyHP}`
      : `${enemyCurrentHealth} / ${enemyHP}`;
};

//health bar animations
const renderCharHealthBar = () => {
  const charHealthBar = document.querySelector(".charHealthBar");
  const width = (charCurrentHealth / charHP) * 100;
  charHealthBar.style.width = width <= 0 ? `0` : `${width}%`;
};

const renderEnemyHealthBar = () => {
  const enemyHealthBar = document.querySelector(".enemyHealthBar");
  const width = (enemyCurrentHealth / enemyHP) * 100;
  enemyHealthBar.style.width = width <= 0 ? `0` : `${width}%`;
};

//initialize fight
const initializeFight = () => {
  const charAtkBtn = document.querySelector("#charAtkBtn");
  charAtkBtn.addEventListener("click", charAttackMove);
  setDiceDisplay();
  setCharToon();
  randomizeEnemy();
  setEnemyToon();
  renderCharAP(charAP);
  resetCurrentHealth();
  renderCharHP();
  renderEnemyHP();
  setCharAttack();
};

//attack button
const charAttackMove = () => {
  const enemyToon = document.querySelector("#enemyToon");
  rollAllAttackDice(); //determine multiple attack dices this turn
  const thisTurnAttack = charAttackArr.reduce((total, dice) => total + dice); //compute total damage

  //render dices
  renderDice1(charAttackArr[0]);
  renderDice2(charAttackArr[1]);
  renderDice3(charAttackArr[2]);

  //logic for actual fight
  if (enemyCurrentHealth <= 0) {
  } else if (enemyCurrentHealth - thisTurnAttack <= 0) {
    enemyCurrentHealth -= thisTurnAttack;
    renderEnemyHP();
    renderEnemyHealthBar();
    enemyToon.setAttribute("src", "assets/bigdemondeath.gif");
    setTimeout(() => {
      updateBattleLog(`Char won the battle!`);
      updateBattleLog(`Going back to the map...`);
    }, 1400);
    setTimeout(goMap, 4000);
    removeEventListener();
  } else {
    enemyCurrentHealth -= thisTurnAttack;
    renderEnemyHP();
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
    charAP = 3;
    renderCharAP(charAP);
    renderCharHP();
    renderCharHealthBar();
  }
};

//defend button
const charDefendMove = () => {
  //a
};

const goFight = () => {
  //previously goGame
  document.body.innerHTML = "";
  document.body.innerHTML = fightHtml;
  initializeFight();
};
