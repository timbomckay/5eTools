import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('wc-item')
export class WCItem extends LitElement {
  static styles = css`
    :host {
      aspect-ratio: 1/1;
      border-color: #78350f;
      border-style: solid;
      border-width: 1px;
      font-size: 0.75rem;
      line-height: 1;
      overflow: hidden;
      padding: 0.25rem;
    }
    :host(.hovering) {
      background-color: red;
    }
    :host(.dragging) {
      background-color: yellow;
      transform: scale(1.15);
    }

    img {
      height: auto;
      width: auto;
      max-width: 100%;
      transform: scale(1.75);
      pointer-events: none;
    }
  `;

  @property() uid = null;

  @state() details = {};

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('tabindex', '0');

    this.addEventListener('dragstart', () => { this.classList.add('dragging'); });
    this.addEventListener('dragend', () => { this.classList.remove('dragging'); });

    this.addEventListener('dragenter', () => { this.classList.add('hovering'); });
    this.addEventListener('dragleave', () => { this.classList.remove('hovering'); });
    this.addEventListener('drop', () => { this.classList.remove('hovering'); });
  }

  render() {
    if (this.uid != null) {
      const details = this.ownerDocument.__ITEMS__[this.uid];
      this.title = details.name;

      if (details.image) {
        const src = Object.keys(details.sources).shift();
        const name = encodeURI(details.name);
        return html`<img src="https://5e.tools/img/items/${src}/${name}.jpg" alt="${details.name}" />`;
      }

      return html`${details.name}`;
    }

    return html`${this.uid}`;
  }
}
