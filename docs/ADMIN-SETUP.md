# Admin panel setup (post cars from a phone)

The site includes a phone-friendly editor at **`kobzy.co.uk/admin`** powered by
[Sveltia CMS](https://github.com/sveltia/sveltia-cms). Your seller opens it on his
phone, logs in, fills a simple form, adds photos, and taps **Publish** — the car
goes live in ~2 minutes. No coding, no file uploads to GitHub.

Because logins go through GitHub, there's a **one-time setup** (about 15 minutes)
that **you (the repo owner)** do once. After that, he just uses the `/admin` page.

---

## Step 1 — Add him as a collaborator on *this repo only*

This gives write access to **`gherghinoiu/kobzy`** and nothing else in your account.

1. He needs a free GitHub account — [github.com/signup](https://github.com/signup). (Any email; no technical setup.)
2. In the repo: **Settings → Collaborators → Add people →** enter his GitHub username → **Write** role.
3. He accepts the email invite.

---

## Step 2 — Create a GitHub OAuth App (for the login button)

1. Go to **github.com → your profile → Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Fill in:
   - **Application name:** `Kobzy CMS`
   - **Homepage URL:** `https://kobzy.co.uk`
   - **Authorization callback URL:** `https://kobzy.co.uk/admin` *(you'll update this to the Worker URL in Step 3 — that's fine)*
3. Click **Register application**.
4. Copy the **Client ID**, then click **Generate a new client secret** and copy that too. Keep both safe.

---

## Step 3 — Deploy the login Worker on Cloudflare (free)

GitHub logins need a tiny server to hold the secret. Cloudflare Workers runs it
free, and you already have a Cloudflare account from the domain.

1. Open **[github.com/sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)** and follow its **“Deploy to Cloudflare Workers”** button (sign in to Cloudflare when asked).
2. In the Worker's **Settings → Variables**, add:
   | Variable | Value |
   |---|---|
   | `GITHUB_CLIENT_ID` | *(from Step 2)* |
   | `GITHUB_CLIENT_SECRET` | *(from Step 2 — mark as “Encrypt”)* |
   | `ALLOWED_DOMAINS` | `kobzy.co.uk` |
3. The Worker now has a URL like `https://sveltia-cms-auth.YOURNAME.workers.dev`. Copy it.
4. Go back to the **GitHub OAuth App** (Step 2) and set the **Authorization callback URL** to:
   `https://sveltia-cms-auth.YOURNAME.workers.dev/callback`

---

## Step 4 — Point the CMS at the Worker

1. Edit **`src/admin/config.yml`** in the repo.
2. Change the `base_url` line to your Worker URL:
   ```yaml
   base_url: https://sveltia-cms-auth.YOURNAME.workers.dev
   ```
3. Commit / push (or edit it on github.com and click **Commit changes**). The site redeploys.

---

## Step 5 — He posts a car (this is all he ever does)

1. On his phone, open **`https://kobzy.co.uk/admin`**.
2. Tap **Sign in with GitHub**, log in, **Authorize**.
3. Tap **Cars → New Car**.
4. Fill in make, model, year, mileage, price, features and description; **add photos straight from his camera roll**; paste a YouTube link if he has a video.
5. Tap **Publish**. Live in ~2 minutes.

**Tip:** in his phone browser, use **Share → Add to Home Screen** so `/admin`
sits on his home screen like an app.

### About videos
Phone videos are too large to store on the website. He uploads the clip to
**YouTube** from the YouTube app (set it to *Unlisted* if he doesn't want it on
his channel), copies the link, and pastes it into the **Video link** box. The
site embeds it automatically — engine sound and all.
