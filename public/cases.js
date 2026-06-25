/* Content for the live exercise. Loaded by both presenter and phone views.
   The server is content-agnostic: it only tallies votes by option id.
   D2 "family" groups the regulatory tools into the two that must combine:
     fuse = limit the ownership / break the fusion
     dep  = cut the dependence / open the substrate                       */

window.EXERCISE = {
  order: ['starlink', 'standardoil', 'eic', 'tsmc', 'asml'],

  families: {
    fuse: { label: 'Limit the fusion', color: '#2f5a7e' },
    dep:  { label: 'Cut the dependence', color: '#2e7d5b' }
  },

  cases: {

    /* ───────────────────────── STARLINK (default) ───────────────────── */
    starlink: {
      name: 'Starlink',
      kind: 'cross-sphere',
      subtitle: 'one owner across the spheres',
      held: ['Economic', 'Military', 'Political'],
      harm: 'In a battlefield emergency, the operator declines to extend ' +
            'coverage for a military operation. A use-of-force decision is ' +
            'effectively made by a private owner.',
      d1: {
        prompt: 'A state says this harmed its security. Whose job is it to review it?',
        options: [
          { id: 'comp',    label: 'Competition authority',     note: 'But this is not a price or market-share problem.' },
          { id: 'telecom', label: 'Telecoms regulator',        note: 'But it licenses national carriers — not a cross-border layer in orbit.' },
          { id: 'defense', label: 'Defence ministry',          note: 'But the state does not own the asset; it is a customer.' },
          { id: 'court',   label: 'A court',                   note: 'Under what law? No clear breach; sovereign-style acts resist review.' },
          { id: 'foreign', label: 'Foreign ministry / treaty', note: 'But a private firm is not a treaty counterpart.' },
          { id: 'none',    label: 'No existing body fits',     note: 'The harm falls in the gap between all of them.' }
        ],
        insight: 'Each check lives inside ONE sphere. The power was assembled ' +
                 'ACROSS spheres — military dependence + private ownership + a ' +
                 'cross-border network — so the harm falls between every regulator.'
      },
      d2: {
        prompt: 'Reach for one tool. Which do you try first?',
        options: [
          { id: 'carrier',   family: 'dep',  label: 'Common carrier / essential facility', note: 'Must serve all on fair terms — but you cannot compel a foreign operator you depend on.' },
          { id: 'structural',family: 'fuse', label: 'Structural separation',               note: 'Split launch · satellites · services into different owners.' },
          { id: 'public',    family: 'dep',  label: 'Public / allied alternative',          note: 'Fund a sovereign or multi-national layer so no one firm is load-bearing.' },
          { id: 'cap',       family: 'fuse', label: 'Ownership cap',                        note: 'No single owner may hold the stack and the downstream it serves.' },
          { id: 'interop',   family: 'dep',  label: 'Interoperability mandate',             note: 'Open terminals so users can switch networks.' }
        ],
        insight: 'The tools fall into two families — limit the fusion (separation, ' +
                 'caps) and cut the dependence (public option, interop, common ' +
                 'carriage). Each FAILS ALONE: a carrier rule cannot bind a firm ' +
                 'the state cannot replace; a break-up does not help if the state ' +
                 'still has nowhere else to go. They only work together.'
      },
      d3: {
        prompt: 'How far would you go?',
        left: 'Leave it', right: 'Break it apart',
        insight: 'Breaking up the integrated launch-and-satellite system can wreck ' +
                 'the very thing that makes it valuable — cheap launch, global ' +
                 'coverage. No free lunch. This is a genuine political choice, ' +
                 'which is what makes it hard, not badly organised.'
      },
      verdict: 'Cross-sphere fusion → no single check reaches it; needs a combined fix at a real abundance cost.'
    },

    /* ───────────────────────── STANDARD OIL ─────────────────────────── */
    standardoil: {
      name: 'Standard Oil',
      kind: 'cross-sphere',
      subtitle: '1900 — the chokepoint that bought its checks',
      held: ['Economic', 'Political', 'Ideological'],
      harm: 'It sets secret transport rates that quietly bankrupt rivals — and ' +
            'buys the legislature meant to stop it.',
      d1: {
        prompt: 'Who reins it in?',
        options: [
          { id: 'antitrust', label: 'Antitrust (courts)',       note: 'In 1900 the Sherman Act is barely tested; courts unsure it reaches this.' },
          { id: 'icc',       label: 'Railroad regulator (ICC)',  note: 'But Standard bypassed the rails with its own pipelines.' },
          { id: 'legis',     label: 'The legislature',           note: '"Did everything to the Pennsylvania legislature except refine it."' },
          { id: 'press',     label: 'The press (Tarbell)',       note: 'Exposure moved opinion — but exposure is not enforcement.' },
          { id: 'none',      label: 'No body designed for it',   note: 'The checks existed but each sat in a sphere it had captured or bypassed.' }
        ],
        insight: 'The checks existed — and each sat inside one sphere Standard had ' +
                 'already captured or routed around. The gap closed only by ' +
                 'inventing new institutions.'
      },
      d2: {
        prompt: 'Which tool actually worked?',
        options: [
          { id: 'breakup',  family: 'fuse', label: 'Structural break-up (1911)',      note: 'Dissolved into 34 firms — the shards are Exxon, Mobil, Chevron.' },
          { id: 'ratereg',  family: 'dep',  label: 'Rate regulation (ICC / Hepburn)', note: 'Killed the secret rebate — cut the transport chokepoint.' },
          { id: 'sherman',  family: 'fuse', label: 'Antitrust enforcement (Sherman)', note: 'Made monopolisation itself illegal.' },
          { id: 'ftc',      family: 'dep',  label: 'A standing regulator (FTC, 1914)', note: 'Not a one-off case but permanent supervision.' }
        ],
        insight: 'It took both families at once — break the fusion (1911) AND ' +
                 'regulate the chokepoint (ICC/Hepburn) — plus a standing body so ' +
                 'it would not simply reform.'
      },
      d3: {
        prompt: 'How far would you go?',
        left: 'Leave it', right: 'Break it apart',
        insight: 'Here break-up was relatively cheap: the descendants thrived and ' +
                 'kerosene stayed cheap. Not every case carries a brutal abundance ' +
                 'cost — match the remedy to the structure.'
      },
      verdict: 'Cross-sphere — but breakable at low abundance cost. The historical proof that separation can be re-won.'
    },

    /* ─────────────────── BRITISH EAST INDIA COMPANY ─────────────────── */
    eic: {
      name: 'East India Company',
      kind: 'cross-sphere',
      subtitle: 'a company that became a government',
      held: ['Economic', 'Military', 'Political', 'Ideological'],
      harm: 'A trading firm governs a fifth of humanity — its own army, courts, ' +
            'taxes and monopoly — accountable to shareholders, not subjects.',
      d1: {
        prompt: 'Who can check a company that is also a state?',
        options: [
          { id: 'parliament', label: 'Parliament',       note: 'But Company wealth seats MPs — it lobbies the body meant to check it.' },
          { id: 'courts',     label: 'The courts',        note: 'Its own courts in India; whose law in London?' },
          { id: 'crown',      label: 'The Crown',         note: 'Takes a share of the profits — reluctant to kill the golden goose.' },
          { id: 'share',      label: 'Shareholders',      note: 'Want dividends, not good government.' },
          { id: 'none',       label: 'No body exists yet', note: 'Nothing was designed to check a merchant that had become a sovereign.' }
        ],
        insight: 'There was no institution built to check a company that had become ' +
                 'a government. It took a century to invent them.'
      },
      d2: {
        prompt: 'Which invented institution pulled it back?',
        options: [
          { id: 'oversight', family: 'dep',  label: 'Parliamentary oversight (Regulating Act 1773)', note: 'First state supervision of the Company.' },
          { id: 'board',     family: 'fuse', label: 'A state Board of Control (1784)',                note: 'A government organ placed over the company.' },
          { id: 'nationalise',family:'fuse', label: 'Nationalisation (1858)',                         note: 'The Crown takes the powers away outright.' }
        ],
        insight: 'Oversight alone failed while the Company kept the powers; the fix ' +
                 'was to take the spheres back — escalating from supervision (1773) ' +
                 'to a state board (1784) to outright nationalisation (1858).'
      },
      d3: {
        prompt: 'How far would you go?',
        left: 'Leave it', right: 'Take the powers',
        insight: 'You cannot simply "break up" a government-company without deciding ' +
                 'who governs instead. The cost here is transition and chaos, not ' +
                 'lost efficiency.'
      },
      verdict: 'Total fusion → only re-built institutions, escalating to nationalisation, could re-separate the spheres.'
    },

    /* ───────────────── TSMC — the disconfirming case ────────────────── */
    tsmc: {
      name: 'TSMC',
      kind: 'single-sphere',
      subtitle: 'the test: concentrated, but checkable',
      held: ['Economic'],
      harm: 'It makes ~90% of the world’s leading-edge chips. It could halt ' +
            'advanced computing worldwide. Isn’t that the same danger?',
      d1: {
        prompt: 'Whose job is it to check this one?',
        options: [
          { id: 'export',  label: 'Export-control authority',   note: 'States ALREADY govern who it may sell to.' },
          { id: 'industrial',label:'Industrial policy',         note: 'CHIPS Acts fund second sources (Intel, Samsung).' },
          { id: 'comp',    label: 'Competition authority',      note: 'Customers and states can build alternatives.' },
          { id: 'home',    label: 'Its home state (Taiwan)',    note: 'It sits inside a state that regulates it.' },
          { id: 'none',    label: 'No one can',                 note: 'Is that actually true here?' }
        ],
        insight: 'TSMC is enormous — but its power is single-sphere (economic). The ' +
                 'checks that live in the economic sphere — export control, ' +
                 'antitrust, industrial policy — DO reach it. Concentrated is not ' +
                 'the same as unaccountable.'
      },
      d2: {
        prompt: 'What is the right lever?',
        options: [
          { id: 'secondsource', family: 'dep', label: 'Reduce single-source dependence', note: 'Fund second fabs — the power is one-dimensional, so this works.' },
          { id: 'export2',      family: 'dep', label: 'Export controls',                  note: 'Already in force; the state has real leverage.' },
          { id: 'breakup2',     family: 'fuse',label: 'Break up TSMC',                    note: 'Hugely costly and largely pointless — it spans no other sphere.' }
        ],
        insight: 'Because the power is single-sphere, the fix is to cut dependence ' +
                 '(second-sourcing), not to break the firm. Match the remedy to the ' +
                 'structure — this is where the framework DISCRIMINATES.'
      },
      d3: {
        prompt: 'How far would you go?',
        left: 'Leave it', right: 'Break it apart',
        insight: 'Breaking up TSMC would cost enormous abundance for little gain: it ' +
                 'holds no other sphere to convert its power into. The danger is ' +
                 'narrow chokepoint risk, not cross-sphere fusion.'
      },
      verdict: 'Single-sphere chokepoint → big but checkable. Proves the test is fusion, not size.'
    },

    /* ───────────────── ASML — the edge case (Dutch) ─────────────────── */
    asml: {
      name: 'ASML',
      kind: 'edge',
      subtitle: 'the edge: a monopoly that arms a state',
      held: ['Economic'],
      harm: 'It is the SOLE maker of EUV lithography on Earth — a tighter monopoly ' +
            'than TSMC. The maximal chokepoint. Surely this is the real danger?',
      d1: {
        prompt: 'Who holds the power here — and who checks them?',
        options: [
          { id: 'dutch',  label: 'The Dutch government',      note: 'Already licenses its exports — and uses that as leverage over others.' },
          { id: 'eu',     label: 'The EU',                    note: 'Coordinates, but the licence sits in The Hague.' },
          { id: 'us',     label: 'The United States',         note: 'Pressures the Dutch to restrict sales — a state acting through the firm.' },
          { id: 'firm',   label: 'ASML itself',              note: 'Largely compliant; it is not the one making the political choice.' },
          { id: 'none',   label: 'The question is wrong',     note: 'Maybe the actor to watch is the STATE wielding the firm.' }
        ],
        insight: 'Extreme concentration — but single-sphere AND embedded inside a ' +
                 'willing state, so it is highly checkable. The twist: the ' +
                 'chokepoint gives the DUTCH STATE power over others. The actor to ' +
                 'watch flips from the firm to the state behind it. That is the ' +
                 'edge of the framework: it diagnoses cross-sphere fusion, not every ' +
                 'chokepoint.'
      },
      d2: {
        prompt: 'So what is the governance problem, really?',
        options: [
          { id: 'exportgov', family: 'dep',  label: 'Govern the export licence',      note: 'The real lever — but it is a tool of statecraft, not firm control.' },
          { id: 'multilat',  family: 'dep',  label: 'Multilateralise the decision',   note: 'Who decides whom the chokepoint serves? A state, or many?' },
          { id: 'breakup3',  family: 'fuse', label: 'Break up ASML',                  note: 'Near-impossible (one firm, deep moat) and beside the point.' }
        ],
        insight: 'The hard question is not how to check ASML — the Dutch state ' +
                 'already does. It is who checks the STATE that controls the ' +
                 'chokepoint. The fusion framework points you to the right actor.'
      },
      d3: {
        prompt: 'Where is the danger?',
        left: 'In the firm', right: 'In the state behind it',
        insight: 'The more concentrated the firm, the more it becomes an instrument ' +
                 'of the state that hosts it. The edge case shows the danger can ' +
                 'migrate from corporate fusion to state power — a different, ' +
                 'geopolitical problem.'
      },
      verdict: 'Edge case → maximal concentration, single sphere, inside a state. The actor to watch is the state, not the firm.'
    }

  }
};
