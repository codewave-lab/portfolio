
const hamburger = document.querySelector(".hamburger");
const gnb = document.querySelector(".gnb");
// GNB 안의 모든 a 태그(링크)를 가져옵니다.
const navLinks = document.querySelectorAll(".gnb a");

// 1. 햄버거 메뉴 열기/닫기
hamburger.addEventListener("click", () => {
  gnb.classList.toggle("active");
});

// 2. 링크 클릭 시 메뉴 자동으로 닫기 (실무 필수 디테일)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // 활성화되어 있을 때만 닫기
    if (gnb.classList.contains("active")) {
      gnb.classList.remove("active");
    }
  });
});

// 개발이 끝난 후에는 console.log를 모두 지우는 것이 좋다.
