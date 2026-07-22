// ---------- Screen Control ----------

const screens = document.querySelectorAll(".screen");

function showScreen(id){
  screens.forEach(screen=>{
    screen.classList.remove("active");
  });

  document
    .getElementById(id)
    .classList.add("active");
}

// ---------- Music ----------

const bgMusic =
document.getElementById("bgMusic");

function startMusic(){

  bgMusic.play().catch(()=>{});

}

// ---------- Password ----------

const unlockBtn =
document.getElementById("unlockBtn");

const passwordInput =
document.getElementById("passwordInput");

const errorText =
document.getElementById("errorText");

unlockBtn.addEventListener("click",()=>{

  const value =
  passwordInput.value
  .trim()
  .toLowerCase();

  if(value === "pookie modhu"){

    errorText.textContent = "";

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

  const countdown =
  document.getElementById(
    "countdownNumber"
  );

  countdown.textContent = count;

  const timer =
  setInterval(()=>{

    count--;

    countdown.textContent = count;

    if(count <= 0){

      clearInterval(timer);

      createBalloons();

      showScreen(
        "balloon-screen"
      );

      startMusic();

    }

  },1000);

}

// ---------- Balloon Game ----------

let poppedCount = 0;

function createBalloons(){

  const container =
  document.getElementById(
    "balloonContainer"
  );

  container.innerHTML = "";

  poppedCount = 0;

  for(let i=0;i<5;i++){

    const balloon =
    document.createElement("div");

    balloon.className =
    "balloon";

    balloon.innerHTML =
    "🎈";

    balloon.addEventListener(
      "click",
      ()=>{

        balloon.classList.add(
          "popped"
        );

        poppedCount++;

        document
        .getElementById(
          "balloonStatus"
        )
        .textContent =
        `${poppedCount}/5 balloons popped`;

        if(poppedCount === 5){

          setTimeout(()=>{

            showScreen(
              "candle-screen"
            );

          },1000);

        }

      }
    );

    container.appendChild(
      balloon
    );

  }

}

// ---------- Candle ----------

const candle =
document.getElementById(
  "candle"
);

function candleDone(){

  candle.innerHTML =
  "💨";

  createHeartBurst();

  setTimeout(()=>{

    showScreen(
      "letter-screen"
    );

  },1500);

}

candle.addEventListener(
  "click",
  candleDone
);

// ---------- Microphone ----------

const micBtn =
document.getElementById(
  "enableMic"
);

micBtn.addEventListener(
  "click",
  async ()=>{

    try{

      const stream =
      await navigator
      .mediaDevices
      .getUserMedia({
        audio:true
      });

      const audioContext =
      new AudioContext();

      const source =
      audioContext
      .createMediaStreamSource(
        stream
      );

      const analyser =
      audioContext
      .createAnalyser();

      source.connect(
        analyser
      );

      const data =
      new Uint8Array(
        analyser.frequencyBinCount
      );

      function detect(){

        analyser
        .getByteFrequencyData(
          data
        );

        let volume = 0;

        for(
          let i=0;
          i<data.length;
          i++
        ){
          volume += data[i];
        }

        volume /=
        data.length;

        if(volume > 35){

          candleDone();

          return;

        }

        requestAnimationFrame(
          detect
        );

      }

      detect();

    }catch{

      alert(
      "Mic denied. Tap candle instead."
      );

    }

  }
);

// ---------- Typewriter Letter ----------

const envelope =
document.getElementById(
  "envelope"
);

const letterContent =
document.getElementById(
  "letterContent"
);

function typeWriterEffect(
  element
){

  const html =
  element.innerHTML;

  element.innerHTML = "";

  let i = 0;

  const timer =
  setInterval(()=>{

    element.innerHTML =
    html.slice(0,i);

    i++;

    if(
      i >
      html.length
    ){
      clearInterval(timer);
    }

  },8);

}

envelope.addEventListener(
  "click",
  ()=>{

    envelope.style.display =
    "none";

    letterContent.style.display =
    "block";

    typeWriterEffect(
      letterContent
    );

  }
);

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
document.getElementById(
  "galleryImage"
);

document.addEventListener(
  "click",
  function(e){

    if(
      e.target &&
      e.target.id ===
      "toGalleryBtn"
    ){

      showScreen(
        "gallery-screen"
      );

    }

  }
);

document
.getElementById(
  "nextBtn"
)
.addEventListener(
  "click",
  ()=>{

    currentPhoto++;

    if(
      currentPhoto >=
      photos.length
    ){
      currentPhoto = 0;
    }

    galleryImage.src =
    photos[currentPhoto];

  }
);

document
.getElementById(
  "prevBtn"
)
.addEventListener(
  "click",
  ()=>{

    currentPhoto--;

    if(
      currentPhoto < 0
    ){
      currentPhoto =
      photos.length - 1;
    }

    galleryImage.src =
    photos[currentPhoto];

  }
);

// Auto Slideshow

setInterval(()=>{

  const gallery =
  document.getElementById(
    "gallery-screen"
  );

  if(
    gallery.classList.contains(
      "active"
    )
  ){

    currentPhoto++;

    if(
      currentPhoto >=
      photos.length
    ){
      currentPhoto = 0;
    }

    galleryImage.src =
    photos[currentPhoto];

  }

},4000);

// ---------- Gift ----------

document
.getElementById(
  "toGiftBtn"
)
.addEventListener(
  "click",
  ()=>{

    showScreen(
      "gift-screen"
    );

  }
);

const gift =
document.getElementById(
  "giftBox"
);

gift.addEventListener(
  "dblclick",
  ()=>{

    gift.innerHTML =
    "💖";

    gift.style.transform =
    "scale(1.3)";

    createHeartBurst();

    setTimeout(()=>{

      showScreen(
        "final-screen"
      );

      createHeartBurst();

      createHeartBurst();

    },1500);

  }
);

// ---------- Heart Burst ----------

function createHeartBurst(){

  for(
    let i=0;
    i<25;
    i++
  ){

    const heart =
    document.createElement(
      "div"
    );

    heart.innerHTML =
    "💖";

    heart.style.position =
    "fixed";

    heart.style.left =
    Math.random()*100
    + "vw";

    heart.style.top =
    "100vh";

    heart.style.fontSize =
    (20+
    Math.random()*25)
    +"px";

    heart.style.zIndex =
    "9999";

    heart.style.transition =
    "all 4s linear";

    document.body
    .appendChild(
      heart
    );

    setTimeout(()=>{

      heart.style.top =
      "-20vh";

      heart.style.opacity =
      "0";

    },50);

    setTimeout(()=>{

      heart.remove();

    },4000);

  }

}
