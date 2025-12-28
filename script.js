const alan = document.getElementById("alan");
const puanYazi = document.getElementById("puan");
const seviyeYazi = document.getElementById("seviye");
const rekorYazi = document.getElementById("rekor");
const boom = document.getElementById("boom");

let seviye = 1;
let puan = 0;
let oyunBitti = false;

const size = 5;               // 5x5
const kutuSayisi = size * size;
let mayinSayisi;
let mayinlar = new Set();

let rekor = Number(localStorage.getItem("rekor")) || 0;
rekorYazi.innerText = rekor;

function baslat() {
  alan.innerHTML = "";
  oyunBitti = false;

  mayinSayisi = 3 + seviye;   // seviye arttıkça zor
  seviyeYazi.innerText = seviye;
  puanYazi.innerText = puan;
  rekorYazi.innerText = rekor;

  mayinlar.clear();
  while (mayinlar.size < mayinSayisi) {
    mayinlar.add(Math.floor(Math.random() * kutuSayisi));
  }

  for (let i = 0; i < kutuSayisi; i++) {
    const btn = document.createElement("button");
    btn.className = "kutu";
    btn.textContent = "?";
    btn.onclick = () => tikla(btn, i);
    alan.appendChild(btn);
  }
}

function komsuMayinSay(index) {
  const x = index % size;
  const y = Math.floor(index / size);
  let c = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
        const ni = ny * size + nx;
        if (mayinlar.has(ni)) c++;
      }
    }
  }
  return c;
}

function tikla(btn, index) {
  if (oyunBitti || btn.disabled) return;

  if (mayinlar.has(index)) {
    btn.textContent = "💣";
    btn.classList.add("mayin");
    oyunBitti = true;

    // ses + titreşim
    boom.currentTime = 0; boom.play();
    if (navigator.vibrate) navigator.vibrate([100, 60, 120]);

    if (puan > rekor) {
      rekor = puan;
      localStorage.setItem("rekor", rekor);
      rekorYazi.innerText = rekor;
    }

    alert("💥 BOOM! Oyun bitti!");
    seviye = 1;
    puan = 0;
    return;
  }

  const n = komsuMayinSay(index);
  btn.textContent = n === 0 ? "✔" : n;
  btn.classList.add("guvenli");
  btn.disabled = true;

  puan++;
  puanYazi.innerText = puan;

  const acilan = document.querySelectorAll(".guvenli").length;
  if (acilan >= kutuSayisi - mayinSayisi) {
    alert("🎉 Seviye Atladın!");
    seviye++;
    baslat();
  }
}

function yenidenBasla() {
  seviye = 1;
  puan = 0;
  baslat();
}

function temaDegistir() {
  document.body.classList.toggle("neon");
}

function tamEkran() {
  const el = document.documentElement;
  if (!document.fullscreenElement) {
    el.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

baslat();
