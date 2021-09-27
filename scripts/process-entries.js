const convertTags = require('./convert-tags');

const processEntry = (entry) => {
  // console.log('processEntry');

  if (typeof entry === 'string') {
    // console.log('processEntry:string');
    return convertTags(entry);
  }

  switch (entry.type) {
    case 'entries':
      const entries = processEntries(entry.entries);
      entries[0] = `<b><i>${entry.name}</i></b>. ${entries[0]}`;
      return entries;
    case 'inset':
      // console.log('processEntry:inset');
      return {
        ...entry,
        entries: processEntries(entry.entries),
      };
    case 'list':
      // console.log('processEntry:list');
      if (entry.style === 'list-hang-notitle') {
        entry.style = 'none';
      }

      return {
        ...entry,
        items: processEntries(entry.items)
      };
    case 'table':
      // console.log('processEntry:table');
      const obj = {};

      if (entry.caption) {
        obj.caption = entry.caption;
      }

      if (entry.footnotes) {
        obj.footnotes = entry.footnotes;
      }

      // if (entry.colStyles) {
      //   console.log(entry.colStyles);
      // }

      return {
        ...obj,
        type: entry.type,
        labels: entry.colLabels.map(label => convertTags(/^d\d/.test(label) ? `{@dice ${label}}` : label)),
        rows: JSON.stringify(entry.rows.map(row => row.map(cell => convertTags(cell.entry || cell)))),
      };
    case 'image':
      // console.log('processEntry:image');
      return `![${entry.title}](${entry.href.path})`;
    case 'item':
      if (entry.entries != null) {
        entry.entries = processEntries(entry.entries);
        return entry;
      }

      return `<b>${entry.name}</b> ${processEntry(entry.entry)}`;
    default:
      // console.log('type:', entry.type);
      return entry;
  }
};

const processEntries = (entries) => {
  if (typeof entries === 'string') {
    // console.log('processEntries:string');
    return processEntry(entries);
  }

  if (Array.isArray(entries)) {
    // console.log('processEntries:array');
    return entries.map((entry) => processEntry(entry));
  }

  // console.log('processEntries:object');
  return processEntry(entries);
}

module.exports = processEntries;