const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const pug = require('pug')
const { Remarkable } = require('remarkable')

const postsDirectory = path.join(process.cwd(), 'posts')

renderHome()
renderPosts()

function renderHome() {
  let posts = getSortedPostsData()
  posts = posts.filter((post) => post.published)
  const layoutPath = path.join(process.cwd(), 'layouts', 'index.pug')
  const str = pug.renderFile(layoutPath, { posts, formatDate })
  const renderPath = path.join(process.cwd(), 'docs', 'index.html')
  fs.writeFileSync(renderPath, str)
}

function renderPosts() {
  getAllPostIds().forEach((id) => {
    getPostData(id)
      .then((data) => {
        if (data.published) {
          const layoutPath = path.join(process.cwd(), 'layouts', 'post.pug')
          const str = pug.renderFile(layoutPath, { ...data, formatDate })
          const renderPath = path.join(process.cwd(), 'docs', 'posts', `${id}.html`)
          fs.writeFileSync(renderPath, str)
        }
      })
  })
}

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
                      'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre']
  const monthName = monthNames[Number.parseInt(month) - 1]
  return `${Number.parseInt(day)} de ${monthName} de ${year}`
}

function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      id,
      ...matterResult.data
    }
  })

  return allPostsData
    .sort((a, b) => (a.date < b.date) ? 1 : -1)
    .filter((post) => post.published)
}

function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''))
}

async function getPostData(id) {
  const md = new Remarkable()
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const contentHtml = md.render(matterResult.content)
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
