const fs = require('fs');
const processEntries = require('./process-entries');
const books = require('../_data/books.json').book;

const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(':', '')
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

books.forEach((book) => {
  const data = {
    title: book.name,
    id: book.id,
    published: book.published
  };

  if (book.coverUrl != null) {
    data.thumbnail = book.coverUrl;
  }

  if (book.storyline != null) {
    data.storyline = book.storyline;
  }

  const dir = './content/book/' + kebabCase(data.title);

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.writeFile(dir + '/_index.md', JSON.stringify(data, null, 2), (err) => {
    if (err != null) {
      console.log(err);
      return;
    }

    const source = require(`../_data/book/book-${data.id.toLowerCase()}.json`);

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

        const { headers } = book.contents[index];

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
