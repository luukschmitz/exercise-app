# Live exercise — "Who can check power assembled across the spheres?"

A hosted live app for the in-class exercise. Presenter drives a shared screen;
students join on their phones and vote; results aggregate live. Three decisions,
five real cases (three cross-sphere, one disconfirming, one edge).

## Run locally

```
cd exercise-app
npm install
npm start
```

- Presenter screen: **http://localhost:3000/present**
- Phones join at: **http://localhost:3000/** (QR shown on the presenter lobby)

On a LAN demo, phones use `http://<your-laptop-ip>:3000/`. For the real room,
deploy (below) and let phones reach it over eduroam.

## The flow

Presenter picks a **case** (Starlink is the default) and walks the stages with
`prev / next`:

1. **Decision 1 — "Whose job is it?"** Students pick which institution should
   review the harm. The room **scatters** → no single check fits, because the
   power was assembled *across* spheres. (`reveal insight` shows the takeaway.)
2. **Decision 2 — "Reach for one tool."** Real big-tech remedies, colour-coded
   into two families: **limit the fusion** (structural separation, ownership
   caps — slate) and **cut the dependence** (common carrier / essential
   facility, public option, interoperability — green). Reveal: each fails
   alone; they only work together (Grumbach's two-remedy complementarity).
3. **Decision 3 — the trade-off dial.** "Leave it ↔ break it apart." The room's
   spread shows there is no free lunch — the value-bind.

Then `next` → **Summary** (the case's verdict + "run your own firm through it").

Cases: **Starlink, Standard Oil, East India Company** (cross-sphere);
**TSMC** (disconfirming — big but single-sphere, so still checkable); **ASML**
(edge — maximal monopoly, but the actor to watch becomes the *state* behind it).
All content lives in `public/cases.js`.

## Presenter controls

Case buttons · `prev / next` stage · `reveal/hide insight` · `clear votes`
(same case, fresh vote) · `reset` (back to lobby) · live "N joined" counter.

## Deploy (hosted, for the room)

Use a host that supports persistent WebSockets (Render / Railway / Fly — **not**
Vercel serverless). Build command: none. Start command: `npm start`. It reads
`PORT` from the environment.

**Important:** state is in-memory in a single instance. Run **one** instance
(no autoscaling), or votes will split across instances. For a class of any
realistic size, one small instance is fine.

Once deployed, point the slide-11 QR at the deployed URL.

## Notes / TODO

- Content in `cases.js` is first-draft; Starlink is the most polished. Tighten
  the others once the shape is approved.
- No persistence: a server restart clears votes (fine for a live run).
- The take-home "build your own firm" sandbox (single-player) is not built yet;
  this is the live in-class version.
