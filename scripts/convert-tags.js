let level = 0;
let toMarkdown = false;

const process = (match, tag, meta, _, string) => {
  switch (tag) {
    case 'b':
    case 'bold':
      if (toMarkdown) {
        if (match === string) {
          return '#'.repeat(level + 1) + ' ' + meta;
        }
        
        return `**${meta}**`;
      }

      return `<b>${meta}</b>`;
    case 'i':
    case 'italic':
    case 'note':
      return toMarkdown
        ? `_${meta}_`
        : `<i>${meta}</i>`;
    case 'area':
      return `**area ${meta.split('|').shift()}**`;
    case 'link':
      return `**${meta.split('|').shift()}**`;
    case 'dice':
    case 'damage':
      const [dice, label] = meta.split('|');
      return label
        ? `<dice-roll dice="${dice}">${label}</dice-roll>`
        : `<dice-roll>${dice}</dice-roll>`;
    case 'chance':
      return `<dice-roll chance>${meta} percent</dice-roll>`;
    case 'action':
    case 'condition':
    case 'hazard':
    case 'item':
    case 'sense':
    case 'skill':
    case 'spell':
      return `<fetch-data type="${tag}">${meta.split('|').shift()}</fetch-data>`;
    case 'hit':
      return toMarkdown
        ? `**${meta >= 0 ? '+' : '-'}${meta}**`
        : `<b>${meta >= 0 ? '+' : '-'}${meta}</b>`;
    case 'dc':
      return `DC ${meta}`;
    case 'adventure':
    case 'book':
    case 'creature':
    case 'disease':
    case 'filter':
    case 'table':
    case 'variantrule':
      // console.log('process:', tag);
      return meta.split('|').shift();
    default:
      console.log({ match, tag, meta, string });
      return meta;
  }
};

const convertTags = (str, lvl, markdown) => {
  level = lvl;

  if (markdown != null) {
    toMarkdown = markdown
  }

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