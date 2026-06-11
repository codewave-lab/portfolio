/* ======================================

        모바일 메뉴 요소 가져오기

====================================== */


/*
  const

  → 변하지 않는 값을 저장할 때 사용
  → "상수" 느낌

  예:
  const name = 'mono';

  보통 HTML 요소 선택할 때 많이 사용함
*/


/*
  document

  → 현재 HTML 문서 전체를 의미

  index.html 전체라고 생각하면 됨
*/


/*
  querySelector()

  → HTML 요소를 선택하는 함수

  CSS 선택자 방식 그대로 사용 가능

  예:
  '.class'
  '#id'
  'button'
*/


/*
  '.header-mobile-collapse'

  → class 이름 선택

  HTML의:

  class="header-mobile-collapse"

  이 요소를 찾아옴
*/


const menuBtn = document.querySelector('.header-mobile-collapse');


/*
  모바일 메뉴(nav) 선택
*/

const mobileMenu = document.querySelector('.gnb-mobile');





/* ======================================

          햄버거 버튼 클릭 이벤트

====================================== */


/*
  addEventListener()

  → 이벤트 감지 함수

  "무언가 발생하면 실행해라"

  라는 의미


  구조:

  요소.addEventListener('이벤트종류', 실행할함수);


  예:

  button.addEventListener('click', function () {

  });
*/


menuBtn.addEventListener('click', function (event) {


  /*
    classList

    → HTML 클래스 제어 기능

    예:
    add
    remove
    toggle
    contains
  */


  /*
    toggle()

    → 클래스가 있으면 제거
    → 없으면 추가

    show 클래스 ON/OFF 스위치 느낌
  */


  mobileMenu.classList.toggle('show');


  /*
    event

    → 지금 발생한 이벤트 정보


    여기서는:
    "클릭 이벤트" 정보가 들어있음
  */


  /*
    stopPropagation()

    → 이벤트 전파 막기

    클릭 이벤트가 부모까지 올라가는 걸 차단


    왜 필요함?

    버튼 클릭하면 document 클릭도 같이 발생함

    그러면:
    열자마자 닫혀버림


    그래서:

    "버튼 클릭은 여기서 끝"

    이라고 막아주는 것
  */


  event.stopPropagation();

});






/* ======================================

        메뉴 내부 클릭 시 유지

====================================== */


/*
  메뉴 내부 클릭할 때도
  document 클릭까지 전달되면 닫혀버림

  그래서 메뉴 영역도 막아줌
*/


mobileMenu.addEventListener('click', function (event) {

  event.stopPropagation();

});






/* ======================================

        바깥 영역 클릭 시 닫기

====================================== */


/*
  document

  = 페이지 전체

  즉:

  body
  main
  hero
  footer

  전부 클릭 감지 가능
*/


document.addEventListener('click', function () {


  /*
    remove()

    → 클래스 제거

    즉:

    class="show"

    삭제됨
  */


  mobileMenu.classList.remove('show');

});


menuBtn.addEventListener('click', function () {

  console.log('버튼 눌림');

});

/* ======================================

      스크롤 시 모바일 메뉴 닫기

====================================== */


/*
  window

  → 브라우저 전체 영역

  즉:
  현재 보고 있는 웹페이지 자체라고 생각하면 됨
*/


/*
  addEventListener()

  → 특정 이벤트 감지

  여기서는:

  'scroll'

  = 스크롤 발생 시 실행
*/


window.addEventListener('scroll', function () {


  /*
    classList.remove('show')

    → 모바일 메뉴에 붙어있는

    class="show"

    제거


    즉:

    메뉴 강제 닫기
  */


  mobileMenu.classList.remove('show');

});