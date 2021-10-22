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
        ? `<wc-roll dice="${dice}">${label}</wc-roll>`
        : `<wc-roll>${dice}</wc-roll>`;
    case 'chance':
      return `<wc-roll chance>${meta} percent</wc-roll>`;
    case 'action':
    case 'condition':
    case 'feat':
    case 'hazard':
    case 'item':
    case 'Item':
    case 'reward':
    case 'sense':
    case 'skill':
    case 'spell':
    case 'trap':
      return `<wc-fetch type="${tag}">${meta.split('|').shift()}</wc-fetch>`;
    case 'hit':
      return toMarkdown
        ? `**${meta >= 0 ? '+' : '-'}${meta}**`
        : `<b>${meta >= 0 ? '+' : '-'}${meta}</b>`;
    case 'dc':
      return `DC ${meta}`;
    case 'atk':
      switch (meta) {
        case 'mw':
          return '_Melee Weapon Attack:_';
        case 'rw':
          return '_Ranged Weapon Attack:_';
        default:
          return '_Attack:_';
      }
    // ignore tag & print meta
    case '5etools':
    case 'adventure':
    case 'background':
    case 'book':
    case 'class':
    case 'charoption':
    case 'classFeature':
    case 'creature':
    case 'disease':
    case 'deity':
    case 'filter':
    case 'object':
    case 'race':
    case 's':
    case 'table':
    case 'vehicle':
    case 'vehupgrade':
    case 'variantrule':
      return meta.split('|').shift();
    // no matching case, console log match and print meta
    default:
      // console.log({ tag });
      console.log({ match, tag, meta });
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