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

const userDatabase = [
  
]