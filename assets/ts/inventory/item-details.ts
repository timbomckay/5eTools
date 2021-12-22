import {
  html, css, LitElement, nothing, unsafeCSS,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';// Import the scale mode from the resize action.
import { Transformation } from '@cloudinary/url-gen';
import { fill, pad } from '@cloudinary/url-gen/actions/resize';
import { ifCondition } from '@cloudinary/url-gen/actions/conditional';
import { primary, yellow } from '../../colors';
import { cld } from '../cloudinary';
import { itemType } from './item';
import { SOURCES } from './parser';

const imgW = Math.round(window.devicePixelRatio * 480);

@customElement('wc-item-details')
export class WCItemDetails extends LitElement {
  static styles = css`
    * { box-sizing: border-box; }

    :host {
      border-color: ${unsafeCSS(primary[800])};
      border-style: solid;
      border-width: 0 0 1px 0;
      display: block;
    }

    :host([uid=""]) {
      display: none;
    }

    .image-container {
      padding: 0;
      position: relative;
    }

    img {
      display: block;
      height: auto;
      line-height: 0;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      mix-blend-mode: multiply;
      width: 100%;
    }
    
    .content {
      padding: 0 0.5rem;
    }

    .content-inner {
      border-color: ${unsafeCSS(yellow[600])};
      border-style: solid;
      border-width: 1px 0;
      font-size: 0.85em;
      padding: 0.5rem 0;
      line-height: 1.25;
      max-height: 50vh;
      overflow: auto;
    }

    .title, .info {
      align-items: center;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    .title {
      color: ${unsafeCSS(primary[600])};
      font-size: 1.125rem;
      line-height: 1;
      font-weight: 600;
      padding: 0.5rem;
      position: relative;
    }

    .title .attunement {
      flex-shrink: 0;
      color: ${unsafeCSS(primary[900])};
      color: black;
      opacity: 0.325;
    }

    .icon {
      display: inline-block;
      line-height: 0;
    }
    
    .icon > svg {
      display: block;
      fill: currentColor;
      height: 1em;
      max-height: 100%;
      max-width: 100%;
      width: 1em;
    }

    b { line-height: 1; }

    ul { padding-left: 1.25rem; }

    li, p {
      margin-top: 0.5em;
    }

    ul.none {
      padding-left: 0;
      list-style-none;
    }

    .charges {
      line-height: 1;
      display: inline-flex;
    }

    .charges > .icon {
      margin-left: -0.5em;
    }

    .sources {
      font-size: 0.9em;
      margin-top: 1rem;
      display: block;
    }

    .property {
      background-color: black;
      border-radius: 9999px;
      border: 1px solid white;
      color: white;
      display: inline-grid;
      font-family: sans-serif;
      font-size: 12px;
      font-weight: bold;
      height: 1rem;
      line-height: 1;
      margin-left: -0.325rem;
      padding: 0 0.325rem;
      place-content: center;
      position: relative;
      text-align: center;
    }

    .footer {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      gap: 0.25rem;
      justify-content: flex-end;
      font-size: 0.85em;
    }

    button {
      border: 0;
      background-color: transparent;
      background-image: none;
      cursor: pointer;
      color: inherit;
      line-height: inherit;
      padding: 0;
    }

    details {
      position: relative;
    }

    summary {
      cursor: pointer;
      list-style: none;
    }

    ::-webkit-details-marker {
      display: none;
    }

    details > div {
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 2px;
      bottom: 100%;
      filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.125));
      padding: 0.5rem;
      position: absolute;
      right: -0.25rem;
      width: 14ch;
    }

    span[data-rarity] {
      background-color: var(--rarity, transparent);
      box-shadow: 0 0 0 2px white;
      content: "";
      display: block;
      font-size: 0.45rem;
      height: 1em;
      left: 50%;
      position: absolute;
      top: 100%;
      transform: translate(-50%, -50%) rotate(-45deg);
      width: 1em;
      z-index: 1;
    }

    span[data-rarity="common"] { --rarity: #94A3B8; }
    span[data-rarity="uncommon"] { --rarity: #84CC16; }
    span[data-rarity="rare"] { --rarity: #3B82F6; }
    span[data-rarity="very rare"] { --rarity: #7C3AED; }
    span[data-rarity="legendary"] { --rarity: #FCD34D; }
    span[data-rarity="artifact"] { --rarity: #DC2626; }

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
    const { details } = this;
    if (!details.image) { return nothing; }

    // get first source for image path
    const src = Object.keys(details.sources).shift();
    // alter name for url path
    const name = details.name
      .replace(/\s/g, '_') // convert spaces to underscore
      .replace(/,/g, '') // remove commas
      .replace(/\(/g, '') // remove open parens
      .replace(/\)/g, '') // remove close parens
      .replace(/'/g, ''); // remove apostrephes

    const image = cld.image(`items/${src}/${name}`);

    image
      .format('auto')
      .conditional(
        ifCondition(
          'aspect_ratio > 1.2',
          new Transformation().resize(fill().width(imgW).height(imgW * 0.5625)),
        ).otherwise(
          new Transformation().resize(pad().width(imgW).height(imgW * 0.5)),
        ),
      );
    // .conditional(
    //   ifCondition(
    //     `width > ${imgW}`,
    //     new Transformation().resize(scale().width(imgW)),
    //   ),
    // );

    return html`<div class="image-container">
      <img src="${image.toURL()}" alt="${details.name}" width="2" height="1" />
    </div>`;
  }

  attunementTemplate(val: string | undefined) {
    if (!val) { return nothing; }

    const icon = html`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="20" viewBox="0 0 20 20" width="20"><g><rect fill="none" height="20" width="20"/></g><g><path d="M18,10l-1.77-2.03l0.25-2.69l-2.63-0.6l-1.37-2.32L10,3.43L7.53,2.36L6.15,4.68L3.53,5.28l0.25,2.69L2,10l1.77,2.03 l-0.25,2.69l2.63,0.6l1.37,2.32L10,16.56l2.47,1.07l1.37-2.32l2.63-0.6l-0.25-2.69L18,10z M8.59,13.07l-2.12-2.12l0.71-0.71 l1.41,1.41l4.24-4.24l0.71,0.71L8.59,13.07z"/></g></svg>`;
    const icon2 = html`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;

    // attuned => colored verified icon
    // attuneable => faded verified icon
    // not attuneable => black x icon (or something)

    return html`<span class="attunement icon" data-tooltip="requires attunement${val.length ? ` ${val}` : ''}">
      ${icon}
    </span>`;
  }

  damageTemplate(val: {} | undefined) {
    if (!val) { return nothing; }

    const { roll, type, versatile } = val;

    return html`
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0zm21.02 19c0 1.1-.9 2-2 2h-14c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z"/></svg>
      </span>
      ${[roll, versatile].filter((i) => !!i).join('/')} ${type}
      <span style="margin-right: auto;"></span>`;
  }

  chargeTemplate(count: number | undefined) {
    if (!count) { return nothing; }

    const icon = () => html`<span class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></svg>
    </span>`;

    if (count > 8) {
      // if count > 8, reduce to 5 icons
      return html`<span class="charges">
        ${icon()}<span>*${count}</span>
      </span>`;
    }

    return html`<span class="charges">${Array.from(Array(count)).map(() => icon())}</span>`;
  }

  rarityTemplate(val: string | undefined) {
    if (!val) { return nothing; }
    return html`<span data-rarity="${val}"></span>`;
  }

  closeButtonTemplate() {
    const icon = html`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`;

    return html`<button style="line-height: 0;" type="button" @click="${() => { this._dispatchMyEvent('close'); }}">${icon}</button>`;
  }

  menuButtonTemplate() {
    const icon = html`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;

    return html`<details>
      <summary style="line-height: 0;">${icon}</summary>
      <div>
        <i>Menu in Progress</i>
      </div>
    </details>`;
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

  private _dispatchMyEvent(name: string, detail = {}) {
    const myEvent = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail,
    });
    this.dispatchEvent(myEvent);
  }

  render() {
    if (!this.uid) { return nothing; }

    const {
      attunement,
      charges,
      damage,
      entries,
      image,
      name,
      properties,
      range,
      rarity,
      sources,
      srd,
      tier,
      type,
      ...data
    } = this.details;

    return html`
      ${this.imageTemplate()}
      <div class="title">
        ${name}
        <div>
          ${this.attunementTemplate(attunement)}
        </div>
        ${this.rarityTemplate(rarity)}
      </div>
      <div class="content">
        <div class="content-inner">
          <div class="info">
            <i>${type} ${tier ? `(${tier})` : ''} ${rarity}</i>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
              ${this.chargeTemplate(charges)}
              ${properties ? html`<div>${properties.map((p, i) => html`<span class="property" style="z-index: -${i};">${p}</span>`)}</div>` : ''}
            </div>
          </div>
          ${Object.keys(data).length ? html`<pre>${JSON.stringify(data, null, 2)}</pre>` : ''}
          ${this.processEntries(entries)}
          <div>
            <i class="sources">
              ${sources ? Object.keys(sources).map((src) => SOURCES[src]).join(' • ') : ''}
            </i>
          </div>
        </div>
      </div>
      <div class="footer">
        ${this.damageTemplate(damage)}
        ${this.menuButtonTemplate()}
        ${this.closeButtonTemplate()}
      </div>
    `;
  }
}
