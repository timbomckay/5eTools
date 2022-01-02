import {
  html, css, LitElement, nothing,
} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './item-list.ts';
import { items } from '../firebase';

function randomItem() {
  const arr = Object.keys(items);
  return arr[Math.floor(Math.random() * arr.length)];
}

function genInventory() {
  return Array.from(
    Array(Math.floor(Math.random() * 24 + 7)),
    () => randomItem(),
  );
}

const characters = () => ({
  'ch-uid-123': {
    name: 'Tenebrae',
    inventory: {
      Attuned: [
        randomItem(),
        randomItem(),
      ],
      Inventory: genInventory(),
      Backpack: genInventory(),
      'Bag of Holding': genInventory(),
    },
  },
  'ch-uid-321': {
    name: 'Cyan',
    inventory: {
      Attuned: [
        randomItem(),
        randomItem(),
        randomItem(),
      ],
      Inventory: genInventory(),
      Backpack: genInventory(),
      'Astral Scarf': genInventory(),
    },
  },
  'ch-uid-aaa': {
    name: 'Chris...?',
    inventory: {
      Attuned: [
        randomItem(),
      ],
      Inventory: genInventory(),
      Backpack: genInventory(),
    },
  },
  'ch-uid-abc': {
    name: 'DOMO',
    inventory: {
      Attuned: [
        randomItem(),
        randomItem(),
      ],
      Inventory: genInventory(),
      Backpack: genInventory(),
    },
  },
});

@customElement('wc-inventory')
export class WCInventory extends LitElement {
  static styles = [
    css`
      * { box-sizing: border-box; }

      :host {
        min-height: calc(100vh - 5rem);
      }
      .character {
        border-width: 0 0 1px 0;
        border-color: #78350f;
        border-style: solid;
        list-style: none;
      }
      .name {
        text-align: center;
        padding: 0.5rem;
        position: sticky;
        top: 2rem;
        z-index: 10;
        background-color: white;
        height: 2.5rem;
      }
    `,
    css`@media (min-width: 48rem) {
      :host {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        height: calc(100vh - 4rem);
      }
      .character {
        border-width: 1px;
        flex: 1 0 32ch;
        overflow: auto;
      }
      .name {
        top: 0;
      }
    }`,
  ];

  @state() data: {} | null = null;

  @state() dragging = {};

  public handleDrag(ch, list, e: DragEvent) {
    const { index, uid } = e.composedPath().shift();

    this.dragging = {
      ch, list, index, uid,
    };
  }

  public handleDrop(toChar, toList, e: DragEvent) {
    e.preventDefault(); // prevent safari reload
    const clone = JSON.parse(JSON.stringify(this.data));
    const {
      ch, list, index, uid,
    } = this.dragging;

    let { index: toIndex } = e.composedPath().shift();

    if (toIndex == null) {
      // append to array when null to append to new list
      toIndex = clone[toChar].inventory[toList].length;
    }

    // remove item
    clone[ch].inventory[list].splice(index, 1);
    // add item
    clone[toChar].inventory[toList].splice(toIndex, 0, uid);
    // update data
    this.data = clone;
    // reset dragging
    this.dragging = {};
  }

  public setData() {
    this.data = characters();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('ITEMS', () => this.setData());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('ITEMS', () => this.setData());
  }

  render() {
    if (this.data == null) {
      return nothing;
    }

    /* eslint-disable */
    return html`${Object.entries(this.data).map(([c, character]) =>
      html`<div class="character">
        <div class="name">${character.name}</div>
        ${Object.entries(character.inventory).map(([uid, list]) =>
          html`<wc-item-list
            .list="${list}"
            @drop="${(e: DragEvent) => this.handleDrop(c, uid, e)}"
            @dragstart="${(e: DragEvent) => this.handleDrag(c, uid, e)}"
            uid="${uid}"
          ></wc-item-list>`,
        )}
      </div>`,
    )}`;
     /* eslint-enable */
  }
}
