# HTabel

## 📖 Projekti kirjeldus

Käesolev projekt on API-põhine süsteem, mille eesmärk on parandada navigatsiooni meditsiiniasutustes. Süsteem võimaldab hallata hoone struktuuri ja pakkuda kasutajatele lihtsat ning arusaadavat viisi vajaliku asukoha leidmiseks.

Projekt aitab vähendada patsientide eksimist hoones, parandada kasutajakogemust ning vähendada meditsiinitöötajate töökoormust.

---

## 🧱 Arhitektuur
### 🖥️ Backend
- Node.js
- Sequelize (ORM)

### 🎨 Frontend  
- HTML
- CSS
- JavaScript

### 🗄️ Andmebaas
- MySQL

---

## ⚙️ Funktsionaalsus
- Hoone struktuuri haldamine (korrused, ruumid)
- Asukohtade otsimine
- API kaudu andmete pärimine ja haldamine
- Lihtne kasutajaliides navigeerimiseks

---

## 📂 Projekti struktuur
```
/HTabel
│
├── config
├── controllers
├── models
├── routes
├── public
│
├── .env
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 👤 Autor

Anzhelika Kichatova 

---

## 🚀 Paigaldus ja käivitamine

1. Klooni projekt:
```bash
git clone https://github.com/kichatik/htable.git
```

2. Paigalda sõltuvused:
```bash
npm install
```

3. Loo `.env` fail:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=htable
```

4. Käivita server:
```bash
npm start
```
