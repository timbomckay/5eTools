const fs = require('fs');
const processEntries = require('./process-entries');
const adventure = require('../_data/adventure/adventure-oota.json').data;
const adventures = require('../_data/adventures.json').adventure.find(adv => adv.id === 'OotA');

const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .split(':').shift()
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

adventure.forEach((chapter, index) => {
  const frontMatter = JSON.stringify({
    title: chapter.name,
    weight: index + 1
  }, null, 2);

  // TODO: Check Appendix, and such
  // console.log(chapter.name, adventures.contents[index]);
  const { headers } = adventures.contents[index];

  const data = [
    frontMatter,
    ...chapter.entries.map(entry => {
      const level = (headers != null) && headers.includes(entry.name) ? 2 : 3;
      return processEntries(entry, level, true);
    })
  ].join('\n\n');

  fs.writeFile(`./content/adventure/out-of-the-abyss/${kebabCase(chapter.name)}.md`, data, (err) => {
    if (err != null) { console.log(err); }
  });
});
