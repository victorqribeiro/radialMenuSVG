# RadialMenuSVG

A fully accessible radial (circular) menu built with **SVG**, inspired by the original canvas-based [radialMenu](https://github.com/victorqribeiro/radialMenu) by [Victor Ribeiro](https://github.com/victorqribeiro).

This version prioritizes **accessibility**, **keyboard navigation potential**, and **semantic HTML structure** by using SVG elements like `<path>` and `<text>` instead of `<canvas>`, making the menu screen-reader friendly and easier to style with CSS.

[live](https://victorribeiro.com/radialMenuSVG/)

## 🚀 Features

- ✅ SVG-based radial layout
- ✅ Clickable and keyboard-focusable menu items
- ✅ Font-based icons (e.g., FontAwesome)
- ✅ Customizable size, gap, rotation, colors, and position
- ✅ Right-click activation or fixed positioning
- ✅ ARIA roles for accessibility

---

## 📦 Installation

You can clone or copy the class file:

```bash
git clone https://github.com/yourusername/RadialMenuSVG.git
````

Or just copy the `RadialMenuSVG.js` file into your project.

---

## 🧪 Usage Example

Make sure to include FontAwesome if you're using its icons:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
```

Then in JavaScript:

```js
import RadialMenuSVG from './RadialMenuSVG.js';

const menu = new RadialMenuSVG({
  outerCircle: 100,
  innerCircle: 40,
  fontSize: 20,
  fontFamily: 'FontAwesome',
  isFixed: true,
  posX: 200,
  posY: 150,
  buttons: [
    {
      text: '\uf013', // FontAwesome: gear
      action: () => alert('Settings')
    },
    {
      text: '\uf11c', // FontAwesome: power off
      action: () => alert('Shutdown')
    },
    {
      text: '\uf0e0', // FontAwesome: envelope
      action: () => alert('Messages')
    },
  ]
});
```

---

## ⚙️ Options

| Option         | Type      | Description                                          |
| -------------- | --------- | ---------------------------------------------------- |
| `outerCircle`  | `number`  | Outer radius of the menu (required)                  |
| `innerCircle`  | `number`  | Inner radius (creates a hole if > 0)                 |
| `fontSize`     | `number`  | Font size for the icons                              |
| `fontFamily`   | `string`  | Font family to render text (e.g. `'FontAwesome'`)    |
| `rotation`     | `number`  | Starting angle in radians                            |
| `buttonGap`    | `number`  | Space between buttons in radians                     |
| `isFixed`      | `boolean` | If true, menu is always visible                      |
| `posX`, `posY` | `number`  | Fixed position on screen (used if `isFixed` is true) |
| `buttons`      | `array`   | List of buttons (`text`, `action`, optional styles)  |

Each button object accepts:

* `text` (string) — character/icon to display
* `action` (function) — callback on click

---

## 🧱 Accessibility

* Each button is a `<path>` with `role="menuitem"` and `tabindex="0"`
* Menu has `role="menu"` and `aria-label`
* Ideal for screen readers and keyboard navigation (future updates may include key bindings)

---

## ✨ Credits

This project is a modern rewrite of the amazing [radialMenu](https://github.com/victorqribeiro/radialMenu) created by [Victor Ribeiro](https://github.com/victorqribeiro), originally built using `<canvas>`.

---

## 📄 License

MIT License

