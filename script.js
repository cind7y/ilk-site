/**
 * CINDY DOWNLOADER - V18 "Snowy Update"
 * Sadece TikTok Aktif - Instagram Bakım Modunda
 */

let currentMode = 'tiktok'; // Varsayılan mod TikTok

/**
 * Mod Değiştirme Fonksiyonu
 * Instagram seçilirse engel koyar.
 */
function setMode(mode, btn) {
    if (mode === 'instagram') {
        // Kullanıcıya şık bir uyarı ver
        const statusText = document.getElementById('processText');
        const resArea = document.getElementById('result');
        
        resArea.classList.remove('hidden');
        statusText.style.color = "#ff4d4d";
        statusText.innerText = "Cindy: Instagram motoru şu an yılbaşı bakımında! Lütfen TikTok kullanın. 🛠️";
        
        // Robot panelini de güncelle
        document.getElementById('aiPanel').innerHTML = "<p>Üzgünüm! 🤖 Instagram şu an çalışmıyor, ama TikTok jet gibi!</p>";
        return;
    }

    currentMode = mode;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    console.log("Cindy Mod Değişti:", currentMode);
}

/**
 * AI Panel Kontrolü
 */
function toggleAi() {
    const panel = document.getElementById('aiPanel');
    panel.classList.toggle('hidden');
}

/**
 * ANA MOTOR - TIKTOK İNDİRME SİSTEMİ
 */
async function startProcess() {
    const urlInput = document.getElementById('videoUrl');
    const url = urlInput.value.trim();
    const resArea = document.getElementById('result');
    const loader = document.getElementById('loader');
    const statusText = document.getElementById('processText');
    const downloadBtn = document.getElementById('dlBtn');

    // Boş link kontrolü
    if (!url) {
        alert("Lütfen bir TikTok linki yapıştırın! ✨");
        return;
    }

    // Arayüzü Hazırla
    resArea.classList.remove('hidden');
    downloadBtn.classList.add('hidden');
    loader.classList.remove('hidden');
    statusText.style.color = "#00e5ff";
    statusText.innerText = "Cindy AI: TikTok videosu analiz ediliyor... ❄️";

    try {
        // TIKTOK MOTORU (Yedekli ve Stabil API)
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const result = await response.json();

        if (result.code === 0 && result.data.play) {
            const videoUrl = result.data.play;
            const authorName = result.data.author.unique_id || "TikTok_Video";

            // Başarı Durumu
            loader.classList.add('hidden');
            statusText.innerHTML = `
                <div style="margin-top:10px; border:1px solid #00e5ff; padding:10px; border-radius:15px; background:rgba(0,0,0,0.4);">
                    <p style="margin-bottom:10px;">✅ Video Hazır!</p>
                    <video width="100%" controls style="border-radius:10px;">
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                </div>
            `;

            downloadBtn.classList.remove('hidden');
            downloadBtn.innerText = "HEMEN İNDİR (HD)";

            // İndirme İşlemi (Blob Yöntemi ile Sitede Kalma)
            downloadBtn.onclick = async () => {
                downloadBtn.innerText = "İndiriliyor...";
                try {
                    const videoFetch = await fetch(videoUrl);
                    const blob = await videoFetch.blob();
                    const blobUrl = window.URL.createObjectURL(blob);
                    
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = `Cindy_${authorName}.mp4`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    downloadBtn.innerText = "TAMAMLANDI ✅";
                    setTimeout(() => { downloadBtn.innerText = "YENİDEN İNDİR"; }, 3000);
                } catch (err) {
                    // Blob engellenirse doğrudan aç
                    window.open(videoUrl, '_blank');
                }
            };

        } else {
            throw new Error("Video bulunamadı");
        }

    } catch (error) {
        console.error("Sistem Hatası:", error);
        loader.classList.add('hidden');
        statusText.style.color = "#ff4d4d";
        statusText.innerText = "Hata: TikTok linki hatalı veya video gizli olabilir! ❌";
    }
}
