// ----------- API view started ---------

const blogPostLink = "https://kamoliddinuz.pythonanywhere.com/blogs/?page=1&page_size=0"
const archive = document.querySelector(".archive")
const loader = document.querySelector(".loader")
const loader_mobile = document.querySelector(".loader-mobile")
const loader_Img = document.querySelector(".loader_img")
const subscribe_form = document.querySelector(".subscribe-form")


const MONTHS = ["January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December"]

async function getBlogPosts(link) {
  loader.classList.add("active")
  loader_mobile.classList.add("active")
  subscribe_form.classList.add("remove")
  try {
    const res = await fetch(link)
    const data = await res.json()
    renderPosts(data.results)
  } catch (err) {
    console.error("Blog postlarni olishda xato:", err)
    archive.innerHTML = `<p>Postlarni yuklab bo'lmadi.</p>`
  } finally {
    loader.classList.remove("active")
    loader_mobile.classList.remove("active")
    subscribe_form.classList.remove("remove")
  }
}

getBlogPosts(blogPostLink)

function formatDay(iso) {
  const d = new Date(iso)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`
}

function renderPosts(posts = []) {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )

  // yil -> (oy -> postlar ro'yxati)
  const years = new Map()

  for (const post of sorted) {
    const d = new Date(post.created_at)
    const year = d.getFullYear()
    const month = d.getMonth()

    if (!years.has(year)) years.set(year, new Map())
    const months = years.get(year)

    if (!months.has(month)) months.set(month, [])
    months.get(month).push(post)
  }

  let html = ""

  for (const [year, months] of years) {
    html += `<h4 class="sticky">${year}</h4>`

    for (const [month, items] of months) {
      html += `<h4 class="month">${MONTHS[month]}</h4>`

      for (const item of items) {
        html += `
          <ul class="list-wrapper">
            <span><i class="fa-solid fa-arrow-right-long"></i></span>
            <li>
              <a class="list-wrapper" href="./OneBlog.html?slug=${encodeURIComponent(item.slug)}">
                <div class="date">${formatDay(item.created_at)}</div>
                <div class="title">${item.title}</div>
              </a>
            </li>
          </ul>`
      }
    }
  }

  archive.innerHTML = html
}