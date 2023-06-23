const generateAudio = (type) => {
  if (type === "start") {
    const audio = document.createElement("audio");
    audio.setAttribute("src", "assets/music/Start.mp3");
    document.body.appendChild(audio);
  } else if (type === "map") {
    const audio = document.createElement("audio");
    const randomnumber = Math.ceil(Math.random() * 9);
    audio.setAttribute("src", `assets/music/Ambient${randomnumber}.mp3`);
    document.body.appendChild(audio);
  } else if (type === "fight") {
    const audio = document.createElement("audio");
    const randomnumber = Math.ceil(Math.random() * 5);
    audio.setAttribute("src", `assets/music/Action${randomnumber}.mp3`);
    document.body.appendChild(audio);
  } else if (type === "death") {
    const audio = document.createElement("audio");
    audio.setAttribute("src", "assets/music/Death.mp3");
    document.body.appendChild(audio);
  } else if (type === "win") {
    const audio = document.createElement("audio");
    audio.setAttribute("src", "assets/music/Victory.mp3");
    document.body.appendChild(audio);
  }
};

const stopAudio = () => {
  const audio = document.querySelector("audio");
  audio.pause();
};

const playAudio = () => {
  const audio = document.querySelector("audio");
  audio.play();
};

const music = (type) => {
  generateAudio(type);
  playAudio();
};
