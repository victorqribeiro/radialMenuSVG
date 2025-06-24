export default class RadialMenuSVG {
  /**
   * @param {Object} options
   * @param {number} [options.outerCircle=100]
   * @param {number} [options.innerCircle=40]
   * @param {number} [options.fontSize=20]
   * @param {string} [options.fontFamily='FontAwesome']
   * @param {number} [options.rotation=0]
   * @param {number} [options.buttonGap=0]
   * @param {Array<Object>} [options.buttons=[]]
   * @param {boolean} [options.isFixed=false]
   * @param {number} [options.posX=0]
   * @param {number} [options.posY=0]
   */
  constructor({
    outerCircle = 100,
    innerCircle = 40,
    fontSize = 20,
    fontFamily = 'FontAwesome',
    rotation = 0,
    buttonGap = 0,
    buttons = [],
    isFixed = false,
    posX = 0,
    posY = 0,
  } = {}) {
    this.outerCircle = outerCircle;
    this.innerCircle = innerCircle;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.rotation = rotation;
    this.buttonGap = buttonGap;
    this.buttons = buttons;
    this.isFixed = isFixed;
    this.posX = posX;
    this.posY = posY;
    this.radius = outerCircle;

    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", outerCircle * 2);
    this.svg.setAttribute("height", outerCircle * 2);
    this.svg.style.position = 'fixed';
    this.svg.style.zIndex = 9999;
    this.svg.style.pointerEvents = 'none';

    this.menuGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.menuGroup.setAttribute("transform", `translate(${outerCircle}, ${outerCircle})`);
    this.svg.appendChild(this.menuGroup);
    document.body.appendChild(this.svg);

    this.render();

    if (!isFixed) {
      this.hide();
      this.bindEvents();
    } else {
      this.setPos(posX, posY);
      this.show();
    }
  }

  render() {
    const angleStep = (2 * Math.PI) / this.buttons.length;

    this.menuGroup.innerHTML = '';
    this.menuGroup.setAttribute("font-family", this.fontFamily);
    this.menuGroup.setAttribute("font-size", this.fontSize);
    this.menuGroup.setAttribute("text-anchor", "middle");
    this.menuGroup.setAttribute("dominant-baseline", "middle");

    this.buttons.forEach((btn, i) => {
      const startAngle = i * angleStep + this.rotation + this.buttonGap;
      const endAngle = (i + 1) * angleStep + this.rotation - this.buttonGap;

      const x1 = Math.cos(startAngle) * this.outerCircle;
      const y1 = Math.sin(startAngle) * this.outerCircle;
      const x2 = Math.cos(endAngle) * this.outerCircle;
      const y2 = Math.sin(endAngle) * this.outerCircle;
      const x3 = Math.cos(endAngle) * this.innerCircle;
      const y3 = Math.sin(endAngle) * this.innerCircle;
      const x4 = Math.cos(startAngle) * this.innerCircle;
      const y4 = Math.sin(startAngle) * this.innerCircle;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

      const d = [
        `M ${x1} ${y1}`,
        `A ${this.outerCircle} ${this.outerCircle} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${this.innerCircle} ${this.innerCircle} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        'Z'
      ].join(' ');

      path.setAttribute("d", d);
      path.setAttribute("fill", btn.backgroundColor || '#eee');
      path.setAttribute("stroke", btn.borderColor || '#fff');
      path.setAttribute("role", "menuitem");
      path.setAttribute("tabindex", "0");
      path.style.cursor = 'pointer';
      path.style.pointerEvents = 'auto';
      path.addEventListener("click", btn.action);

      const midAngle = (startAngle + endAngle) / 2;
      const rMid = (this.innerCircle + this.outerCircle) / 2;
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.textContent = btn.text;
      text.setAttribute("x", Math.cos(midAngle) * rMid);
      text.setAttribute("y", Math.sin(midAngle) * rMid);
      text.setAttribute("fill", btn.textColor || '#000');
      text.style.pointerEvents = 'none';

      this.menuGroup.appendChild(path);
      this.menuGroup.appendChild(text);
    });
  }

  setPos(x, y) {
    this.svg.style.left = `${x - this.radius}px`;
    this.svg.style.top = `${y - this.radius}px`;
  }

  show() {
    this.svg.style.display = 'block';
  }

  hide() {
    this.svg.style.display = 'none';
  }

  bindEvents() {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.setPos(e.clientX, e.clientY);
      this.show();
    });

    document.addEventListener("click", () => this.hide());

    // Long press for iOS
    let longPressTimer;
    document.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      longPressTimer = setTimeout(() => {
        const touch = e.touches[0];
        this.setPos(touch.clientX, touch.clientY);
        this.show();
      }, 500);
    });

    document.addEventListener("touchend", () => {
      clearTimeout(longPressTimer);
    });
  }
}

