/* Phone view: shows the current case + the active decision, sends votes. */
(function () {
  const root = document.getElementById('root');
  const EX = window.EXERCISE;

  // stable per-device id
  let cid = localStorage.getItem('cid');
  if (!cid) { cid = 'c' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('cid', cid); }

  let state = null;
  const mine = { d1: null, d2: null, d3: 50 };

  let ws, retry = 0;
  function connect() {
    ws = new WebSocket((location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host);
    ws.onopen = () => { retry = 0; send({ type: 'hello', role: 'play', clientId: cid }); };
    ws.onmessage = (e) => { state = JSON.parse(e.data); render(); };
    ws.onclose = () => { retry++; setTimeout(connect, Math.min(3000, 400 * retry)); };
  }
  function send(o) { if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); }
  connect();

  function caseHeader(c) {
    const chips = c.held.map(h => `<span class="chip">${h}</span>`).join('');
    return `<div class="casebar">
        <h1>${c.name}</h1><span class="muted">${c.subtitle}</span>
        <div class="held">${chips}</div>
      </div>
      <p class="harm">${c.harm}</p>`;
  }

  function render() {
    if (!state) return;
    const c = EX.cases[state.caseId];
    if (!c) { root.innerHTML = '<div class="waiting">Waiting…</div>'; return; }

    if (state.stage === 'lobby') {
      root.innerHTML = caseHeader(c) +
        `<div class="waiting">You're in. Hold on — the first question is coming.</div>`;
      return;
    }
    if (state.stage === 'summary') {
      root.innerHTML = caseHeader(c) +
        `<div class="waiting">Thanks. Now run your own firm through it.</div>`;
      return;
    }

    const stage = state.stage; // d1|d2|d3
    if (stage === 'd3') {
      root.innerHTML = caseHeader(c) +
        `<p class="eyebrow">Decision 3</p><div class="prompt">${c.d3.prompt}</div>
         <div class="slider-wrap">
           <div class="slider-val" id="sv">${mine.d3}</div>
           <input id="sl" type="range" min="0" max="100" value="${mine.d3}">
           <div class="slider-ends"><span>${c.d3.left}</span><span>${c.d3.right}</span></div>
         </div>
         <div class="you">Drag to set your position. It updates the room live.</div>`;
      const sl = document.getElementById('sl'), sv = document.getElementById('sv');
      sl.addEventListener('input', () => { mine.d3 = +sl.value; sv.textContent = mine.d3; send({ type: 'slider', clientId: cid, value: mine.d3 }); });
      return;
    }

    // d1 / d2 — single choice
    const data = c[stage];
    const opts = data.options.map(o => {
      const fam = o.family ? ` fam-${o.family}` : '';
      const sel = mine[stage] === o.id ? ' sel' : '';
      return `<button class="opt${fam}${sel}" data-id="${o.id}">
          <div class="lbl">${o.label}</div><div class="note">${o.note}</div></button>`;
    }).join('');
    root.innerHTML = caseHeader(c) +
      `<p class="eyebrow">Decision ${stage === 'd1' ? '1' : '2'}</p>
       <div class="prompt">${data.prompt}</div>
       <div class="opts">${opts}</div>
       <div class="you" id="you">${mine[stage] ? 'Your pick is in — tap another to change it.' : 'Tap your choice.'}</div>`;
    root.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
      mine[stage] = b.dataset.id;
      send({ type: 'vote', clientId: cid, stage, optionId: b.dataset.id });
      root.querySelectorAll('.opt').forEach(x => x.classList.toggle('sel', x === b));
      document.getElementById('you').textContent = 'Your pick is in — tap another to change it.';
    }));
  }
})();
