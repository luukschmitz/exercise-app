/* Live exercise server — Express static + a WebSocket tally.
   The server knows nothing about the content (cases.js lives client-side).
   It just tracks: current case, current stage, and votes keyed by clientId,
   and broadcasts the aggregate to every connected screen.                 */

const express = require('express');
const http = require('http');
const path = require('path');
const QRCode = require('qrcode');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;
const STAGES = ['lobby', 'd1', 'd2', 'd3', 'summary'];

const app = express();
// allow the app to be embedded as an iframe inside the slide deck (any origin)
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  res.setHeader('Content-Security-Policy', 'frame-ancestors *');
  next();
});
app.get('/present', (req, res) => res.sendFile(path.join(__dirname, 'public', 'present.html')));
app.use(express.static(path.join(__dirname, 'public')));

// QR for the join URL (presenter shows it). data param is the full join URL.
app.get('/qr.png', async (req, res) => {
  try {
    const buf = await QRCode.toBuffer(req.query.data || 'http://localhost:' + PORT, {
      margin: 1, width: 320, color: { dark: '#1c1a17', light: '#faf7f2' }
    });
    res.type('png').send(buf);
  } catch (e) { res.status(400).send('bad qr'); }
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// ── room state ────────────────────────────────────────────────────────
const S = {
  caseId: 'starlink',
  stage: 'lobby',
  showInsight: false,
  d1: new Map(),   // clientId -> optionId
  d2: new Map(),
  d3: new Map()    // clientId -> number (0..100)
};
const players = new Set();   // clientIds seen voting/joining as player

function clearVotes() { S.d1.clear(); S.d2.clear(); S.d3.clear(); }

function tally(map) {
  const out = {};
  for (const v of map.values()) out[v] = (out[v] || 0) + 1;
  return out;
}
function sliderStats() {
  const vals = [...S.d3.values()];
  const buckets = new Array(10).fill(0);   // 0-9,10-19,...,90-100
  for (const v of vals) buckets[Math.min(9, Math.floor(v / 10))]++;
  const avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  return { buckets, avg, n: vals.length };
}
function snapshot() {
  return {
    type: 'state',
    caseId: S.caseId,
    stage: S.stage,
    showInsight: S.showInsight,
    counts: { d1: tally(S.d1), d2: tally(S.d2) },
    slider: sliderStats(),
    players: players.size
  };
}
function broadcast() {
  const msg = JSON.stringify(snapshot());
  for (const c of wss.clients) if (c.readyState === 1) c.send(msg);
}

wss.on('connection', (ws) => {
  ws.send(JSON.stringify(snapshot()));

  ws.on('message', (raw) => {
    let m; try { m = JSON.parse(raw); } catch { return; }

    if (m.type === 'hello') {
      if (m.role === 'play' && m.clientId) players.add(m.clientId);
      ws.send(JSON.stringify(snapshot()));
      broadcast();
      return;
    }

    // presenter controls
    if (m.type === 'control') {
      if (m.action === 'setCase' && S.caseId !== m.caseId) { S.caseId = m.caseId; S.stage = 'lobby'; S.showInsight = false; clearVotes(); }
      else if (m.action === 'setStage' && STAGES.includes(m.stage)) { S.stage = m.stage; S.showInsight = false; }
      else if (m.action === 'insight') { S.showInsight = !!m.value; }
      else if (m.action === 'reset') { clearVotes(); S.showInsight = false; S.stage = 'lobby'; }
      else if (m.action === 'clearVotes') { clearVotes(); }
      broadcast();
      return;
    }

    // participant votes
    if (m.type === 'vote' && m.clientId && ['d1', 'd2'].includes(m.stage) && m.optionId) {
      players.add(m.clientId);
      S[m.stage].set(m.clientId, m.optionId);
      broadcast();
      return;
    }
    if (m.type === 'slider' && m.clientId && typeof m.value === 'number') {
      players.add(m.clientId);
      S.d3.set(m.clientId, Math.max(0, Math.min(100, m.value)));
      broadcast();
      return;
    }
  });
});

server.listen(PORT, () => {
  console.log(`Exercise live at  http://localhost:${PORT}/present  (presenter)`);
  console.log(`Players join at   http://localhost:${PORT}/         (phone)`);
});
