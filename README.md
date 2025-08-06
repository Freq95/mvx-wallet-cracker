# 🛡️ MVX Wallet Cracker – Educational App

A React-based app that simulates a MultiversX wallet, allowing users to "crack" a fake seed phrase in a secure, educational environment.

---

## 🚀 Live Demo
[🔗 https://freq95.github.io/mvx-wallet-cracker/](https://freq95.github.io/mvx-wallet-cracker/)

---

## ⚠️ Disclaimer
> This is a **simulation for educational purposes only**. Never input real seed phrases.

---

## ✅ Features
- Fake 24-word seed phrase (blurred by default)
- "Crack wallet" input with attempt tracking
- Clipboard copy tracking
- EGLD balance + USD price via Coingecko
- Token & NFT count from MultiversX API
- Guardian lock simulation
- xPortal / Ledger login with MultiversX SDK

---

## ⚙️ Tech Stack
- ⚛️ React (CRA)
- 🎨 Tailwind CSS (dark mode)
- 🔐 @multiversx/sdk-dapp
- 📈 Coingecko API
- 🌍 GitHub Pages for deploy

---

## 🧪 Run Locally
```bash
git clone https://github.com/freq95/mvx-wallet-cracker.git
cd mvx-wallet-cracker
npm install
npm start
```
Visit 👉 `http://localhost:3000`

---

## 🌐 Deploy to GitHub Pages
Make sure your `package.json` includes:
```json
"homepage": "https://freq95.github.io/mvx-wallet-cracker"
```
Then run:
```bash
npm run build
npm run deploy
```
Set GitHub Pages to use `gh-pages / root`

---

## 🔐 Auth Setup (optional)
To enable xPortal / Ledger login:
```bash
npm install @multiversx/sdk-dapp
```
Wrap your app in `<DappProvider>` in `index.js`
Use `<LoginButton>` from the SDK inside your component

---

## 🛠️ Ideas for Future Features
- Smart contract logging (MultiversX chain)
- Leaderboard for cracking attempts
- Randomized seed generator
- Backend with Supabase or Firebase

---

## 📄 License
MIT – free to use and extend
