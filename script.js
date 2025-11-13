const canvas = document.getElementById("cartaCanvas");
const ctx = canvas.getContext("2d");
const papel3d = document.getElementById("papel3d");
const papelMsg = document.getElementById("papelMsg");
const closeBtn = document.getElementById("closeBtn");
const subtitle = document.getElementById("subtitle");
const bgFade = document.getElementById("bgFade");
const openSound = document.getElementById("openSound");
const closeSound = document.getElementById("closeSound");
const bgMusic = document.getElementById("bgMusic");
let open = false;

// Dibuja la carta cerrada
function drawCarta() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(50, 80, 300, 150);
  ctx.strokeStyle = "#b5838d";
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 80, 300, 150);
  ctx.fillStyle = "#b5838d";
  ctx.beginPath();
  ctx.moveTo(50, 80);
  ctx.lineTo(200, 180);
  ctx.lineTo(350, 80);
  ctx.closePath();
  ctx.fill();
}
drawCarta();

// Mensaje personalizado
let para = "Mi querida amiga 💐";
let mensaje = `Hola ${para},

Quiero aprovechar este pequeño detalle para recordarte lo valiosa que eres. 
Gracias por estar siempre presente, por escuchar, por hacerme reír 
y por compartir tantos momentos que se vuelven recuerdos bonitos. 💫

No todos los días se encuentra una amistad sincera, y por eso 
quiero que sepas que te aprecio muchísimo. Eres una persona 
increíble, con una luz muy especial que alegra a todos los que te rodean. 🌞

Si algún día las cosas se ponen difíciles, recuerda que aquí tienes 
a alguien que te estima de verdad y que siempre va a desearte lo mejor. 💕

Gracias por tu amistad. 🌷

Con mucho cariño,  
Carlos 💌`;


// Efecto máquina de escribir
function escribirTexto(texto, elemento, velocidad = 50) {
  elemento.innerHTML = "";
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.innerHTML += texto[i];
    i++;
    if (i >= texto.length) clearInterval(intervalo);
  }, velocidad);
}

// Corazones flotantes
function crearCorazon() {
  const corazon = document.createElement("div");
  corazon.classList.add("corazon");
  corazon.innerHTML = "❤️";
  corazon.style.left = Math.random() * 100 + "vw";
  corazon.style.bottom = "0px";
  document.body.appendChild(corazon);
  setTimeout(() => corazon.remove(), 4000);
}

// Abrir carta
canvas.addEventListener("click", () => {
  if (!open) {
    open = true;
    gsap.to(canvas, { y: -80, opacity: 0, duration: 1 });
    setTimeout(() => {
      papel3d.classList.add("visible");
      escribirTexto(mensaje, papelMsg, 45);
      bgFade.classList.add("bg-fade-dark");
      closeBtn.classList.add("visible");
      subtitle.style.opacity = 0;
      openSound.play();
      bgMusic.play();
      setInterval(crearCorazon, 400);
    }, 800);
  }
});

// Cerrar carta
closeBtn.addEventListener("click", () => {
  open = false;
  papel3d.classList.remove("visible");
  bgFade.classList.remove("bg-fade-dark");
  closeBtn.classList.remove("visible");
  gsap.to(canvas, { y: 0, opacity: 1, duration: 1 });
  subtitle.style.opacity = 1;
  closeSound.play();
  bgMusic.pause();
});
