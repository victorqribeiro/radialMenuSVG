// Simplified RadialMenu using SVG
export default class RadialMenuSVG {
  /**
   * @param {RadialMenuOptions} options
   */
  constructor(options = {}) {
    this.options = {
      fontFamily: 'FontAwesome',
      fontSize: 14,
      innerCircle: 50,
      outerCircle: 100,
      rotation: Math.PI / 2,
      buttonGap: 0,
      buttons: [],
      ...options,
    };

    this.svgNS = 'http://www.w3.org/2000/svg';
    this.container = document.createElement('div');
    this.container.style.position = this.options.isFixed ? 'fixed' : 'absolute';
    this.container.style.zIndex = this.options.zIndex || 9999;

    this.svg = document.createElementNS(this.svgNS, 'svg');
    this.svg.setAttribute('role', 'menu');
    this.svg.setAttribute('aria-label', 'Radial Menu');
    this.container.appendChild(this.svg);
    document.body.appendChild(this.container);

    this.draw();
    if (!this.options.isFixed) this.attachContextEvent();
  }

  draw() {
    const {
      innerCircle, outerCircle, rotation, buttons, fontFamily, fontSize,
      backgroundColor = '#EEE', textColor = '#000', borderColor = '#FFF', buttonGap
    } = this.options;

    const cx = outerCircle;
    const cy = outerCircle;
    const size = outerCircle * 2;
    this.svg.setAttribute('width', size);
    this.svg.setAttribute('height', size);
    this.svg.innerHTML = '';

    const step = (2 * Math.PI) / buttons.length;
    const gap = buttonGap || 0;

    buttons.forEach((btn, i) => {
      const start = i * step + rotation + gap;
      const end = start + step - 2 * gap;

      const largeArc = end - start > Math.PI ? 1 : 0;
      const rOuter = outerCircle;
      const rInner = innerCircle;

      const x1 = cx + rOuter * Math.cos(start);
      const y1 = cy + rOuter * Math.sin(start);
      const x2 = cx + rOuter * Math.cos(end);
      const y2 = cy + rOuter * Math.sin(end);
      const x3 = cx + rInner * Math.cos(end);
      const y3 = cy + rInner * Math.sin(end);
      const x4 = cx + rInner * Math.cos(start);
      const y4 = cy + rInner * Math.sin(start);

      const pathData = `M ${x1} ${y1}
        A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2}
        L ${x3} ${y3}
        A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4}
        Z`;

      const path = document.createElementNS(this.svgNS, 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', btn.backgroundColor || backgroundColor);
      path.setAttribute('stroke', btn.borderColor || borderColor);
      path.setAttribute('tabindex', '0');
      path.setAttribute('role', 'menuitem');
      path.setAttribute('aria-label', btn.text);
      path.style.cursor = 'pointer';
      path.addEventListener('click', btn.action);
      this.svg.appendChild(path);

      const midAngle = start + (end - start) / 2;
      const labelR = rInner + (rOuter - rInner) / 2;
      const lx = cx + labelR * Math.cos(midAngle);
      const ly = cy + labelR * Math.sin(midAngle) + fontSize / 3;

      const text = document.createElementNS(this.svgNS, 'text');
      text.setAttribute('x', lx);
      text.setAttribute('y', ly);
      text.setAttribute('fill', btn.textColor || textColor);
      text.setAttribute('font-size', fontSize);
      text.setAttribute('font-family', fontFamily);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('alignment-baseline', 'middle');
      text.textContent = btn.text;
      text.style.pointerEvents = 'none';

      this.svg.appendChild(text);
    });
  }

  setPos(x, y) {
    this.container.style.left = `${x}px`;
    this.container.style.top = `${y}px`;
  }

  attachContextEvent() {
    document.addEventListener('contextmenu', e => {
      e.preventDefault();
      this.setPos(e.clientX - this.options.outerCircle, e.clientY - this.options.outerCircle);
      this.container.style.display = 'block';
    });

    document.addEventListener('click', () => {
      this.container.style.display = 'none';
    });
  }

  show() {
    this.container.style.display = 'block';
  }

  hide() {
    this.container.style.display = 'none';
  }

  updateButtons(buttons) {
    this.options.buttons = buttons;
    this.draw();
  }
}
