import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './item.ts';

@customElement('wc-item-list')
export class WCItemList extends LitElement {
  static styles = css`
    .title {
      background-color: rgb(254, 243, 199);
      font-size: 0.9rem;
      padding: 0 0.25rem;
      text-align: center;
    }
    .container {
      padding: 0.25rem;
      display: grid;
      gap: 0.25rem;
      grid-template-columns: repeat(5, 1fr);
    }
    .highlight {
      background-color: yellow;
    }
  `;

  @property({
    type: Array,
    attribute: false,
    hasChanged(n, o) {
      return JSON.stringify(n) !== JSON.stringify(o);
    },
  }) list = [];

  @property() uid = '--uid--';

  @property({ type: Boolean }) isDropTarget = false;

  @property({ type: Number }) dragging = -1;

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('dragenter', (e) => e.preventDefault());
    this.addEventListener('dragover', (e) => e.preventDefault());
  }

  render() {
    return html`
      <div class="title">${this.uid}</div>
      <div class="container ${this.isDropTarget ? 'highlight' : ''}">
        ${this.list.map((item, i) => html`<wc-item
          uid="${item}"
          .index="${i}"
          draggable="true"
        ></wc-item>`)}
      </div>
    `;
  }
}
