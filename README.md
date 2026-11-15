# Sisu Danışmanlık — Web Sitesi

**Sisu Danışmanlık** için tek sayfalık tanıtım (landing page) sitesi.

🌐 **Canlı site:** https://ardacengaver8.github.io/sisu-website/

> *Sisu* (Fince): zorluklara karşı içsel güç, dayanıklılık, azim ve kararlılık.

## Sayfa bölümleri

| # | Bölüm | İçerik |
|---|-------|--------|
| — | Hero | Kaydırdıkça dağınık parçacıkların ufka uzanan bir yola dönüştüğü animasyon |
| 01 | Sisu | Kelimenin anlamı ve şirketin duruşu |
| 02 | Uzmanlıklar | 7 hizmet alanı |
| 03 | Deneyim | Rakamlar ve kurucunun kariyer zaman çizelgesi |
| 04 | Yaklaşım | Çalışma prensipleri |
| 05 | İletişim | E-posta, telefon, adres |

## Teknik

- Düz **HTML + CSS + JavaScript**. Framework yok, kurulum veya build adımı yok.
- Tüm sayfa tek dosyada: [`index.html`](index.html)
- Parçacık animasyonu `<canvas>` ile yazıldı, harici kütüphane kullanılmıyor.
- Yazı tipleri: Google Fonts (Instrument Serif, Inter).
- Mobil uyumlu; "hareketi azalt" sistem ayarını açmış ziyaretçiler için animasyonlar kapanır.

## Yerelde çalıştırma

`index.html` dosyasını tarayıcıda açmanız yeterli. İsterseniz küçük bir sunucuyla da açabilirsiniz:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Yayına alma

Site **GitHub Pages** ile yayınlanır: `main` branch'ine yapılan her push birkaç dakika içinde canlı siteye yansır.

## Düzenleme rehberi

| Değiştirmek istediğiniz | `index.html` içinde nereye bakmalı |
|---|---|
| Renkler, yazı tipleri | En üstteki `:root { ... }` bloğu |
| Metinler | İlgili `<section id="...">` blokları (`sisu`, `uzmanliklar`, `deneyim`, `yaklasim`, `iletisim`) |
| İletişim bilgileri | `#iletisim` bölümü |
| Animasyon | Sayfanın sonundaki `<script>` içinde "Particle field" kısmı |
