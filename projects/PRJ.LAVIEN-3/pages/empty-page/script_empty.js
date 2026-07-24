document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".empty-container");
  
  // 간단한 페이드인 효과
  container.style.opacity = "0";
  container.style.transition = "opacity 1s ease";
  
  window.requestAnimationFrame(() => {
    container.style.opacity = "1";
  });
});