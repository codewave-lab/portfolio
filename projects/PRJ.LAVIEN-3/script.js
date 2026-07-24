/* =========================================================
   La Vien - script.js (Optimized Production Version)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ======================================================
     0. 공용 유틸 및 스크롤 이벤트 최적화 변수
  ====================================================== */
  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  // [최적화] requestAnimationFrame 성능 최적화를 위한 틱 제어 플래그
  let isTicking = false;

  /* ======================================================
     1. DOM 캐싱 
     - [사고 흐름: 대상(Target)을 미리 모두 찾아둠]
     - 나중에 이벤트가 발생할 때마다 DOM을 찾지 않기 위해 변수에 할당
  ====================================================== */
  const header = document.querySelector(".header");
  const hamburger = document.querySelector(".hbg");
  const mobileMenu = document.querySelector(".mobile-menu");

  const floatingBtn = document.querySelector("#floatingBtn");
  const floatingWrap = document.querySelector(".sidebar-button__contain");
  const greeting = document.querySelector(".greeting__contain");
  const greetingClose = document.querySelector(".greeting-close");
  const floatingIcon = floatingBtn ? floatingBtn.querySelector("i") : null;

  const hero = document.querySelector(".hero");
  const heroStage = document.querySelector(".hero-stage");
  const heroSlider = document.querySelector(".hero-slider");
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDots = document.querySelectorAll(".hero-dot");

  /* ======================================================
       2. Lenis 반응형 초기화 및 통합 스크롤 핸들러
    ====================================================== */
  let lenis = null;
  let lenisRafId = null;

  // [통합] 스크롤 이벤트 핸들러 (Lenis 유무와 상관없이 동작)
  function handleScroll() {
    // 1. [정보 수집] 현재 스크롤 위치값을 가져옴
    const scrollYValue = window.scrollY;

    // 2. [액션 실행] 수집한 스크롤 값을 바탕으로 헤더와 히어로 섹션 상태 업데이트
    updateHeaderState(scrollYValue);
    applyHeroShrink(scrollYValue);
  }

  // [최적화] 네이티브 스크롤 이벤트 시 고성능 프레임 제어를 위한 래퍼 함수
  function onNativeScroll() {
    // 1. [조건 판단] isTicking이 false일 때만 (즉, 이전 프레임 작업이 끝났을 때만) 실행
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        // 2. [액션 실행] 스크롤 계산 로직 실행 후 틱 플래그 초기화
        handleScroll();
        isTicking = false;
      });
      // 3. [상태 변경] 실행 중임을 표시
      isTicking = true;
    }
  }

  // 화면 크기에 따라 Lenis를 켜고 끄는 함수
  function initLenis() {
    // 1. [조건 판단] 현재 화면 너비가 1310px을 초과하는가? (PC인가 모바일인가?)
    if (window.innerWidth > 1310) {
      // 1-1. PC 환경 (Lenis 켜기)
      if (!lenis) {
        lenis = new Lenis({
          duration: 1.25,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          wheelMultiplier: 0.95,
          syncTouch: false,
          smoothWheel: true,
        });

        // [언제 실행?] Lenis 스크롤이 발생할 때마다 handleScroll 실행
        lenis.on("scroll", handleScroll);

        function raf(time) {
          lenis.raf(time);
          lenisRafId = requestAnimationFrame(raf);
        }
        lenisRafId = requestAnimationFrame(raf);

        // 네이티브 스크롤 이벤트 리스너 제거 (중복 실행 방지)
        window.removeEventListener("scroll", onNativeScroll);
      }
    } else {
      // 1-2. 모바일/태블릿 환경 (Lenis 끄기)
      if (lenis) {
        lenis.destroy();
        cancelAnimationFrame(lenisRafId);
        lenis = null;
      }
      // [최적화] 모바일 네이티브 스크롤에는 passive 옵션을 추가하여 스크롤 차단 현상을 방지하고 프레임 상승 유도
      window.addEventListener("scroll", onNativeScroll, { passive: true });
    }
  }

  // 최초 실행 및 리사이즈 대응
  initLenis();
  // [언제 실행?] 화면 크기가 바뀔 때마다 다시 확인
  window.addEventListener("resize", initLenis);

  // [핵심] 앵커 링크 부드러운 이동 분기 처리
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    // [언제 실행?] 해시(#) 링크를 클릭했을 때
    anchor.addEventListener("click", function (e) {
      // 1. [정보 수집] 클릭한 링크의 대상 ID 가져오기
      const targetId = this.getAttribute("href");

      // 2. [조건 판단] 링크가 단순 '#' 이면 무시
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      // 3. [조건 판단] 대상 요소가 화면에 존재하는가?
      if (targetElement) {
        e.preventDefault(); // 기본 점프 동작 막기

        // 4. [액션 실행] 기기 환경(Lenis 유무)에 따라 부드러운 스크롤 이동 처리
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -80, duration: 2.3 });
        } else {
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  /* ======================================================
     3. 모바일 햄버거 메뉴 열고 닫기
  ====================================================== */
  if (hamburger && mobileMenu) {
    // [언제 실행?] 햄버거 버튼 클릭 시
    hamburger.addEventListener("click", () => {
      // 1. [상태 변경] 햄버거 버튼에 active 클래스 토글 후, 열림 상태(boolean)를 isOpen에 저장
      const isOpen = hamburger.classList.toggle("active");

      // 2. [상태 동기화] 메뉴 컨테이너와 body(스크롤 방지용), 접근성 속성에 상태 적용
      mobileMenu.classList.toggle("active", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));

      // 3. [조건 판단 및 액션] 메뉴가 열렸는지 닫혔는지에 따라 배경 스크롤 차단/해제
      if (isOpen) {
        if (lenis) lenis.stop();
        else document.body.style.overflow = "hidden";
      } else {
        if (lenis) lenis.start();
        else document.body.style.overflow = "";
      }
    });
  }

  /* ======================================================
   3-2. 언어 선택 드롭다운
====================================================== */
  const langDropdown = document.querySelector(".lang-dropdown");
  const langBtn = document.querySelector(".lang-btn");

  if (langDropdown && langBtn) {
    // [언제 실행?] 언어 버튼 클릭 시
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // 문서 클릭 이벤트로 전파되는 것 방지
      // [상태 변경] 드롭다운 보이기/숨기기
      langDropdown.classList.toggle("active");
    });

    // [언제 실행?] 문서의 빈 공간을 클릭 시
    document.addEventListener("click", (e) => {
      // [조건 판단] 클릭한 곳이 드롭다운 내부가 아니라면?
      if (!langDropdown.contains(e.target)) {
        // [상태 변경] 드롭다운 숨기기
        langDropdown.classList.remove("active");
      }
    });
  }

  /* ======================================================
     4. 우측 하단 플로팅 버튼 / greeting 카드
  ====================================================== */
  if (floatingBtn && floatingWrap && floatingIcon) {
    // [언제 실행?] 플로팅 버튼 클릭 시
    floatingBtn.addEventListener("click", () => {
      // 1. [상태 변경] 플로팅 메뉴 활성화 토글 및 상태 저장
      const isActive = floatingWrap.classList.toggle("active");

      // 2. [조건 판단 & 액션] 말풍선(greeting)이 있으면 숨김 처리
      if (greeting) {
        greeting.classList.add("hide");
      }

      // 3. [상태 동기화] 활성화 여부에 따라 아이콘 모양 변경 (X 아이콘 or 상담 아이콘)
      floatingIcon.className = isActive
        ? "ri-close-line"
        : "ri-customer-service-2-line";
    });
  }

  if (greetingClose && greeting) {
    greetingClose.addEventListener("click", () => {
      greeting.classList.add("hide");
    });
  }

  /* ======================================================
     5. Header active 상태 업데이트
  ====================================================== */
  function updateHeaderState(scrollYValue) {
    if (!header) return;

    // [조건 판단] 스크롤이 50px 이상 내려갔는가?
    if (scrollYValue > 50) {
      // [상태 변경] 헤더 배경 채우기(active)
      header.classList.add("active");
    } else {
      // [상태 변경] 헤더 투명하게 돌리기
      header.classList.remove("active");
    }
  }

  /* ======================================================
     6. HERO 슬라이더 상태
  ====================================================== */
  // [정보 관리] 슬라이더의 현재 상태를 한 곳에서 중앙 통제 (상태 관리 객체)
  const heroState = {
    currentIndex: 0,
    timer: null,
    slideDelay: 5000,
    fadeDuration: 1600,
    isTransitioning: false,
  };

  function controlHeroVideo(activeIndex, enteringIndex = null) {
    if (!heroSlides.length) return;

    // [대상 순회] 모든 슬라이드의 비디오를 확인
    heroSlides.forEach((slide, index) => {
      const video = slide.querySelector("video");
      if (!video) return;

      // [조건 판단] 현재 화면에 보이거나 곧 나타날 비디오인가?
      const shouldPlay = index === activeIndex || index === enteringIndex;

      if (shouldPlay) {
        // [액션 실행] 멈춰있다면 처음부터 재생
        if (video.paused) {
          video.currentTime = 0;
          video.play().catch(() => { });
        }
      } else {
        // [액션 실행] 화면에서 사라진 비디오는 정지 및 초기화
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  function updateHeroDots(activeIndex) {
    if (!heroDots.length) return;
    // [상태 동기화] 현재 인덱스와 일치하는 도트만 활성화
    heroDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  }

  // (유틸 함수들: 상태 클래스 추가/제거)
  function clearHeroImageReset(slide) {
    if (!slide || slide.dataset.type !== "image") return;
    slide.classList.remove("is-reset-ready");
  }

  function markHeroImageResetReady(slide) {
    if (!slide || slide.dataset.type !== "image") return;
    slide.classList.add("is-reset-ready");
  }

  function setInitialHeroState(startIndex = 0) {
    if (!heroSlides.length) return;
    // [초기화] 시작 인덱스를 기준으로 모든 슬라이드 상태 리셋
    heroSlides.forEach((slide, index) => {
      slide.classList.remove("is-active", "is-entering", "is-reset-ready");
      if (index === startIndex) {
        slide.classList.add("is-active");
      } else if (slide.dataset.type === "image") {
        slide.classList.add("is-reset-ready");
      }
    });
    heroState.currentIndex = startIndex;
    updateHeroDots(startIndex);
    controlHeroVideo(startIndex);
  }

  function showHeroSlide(targetIndex) {
    if (!heroSlides.length) return;

    // [조건 판단 1] 현재 트랜지션(애니메이션) 중이면 무시 (버그 방지)
    if (heroState.isTransitioning) return;
    // [조건 판단 2] 누른 슬라이드가 현재 슬라이드면 무시
    if (targetIndex === heroState.currentIndex) return;

    // [정보 수집] 바뀌기 전 슬라이드와 새롭게 나타날 슬라이드 정보 확보
    const currentIndex = heroState.currentIndex;
    const oldSlide = heroSlides[currentIndex];
    const newSlide = heroSlides[targetIndex];

    if (!oldSlide || !newSlide) return;

    // 1. [상태 변경] 트랜지션 중임을 락(Lock) 걸고, 새 슬라이드 등장 애니메이션 시작
    heroState.isTransitioning = true;
    clearHeroImageReset(newSlide);
    newSlide.classList.add("is-entering");
    updateHeroDots(targetIndex);
    controlHeroVideo(currentIndex, targetIndex);

    // 2. [타이머 액션] 애니메이션 지속시간(fadeDuration) 이후에 완전한 상태로 변경
    window.setTimeout(() => {
      oldSlide.classList.remove("is-active");
      markHeroImageResetReady(oldSlide);

      newSlide.classList.remove("is-entering");
      newSlide.classList.add("is-active");

      // 3. [상태 동기화] 인덱스 및 락(Lock) 업데이트
      heroState.currentIndex = targetIndex;
      heroState.isTransitioning = false;

      controlHeroVideo(targetIndex);
    }, heroState.fadeDuration);
  }

  function nextHeroSlide() {
    if (!heroSlides.length) return;
    if (heroState.isTransitioning) return;

    // [조건 판단] 다음 슬라이드 인덱스 계산 (끝이면 0으로 돌아감)
    const nextIndex =
      heroState.currentIndex + 1 >= heroSlides.length
        ? 0
        : heroState.currentIndex + 1;

    // [액션 실행] 다음 슬라이드 노출
    showHeroSlide(nextIndex);
  }

  function startHeroAutoplay() {
    if (!heroSlides.length) return;
    // 기존 타이머 클리어 후 새로운 자동 재생 타이머 세팅
    clearInterval(heroState.timer);
    heroState.timer = setInterval(() => {
      if (!heroState.isTransitioning) {
        nextHeroSlide();
      }
    }, heroState.slideDelay);
  }

  if (heroSlides.length && heroDots.length) {
    // [언제 실행?] 하단 도트(Pagination)를 클릭했을 때
    heroDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (heroState.isTransitioning) return;
        if (index === heroState.currentIndex) return;

        // [액션 실행] 해당 슬라이드로 이동하고 자동 재생 타이머 리셋
        showHeroSlide(index);
        startHeroAutoplay();
      });
    });
  }

  // [기존 연출 완전 유지 및 최적화] 히어로 축소 로직
  function applyHeroShrink(scrollYValue) {
    if (!hero || !heroStage || !heroSlider) return;

    // 1. [정보 수집] 스크롤 계산을 위한 기준점(hero 위치, 화면 높이) 가져오기
    const heroTop = hero.offsetTop;
    const viewportH = window.innerHeight;
    const shrinkStart = heroTop;
    const shrinkEnd = heroTop + viewportH * 0.92; // 화면의 92%만큼 스크롤 될 때까지 진행

    // 2. [조건/수식 계산] 현재 스크롤이 지정된 구간에서 몇 % 진행되었는지(0~1) 계산
    const progress = clamp(
      (scrollYValue - shrinkStart) / Math.max(shrinkEnd - shrinkStart, 1),
      0,
      1
    );

    // 3. [조건 판단] 반응형 분기: 화면 크기에 따라 최대 여백(gap) 설정
    let maxSideGap;
    if (window.innerWidth >= 1440) {
      maxSideGap = 84;
    } else if (window.innerWidth >= 1024) {
      maxSideGap = 64;
    } else if (window.innerWidth >= 768) {
      maxSideGap = 32;
    } else {
      maxSideGap = 18;
    }

    // 4. [수식 계산] 진행률(progress)에 따라 실시간 갭과 라운드 값 산출
    const sideGap = maxSideGap * progress;
    const radius = 40 * progress;

    // 5. [애니메이션/액션 실행] requestAnimationFrame 틱 루프 안에서 끊김 없이 CSS 스타일 업데이트
    heroStage.style.paddingInline = `${sideGap}px`;
    heroSlider.style.borderRadius = `${radius}px`;
  }

  // 로드 시 초기 함수 실행
  setInitialHeroState(0);
  startHeroAutoplay();
  handleScroll();

  window.addEventListener("resize", () => {
    handleScroll();
  });

  /* ======================================================
   20. Promise 아코디언 
  ====================================================== */
  const promiseItems = document.querySelectorAll(".promise-item");
  promiseItems.forEach(item => {
    const button = item.querySelector(".promise-button");

    // [언제 실행?] 아코디언 버튼 클릭 시
    button.addEventListener("click", () => {
      // 1. [정보 수집] 클릭한 아이템이 이미 열려있는 상태인가?
      const active = item.classList.contains("active");

      // 2. [상태 변경/초기화] 우선 모든 아코디언을 닫고, 아이콘을 '+'(add) 상태로 만듦
      promiseItems.forEach(li => {
        li.classList.remove("active");
        const icon = li.querySelector(".promise-icon");
        icon.classList.remove("ri-subtract-line");
        icon.classList.add("ri-add-line");
      });

      // 3. [조건 판단 및 액션] 만약 클릭했던 아이템이 원래 닫혀있었다면 해당 아이템만 열기
      if (!active) {
        item.classList.add("active");
        const icon = item.querySelector(".promise-icon");
        icon.classList.remove("ri-add-line");
        icon.classList.add("ri-subtract-line"); // 아이콘을 '-'(subtract) 상태로 변경
      }
    });
  });

  /* =========================================================
   21. Swiper.js 초기화 (라이브러리 자체 옵션으로 관리)
  ========================================================= */
  const showcardSwiper = new Swiper('.mySwiper-showcard', {
    loop: true,
    speed: 800,
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 44,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    }
  });

  const reviewSwiper = new Swiper('.mySwiper-review', {
    loop: true,
    speed: 800,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 30 }
    }
  });

  /* =========================================================
     24. FOOTER 상담폼 제출 처리
  ========================================================= */
  const consultForm = document.querySelector(".consult-form");
  if (consultForm) {
    // [언제 실행?] 폼의 'submit' 이벤트 발생 시
    consultForm.addEventListener("submit", (e) => {
      // 1. [액션 실행] 기본 제출 동작(페이지 새로고침) 방지
      e.preventDefault();

      // 2. [액션 실행] 알림 띄우고 폼 내부 데이터 리셋
      alert("상담 신청이 정상적으로 접수되었습니다.");
      consultForm.reset();
    });
  }

  /* ======================================================
     25. 로그인 팝업 모달 제어 및 웹 접근성 포커스 트랩 (Focus Trap)
  ====================================================== */
  const loginBtn = document.querySelector("#openLoginModal");
  const loginModalOverlay = document.querySelector("#loginModal");
  const loginCloseBtn = document.querySelector(".login-close-btn");

  // [신규 구현 - 접근성 고도화] 모달 내에서만 포커스가 순환되도록 강제하는 함수
  function handleModalFocusTrap(e) {
    // [조건 판단] 누른 키가 Tab 키가 아니면 무시
    if (e.key !== 'Tab') return;

    // [정보 수집] 모달 안에서 포커스를 받을 수 있는 모든 요소 찾기
    const focusableElements = loginModalOverlay.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // [조건 판단 및 액션 실행] 포커스 순환 로직
    if (e.shiftKey) {
      // Shift + Tab을 눌렀을 때: 현재 포커스가 첫 번째 요소라면 맨 마지막 요소로 강제 이동
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      // 단순 Tab을 눌렀을 때: 현재 포커스가 마지막 요소라면 맨 첫 번째 요소로 강제 이동
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

  if (loginBtn && loginModalOverlay && loginCloseBtn) {
    // [언제 실행?] 로그인 버튼 클릭 시
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // 1. [상태 변경] 모달 열기 및 접근성 속성 부여
      loginModalOverlay.classList.add("active");
      loginModalOverlay.setAttribute("aria-hidden", "false");

      // 2. [액션 실행] 모달이 렌더링된 직후, 포커스를 닫기 버튼으로 강제 이동
      setTimeout(() => loginCloseBtn.focus(), 50);

      // 3. [상태 변경] 키보드 탭키 이동을 가두는 포커스 트랩 이벤트 연결
      window.addEventListener("keydown", handleModalFocusTrap);

      // 4. [조건 판단 및 액션] 뒷 배경 스크롤 차단
      if (lenis) lenis.stop();
      else document.body.style.overflow = "hidden";
    });

    function closeLoginModal() {
      // 1. [상태 변경] 모달 숨기기
      loginModalOverlay.classList.remove("active");
      loginModalOverlay.setAttribute("aria-hidden", "true");

      // 2. [상태 변경] 포커스 트랩 해제
      window.removeEventListener("keydown", handleModalFocusTrap);

      // 3. [액션 실행] 팝업을 열었던 원래 버튼으로 다시 포커스 돌려줌 (접근성)
      loginBtn.focus();

      // 4. [조건 판단 및 액션] 스크롤 차단 해제
      if (lenis) lenis.start();
      else document.body.style.overflow = "";
    }

    loginCloseBtn.addEventListener("click", closeLoginModal);

    // [언제 실행?] 모달 딤(어두운 배경) 영역 클릭 시
    loginModalOverlay.addEventListener("click", (e) => {
      // [조건 판단] 클릭한 타겟이 정확히 배경(오버레이) 자체일 때만 닫힘 (내부 컨텐츠 클릭 시 닫힘 방지)
      if (e.target === loginModalOverlay) {
        closeLoginModal();
      }
    });
  }

  /* ======================================================
     🔥 26. 스크롤 리빌 애니메이션 (Intersection Observer)
  ====================================================== */
  // 1. [대상 수집] 애니메이션을 적용할 모든 요소 찾기
  const revealElements = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");

  // 2. [조건 판단 생성] 화면(Viewport)에 요소가 교차하는지 감시하는 옵저버 생성
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // [조건 판단] 요소가 화면(임계점 15% 지점)에 들어왔는가?
      if (entry.isIntersecting) {
        // [상태 변경 및 애니메이션 실행] css 트랜지션을 발동시킬 클래스 추가
        entry.target.classList.add("is-revealed");

        // [상태 변경] 한 번 나타난 요소는 다시 감시하지 않음 (퍼포먼스 최적화)
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // 브라우저 뷰포트 기준
    threshold: 0.15, // 타겟 요소가 15% 보일 때 트리거
    rootMargin: "0px 0px -50px 0px" // 하단에서 50px 미리 당겨서 실행
  });

  // 3. [실행] 수집한 대상들을 옵저버에 등록하여 감시 시작
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});