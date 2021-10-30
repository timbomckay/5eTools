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
    case 'highlight':
      return `<mark>${meta.split('|').shift()}</mark>`;
    // comic font styles for rick & morty campaign
    case 'comic':
    case 'comicNote':
      return `<span class="font-comic">${meta.split('|').shift()}</span>`;
    case 'comicH1':
    case 'comicH2':
    case 'comicH3':
    case 'comicH4':
    case 'comicH5':
      return `${'#'.repeat(tag.replace('comicH', ''))} <span class="font-comic">${meta.split('|').shift()}</span>`;
    // ignore tag & print meta
    case '5etools':
    case 'adventure':
    case 'background':
    case 'book':
    case 'boon':
    case 'charoption':
    case 'class':
    case 'classFeature':
    case 'creature':
    case 'cult':
    case 'deity':
    case 'disease':
    case 'filter':
    case 'language':
    case 'object':
    case 'optfeature':
    case 'race':
    case 's':
    case 'subclassFeature':
    case 'table':
    case 'u':
    case 'variantrule':
    case 'vehicle':
    case 'vehupgrade':
      return meta.split('|').shift();
    // no matching case, console log match and print meta
    default:
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