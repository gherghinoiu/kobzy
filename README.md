# Kobzy — Used Car Website

A fast, SEO-friendly website for **Kobzy**, built with [Eleventy](https://www.11ty.dev/)
and hosted **free** on GitHub Pages. Adding a new car takes about two minutes and
requires no coding.

- **Live site:** https://kobzy.co.uk
- **Add / edit cars:** the `src/cars/` folder (one file per car)
- **Change phone number, hours, business name, etc:** `src/_data/site.json`

---

## ⭐ How to add a new car

**The easy way (for the seller — from a phone):** use the built-in admin panel at
**`kobzy.co.uk/admin`**. Log in with GitHub, tap **Cars → New Car**, fill the form,
add photos from the camera roll, paste a YouTube link for video, and press
**Publish**. One-time setup steps are in **[docs/ADMIN-SETUP.md](docs/ADMIN-SETUP.md)**.

**The manual way (for a developer):** every car is also just a single text file
in the **`src/cars/`** folder — details below.

### 1. Create the car's photo folder
Inside `src/assets/cars/`, make a **new folder** named after the car, using
lowercase letters and dashes (no spaces), e.g:

```
src/assets/cars/2020-ford-fiesta-titanium/
```

Put all the car's photos in that folder (`photo-1.jpg`, `photo-2.jpg`, …).
**Tip:** name the best photo `photo-1.jpg` — it becomes the main/cover image.

### 2. Copy an existing car file
In `src/cars/`, copy `mercedes-benz-c280-v6-automatic.md` and rename the copy to
match the folder, e.g. `2020-ford-fiesta-titanium.md`. **The file name becomes the
web address:** `kobzy.co.uk/cars/2020-ford-fiesta-titanium/`

### 3. Fill in the details
Open the new file and edit the section at the top between the `---` lines:

```yaml
date: 2026-08-20          # today's date — newest cars show first
sold: false               # set to true when it sells
make: Ford
model: Fiesta
trim: Titanium 1.0 EcoBoost
year: 2020
price: 9495               # numbers only — no £ or commas
mileage: 28000            # numbers only — no commas
fuel: Petrol
transmission: Manual
engine: 1.0L
bodystyle: Hatchback
colour: Magnetic Grey
doors: 5
owners: 1
mot: "March 2026"
description: "One-owner 2020 Ford Fiesta Titanium, 28,000 miles..."   # ~150 chars for Google
images:                   # full path: /assets/cars/<your-folder>/<file>
  - /assets/cars/2020-ford-fiesta-titanium/photo-1.jpg
  - /assets/cars/2020-ford-fiesta-titanium/photo-2.jpg
  - /assets/cars/2020-ford-fiesta-titanium/photo-3.jpg
video: ""                 # paste a YouTube link, or leave "" for none
features:
  - Apple CarPlay
  - Air conditioning
  - Cruise control
```

Below the second `---`, write the sales description in plain text. Leave a blank
line between paragraphs. `**text**` makes text bold.

### 4. Save & publish
Commit and push (see *Publishing changes* below). The site rebuilds itself and
the new car is live in ~1–2 minutes.

### Marking a car as SOLD
Open its file and change `sold: false` to `sold: true`. It disappears from the
homepage but the page stays live (good for SEO) showing a **Sold** badge.
To remove it entirely, delete the `.md` file and its photo folder.

### Adding a video
Upload the video to **YouTube** (it can be *Unlisted* if you don't want it
public on your channel), copy the link, and paste it into the `video:` line.
YouTube and Vimeo links both work.

---

## Editing site-wide info
Everything shared across the site lives in **`src/_data/site.json`** — phone
number, WhatsApp number, opening hours, business name, town, tagline, and the
brand colours. Edit that one file and everything updates.

> ⚠️ **Set your town:** the `location.town` field is currently `SET-YOUR-TOWN`.
> Change it to your real town/city — it matters for Google local search.

---

## Publishing changes

If you use the **GitHub website** (easiest, no software):
1. Go to the file on github.com, click the ✏️ pencil to edit, or **Add file →
   Upload files** to add photos.
2. Scroll down, click **Commit changes**.
3. Wait ~1–2 minutes — the site rebuilds and deploys automatically.

If you use **git on your computer**:
```bash
git add .
git commit -m "Add Ford Fiesta"
git push
```

---

## Running the site on your own computer (optional)
Only needed if you want to preview before publishing. Requires
[Node.js](https://nodejs.org).
```bash
npm install     # first time only
npm start       # then open the address it prints (http://localhost:8123)
```

---

## Tech notes (for a developer)
- **Generator:** Eleventy 3 (`.eleventy.js`), Nunjucks + Markdown.
- **Output:** static HTML in `_site/` (git-ignored; built by CI).
- **Deploy:** `.github/workflows/deploy.yml` builds on every push to `main` and
  publishes to GitHub Pages.
- **Custom domain:** `src/CNAME` contains `kobzy.co.uk`.
- **SEO:** per-page `<title>`/meta/canonical/Open Graph in
  `src/_includes/partials/head-seo.njk`; `Car` + `Offer` JSON-LD on each listing;
  `AutoDealer` JSON-LD site-wide; auto `sitemap.xml` and `robots.txt`.
