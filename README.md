# Gondavalekar Maharaj Upasana PWA

Spiritual Progressive Web App for **Shri Brahmachaitanya Gondavalekar Maharaj**.

**Features**
- About Maharaj, Upasana meaning, daily schedule (Gondavale Samadhi Mandir)
- Core teachings (Subodh)
- Full UI in **English / हिंदी / मराठी**
- Share schedule & mantra on WhatsApp
- App notifications + Google Calendar reminders
- Installable PWA with offline support

**Mantra:** श्री राम जय राम जय जय राम

---

## Deploy on GitHub + Cloudflare Pages (recommended)

### 1. Create GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name example: `gondavalekar-upasana`
3. Keep it **Public**
4. Do **not** add README / .gitignore (we already have them)
5. Click **Create repository**

### 2. Upload this project

**Option A – GitHub website (easiest)**
1. On the new empty repo page click **uploading an existing file**
2. Drag & drop **all files and folders** from this package (or the extracted zip contents)
3. Commit message: `Initial commit - Gondavalekar Maharaj Upasana PWA`
4. Click **Commit changes**

**Option B – Git command line**
```bash
git clone https://github.com/YOUR_USERNAME/gondavalekar-upasana.git
cd gondavalekar-upasana
# copy all files from this package into the folder
git add .
git commit -m "Initial commit - Gondavalekar Maharaj Upasana PWA"
git push -u origin main
```

### 3. Connect to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Authorize Cloudflare and select the repository `gondavalekar-upasana`
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (root)
4. Click **Save and Deploy**
5. Wait 1–2 minutes. Cloudflare gives you a URL like:  
   `https://gondavalekar-upasana.pages.dev`

### 4. (Optional) Custom domain

In Cloudflare Pages project → **Custom domains** → add your domain and follow DNS instructions.

---

## Local testing

```bash
# Python
python3 -m http.server 8080

# or Node
npx serve .
```

Open `http://localhost:8080`

---

## Project structure

```
├── index.html          # Main app
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker (offline)
├── css/styles.css
├── js/
│   ├── app.js
│   └── i18n.js         # English / Hindi / Marathi
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## Notes

- Notifications and “Add to Home Screen” work best over **HTTPS** (Cloudflare provides this automatically).
- Google Calendar links open the official Google Calendar create-event page.
- WhatsApp share uses `wa.me` deep links.

ॐ श्री ब्रह्मचैतन्य गोंदवलेकर महाराजार्पणमस्तु
