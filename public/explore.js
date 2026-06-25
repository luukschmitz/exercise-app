/* Take-home / self-service view. Pure client-side: reads window.EXERCISE and
   renders the cases, questions, and answers. No WebSocket — opening this does
   NOT touch the live in-class tally. */
(function () {
  const root = document.getElementById('root');
  const EX = window.EXERCISE;
  const kindClass = k => k === 'single-sphere' ? 'kind-single' : k === 'edge' ? 'kind-edge' : 'kind-cross';
  const kindText = k => k === 'single-sphere' ? 'disconfirming case' : k === 'edge' ? 'edge case' : 'cross-sphere';

  function picker() {
    const btns = EX.order.map(id => {
      const c = EX.cases[id];
      return `<button class="pick" data-id="${id}">
          <span class="pick-name">${c.name}</span>
          <span class="kind-tag ${kindClass(c.kind)}">${kindText(c.kind)}</span>
          <span class="muted" style="font-size:.85rem">${c.subtitle}</span>
        </button>`;
    }).join('');
    return `<p class="eyebrow">Take-home</p>
      <h1 style="font-size:2rem;margin:.1em 0 .25em">Run your own firm through it</h1>
      <p class="muted" style="max-width:62ch">Pick a case. For each decision, think first — then reveal the answer.
      The question throughout: who can check power once it has been assembled <em>across</em> the spheres?</p>
      <div class="case-picker">${btns}</div>`;
  }

  function reveal(label, text) {
    return `<button class="reveal-btn" data-label="${label}">Show ${label} ▾</button>
            <div class="insight hidden">${text}</div>`;
  }

  function decision(num, d, useFam) {
    const opts = (d.options || []).map(o => {
      const fam = useFam && o.family ? ` fam-${o.family}` : '';
      return `<div class="opt static${fam}"><div class="lbl">${o.label}</div><div class="note">${o.note}</div></div>`;
    }).join('');
    const ends = d.left ? `<div class="ends"><span>${d.left}</span><span>↔</span><span>${d.right}</span></div>` : '';
    return `<div class="decision">
        <p class="eyebrow">Decision ${num}</p>
        <div class="prompt">${d.prompt}</div>
        ${opts ? `<div class="opts">${opts}</div>` : ''}
        ${ends}
        ${reveal('the answer', d.insight)}
      </div>`;
  }

  function caseView(id) {
    const c = EX.cases[id];
    const chips = c.held.map(h => `<span class="chip">${h}</span>`).join('');
    return `<button class="reveal-btn back" id="back">‹ all cases</button>
      <div class="casebar"><h1>${c.name}</h1>
        <span class="kind-tag ${kindClass(c.kind)}">${kindText(c.kind)}</span>
        <span class="muted">${c.subtitle}</span><div class="held">${chips}</div></div>
      <p class="harm">${c.harm}</p>
      ${decision(1, c.d1, false)}
      ${decision(2, c.d2, true)}
      ${decision(3, c.d3, false)}
      <div class="decision"><p class="eyebrow">The verdict</p>${reveal('the verdict', c.verdict)}</div>`;
  }

  function wireReveals() {
    root.querySelectorAll('.reveal-btn[data-label]').forEach(b => b.addEventListener('click', () => {
      const ins = b.nextElementSibling;
      const nowHidden = ins.classList.toggle('hidden');
      b.textContent = `${nowHidden ? 'Show' : 'Hide'} ${b.dataset.label} ${nowHidden ? '▾' : '▴'}`;
    }));
  }
  function showPicker() {
    root.innerHTML = picker();
    root.querySelectorAll('.pick').forEach(b => b.addEventListener('click', () => showCase(b.dataset.id)));
    window.scrollTo(0, 0);
  }
  function showCase(id) {
    root.innerHTML = caseView(id);
    document.getElementById('back').addEventListener('click', showPicker);
    wireReveals();
    window.scrollTo(0, 0);
  }
  showPicker();
})();
