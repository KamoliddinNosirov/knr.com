// ----------- API view started ---------

const userDataLink = "https://kamoliddinuz.pythonanywhere.com/user/"
const homeBlock = document.querySelector(".home-block")
const section_Home = document.querySelector(".section-home")
const loader = document.querySelector(".loader")

async function getUserData(link) {
  loader.classList.add("active")
  section_Home.classList.add("remove")
  try {
    const res = await fetch(link)
    const data = await res.json()
    renderUser(data[0])
    loader.classList.remove("active")
    section_Home.classList.remove("remove")
  } catch (err) {
    console.error("User data olishda xato:", err)
  }
}

function renderUser(data) {
  homeBlock.innerHTML = `
    <div class="about">
      <img src="${data.avatar}" alt="">
      <div class="about-detail">
        <h1>${data.first_name} ${data.last_name}</h1>
        <h3>I'm a: <span class="typing"></span></h3>
        <div class="social-links">
          <a target="_blank" href=""><i class="fa-brands fa-youtube"></i></a>
          <a target="_blank" href="${data.github}"><i class="fa-brands fa-github"></i></a>
          <a target="_blank" href="${data.linkedin}"><i class="fa-brands fa-linkedin"></i></a>
          <a target="_blank" href="https://t.me/KamoliddinNosirov"><i class="fa-brands fa-telegram"></i></a>
        </div>
      </div>
    </div>
    <div class="detail">
      <p>${data.bio}</p>
      <div class="btns">
        <a href="./Blog.html">Read Blog</a>
        <a href="./About.html">About Me</a>
      </div>
    </div>
  `
}

if (homeBlock) getUserData(userDataLink)
