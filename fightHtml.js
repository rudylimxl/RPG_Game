const fightHtml = ` 
<div class="fightContainer">
<div class="charFightContainer">
  <div class="charHealthBarContainer">
    <p class="charName">Char</p>
    <div class="healthBarBg">
      <div class="charHealthBar"></div>
    </div>
    <p class="charHealth"> a </p>
  </div>
  <div class="charToon">
    <img
      src=""
      id="charToon"
    />
  </div>
  <div class="cardContainer">
    <button class="fightBtn" id="charAtkBtn">Attack</button>
    <button class="fightBtn" id="charDefBtn">Defend</button>
    <button class="fightBtn" id="charEndTurnBtn">End Turn</button>
  </div>
  <div class="charStatusContainer">
    <div class="apBar">
      <p class = "charAP"></p>
    </div>
    <div class="charAtk">0</div>
    <div class="charDef">0</div>
  </div>
  <div class="diceContainer">
    <img src="" class="dice" id="dice1">
    <img src="" class="dice" id="dice2">
    <img src="" class="dice" id="dice3">
  </div>
</div>
<div class="enemyContainer">
  <div class="enemyHealthBarContainer">
    <p id="enemyName">Enemy</p>
    <div class="healthBarBg">
      <div class="enemyHealthBar"></div>
    </div> 
    <p class="enemyHealth"> a </p>
  </div>
  <div class="enemyToon">
    <img
      src=""
      id="enemyToon"
    />
  </div>
  <div class="charStatusContainer">
    <div class="enemyAtk">0</div>
    <div class="enemyDef">0</div>
  </div>
</div>
<div class="battleLogContainer">
  <ul class="battleLog"> 
    <li> Battle Started! </li>
  </ul>
</div>
</div>`;
