import {
  html, css, LitElement, nothing,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface itemType {
  name: string,
  sources: { [key: string]: number },
  type: string,
  // optional
  attunement?: string,
  charges?: number,
  damage?: {},
  entries?: (string | object)[],
  extends?: {},
  image?: boolean | string,
  rarity?: string,
  range?: string,
  properties?: string[],
  srd?: boolean,
  tier?: string,
}

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
      position: relative;
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

    :host([rarity])::before {
      content: "";
      display: block;
      position: absolute;
      border-width: 0.5em;
      border-style: solid;
      border-color: var(--rarity, transparent) var(--rarity, transparent) transparent transparent;
      height: 0;
      width: 0;
      top: 0;
      right: 0;
      z-index: 1;
    }

    :host([rarity="common"]) { --rarity: #94A3B8; }
    :host([rarity="uncommon"]) { --rarity: #84CC16; }
    :host([rarity="rare"]) { --rarity: #3B82F6; }
    :host([rarity="very rare"]) { --rarity: #7C3AED; }
    :host([rarity="legendary"]) { --rarity: #FCD34D; }
    :host([rarity="artifact"]) { --rarity: #DC2626; }
  `;

  @property() uid: string | null;

  @property({
    type: String,
    reflect: true,
  }) rarity;

  @property({
    type: Object,
    attribute: false,
    hasChanged(n, o) {
      return JSON.stringify(n) !== JSON.stringify(o);
    },
  }) details: itemType;

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
    if (this.uid == null) { return nothing; }

    const { details } = this;
    this.title = details.name;

    if (details.rarity) {
      this.rarity = details.rarity;
    }

    if (details.image) {
      const src = Object.keys(details.sources).shift();
      const name = details.name
        .replace(/\s/g, '_')
        .replace(/,/g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/'/g, '');
      return html`<img src="https://res.cloudinary.com/timbomckay/image/upload/items/${src}/${name}.webp" alt="${details.name}" />`;
    }

    return html`${details.name}`;
  }
}
