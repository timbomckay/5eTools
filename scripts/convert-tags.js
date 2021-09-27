let level = 0;
let markdown = false;

const process = (match, tag, meta, _, string) => {
  switch (tag) {
    case 'b':
    case 'bold':
      if (markdown) {
        if (match === string) {
          return '#'.repeat(level + 1) + ' ' + meta;
        }
        
        return `**${meta}**`;
      }

      return `<b>${meta}</b>`;
    case 'i':
    case 'italic':
    case 'note':
      return markdown
        ? `_${meta}_`
        : `<i>${meta}</i>`;
    case 'area':
    case 'link':
      const [text, href] = meta.split('|');
      // TODO: Target
      return markdown
        ? `[${text}](${href})`
        : `<a href="${href}">${text}</a>`;
    case 'dice':
    case 'damage':
      const [dice, label] = meta.split('|');
      return label
        ? `<roll dice="${dice}">${label}<roll>`
        : `<roll>${dice}<roll>`;
    case 'chance':
      return `<roll chance>${meta} percent<roll>`;
    case 'action':
    case 'condition':
    case 'hazard':
    case 'item':
    case 'sense':
    case 'skill':
    case 'spell':
      return `<info type="${tag}">${meta}<info>`;
    case 'hit':
      return `<b>${meta >= 0 ? '+' : '-'}${meta}</b>`;
    case 'dc':
      return `DC ${meta}`;
    case 'adventure':
    case 'book':
    case 'creature':
    case 'filter':
    case 'table':
    case 'variantrule':
      return meta.split('|').shift();
    default:
      console.log({ match, tag, meta, string });
      return meta;
  }
};

const convertTags = (str, lvl) => {
  level = lvl;

  if (typeof str === 'number') {
    return str;
  }

  return str
    .replace('{@h}', '<i>Hit:</i>')
    .replace(/\{(@).+[^\}]+\{@/g, (match) => match.replace('@', '$'))
    .replace(/\{@(\w+)\s([^\}]+)\}/g, process)
    .replace(/\{\$(\w+)\s(.+)\}/g, process);
}

module.exports = convertTags;