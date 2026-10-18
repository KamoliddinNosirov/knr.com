// ----------- API view started ---------

const API_BASE = "https://kamoliddinuz.pythonanywhere.com/blog/"
const rowPost = document.querySelector(".row")
const article_loader = document.querySelector(".article-loader")

const slug = new URLSearchParams(window.location.search).get("slug")

async function getBlogPost(slug) {
  rowPost.innerHTML = ""
  article_loader.classList.add("active")
  try {
    const req = await fetch(`${API_BASE}${encodeURIComponent(slug)}/`)
    renderOnePost(await req.json())
  } catch (err) {
    alert.error("Post data olishda xato:", err)
    rowPost.innerHTML = `
      <p>Maqola topilmadi.</p>
      <a href="./Blog.html">← Blogga qaytish</a>`
  } finally {
    article_loader.classList.remove("active")
  }
}

if (slug) {
  getBlogPost(slug)
} else {
  window.location.replace("./Blog.html")
}

const MONTHS = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]


function formatDay(iso) {
    const d = new Date(iso)
    return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`
}

function escapeHTML(text = "") {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function youtubeId(url) {
    if (!url) return null;
    const u = new URL(url);
    return u.hostname === "youtu.be" ? u.pathname.slice(1) : u.searchParams.get("v");
}

function prepareContent(html) {
    // 1) xavfli kodni tozalash (oembed ga ruxsat beramiz)
    const clean = DOMPurify.sanitize(html, { 
        ADD_TAGS: ["oembed"], 
        ADD_ATTR: ["url"] 
    });

    // 2) matnni vaqtinchalik hujjatga aylantiramiz, shunda elementlarni qidirib topish mumkin
    const doc = new DOMParser().parseFromString(clean, "text/html");

    // 3) inline stillarni o'chirish
    doc.querySelectorAll("[style]").forEach(el => el.removeAttribute("style"));

    // 4) h3 ni h4 ga almashtirish
    doc.querySelectorAll("h3").forEach(h3 => {
        const h4 = doc.createElement("h4");
        h4.innerHTML = h3.innerHTML;
        h3.replaceWith(h4);
    });

    // 5) rasmlar
    doc.querySelectorAll("img").forEach(img => {
        img.loading = "lazy";
        img.alt ||= "";
    });

    // 6) oembed -> iframe
    doc.querySelectorAll("oembed").forEach(el => {
        const id = youtubeId(el.getAttribute("url"));
        if (!id) return el.parentElement.remove();

        el.outerHTML = `
            <div class="iframe-wrap">
                <iframe src="https://www.youtube.com/embed/${id}"
                        title="YouTube video" frameborder="0"
                        allow="picture-in-picture; encrypted-media"
                        referrerpolicy="strict-origin-when-cross-origin"
                        loading="lazy" allowfullscreen></iframe>
            </div>`;
    });

    // 7) havolalar yangi oynada ochilsin
    doc.querySelectorAll("a").forEach(a => {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    });

    return doc.body.innerHTML;
}

function renderOnePost(data) {
    document.title = data.title;
    rowPost.innerHTML = `
    <div class="article-header">
      <a class="back" href="./Blog.html"><i class="fa-solid fa-angle-left"></i> Back to Blog</a>
      <h1>${escapeHTML(data.title)}</h1>
      <div class="article-detail">
        <p class="date">${formatDay(data.created_at)}</p>
        <p class="read-date date"><i class="fa-regular fa-clock"></i> ${data.read_time} min read</p>
      </div>
    </div>
    <div class="content">
      ${prepareContent(data.content)}
    </div>
    <div class="subscribe-form">
      <h6>Obuna Bo'ling</h6>
      <p>Yangi maqola, maruza & darslarimni
        <a href="https://t.me/kamoliddinnosirov">@kamoliddinnosirov</a>
        telegram kanalimda topishingiz mumkin.</p>
    </div>
    <div class="custom-pagination">
      <div class="pagination-list">
        <div class="col prev"><i class="fa-solid fa-angles-left"></i> Previous</div>
        <div class="col"><a href="./Blog.html">See More</a></div>
        <div class="col next">Next <i class="fa-solid fa-angles-right"></i></div>
      </div>
    </div>`;
}
