const fs = require('fs');
const processEntries = require('./process-entries');
const adventures = require('../_data/adventures.json').adventure;

const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(':', '')
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

adventures.forEach((adventure) => {
  const data = {
    title: adventure.name,
    id: adventure.id,
    published: adventure.published
  };

  if (adventure.coverUrl != null) {
    data.thumbnail = adventure.coverUrl;
  }

  if (adventure.level != null) {
    data.level = adventure.level;
  }

  if (adventure.storyline != null) {
    data.storyline = adventure.storyline;
  }

  const dir = './content/adventure/' + kebabCase(data.title);

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.writeFile(dir + '/_index.md', JSON.stringify(data, null, 2), (err) => {
    if (err != null) {
      console.log(err);
      return;
    }

    const source = require(`../_data/adventure/adventure-${data.id.toLowerCase()}.json`);

    if (source != null) {
      // console.log('\n', `--- ${data.title} ---`, );

      const kebabCaseCh = string => string
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .split(':').shift()
        .replace(/[\s_]+/g, '-')
        .toLowerCase();

      source.data.forEach((chapter, index) => {
        const frontMatter = JSON.stringify({
          title: chapter.name,
          weight: index + 1
        }, null, 2);

        const { headers } = adventure.contents[index];

        const ch = [
          frontMatter,
          ...chapter.entries.map(entry => {
            const level = (headers != null) && headers.includes(entry.name) ? 2 : 3;
            return processEntries(entry, level, true);
          })
        ].join('\n\n');

        fs.writeFile(dir + `/${kebabCaseCh(chapter.name)}.md`, ch, (err) => {
          if (err != null) {
            console.log(err);
            return;
          }
        });
      });
    }
  });
});
