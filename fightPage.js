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
  enemyHP = Math.floor(enemyHP * enemyHpScaling[currentMapProgress]);
  enemyAtk = Math.ceil(enemyAtk * enemyAtkScaling[currentMapProgress]);
  enemyDef = Math.ceil(enemyDef * enemyDefScaling[currentMapProgress]);
};

const randomizeEnemyAction = () => {
  const randomIndex = Math.floor(Math.random() * enemyActionsArr.length);
  enemyAtkThisTurn = Math.ceil(enemyActionsArr[randomIndex].atk * enemyAtk);
  enemyDefThisTurn = Math.ceil(enemyActionsArr[randomIndex].def * enemyDef);
};

const setCharToon = () => {
  const charToon = document.querySelector("#charToon");
  const charLower = charSelected.toLowerCase();
  const charUrl = `assets/${charLower}.gif`;
  charToon.setAttribute("src", charUrl);
};

const setCharName = () => {
  const charName = document.querySelector(".charName");
  charName.innerText = `${charSelected}`;
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
  log.scrollTop = log.scrollHeight;
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
      ? `0 / ${charFightMaxHP}`
      : `${charCurrentHealth} / ${charFightMaxHP}`;
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
  const width = (charCurrentHealth / charFightMaxHP) * 100;
  charHealthBar.style.width = width <= 0 ? `0` : `${width}%`;
};

const renderEnemyHealthBar = () => {
  const enemyHealthBar = document.querySelector(".enemyHealthBar");
  const width = (enemyCurrentHealth / enemyHP) * 100;
  enemyHealthBar.style.width = width <= 0 ? `0` : `${width}%`;
};

const addButtonListeners = () => {
  const charAtkBtn = document.querySelector("#charAtkBtn");
  charAtkBtn.addEventListener("click", charAttackMove);
  const charDefBtn = document.querySelector("#charDefBtn");
  charDefBtn.addEventListener("click", charDefendMove);
  const charEndTurnBtn = document.querySelector("#charEndTurnBtn");
  charEndTurnBtn.addEventListener("click", charEndTurn);
};

const renderCharDef = () => {
  const def = document.querySelector(".charDef");
  def.innerText = charDefThisTurn + charCurrentBonusDef;
};

const resetCharDef = () => {
  charDefThisTurn = charCurrentDef;
  renderCharDef;
};

const renderCharAtk = () => {
  const atk = document.querySelector(".charAtk");
  atk.innerText = charAtkThisTurn + charCurrentBonusAtk;
};

const resetCharAtk = () => {
  thisTurnAttack = charCurrentBonusAtk;
  renderCharAtk;
};

const renderEnemyAtk = () => {
  const atk = document.querySelector(".enemyAtk");
  atk.innerText = enemyAtkThisTurn;
};

const renderEnemyDef = () => {
  const def = document.querySelector(".enemyDef");
  def.innerText = enemyDefThisTurn;
};

const initializeFightStats = () => {
  charFightMaxHP = charHP + charBonusHP; //only used to display max health value
  charCurrentHealth = charHP + charBonusHP;
  charCurrentBonusAtk = charBonusAtk;
  charCurrentDef = charDef;
  charCurrentBonusDef = charBonusArmor;
  charFightAP = charAP + charBonusAP;
  charDefThisTurn = 0;
  charAtkThisTurn = 0;
  enemyCurrentHealth = enemyHP;
};

//initialize fight
const initializeFight = () => {
  addButtonListeners();
  randomizeEnemy();
  randomizeEnemyAction();
  initializeFightStats();
  setDiceDisplay();
  setCharToon();
  setCharName();
  setEnemyToon();
  renderCharAP(charFightAP);
  renderCharHP();
  renderEnemyHP();
  renderCharAtk();
  renderCharDef();
  setCharAttack();
  renderEnemyAtk();
  renderEnemyDef();
};

//attack button
const charAttackMove = () => {
  if (charFightAP > 0) {
    charFightAP -= 1;
    renderCharAP(charFightAP);
    rollAllAttackDice(); //determine multiple attack dices this turn
    const thisRollAttack = charAttackArr.reduce((total, dice) => total + dice); //compute total damage
    charAtkThisTurn += thisRollAttack;

    //render dices
    renderDice1(charAttackArr[0]);
    renderDice2(charAttackArr[1]);
    renderDice3(charAttackArr[2]);

    //render
    renderCharAtk();
    updateBattleLog(
      `${charSelected} rolls ${thisRollAttack} points, next attack will deal ${
        charAtkThisTurn + charCurrentBonusAtk
      } damage!`
    );
  } else {
  }
};

//defend button
const charDefendMove = () => {
  if (charFightAP > 0) {
    charFightAP -= 1;
    renderCharAP(charFightAP);
    charDefThisTurn += charCurrentDef;
    updateBattleLog(
      `${charSelected} defends, for total of ${
        charDefThisTurn + charCurrentBonusDef
      } points!`
    );
    renderCharDef();
  } else {
  }
};

//end turn button
const charEndTurn = () => {
  updateBattleLog(`Resolving this turn..`);
  const charTotalAtkThisTurn = charAtkThisTurn + charBonusAtk;
  const charDamage =
    charTotalAtkThisTurn > enemyDefThisTurn
      ? charTotalAtkThisTurn - enemyDefThisTurn
      : 0;
  updateBattleLog(
    `${charSelected} attacks for ${charTotalAtkThisTurn} damage (reduced by ${currentEnemy}'s ${enemyDefThisTurn} defense)`
  );
  const enemyDamage =
    enemyAtkThisTurn > charDefThisTurn + charBonusArmor
      ? enemyAtkThisTurn - (charDefThisTurn + charBonusArmor)
      : 0;
  updateBattleLog(
    `${currentEnemy} attacks for ${enemyDamage} damage (reduced by ${charDefThisTurn} defense)
    `
  );
  charCurrentHealth -= enemyDamage;
  renderCharHP();
  renderCharHealthBar();
  charFightAP = 3;
  renderCharAP(charAP);
  charDefThisTurn = 0;
  renderCharDef();
  enemyCurrentHealth -= charDamage;
  renderEnemyHP();
  renderEnemyHealthBar();
  charAtkThisTurn = 0;
  renderCharAtk();
  randomizeEnemyAction();
  renderEnemyAtk();
  renderEnemyDef();
  if (charCurrentHealth <= 0) {
    stopAudio();
    goGameover();
    music("death");
  } else if (enemyCurrentHealth <= 0 && currentMapProgress === 7) {
    stopAudio();
    goWin();
    music("win");
  } else if (enemyCurrentHealth <= 0) {
    const enemyToon = document.querySelector("#enemyToon");
    const deathAnimation = `assets/${currentEnemy.toLowerCase()}death.gif`;
    enemyToon.setAttribute("src", deathAnimation);
    setTimeout(() => {
      updateBattleLog(`${charSelected} won the battle!`);
      updateBattleLog(`Going back to the map...`);
    }, 1400);
    stopAudio();
    setTimeout(goMap, 4000);
    removeEventListener();
    music("map");
  }
};

const goFight = () => {
  //previously goGame
  document.body.innerHTML = "";
  document.body.innerHTML = fightHtml;
  initializeFight();
};

///gameover
const gameoverHtml = `
<div class="gameoverContainer">
    <button onClick="window.location.reload()">Try Again</button>
</div>
    `;

const goGameover = () => {
  document.body.innerHTML = "";
  document.body.innerHTML = gameoverHtml;
  const btn = document.querySelector("button");
  btn.classList.add("tryAgain");
};

const winHtml = `
<div class="winContainer">
    <button onClick="window.location.reload()">Try A Different Character? :)</button>
</div>
    `;

const goWin = () => {
  document.body.innerHTML = "";
  document.body.innerHTML = winHtml;
  const btn = document.querySelector("button");
  btn.classList.add("tryAgain");
};
