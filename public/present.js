/* Presenter view: case + stage controls, live aggregation, insight reveal. */
(function () {
  const root = document.getElementById('root');
  const EX = window.EXERCISE;
  const STAGES = ['lobby', 'd1', 'd2', 'd3', 'summary'];
  const STAGE_LABEL = { lobby: 'Lobby', d1: 'Decision 1', d2: 'Decision 2', d3: 'Decision 3', summary: 'Summary' };
  let state = null;

  let ws, retry = 0;
  function connect() {
    ws = new WebSocket((location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host);
    ws.onopen = () => { retry = 0; send({ type: 'hello', role: 'present' }); };
    ws.onmessage = (e) => { state = JSON.parse(e.data); render(); };
    ws.onclose = () => { retry++; setTimeout(connect, Math.min(3000, 400 * retry)); };
  }
  function send(o) { if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); }
  window.__ctl = (action, extra) => send(Object.assign({ type: 'control', action }, extra || {}));
  connect();

  const kindClass = k => k === 'single-sphere' ? 'kind-single' : k === 'edge' ? 'kind-edge' : 'kind-cross';
  const kindText = k => k === 'single-sphere' ? 'disconfirming case' : k === 'edge' ? 'edge case' : 'cross-sphere';

  function controls(c) {
    const caseBtns = EX.order.map(id =>
      `<button class="${state.caseId === id ? 'on' : ''}" onclick="__ctl('setCase',{caseId:'${id}'})">${EX.cases[id].name}</button>`).join('');
    const i = STAGES.indexOf(state.stage);
    return `<div class="controls">
        ${caseBtns}<span class="sep"></span>
        <span class="stagenav">
          <button onclick="__ctl('setStage',{stage:'${STAGES[Math.max(0, i - 1)]}'})">‹ prev</button>
          <button class="on">${STAGE_LABEL[state.stage]}</button>
          <button onclick="__ctl('setStage',{stage:'${STAGES[Math.min(STAGES.length - 1, i + 1)]}'})">next ›</button>
        </span>
        <span class="sep"></span>
        <button class="${state.showInsight ? 'on' : ''}" onclick="__ctl('insight',{value:${!state.showInsight}})">${state.showInsight ? 'hide insight' : 'reveal insight'}</button>
        <button onclick="__ctl('clearVotes')">clear votes</button>
        <button onclick="__ctl('reset')">reset</button>
        <span class="players">· ${state.players} joined</span>
      </div>`;
  }

  function header(c) {
    const chips = c.held.map(h => `<span class="chip">${h}</span>`).join('');
    return `<div class="casebar">
        <h1>${c.name}</h1>
        <span class="kind-tag ${kindClass(c.kind)}">${kindText(c.kind)}</span>
        <span class="muted">${c.subtitle}</span>
        <div class="held">${chips}</div>
      </div>`;
  }

  function joinPanel() {
    const url = location.origin + '/';
    return `<div class="join">
        <img src="/qr.png?data=${encodeURIComponent(url)}" alt="join QR">
        <div class="url">${url}</div>
      </div>`;
  }

  function barRows(options, counts, useFamily) {
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return options.map(o => {
      const n = counts[o.id] || 0;
      const pct = total ? Math.round(100 * n / total) : 0;
      const fam = useFamily && o.family ? ` fam-${o.family}` : '';
      return `<div class="bar-row">
          <div class="bar-lbl">${o.label}<div class="note">${o.note}</div></div>
          <div class="bar-track"><div class="bar-fill${fam}" style="width:${pct}%"></div></div>
          <div class="bar-n">${n}</div>
        </div>`;
    }).join('');
  }

  function histo(slider) {
    const max = Math.max(1, ...slider.buckets);
    const cols = slider.buckets.map(b => `<div class="col" style="height:${Math.round(100 * b / max)}%"></div>`).join('');
    return `<div class="histo">${cols}</div>
      <div class="histo-axis"><span>0 · leave it</span><span>50</span><span>100 · break it apart</span></div>
      ${slider.avg != null ? `<div class="avg">room average: ${slider.avg} · ${slider.n} responses</div>` : '<div class="avg muted">waiting for the room…</div>'}`;
  }

  function insightBlock(text) {
    return `<div class="insight ${state.showInsight ? '' : 'hidden'}">${text}</div>`;
  }

  function render() {
    if (!state) return;
    const c = EX.cases[state.caseId];
    let body = '';

    if (state.stage === 'lobby') {
      body = `<div class="present-top"><div>
          <p class="eyebrow">The exercise</p>
          <div class="prompt">Who can check power assembled across the spheres?</div>
          <p class="muted">Scan to join. Then we decide together.</p>
        </div>${joinPanel()}</div>`;
    } else if (state.stage === 'summary') {
      body = `<p class="eyebrow">What we found</p>
        <div class="prompt">${c.name}: ${kindText(c.kind)}</div>
        <div class="verdict">${c.verdict}</div>
        ${insightBlock('Run your own firm through it: decompose its power across spheres, ask which check reaches each, and see the cross-sphere gap — and what closing it would cost.')}`;
    } else if (state.stage === 'd3') {
      body = `<p class="eyebrow">Decision 3</p><div class="prompt">${c.d3.prompt}</div>
        ${histo(state.slider)}
        ${insightBlock(c.d3.insight)}`;
    } else {
      const d = c[state.stage];
      body = `<p class="eyebrow">${STAGE_LABEL[state.stage]}</p><div class="prompt">${d.prompt}</div>
        <div class="bars">${barRows(d.options, state.counts[state.stage], state.stage === 'd2')}</div>
        ${insightBlock(d.insight)}`;
    }

    root.innerHTML = controls(c) + header(c) + body;
  }
})();
