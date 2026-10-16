// ----------- API view started ---------

const blogPostLink = "https://kamoliddinuz.pythonanywhere.com/blogs/?page=1&page_size=0"
const archive = document.querySelector(".archive")

const MONTHS = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
                "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"]

async function getBlogPosts(link) {
  try {
    const res = await fetch(link)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    renderPosts(data.results)
  } catch (err) {
    console.error("Blog postlarni olishda xato:", err)
  }
}

getBlogPosts(blogPostLink)

function formatDay(iso) {
  const d = new Date(iso)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`
}

function groupPosts(posts) {
  const groups = {}
  posts.forEach((item) => {
    const d = new Date(item.created_at)
    const year = d.getFullYear()
    const month = d.getMonth()

    groups[year] ??= {}
    groups[year][month] ??= []
    groups[year][month].push(item)
  })
  return groups
}

function renderPosts(posts = []) {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )

  const groups = groupPosts(sorted)
  const years = Object.keys(groups).sort((a, b) => b - a)

  archive.innerHTML = years.map((year) => {
    const months = Object.keys(groups[year]).sort((a, b) => b - a)

    const monthsHtml = months.map((month) => {
      const itemsHtml = groups[year][month].map((item) => `
        <ul class="list-wrapper">
          <span><i class="fa-solid fa-arrow-right-long"></i></span>
          <li>
            <a class="list-item" href="./Oneblog.html?id=${item.id}">
              <div class="date">${formatDay(item.created_at)}</div>
              <div class="title">${item.title}</div>
            </a>
          </li>
        </ul>
      `).join("")

      return `
        <h4 class="month">${MONTHS[month]}</h4>
        ${itemsHtml}
      `
    }).join("")

    return `
      <h4 class="sticky">${year}</h4>
      ${monthsHtml}
    `
  }).join("")
}