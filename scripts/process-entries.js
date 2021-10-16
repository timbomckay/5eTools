const convertTags = require('./convert-tags');

let toMarkdown = null;

const processEntry = (entry, level = 2) => {
  // console.log('processEntry');

  if (typeof entry === 'string') {
    // console.log('processEntry:string');
    return convertTags(entry, level, toMarkdown);
  }

  switch (entry.type) {
    case 'entries':
      const entries = processEntries(entry.entries, level + 1);

      // entries[0] = `<b><i>${entry.name}</i></b>. ${entries[0]}`;

      return [
        entry.name ? `${'#'.repeat(level)} ${entry.name}` : null,
        ...entries
      ].filter(i => i).join('\n\n');
    case 'inset':
      // console.log('processEntry:inset', entry);
      return '> ' + entry.entries.join('\n> \n> ');
      
      return {
        ...entry,
        entries: processEntries(entry.entries),
      };
    case 'list':
      return entry.items.map(item => `- ${processEntry(item)}`).join('\n');

      if (entry.style === 'list-hang-notitle') {
        entry.style = 'none';
      }

      return {
        ...entry,
        items: processEntries(entry.items)
      };
    case 'table':
      if (toMarkdown) {
        const table = [];
        let center = null;
        
        if (entry.colStyles) {
          entry.colStyles.forEach((col, i) => {
            if (col.split(' ').includes('text-center')) {
              center = i;
            }
          });
        }

        if (entry.caption) {
          table.push(`${'#'.repeat(level)} ${entry.caption}\n`);
        }

        const createTableRow = (arr) => {
          arr = arr.map((cell, index) => {
            cell = convertTags(cell, level, toMarkdown);

            return index === center
              ? `<span class="text-center block">${cell}</span>`
              : cell
          }).join(' | ');

          return `| ${arr} |`;
        };
        
        const columnCount = Math.max(entry.colLabels.length, entry.rows[0].length);

        // if (columnCount > 4) {
        //   console.log(entry);
        // }

        if (columnCount < entry.colLabels.length) {
          entry.colLabels = [
            ...entry.colLabels,
            ...Array( columnCount - entry.colLabels.length ).fill('')
          ]
        }
        
        table.push(createTableRow(entry.colLabels));

        table.push(`| ${Array(columnCount).fill('-').join(' | ')} |`);
        
        entry.rows.forEach((row) => {
          table.push(createTableRow(row));
        });
        
        return table.join('\n');
      }
      
      const obj = {};

      if (entry.caption) {
        obj.caption = entry.caption;
      }

      if (entry.footnotes) {
        obj.footnotes = entry.footnotes;
      }

      return {
        ...obj,
        type: entry.type,
        labels: entry.colLabels.map(label => convertTags(/^d\d/.test(label) ? `{@dice ${label}}` : label), level, toMarkdown),
        rows: JSON.stringify(entry.rows.map(row => row.map(cell => convertTags(cell.entry || cell, level, toMarkdown)))),
      };
    case 'image':
      // console.log('processEntry:image');
      return `![${entry.title}](${encodeURI(entry.href.path)})`;
    case 'item':
      if (entry.entries != null) {
        entry.entries = processEntries(entry.entries);
        return entry;
      }

      return `<b>${entry.name}</b> ${processEntry(entry.entry)}`;
    default:
      console.log(entry);
      return entry;
  }
};

const processEntries = (entries, level = 2, markdown) => {
  if (markdown != null) {
    toMarkdown = markdown
  }

  if (typeof entries === 'string') {
    return processEntry(entries, level);
  }

  if (Array.isArray(entries)) {
    return entries.map((entry) => processEntry(entry, level));
  }

  return processEntry(entries, level);
}

module.exports = processEntries;