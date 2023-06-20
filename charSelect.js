const constructAssetUrl = (name, type) => {
  return `url(assets/"${name}.${type})`;
};

const constructAssetPath = (name, type) => {
  return `assets/${name}.${type}`;
};

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
