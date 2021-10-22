const convertTags = require('./convert-tags');

let toMarkdown = null;

const toMarkdownTable = (entry, level) => {
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
      if (typeof cell !== 'string') {
        if (cell.roll && cell.roll.exact) {
          cell = cell.roll.exact
        } else if (cell.type === 'entries') {
          cell = cell.entries.join(' ');
        } else {
          console.log('cell: ', cell);
        }
      }

      cell = convertTags(cell, level, toMarkdown);

      return index === center
        ? `<span class="text-center block">${cell}</span>`
        : cell
    }).join(' | ');

    return `| ${arr} |`;
  };

  let columnCount = entry.rows[0].length;

  if (entry.colLabels != null) {
    columnCount = Math.max(entry.colLabels.length, columnCount);

    if (columnCount < entry.colLabels.length) {
      entry.colLabels = [
        ...entry.colLabels,
        ...Array( columnCount - entry.colLabels.length ).fill('')
      ]
    }
    
    table.push(createTableRow(entry.colLabels));
  }

  table.push(`| ${Array(columnCount).fill('-').join(' | ')} |`);
  
  entry.rows.forEach((row) => {
    table.push(createTableRow(row));
  });
  
  return table;
}

const processEntry = (entry, level = 2) => {
  if (typeof entry === 'string') {
    return convertTags(entry, level, toMarkdown);
  }

  switch (entry.type) {
    case 'section':
    case 'entries':
    case 'optfeature':
      const entries = processEntries(entry.entries, level + 1);

      // entries[0] = `<b><i>${entry.name}</i></b>. ${entries[0]}`;

      return [
        entry.name ? `${'#'.repeat(level)} ${entry.name}` : null,
        entry.prerequisite ? `_Prerequisite: ${entry.prerequisite}_` : null,
        ...entries
      ].filter(i => i).join('\n\n');
    case 'insetReadaloud':
    case 'inset':
    case 'quote':
      const flattenToStrings = (arr) => arr.map((val) => {
        if (typeof val !== 'string') {
          switch (val.type) {
            case 'entries':
              if (val.name != null) {
                val.entries[0] = `**${val.name}:** ${val.entries[0]}`;
              }

              return flattenToStrings(val.entries);
            case 'list':
              return [
                val.name ? `**${val.name}**` : null,
                ...val.items.map(i => '- ' + convertTags(i.entry || i))
              ];
            case 'image':
              return `![${val.title || ''}](${encodeURI(val.href.path)})`;
            case 'table':
              return toMarkdownTable(val, level).join('\n> ');
            case 'quote':
              return [
                ...val.entries,
                `- ${val.by}`
              ];
            default:
              return val.entries || val;
          }
        }
      
        return convertTags(val);
      });
      
      return '> ' + [
        entry.name ? `${'#'.repeat(level)} ${entry.name}` : null,
        ...flattenToStrings(entry.entries),
        entry.by ? `- ${entry.by}` : null,
      ].filter(i => i).flat().join('\n> \n> ');
      
      return {
        ...entry,
        entries: processEntries(entry.entries),
      };
    case 'list':
      // return entry.items.map(item => `- ${processEntry(item)}`).join('\n');
      
      return [
        entry.name ? `${'#'.repeat(level)} ${entry.name}` : null,
        entry.items.map(item => `- ${processEntry(item)}`).join('\n')
      ].filter(i => i).join('\n\n');

      if (entry.style === 'list-hang-notitle') {
        entry.style = 'none';
      }

      return {
        ...entry,
        items: processEntries(entry.items)
      };
    case 'table':
      if (toMarkdown) {
        return toMarkdownTable(entry, level).join('\n');
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
      return `![${entry.title}](${encodeURI(entry.href.path)})`;
    case 'item':
      if (entry.entries != null) {
        entry.entries = processEntries(entry.entries);
        return entry;
      }

      return `<b>${entry.name}</b> ${processEntry(entry.entry)}`;
    case 'gallery':
      const arr = [];

      arr.push('<wc-gallery>');

      entry.images.forEach((img) => {
        arr.push(`![${img.title}](${encodeURI(img.href.path)})`)
      });

      arr.push('</wc-gallery>');

      return arr.join('\n\n');;
    case 'flowchart':
      return '> ' + entry.blocks.map(e => {
        return [
          e.name ? `${'#'.repeat(level)} ${e.name}` : null,
          ...e.entries.map(e => convertTags(e, level, toMarkdown)),
        ].filter(i => i).flat().join('\n> \n> ');
      }).filter(i => i).flat().join('\n> \n> ');
    case 'inlineBlock':
      return entry.entries.map(val => {
        if (typeof val !== 'string') {
          if (val.type === 'link') {
            return val.text;
          }
        }

        return val;
      }).join('');
    default:
      console.log('no case:', entry.type);
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