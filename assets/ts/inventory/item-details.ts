import {
  html, css, LitElement, nothing,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { itemType } from './item';

@customElement('wc-item-details')
export class WCItemDetails extends LitElement {
  static styles = css`
    :host {
      border-color: #78350f;
      border-style: solid;
      border-width: 1px 0;
      display: block;
      font-size: 0.9rem;
      overflow: auto;
      padding: 0.5rem;
      max-height: 50vh;
    }

    :host([uid=""]) {
      display: none;
    }

    img {
      display: block;
      height: auto;
      line-height: 0;
      margin-left: auto;
      margin-right: auto;
      max-height: 7.5rem;
      max-width: 100%;
      mix-blend-mode: multiply;
      width: auto;
    }

    p, li {
      font-size: 0.85em;
      line-height: 1.25;
    }

    b { line-height: 1; }

    ul { padding-left: 1.25rem; }

    li { margin-top: 0.5em; }

    ul.none {
      padding-left: 0;
      list-style-none;
    }

    pre {
      background-color: whitesmoke;
      border: 1px solid #ccc;
      padding: 0.5rem;
      border-radius: 0.5rem;
      overflow: auto;
      font-size: 0.75rem;
    }
  `;

  @property() uid = null;

  @property({
    type: Object,
    attribute: false,
    hasChanged(n, o) {
      return JSON.stringify(n) !== JSON.stringify(o);
    },
  }) details: itemType;

  imageTemplate() {
    if (!this.details.image) { return nothing; }

    const { details } = this;

    const src = Object.keys(details.sources).shift();
    const name = details.name
      .replace(/\s/g, '_')
      .replace(/,/g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/'/g, '');

    return html`<div><img src="https://res.cloudinary.com/timbomckay/image/upload/items/${src}/${name}.webp" alt="${details.name}" width="480" height="360" /></div>`;
  }

  processEntries(entries: itemType['entries']) {
    return html`${entries == null
      ? nothing
      : entries.map((entry) => this.processEntry(entry))
    }`;
  }

  processEntry(entry, tag?) {
    if (typeof entry === 'string') {
      switch (tag) {
        case 'li':
          return html`<li>${unsafeHTML(entry)}</li>`;
        default:
          return html`<p>${unsafeHTML(entry)}</p>`;
      }
    }

    if (Array.isArray(entry)) {
      return html`Array: <pre>${JSON.stringify(entry, null, 2)}</pre>`;
    }

    switch (entry.type) {
      case 'list':
        return html`<ul class=${entry.style}>${entry.items.map((item) => html`${this.processEntry(item, 'li')}`)}</ul>`;
      default:
        return html`<pre>${JSON.stringify(entry, null, 2)}</pre>`;
    }
  }

  render() {
    if (!this.uid) { return nothing; }

    const {
      name,
      image,
      entries,
      srd,
      attunement,
      rarity,
      type,
      tier,
      sources,
      charges,
      properties,
      ...data
    } = this.details;

    return html`
      ${this.imageTemplate()}
      <div>${name}</div>
      <div>
        ${type}
        ${tier ? `(${tier})` : ''}
        ${rarity}
        ${attunement ? '(requires attunement)' : ''}
      </div>
      <div>
        ${properties ? properties.join(' | ') : ''}
        ${charges ? html`<div>charges: ${charges}</div>` : ''}
      </div>
      ${Object.keys(data).length ? html`<pre>${JSON.stringify(data, null, 2)}</pre>` : ''}
      ${this.processEntries(entries)}
      <div>
        ${sources ? Object.keys(sources) : ''}
      </div>
    `;
  }
}
