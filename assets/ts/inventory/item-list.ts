import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './item.ts';
import './item-details.ts';

@customElement('wc-item-list')
export class WCItemList extends LitElement {
  static styles = [
    css`
      * { box-sizing: border-box; }

      .title {
        background-color: rgb(254, 243, 199);
        font-size: 0.9rem;
        padding: 0 0.25rem;
        text-align: center;
        position: sticky;
        top: 4.5rem;
        z-index: 9;
      }
      .container {
        padding: 0.5rem;
        display: grid;
        gap: 0.25rem;
        grid-template-columns: repeat(auto-fill, minmax(2.5rem, 1fr));
      }
      .highlight {
        background-color: yellow;
      }
    `,
    css`@media (min-width: 48rem) {
      .container {
        padding: 0.25rem;
      }

      .title {
        top: 0;
      }
    }`,
  ];

  @property({
    type: Array,
    attribute: false,
    hasChanged(n, o) {
      return JSON.stringify(n) !== JSON.stringify(o);
    },
  }) list = [];

  @property() uid = '--uid--';

  @state() isDropTarget = false;

  @state() active = '';

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('dragenter', (e) => e.preventDefault());

    // this.active = this.list[0];

    this.addEventListener('dragover', (e) => {
      e.stopPropagation(); // let child accept & don't pass up to parent element
      e.preventDefault(); // required to accept drop
      e.dataTransfer.dropEffect = 'copy'; // move has no icon? adding copy shows +
    });
  }

  render() {
    return html`
      <div class="title">${this.uid}</div>
      <wc-item-details
        uid="${this.active}"
        .details="${this.ownerDocument.__ITEMS__[this.active]}"
        @close="${() => { this.active = ''; }}"
      ></wc-item-details>
      <div class="container ${this.isDropTarget ? 'highlight' : ''}">
        ${this.list.map((item, i) => html`<wc-item
          uid="${item}"
          .index="${i}"
          .details="${this.ownerDocument.__ITEMS__[item]}"
          draggable="true"
          @click="${() => { this.active = item; }}"
        ></wc-item>`)}
      </div>
    `;
  }
}
