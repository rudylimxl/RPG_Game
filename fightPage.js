const fightHtml = ` 
<div class="fightContainer">
<div class="charFightContainer">
  <div class="charHealthBarContainer">
    <p>Char</p>
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
</div>
<div class="battleLogContainer">
  <ul class="battleLog"> 
    <li> Battle Started! </li>
  </ul>
</div>
</div>`;
