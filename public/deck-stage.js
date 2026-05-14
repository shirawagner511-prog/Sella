class DeckStage extends HTMLElement {
  connectedCallback() {
    this.slides = Array.from(this.querySelectorAll('section.slide'));
    this.current = 0;
    this._build();
    this._scale();
    window.addEventListener('resize', () => this._scale());
    document.addEventListener('keydown', e => this._key(e));
    this.addEventListener('click', e => {
      if (e.target.closest('a, button, iframe, input')) return;
      this._next();
    });
  }

  _build() {
    Object.assign(this.style, {
      display: 'block', position: 'fixed', inset: '0',
      overflow: 'hidden', background: '#1a1a2e', cursor: 'pointer',
    });

    this._wrapper = document.createElement('div');
    Object.assign(this._wrapper.style, {
      position: 'absolute', width: '1920px', height: '1080px',
      transformOrigin: 'top left',
    });

    this.slides.forEach((s, i) => {
      s.style.display = i === 0 ? 'block' : 'none';
      s.style.position = 'absolute';
      s.style.inset = '0';
      this._wrapper.appendChild(s);
    });
    this.appendChild(this._wrapper);

    /* nav bar */
    const nav = document.createElement('div');
    Object.assign(nav.style, {
      position: 'fixed', bottom: '20px', left: '50%',
      transform: 'translateX(-50%)', display: 'flex',
      alignItems: 'center', gap: '10px', zIndex: '999',
    });

    const btn = (html, fn) => {
      const b = document.createElement('button');
      b.innerHTML = html;
      Object.assign(b.style, {
        background: 'rgba(27,67,50,0.85)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(201,168,76,0.35)', color: '#F8F4EE',
        borderRadius: '10px', padding: '8px 18px', cursor: 'pointer',
        fontSize: '15px', fontFamily: 'Inter,sans-serif', fontWeight: '600',
        transition: 'background 0.15s',
      });
      b.onmouseenter = () => b.style.background = 'rgba(45,106,79,0.9)';
      b.onmouseleave = () => b.style.background = 'rgba(27,67,50,0.85)';
      b.addEventListener('click', e => { e.stopPropagation(); fn(); });
      return b;
    };

    this._counter = document.createElement('span');
    Object.assign(this._counter.style, {
      background: 'rgba(27,67,50,0.85)', backdropFilter: 'blur(12px)',
      border: '1px solid rgba(201,168,76,0.35)', color: 'rgba(248,244,238,0.75)',
      borderRadius: '10px', padding: '8px 18px', fontSize: '13px',
      fontFamily: 'Inter,sans-serif', fontWeight: '600', letterSpacing: '0.1em',
      minWidth: '70px', textAlign: 'center',
    });

    nav.appendChild(btn('←', () => this._prev()));
    nav.appendChild(this._counter);
    nav.appendChild(btn('→', () => this._next()));
    document.body.appendChild(nav);

    /* slide label tooltip */
    this._label = document.createElement('div');
    Object.assign(this._label.style, {
      position: 'fixed', top: '20px', left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(27,67,50,0.75)', backdropFilter: 'blur(12px)',
      border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(248,244,238,0.7)',
      borderRadius: '8px', padding: '5px 14px', fontSize: '11px',
      fontFamily: 'Inter,sans-serif', fontWeight: '700',
      letterSpacing: '0.18em', textTransform: 'uppercase', zIndex: '999',
      opacity: '0', transition: 'opacity 0.4s',
    });
    document.body.appendChild(this._label);

    this._update();
  }

  _scale() {
    const sw = window.innerWidth, sh = window.innerHeight;
    const scale = Math.min(sw / 1920, sh / 1080);
    const left = (sw - 1920 * scale) / 2;
    const top = (sh - 1080 * scale) / 2;
    this._wrapper.style.transform = `translate(${left}px,${top}px) scale(${scale})`;
  }

  _show(i) {
    this.slides[this.current].style.display = 'none';
    this.current = ((i % this.slides.length) + this.slides.length) % this.slides.length;
    this.slides[this.current].style.display = 'block';
    this._update();
  }

  _next() { this._show(this.current + 1); }
  _prev() { this._show(this.current - 1); }

  _key(e) {
    if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); this._next(); }
    if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); this._prev(); }
  }

  _update() {
    if (this._counter) this._counter.textContent = `${this.current + 1} / ${this.slides.length}`;
    const slide = this.slides[this.current];
    const lbl = slide?.dataset?.screenLabel || '';
    if (this._label) {
      this._label.textContent = lbl;
      this._label.style.opacity = lbl ? '1' : '0';
      clearTimeout(this._labelTimer);
      this._labelTimer = setTimeout(() => { if (this._label) this._label.style.opacity = '0'; }, 2200);
    }
    document.title = lbl ? `Sella · ${lbl}` : 'Sella Deck';
  }
}

customElements.define('deck-stage', DeckStage);
