# Ngöndro Counter

Minimalistická webová aplikace pro počítání meditačních opakování v tibetském buddhismu.

## Rychlý start / Quick Start

1. Otevřete `index.html` v prohlížeči
2. Klikněte kamkoli na obrazovku pro zvýšení čítače
3. Použijte tlačítko **1/2** pro přepnutí režimu
4. Použijte **menu** ikonu pro nastavení

## Funkce / Features

### Režim 1: Jednoduchý čítač
- Počítání mantry nebo jiných opakování
- Vizuální progress bar
- Defaultní maximum: 108

### Režim 2: Čítač poklon
- Počítání sad poklon
- Automatický výpočet celkového počtu (× 6)
- Ideální pro fyzickou praxi

## Klávesové zkratky / Keyboard Shortcuts

- **Space / Enter**: Zvýšit čítač
- **M**: Přepnout režim
- **Escape**: Zavřít menu
- **R**: Reset (v menu)
- **S**: Přepnout zvuk (v menu)

## Technologie / Technologies

- **HTML5** - sémantická struktura
- **CSS3** - BEM metodika, CSS proměnné
- **Vanilla JavaScript** - žádné závislosti
- **Lucide Icons** - moderní SVG ikony
- **Service Worker** - offline funkcionalita
- **PWA** - Progressive Web App
- **Web Audio API** - syntetické zvukové efekty

## Struktura projektu / Project Structure

```
lab_counter/
├── index.html          # Hlavní HTML struktura
├── style.css           # CSS styly s BEM
├── app.js              # JavaScript logika
├── sounds.js           # Zvukový manager (Web Audio API)
├── sw.js               # Service Worker
├── manifest.json       # PWA manifest
├── icon.svg            # SVG ikona
├── icon-192.png        # PWA ikona 192x192
├── icon-512.png        # PWA ikona 512x512
├── projectplan.md      # Plán a review projektu
├── ARTICLE.cz.md       # Česká dokumentace (30 000+ znaků)
├── ARTICLE.en.md       # Anglická dokumentace (30 000+ znaků)
└── README.md           # Tento soubor
```

## Vlastnosti / Features

✓ Minimalistický černobílý design
✓ Plně responsivní (mobil, tablet, desktop)
✓ LocalStorage persistence
✓ Klávesové zkratky
✓ Accessibility (ARIA labels)
✓ **PWA - Progressive Web App**
✓ **Offline-ready s Service Worker**
✓ **Instalovatelné na home screen**
✓ **Zvukové efekty** (klik, milníky, dokončení)
✓ **Web Audio API** (bez externích audio souborů)
✓ Žádné závislosti (kromě Lucide CDN)

## Velikost / Size

- `index.html`: 3.9 KB
- `style.css`: 8.2 KB
- `app.js`: 6.2 KB
- **Celkem**: ~18 KB (bez komprese)

## Podporované prohlížeče / Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Zvukové efekty / Sound Effects

Aplikace obsahuje tři typy syntetických zvuků generovaných pomocí Web Audio API:

### Typy zvuků / Sound Types

1. **Click** - Jemný zvuk při každém kliknutí (800 Hz, 50ms)
2. **Milestone** - Příjemný akord při dosažení 25%, 50%, 75% (C dur akord)
3. **Completion** - Vzestupné tóny při dokončení cíle (C5-E5-G5-C6)

### Ovládání / Controls

- Zapnout/vypnout: Otevřít menu → tlačítko "Sound: ON/OFF"
- Klávesová zkratka: **S** (v otevřeném menu)
- Preference se ukládá do localStorage

### Výhody Web Audio API

✓ **Žádné externí soubory** - zvuky generované v prohlížeči
✓ **Malá velikost** - pouze ~5 KB JavaScript kódu
✓ **Offline-ready** - funguje bez internetového připojení
✓ **Nízká latence** - okamžitá odezva
✓ **Přizpůsobitelné** - snadná úprava frekvence a délky

## PWA instalace a testování / PWA Installation & Testing

### Lokální testování / Local Testing

1. Spusťte lokální server (HTTPS nebo localhost):
```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

2. Otevřete `http://localhost:8000` v prohlížeči

3. Otevřete DevTools (F12):
   - **Chrome/Edge**: Application tab → Manifest / Service Workers
   - **Firefox**: Storage tab → Service Workers

### Instalace na mobilu / Mobile Installation

1. Otevřete aplikaci v mobilním prohlížeči (Chrome/Safari)
2. V menu vyberte **"Add to Home Screen"** nebo **"Install"**
3. Ikona aplikace se objeví na home screen
4. Aplikace se spustí v standalone režimu (bez browser UI)

### PWA Checklist

✓ **Manifest.json** - Web App Manifest s metadaty
✓ **Service Worker** - Stale-While-Revalidate strategie
✓ **Icons** - 192x192 a 512x512 PNG ikony
✓ **Meta tags** - theme-color, apple-mobile-web-app
✓ **Offline** - Aplikace funguje bez internetu
✓ **HTTPS** - Nutné pro produkci (localhost je OK pro testování)

## Dokumentace / Documentation

Detailní dokumentace je k dispozici v:
- [ARTICLE.cz.md](ARTICLE.cz.md) - Česká verze
- [ARTICLE.en.md](ARTICLE.en.md) - English version

## Licence / License

Open source - lze použít pro osobní i komerční účely.

---

**Vytvořeno s důrazem na jednoduchost a výkon**
*Created with focus on simplicity and performance*
