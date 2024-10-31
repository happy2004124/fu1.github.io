class TreasureMap {
  static getInitialClue() {
      return new Promise(resolve => setTimeout(() => resolve("在古老的图书馆里找到了第一个线索..."), 1000));
  }

  static followClueToCave(clue) {
      return new Promise(resolve => setTimeout(() => resolve("线索引导你来到了一个神秘的洞穴..."), 1500));
  }

  static solvePuzzleInCave(cave) {
      return new Promise(resolve => setTimeout(() => resolve("你解开了洞穴中的古老机关，发现了一条秘密通道..."), 2000));
  }

  static avoidTrapAndFindKey(secretPath) {
      return new Promise(resolve => setTimeout(() => resolve("你巧妙地避开了陷阱，并找到了一把古老的钥匙！现在，你需要输入密码来解锁宝藏。"), 2500));
  }

  static enterCaveAndFindTreasure(password) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              if (password === "treasure") {
                  resolve("恭喜! 你勇敢地进入洞穴并找到了传说中的宝藏!");
              } else {
                  reject(new Error("密码错误，宝藏未能解锁。"));
              }
          }, 3000);
      });
  }
}

function updateOutput(message, image = null) {
  const outputDiv = document.getElementById('output');
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  outputDiv.appendChild(messageElement);

  if (image) {
      const imageElement = document.createElement('img');
      imageElement.src = image;
      imageElement.alt = 'Found Item';
      imageElement.classList.add('fade-in');
      outputDiv.appendChild(imageElement);
  }
}

async function findTreasure() {
  try {
      const firstClue = await TreasureMap.getInitialClue();
      updateOutput(firstClue);

      const cave = await TreasureMap.followClueToCave(firstClue);
      updateOutput(cave);

      const secretPath = await TreasureMap.solvePuzzleInCave(cave);
      updateOutput(secretPath);

      const keyMessage = await TreasureMap.avoidTrapAndFindKey(secretPath);
      updateOutput(keyMessage, 'images/08.png');
      document.getElementById('password-input').style.display = 'block';
      document.getElementById('unlock-treasure').style.display = 'block';
  } catch (error) {
      updateOutput(error.message, null, true);
  }
}

async function unlockTreasure() {
  try {
      const password = document.getElementById('password-input').value;
      const treasure = await TreasureMap.enterCaveAndFindTreasure(password);
      updateOutput(treasure, 'images/07.png');
      document.getElementById('password-input').style.display = 'none';
      document.getElementById('unlock-treasure').style.display = 'none';
  } catch (error) {
      updateOutput(error.message, null, true);
  }
}

document.getElementById('start-button').addEventListener('click', findTreasure);
document.getElementById('unlock-treasure').addEventListener('click', unlockTreasure);
