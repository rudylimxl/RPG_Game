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
  stopAudio();
  goHome();
  music("map");
};

const mapBtnEventListenerToForest = () => {
  currentMapProgress += 1;
  stopAudio();
  goForest();
  music("fight");
};

const mapBtnEventListenerToTavern = () => {
  currentMapProgress += 1;
  stopAudio();
  goTavern();
  music("map");
};

const mapBtnEventListenerToTower = () => {
  currentMapProgress += 1;
  stopAudio();
  goTower();
  music("fight");
};

const mapBtnEventListenerToCave = () => {
  currentMapProgress += 1;
  stopAudio();
  goCave();
  music("fight");
};

const mapBtnEventListenerToVillage = () => {
  currentMapProgress += 1;
  stopAudio();
  goVillage();
  music("map");
};

const mapBtnEventListenerToGraveyard = () => {
  currentMapProgress += 1;
  stopAudio();
  goGraveyard();
  music("fight");
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
    const itemUrl = constructAssetPath(i, "png");
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
  stopAudio();
  document.body.innerHTML = "";
  document.body.innerHTML = mapHtml;
  drawMapPath(currentMapProgress);
  addMapBtnListener(currentMapProgress, nodes[currentMapProgress]);
  renderItemsBar(charCurrentItems);
  music("map");
};

////////////// 3.0 Home
const homeHtml = `<div class="homeContainer">
<h2 class="homeText"></h2>
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

const generateItemChoices = () => {
  const items = document.querySelectorAll(".homeItem");
  for (let i of items) {
    const selectedItem = rollItem();
    i.style.background = `url(assets/${selectedItem.name}.png)`;
    i.style.backgroundRepeat = "no-repeat";
    i.style.backgroundPosition = "top center";
    i.style.backgroundColor = "lightgray";
    i.setAttribute("id", `${selectedItem.name}`);
    i.innerText = `${selectedItem.name}
    ${selectedItem.effect}`;
    i.addEventListener("click", pickItem);
  }
};

const generateItemHtml = (input) => {
  document.body.innerHTML = "";
  document.body.innerHTML = homeHtml;
  const message = document.querySelector(".homeText");
  message.innerText = input;
  generateItemChoices();
};

const goHome = () => {
  generateItemHtml(
    "Home sweet home! You found some items in the storeroom. Choose one."
  );
};

////////////////// 3.1 Forest
const generateFightHtml = (location) => {
  document.body.innerHTML = "";
  document.body.innerHTML = fightHtml;
  const fightContainer = document.querySelector(".fightContainer");
  fightContainer.setAttribute("id", `${location}`);
  initializeFight();
};

const goForest = () => {
  generateFightHtml("forest");
};

////////////////// 3.2 Tavern
const goTavern = () => {
  generateItemHtml(
    "You find a tavern offering a selection of equipments. Select one."
  );
};

////////////////// 3.3 Tower
const goTower = () => {
  generateFightHtml("tower");
};

////////////////// 3.4 Cave
const goCave = () => {
  generateFightHtml("cave");
};

//////////// 3.5 Village
const goVillage = () => {
  generateItemHtml(
    "The friendly villagers offered items to help you on your journey. Select one."
  );
};

////////////////// 3.6 Graveyard
const goGraveyard = () => {
  generateFightHtml("graveyard");
};
