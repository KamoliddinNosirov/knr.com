const bgheader = () => {
  const navTag = document.querySelector('.navbg')
  if (window.scrollY > 20) {
    navTag?.classList.add("bgheader")
  } else {
    navTag?.classList.remove("bgheader")
  }
}
window.addEventListener("scroll", bgheader)


// Brief user database

// const userDatabase = []

// ------ Blog posts database ---------

// const postsDatabase = [
//   {
//     id: 0,
//     title: "20 yoshgacha 20 urinish",
//     date: "17 December, 2025",
//   }
// ]

// --------- Nav menu active --------
const navEl = document.querySelector("nav")
const menuBtn = document.querySelector("nav button")


menuBtn.addEventListener("click", ()=>{
  navEl.classList.toggle("active")
  const iTag = menuBtn.querySelector("i")
  console.log(iTag);
  if(navEl?.classList[1] != "active"){
    iTag.classList.add("fa-bars")
    iTag.classList.remove("fa-x")
  }else{
    iTag.classList.remove("fa-bars")
    iTag.classList.add("fa-x")
  }
})


const userLink = "https://kamoliddinuz.pythonanywhere.com/user/"
const home_block = document.querySelector(".home-block")

async function getUserData(link){
  const req = await fetch(link)
  const data = await req.json()
  console.log(data[0]);
  writeData(data[0])
  
}

getUserData(userLink)

const writeData = (data)=>{
  home_block.innerHTML = `
       <div class="about">
                <img src="${data.avatar}" alt="">
                <div class="about-detail">
                    <h1>${data.first_name} ${data.last_name}</h1>
                    <h3>I'm a: <span class="typing"></span></h3>
                    <div class="social-links">
                        <a href=""><i class="fa-brands fa-youtube"></i></a>
                        <a href="${data.github}"><i class="fa-brands fa-github"></i></a>
                        <a href="${data.linkedin}"><i class="fa-brands fa-linkedin"></i></a>
                        <a href=""><i class="fa-brands fa-telegram"></i></a>
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

  