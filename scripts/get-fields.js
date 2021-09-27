const { item } = require('../_data/items.json');
const { baseitem } = require('../_data/items-base.json');

const fields = {};

[...item, ...baseitem].forEach((entry) => {
  // fields[.push(...Object.keys(i))];
  for (const [key, value] of Object.entries(entry)) {
    fields[key] = typeof value;
  }
});

console.log(fields);