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

