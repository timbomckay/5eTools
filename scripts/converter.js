const replaceTags = (str, level) => {      
  return str.replace(/\{@(\w+)\s([^\}]+)\}/g, (match, tag, meta, _, string) => {
    // console.log({ match, tag, meta });
    switch (tag) {
      case 'b':
			case '@bold':
        if (match === string) {
          return '#'.repeat(level + 1) + ' ' + meta;
        }
        
        return `**${meta}**`;
      case 'i':
			case 'italic':
        return `_${meta}_`;
      case 'area':
        return `-- (link) ${meta} --`;
      default:
        console.log({ match, tag, meta, string });
        
        return match;
    }
  });
}

const processEntries = (section, level = 1) => {  
  const heading = section.name
    ? '#'.repeat(level) + ' ' + section.name
    : null;
  
  const content = section.entries.map((entry) => {
    if (typeof entry === 'string') {
      return replaceTags(entry, level);
    }

    if (entry.type === 'entries') {    
      return processEntries(entry, level + 1);
    }
    
    if (entry.type === 'inset') {
      return '> ' + entry.entries.join('\n> \n> ');
    }
    
    if (entry.type === 'list') {
      return entry.items
        .map((item) => '- ' + replaceTags(item))
        .join('\n');
    }
    
    if (entry.type === 'table') {
      const createTableRow = (arr) => `| ${arr.join(' | ')} |`;
      
      const columnCount = entry.rows[0].length;
      
      const table = [];
      
      table.push(createTableRow([
        ...entry.colLabels,
        ...Array( columnCount - entry.colLabels.length ).fill('')
      ]));
      
      table.push(createTableRow(Array(columnCount).fill('-')));
      
      entry.rows.forEach((row) => {
        table.push(createTableRow(row));
      });
      
      return table.join('\n');
    }

    if (entry.type === 'image') {      
      return `![${entry.title}](${entry.href.path})`;
    }
    
    return JSON.stringify(entry, null, 2);
  }).filter(entry => entry != null).join('\n\n');
  
  return [heading, content].join('\n\n');
}