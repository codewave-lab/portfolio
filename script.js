/* pc버전 스크롤시 헤더 width 변경 애니메이션 */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});

/* 모바일 콜렙스 대응 */

const menuButton = document.querySelector(".header-contact-collaps");
const mobileDropdown = document.querySelector(".mobile-dropdown");

menuButton.addEventListener("click", () => {

  mobileDropdown.classList.toggle("active");

});

/* 모바일 메뉴 누르면 자동으로 닫히는 */

const mobileLinks = document.querySelectorAll(".mobile-dropdown a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileDropdown.classList.remove("active");
  });
});

/* 바깥 클릭하면 메뉴 닫기 모바일 대응*/

document.addEventListener("click", (e) => {

  if (
    !menuButton.contains(e.target) &&
    !mobileDropdown.contains(e.target)
  ) {
    mobileDropdown.classList.remove("active");
  }

});