// 1. SENİN TELEFON VERİLERİN
const telefonlar = [
    { 
        ad: "iPhone 13", 
        fiyat: "29.000 TL", 
        resim: "https://image5.sahibinden.com/marketplaceTemplate/13/51/64/big_apple-iphone-13-beyaz-3.jpg" 
    },
    { 
        ad: "iPhone 16 Pro", 
        fiyat: "56.999 TL", 
        resim: "https://cdn.dsmcdn.com/mnresize/420/620/ty1608/prod/QC/20241202/10/6bf6977f-2792-31a8-bcf8-07499d9284dc/1_org_zoom.jpg" 
    },
    { 
        ad: "iPhone 11", 
        fiyat: "17.850 TL", 
        resim: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone11-white-select-2019?wid=940&hei=1112&fmt=p-jpg&qlt=80&.v=1567021770073" 
    },
    { 
        ad: "Samsung S24 Ultra", 
        fiyat: "57.000 TL", 
        resim: "https://cdn.dsmcdn.com/ty1117/product/media/images/prod/PIM/20240103/11/12d1689d-de8c-4452-a537-ca4a811de0fe/1_org_zoom.jpg" 
    }
];

// --- DİĞER FONKSİYONLAR (Kar Yağışı ve Site Açılışı) ---

// Kar yağışı için canvas ayarları
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function createSnow() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            d: Math.random() * 1
        });
    }
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let p of particles) {
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    updateSnow();
}

function updateSnow() {
    for (let p of particles) {
        p.y += Math.cos(p.d) + 1 + p.r / 2;
        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    }
}

function siteyiAc() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
    telefonlariGoster(telefonlar);
    setInterval(drawSnow, 30);
}

function telefonlariGoster(liste) {
    const konteyner = document.getElementById("telefon-listesi");
    konteyner.innerHTML = "";
    liste.forEach(tel => {
        konteyner.innerHTML += `
            <div class="card">
                <img src="${tel.resim}" alt="${tel.ad}">
                <h3>${tel.ad}</h3>
                <p class="price">${tel.fiyat}</p>
                <button onclick="siparisVer('${tel.ad}')">Satın Al</button>
            </div>
        `;
    });
}

function aramaYap() {
    let kelime = document.getElementById("aramaKutusu").value.toLowerCase();
    let sonuc = telefonlar.filter(tel => tel.ad.toLowerCase().includes(kelime));
    telefonlariGoster(sonuc);
}

function siparisVer(ad) {
    let mesaj = "Merhaba, " + ad + " almak istiyorum. Stokta var mı?";
    window.location.href = "https://wa.me/905000000000?text=" + encodeURIComponent(mesaj);
}

createSnow();
