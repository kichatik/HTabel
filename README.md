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
- Broneerimine arstide külastajatele
- Arstide vastuvõtu tabeli vaatamine 

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
├── utils
│
├── .env
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Paigaldus ja käivitamine

1. Klooni projekt:
```bash
git clone https://github.com/kichatik/htable.git
```

2. Paigalda sõltuvused:
```bash
npm install
npm install nodemailer
npm install dotenv
```

3. Loo `.env` fail:
```env
DB_NAME=haigla_db
DB_USER=root
DB_PASS=
DB_HOST=localhost
SESSION_SECRET=some_long_random_secret_key_XXXX
EMAIL_USER=yourmailk@gmail.com
EMAIL_PASS="xxxx xxxx xxxx xxxx"
```

4. Käivita server:
```bash
npm start
```
---

## 👤 Autor

Anzhelika Kichatova 

---
