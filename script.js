const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const remark = require("remark");
const html = require("remark-html");
const ejs = require('ejs');

const postsDirectory = path.join(process.cwd(), 'posts')

function renderPosts() {
  getAllPostIds().forEach(id => {
    getPostData(id)
      .then(data => {
        const layoutPath = path.join(process.cwd(), "layouts", "post.html");
        ejs.renderFile(layoutPath, {...data, formatDate}, (err, str) => {
          if (err) return console.log(err);
          const renderPath = path.join(process.cwd(), "docs", "posts", `${id}.html`);
          fs.writeFileSync(renderPath, str);
        });
      });
  });
}
renderPosts();

function renderHome() {
  const posts = getSortedPostsData();
  const layoutPath = path.join(process.cwd(), "layouts", "index.html");
  ejs.renderFile(layoutPath, {posts, formatDate}, (err, str) => {
    if (err) return console.log(err);
    const renderPath = path.join(process.cwd(), "docs", "index.html");
    fs.writeFileSync(renderPath, str);
  });
}
renderHome();

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
                      "agosto", "setiembre", "octubre", "noviembre", "diciembre"];
  const nameMonth = monthNames[Number.parseInt(month) - 1];
  return `${Number.parseInt(day)} de ${nameMonth} de ${year}`;
}

function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date) ? 1 : -1)
          .filter(post => post.published)
}

function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => fileName.replace(/\.md$/, ''))
}

async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

