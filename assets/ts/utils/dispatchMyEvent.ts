import { LitElement } from 'lit';

/**
 * @param el LitElement to dispatch event from
 * @param name Name of the event
 * @param detail (Optional) Object to pass to detail property
 *
 * By default, an event dispatched inside a shadow root will not be visible outside that shadow root. To make an event pass through shadow DOM boundaries, you must set the `composed` property to `true`. It's common to pair `composed` with `bubbles` so that all nodes in the DOM tree can see the event.
 *
 * If an event is composed and does bubble, it can be received by all ancestors of the element that dispatches the event—including ancestors in outer shadow roots. If an event is composed but does not bubble, it can only be received on the element that dispatches the event and on the host element containing the shadow root.
 *
 * @see https://lit.dev/docs/components/events/#shadowdom-composed
 */
export function dispatchMyEvent(el: LitElement, name: string, detail = {}) {
  const myEvent = new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  });

  el.dispatchEvent(myEvent);
}
