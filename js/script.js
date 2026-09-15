const bgheader = () => {
  const navTag = document.querySelector('.navbg')
  if (window.scrollY > 20) {
    navTag.classList.add("bgheader")
  } else {
    navTag.classList.remove("bgheader")
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
  if(navEl.classList != "active"){
    iTag.classList.add("fa-bars")
    iTag.classList.remove("fa-x")
  }else{
    iTag.classList.remove("fa-bars")
    iTag.classList.add("fa-x")
  }
  
})