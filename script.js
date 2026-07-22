// ---------- Helpers ----------

const screens = document.querySelectorAll(".screen");

function showScreen(id){
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ---------- Password ----------

const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const errorText = document.getElementById("errorText");

unlockBtn.addEventListener("click", () => {

  const value = passwordInput.value.trim().toLowerCase();

  if(value === "pookie modhu"){
    startCountdown();
  }else{
    errorText.textContent =
      "Hmm... that's not the nickname I'm looking for 😏";
  }

});

// ---------- Countdown ----------

function startCountdown(){

  showScreen("countdown-screen");

  let count = 3;

  const el = document.getElementById("countdownNumber");

  el.textContent = count;

  const interval = setInterval(() => {

    count--;

    el.textContent = count;

    if(count <= 0){

      clearInterval(interval);

      createBalloons();

      showScreen("balloon-screen");

      startMusic();

    }

  },1000);

}

// ---------- Music ----------

function startMusic(){

  const music = document.getElementById("bgMusic");

  music.play().catch(()=>{});

}

// ---------- Balloons ----------

let poppedCount = 0;

function createBalloons(){

  const container =
    document.getElementById("balloonContainer");

  container.innerHTML = "";

  poppedCount = 0;

  for(let i=0;i<10;i++){

    const balloon =
      document.createElement("div");

    balloon.className = "balloon";

    balloon.innerHTML = "🎈";

    balloon.addEventListener("click",()=>{

      balloon.classList.add("popped");

      poppedCount++;

      document.getElementById("balloonStatus")
      .textContent =
      `${poppedCount}/10 balloons popped`;

      if(poppedCount === 10){

        setTimeout(()=>{
          showScreen("candle-screen");
        },1000);

      }

    });

    container.appendChild(balloon);

  }

}

// ---------- Candle ----------

const candle =
document.getElementById("candle");

candle.addEventListener("click", candleDone);

function candleDone(){

  candle.innerHTML = "💨";

  setTimeout(()=>{
    showScreen("letter-screen");
  },1500);

}

// ---------- Microphone ----------

const micBtn =
document.getElementById("enableMic");

micBtn.addEventListener("click", async ()=>{

  try{

    const stream =
      await navigator.mediaDevices.getUserMedia({
        audio:true
      });

    const audioContext =
      new AudioContext();

    const source =
      audioContext.createMediaStreamSource(stream);

    const analyser =
      audioContext.createAnalyser();

    source.connect(analyser);

    const data =
      new Uint8Array(analyser.frequencyBinCount);

    function detect(){

      analyser.getByteFrequencyData(data);

      let volume = 0;

      for(let i=0;i<data.length;i++){
        volume += data[i];
      }

      volume /= data.length;

      if(volume > 35){
        candleDone();
        return;
      }

      requestAnimationFrame(detect);

    }

    detect();

  }catch(err){

    alert(
      "Microphone access denied. Tap the candle instead."
    );

  }

});

// ---------- Letter ----------

const envelope =
document.getElementById("envelope");

const letterContent =
document.getElementById("letterContent");

envelope.addEventListener("click",()=>{

  envelope.style.display = "none";

  letterContent.style.display = "block";

});

// ---------- Gallery ----------

const photos = [
"photo1.jpg",
"photo2.jpg",
"photo3.jpg",
"photo4.jpg",
"photo5.jpg",
"photo6.jpg",
"photo7.jpg",
"photo8.jpg",
"photo9.jpg",
"photo10.jpg"
];

let currentPhoto = 0;

const galleryImage =
document.getElementById("galleryImage");

document
.getElementById("toGalleryBtn")
.addEventListener("click",()=>{

  showScreen("gallery-screen");

});

document
.getElementById("nextBtn")
.addEventListener("click",()=>{

  currentPhoto++;

  if(currentPhoto >= photos.length){
    currentPhoto = 0;
  }

  galleryImage.src =
  photos[currentPhoto];

});

document
.getElementById("prevBtn")
.addEventListener("click",()=>{

  currentPhoto--;

  if(currentPhoto < 0){
    currentPhoto = photos.length - 1;
  }

  galleryImage.src =
  photos[currentPhoto];

});

document
.getElementById("toGiftBtn")
.addEventListener("click",()=>{

  showScreen("gift-screen");

});

// ---------- Gift ----------

const gift =
document.getElementById("giftBox");

gift.addEventListener("dblclick",()=>{

  gift.innerHTML = "💖";

  setTimeout(()=>{

    showScreen("final-screen");

  },1200);

});
