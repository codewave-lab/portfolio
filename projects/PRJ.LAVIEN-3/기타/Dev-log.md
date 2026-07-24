# Dev Log

## 2026-06-15

### 아이템선정, 레퍼런스 오브젝트 확정, common.css reset.css 추가및 수정

- 상업페이지에 어울리는 아이템으로 선정
- 아이템의 목적에 제일 부합하는 레퍼런스 오브젝트 선정
- 기존 레거시 reset.css 수정 및 보완하여 재활용
- common.css는 regacy에서 활용하여 작성
- 레퍼런스 메인컬러 서브컬러는 Ps를 이용해서 color값 추출 


## 2026-06-16

### 전체 레이아웃 및 와이어프레임 

- wrap 통째로 배경넣기.
- background-image: url(img/wrap-img.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;  
  <!-- 어테치먼트 픽시드로 고정해야 스크롤 다운시 안떠내려감 -->
  전체 wrap을 관통하는 뷰포트에 고정된 배경을 만들어 메인 섹션중 하나의 컨테이너 배경에 투영하는 방법.

- nthchile or nthoftype 를 사용하면 추후 컨텐츠 추가나 
- 부모 속성사이에 박스가 추가되면 선택자가 꼬일가능성이 있다.
- 아이콘은 CDN으로 불러오기, 사이즈는 폰트로 취급할것. width = X , font-size= O
  

## 2026-06-17

### header__dropdown, sticky, 스크롤시 transition구현

* Header Navigation 구조 작성
* Remix Icon 적용
* CTA(Login / Sign Up) 및 Hamburger Menu 레이아웃 정리
* 드롭다운 메뉴 마크업 구조 수정

- Dropdown 구현 과정
* 드롭다운 메뉴를 Hover 대상 컨테이너 내부로 이동
* Hover 기준 컨테이너에 `position: relative` 적용
* 드롭다운 메뉴에 `position: absolute` 적용
* 기본 상태 `display: none` → Hover 시 노출 방식 구현

- Dropdown 인터랙션 개선
* `display`는 transition 애니메이션이 적용되지 않는다는 점 확인
* `transform: scaleY()` 방식으로 드롭다운 펼침 효과 구현
* `transform-origin: top`을 사용하여 상단 기준으로 펼쳐지도록 설정
* Hover 해제 시 역방향으로 자연스럽게 접히는 동작 구현

- 특이사항
* Hover 인터랙션 구현 전 HTML 구조(부모-자식 관계)를 먼저 확인할 것
* 드롭다운 대상 요소는 Hover 대상 컨테이너 내부에 위치해야 함
* 펼침/접힘 인터랙션은 `display`보다 `transform`, `opacity` 활용이 유리

## 2026-06-18

### Header HBG(Mobile Menu) 구현

* 햄버거 메뉴 클릭 시 Mobile Menu Overlay 토글 구현
* `position: fixed`, `inset: 0`으로 뷰포트 전체를 덮는 구조 작성
* `display:none` 대신 `opacity`, `transform` 활용
  
* 등장 애니메이션 구현
  * `transform-origin: right`
  * `transform: scaleX(0)` → `scaleX(1)`
  * 우측에서 좌측으로 펼쳐지는 형태
  
* 메뉴 리스트 인터랙션 구현
  * 초기값 `opacity:0`, `translateY(80px)`
  * 활성화 시 `opacity:1`, `translateY(0)`
  * `nth-child()` + `transition-delay` 적용
  * 메뉴별 순차 등장(Stagger Effect) 구현
  
* Overlay 닫힘 애니메이션 개선
  * Overlay에 `transition-delay` 적용
  * 메뉴 텍스트가 먼저 사라진 후 Overlay가 닫히도록 수정
  * 텍스트 찌그러짐 현상 완화

* z-index 레이어 구조 정리
  * Header
  * Mobile Menu Overlay
  * 전역 UI 계층 재설정

* 특이사항
  * `transition-delay`는 애니메이션 시작 시점을 지연시킴
  * `display:none`은 transition 적용 불가
  * 인터랙션 구현 시 `transform`, `opacity` 조합이 유리
  * Overlay는 열림보다 닫힘 애니메이션 완성도가 중요


## 2026-06-19

### Global CTA(Floating Sidebar) 구현

* 우측 하단 고정(Fixed) Floating CTA 영역 구현
* `position: fixed`를 활용하여 전역 UI 배치
* Floating Action Button(FAB) 구조 작성

- 구조 설계

  * Greeting Bubble
  * Main Action Button(Headset)
  * Hidden Action Icons (네이버 / 카카오톡 / 전화)

* 버튼을 기준으로 아이콘이 위쪽으로 펼쳐지는 구조 구현
* `position: relative` + `position: absolute` 활용

---

### Floating Menu Toggle 구현

* JavaScript를 이용한 상태(State) 관리 적용
* 버튼 클릭 시 `.active` 클래스 토글

```js
element.classList.toggle("active")
```

* JS는 상태만 변경
* 스타일 및 애니메이션은 CSS에서 처리

- 초기 상태

```css
opacity: 0;
visibility: hidden;
transform: translateY(20px);
```

* 활성 상태

```css
opacity: 1;
visibility: visible;
transform: translateY(0);
```

* Floating Menu Open / Close 인터랙션 구현 완료

---

### Sequential Animation(Stagger Effect)

* 아이콘 등장 시 순차 애니메이션 적용
* `nth-child()` + `transition-delay` 활용

```css
:nth-child(1)
:nth-child(2)
:nth-child(3)
```

* 각 아이콘이 시간차를 두고 등장하도록 구현

---

### Greeting Bubble 구현

* 초기 진입 시 안내용 Greeting Bubble 노출
* X 버튼 클릭 시 Bubble 제거
* Floating Menu 활성화 시 Bubble 자동 제거

```css
.hide
```

상태 클래스를 활용하여 관리

* 제거된 Bubble은 다시 표시되지 않도록 처리

---

### CSS Text 처리 학습

#### white-space 속성 학습

기존에는 요소의 줄바꿈 제어를 위해 `flex-wrap`을 사용하려 했으나, 텍스트 줄바꿈은 별도의 속성으로 제어해야 함을 확인

```css
white-space: nowrap;
```

적용

* `<br>` 태그에 의한 줄바꿈은 유지
* 각 줄 내부 텍스트가 중간에서 분리되지 않도록 수정

예시

```html
안녕하세요.<br>
라비앙입니다.<br>
무엇이든 물어보세요.
```

→ 줄은 유지되지만

```text
안녕하세
요
```

와 같은 강제 분리는 발생하지 않음

---

### CSS 개념 정리

#### flex-wrap

```css
flex-wrap: nowrap;
```

* Flex Item(요소)의 줄바꿈 여부 제어
* Flex Container에서만 동작

#### white-space

```css
white-space: nowrap;
```

* Text(문자)의 줄바꿈 여부 제어

---

### 인터랙션 구현 패턴 정리

대부분의 UI 인터랙션은 다음 순서로 구현 가능

1. HTML 구조 작성
2. Position 기준점 설정
3. 기본 상태 정의
4. Active 상태 정의
5. JavaScript로 상태 토글
6. Transition 적용
7. 디테일 보완

예시

* Dropdown
* Mobile Menu
* Accordion
* Modal
* Floating Menu

모두 동일한 패턴으로 구현 가능

```text
기본 상태
↓
active 상태
↓
classList.toggle()
↓
transition
```
### CSS Interaction

* cursor: pointer
  * 마우스 오버 시 손가락 커서 표시
  * 사용자에게 클릭 가능한 요소임을 시각적으로 전달

* pointer-events
  * pointer-events:none
  * hover, click 등 마우스 이벤트 차단
  * UI 디버깅 시 클릭 불가 원인으로 자주 확인 필요

## 2026-06-23 (Tue)

### 작업 목적
La Vien 메인 페이지의 상단 구조를 정리하고, HERO 영역의 동작을 보다 자연스럽게 만들기 위한 기반 작업을 진행했다.  
특히 기존에 뒤섞여 있던 스크롤 처리 방식, 헤더 active 처리, 모바일 메뉴, HERO 슬라이더 로직을 한 번 정리하는 방향으로 수정했다.

---

### 1. 전체 스크롤 구조 재정리
#### 변경 배경
기존에는 아래 요소들이 동시에 섞여 있었다.

- 브라우저 기본 스크롤
- JS wheel 이벤트를 직접 가로채는 방식
- HERO 영역 sticky/축소 처리
- Lenis 부드러운 스크롤

이 구조에서는 다음과 같은 문제가 발생할 수 있었다.

- 휠은 먹었는데 화면은 바로 내려가지 않고 스크롤바만 먼저 반응하는 느낌
- HERO 구간에서 스크롤 체감이 어색해짐
- sticky/shrink와 wheel 제어가 충돌할 가능성
- 유지보수 시 어디서 스크롤을 제어하는지 파악하기 어려움

#### 수정 내용
스크롤의 주도권을 **Lenis 하나로 통일**했다.

- 전체 부드러운 스크롤은 Lenis가 전담
- wheel 직접 가로채기 방식 제거
- HERO shrink는 “실제 scroll 값”을 기준으로 계산
- header active 상태도 Lenis scroll 값 기준으로 업데이트하도록 연결

#### 결과
- 스크롤 입력과 실제 화면 이동 사이의 괴리감이 줄어듦
- HERO shrink와 페이지 전체 스크롤이 한 흐름으로 연결됨
- 구조가 단순해져 이후 튜닝 포인트가 명확해짐

---

### 2. 모바일 햄버거 메뉴 동작 정리
#### 변경 내용
햄버거 버튼 / 모바일 메뉴 / body 상태 / Lenis 정지를 하나의 흐름으로 묶어 정리했다.

메뉴 오픈 시:
- `.hbg.active`
- `.mobile-menu.active`
- `body.menu-open`
- `lenis.stop()`

메뉴 닫을 시:
- 위 상태 반대로 복구
- `lenis.start()`

#### 결과
- 모바일 메뉴가 열려 있을 때 배경 스크롤이 자연스럽게 차단됨
- body overflow 잠금과 Lenis stop/start 흐름이 일관되게 정리됨

---

### 3. Header active 상태 처리 정리
#### 변경 내용
스크롤이 일정 값 이상 내려가면 헤더에 `.active`를 부여하는 구조를 정리했다.

- `scrollY > 50` 기준으로 헤더 active 토글
- active 상태에서 흰 배경 / 그림자 / 텍스트 색상 전환
- 초기 진입 시와 resize 시에도 상태를 한 번 정리하도록 연결

#### 결과
- 첫 진입 / 스크롤 / 리사이즈 시 헤더 상태가 일관되게 유지됨
- 상단 UI가 좀 더 안정적으로 동작

---

### 4. 플로팅 버튼 / greeting 카드 동작 정리
#### 변경 내용
우측 하단 플로팅 버튼 관련 동작을 정리했다.

- 플로팅 버튼 클릭 시 숨겨진 링크 버튼 토글
- greeting 카드가 한 번이라도 버튼 클릭되면 숨김 처리
- 플로팅 버튼 아이콘을 상태에 따라 변경
  - 기본: 고객센터 아이콘
  - 활성: 닫기 아이콘

#### 결과
- 플로팅 UI의 상태 전환이 더 명확해짐
- greeting 카드가 반복적으로 시야를 방해하지 않도록 정리

---

### 5. HERO 슬라이더 구조 정리
#### 변경 내용
HERO 슬라이더의 상태를 아래 기준으로 다시 정리했다.

- `heroState.currentIndex`
- `heroState.timer`
- `heroState.slideDelay`

그리고 기능을 역할별로 분리했다.

- `showHeroSlide(index)`  
  현재 슬라이드 활성화 / 비활성화 처리

- `updateHeroDots(activeIndex)`  
  도트 active 상태 갱신

- `controlHeroVideo(activeIndex)`  
  활성 슬라이드가 video일 때만 재생, 나머지는 pause + currentTime 0

- `startHeroAutoplay()` / `stopHeroAutoplay()`  
  자동 슬라이드 전환 제어

- 도트 클릭 시 해당 슬라이드로 이동 + autoplay 재시작

#### 결과
- 슬라이더 상태 관리가 함수별로 분리되어 구조가 읽기 쉬워짐
- 이미지 슬라이드 / 비디오 슬라이드가 동일한 틀 안에서 관리되도록 정리됨

---

### 6. HERO shrink 방식 재설계
#### 기존 문제
기존 shrink는 초반 스크롤 몇백 px 안에서 거의 끝나버리는 느낌이 있었다.  
그래서 HERO가 화면에서 충분히 체류하는 동안 축소가 계속 이어지지 못하고, 초반에만 급하게 반응하는 인상이 있었다.

#### 수정 방향
HERO shrink를 “고정 px”가 아니라 **hero 섹션의 실제 화면 진행도(progress)** 기준으로 계산하도록 변경했다.

#### 계산 방식
- `heroTop`: 문서 기준 HERO 시작 위치
- `heroHeight`: HERO 섹션 높이
- `viewportH`: 현재 브라우저 높이

축소 구간은 대략 아래 흐름으로 설정했다.

- `shrinkStart = heroTop`
- `shrinkEnd = heroTop + viewportH * 0.92`

그 뒤 현재 스크롤이 이 구간에서 어느 정도 진행됐는지를 `progress (0 ~ 1)`로 환산해서 아래 값을 계산했다.

- 좌우 여백 증가 (`padding-inline`)
- border-radius 증가
- 살짝 아래로 내려오는 `translateY`

#### 결과
- HERO가 화면에 머무는 동안 shrink가 더 길게 이어짐
- 초반만 급하게 줄어드는 느낌이 줄어듦
- 카드처럼 천천히 정리되는 인상이 강해짐

---

### 7. HERO 이미지 슬라이드 줌아웃 효과 적용
#### 작업 목적
이미지 슬라이드가 활성화되어 있는 동안 배경 이미지가 천천히 zoom-out 되도록 만들어, 정적인 이미지도 더 살아있는 인상을 주도록 구성했다.

#### 적용 구조
- 이미지 슬라이드는 기본적으로 확대된 상태로 대기
- active가 되면 `scale(1)`까지 천천히 zoom-out
- 비디오 슬라이드는 확대/축소 없이 고정

#### 기본 개념
- 비활성 이미지: 확대된 대기 상태
- 활성 이미지: 일정 시간 동안 천천히 축소

#### 결과
- 이미지 슬라이드가 정적인 배경컷이 아니라 “살짝 움직이는 HERO”처럼 보이게 됨
- 영상 슬라이드와 함께 놓였을 때도 전체 리듬이 더 자연스러워짐

---

### 8. 탭 비활성화 / 리사이즈 대응 추가
#### 작업 내용
- `visibilitychange` 이벤트로 탭 비활성화 시 autoplay 정지 / 복귀 시 재시작
- `resize` 시 현재 스크롤 기준으로 header / hero shrink 상태 재계산

#### 결과
- 다른 탭을 보고 돌아왔을 때 autoplay 타이머가 꼬일 가능성을 줄임
- 화면 크기 변경 후 shrink 계산이 어긋나는 문제를 예방

---

### 2026-06-23 작업 정리
이날 작업의 핵심은 **메인 페이지의 동작 구조를 “스크롤 / 헤더 / 모바일 메뉴 / HERO 슬라이더 / shrink” 단위로 다시 정리한 것**이었다.  
특히 Lenis 중심 구조로 통합하면서, 이후 HERO의 디테일 튜닝(전환 타이밍, 이미지 줌아웃, 원복 방식 등)을 만질 수 있는 기반이 만들어졌다.

---

## 2026-06-24 (Wed)

### 작업 목적
전날 정리한 HERO 슬라이더 구조를 바탕으로, **슬라이드 전환 시 이미지 스케일 원복이 눈에 띄는 문제**를 다듬고, 관련 CSS/JS 구조를 더 자연스럽게 정리했다.

핵심 이슈는 다음과 같았다.

> 이미지 슬라이드가 한 차례 재생을 마치고 다음 슬라이드로 넘어갈 때,  
> 다음 차례를 대비해 이미지가 다시 확대 스케일로 원복되는 순간이  
> 전환 직후 살짝 눈에 보인다.

즉, 현재 슬라이드가 끝나자마자 곧바로 `scale(1.20)` 같은 대기 상태로 돌아가면서  
“아, 지금 원복됐네” 하는 티가 나는 상태였다.

---

### 1. 문제 원인 분석
기존 CSS 구조는 대략 아래 흐름이었다.

- 이미지 슬라이드는 기본적으로 `scale(1.20)` 상태
- active가 되면 `scale(1)`로 천천히 zoom-out
- active가 빠지면 즉시 다시 `scale(1.20)`으로 원복

문제는 이 “즉시 원복”이었다.

즉, 슬라이드가 비활성화되자마자 아래와 같은 규칙이 바로 적용되면서:

- transition 없이
- 확대 스케일로 즉시 복귀

전환이 완전히 끝나기도 전에 **원복 스케일이 살짝 보이는 순간**이 생겼다.

---

### 2. 해결 방향: “비활성 즉시 원복” → “조금 늦게 원복”
#### 변경 의도
이미지 슬라이드가 자기 차례를 마치고 사라질 때는,  
바로 원복하지 말고 **전환이 어느 정도 끝난 뒤에** 다음 재생을 위한 확대 상태로 돌아가게 만드는 것이 더 자연스럽다.

즉 구조를 이렇게 바꾸는 것이 목표였다.

1. 슬라이드 active 종료
2. 페이드 전환 진행
3. 전환이 조금 지나고 나서
4. 해당 슬라이드 이미지를 다음 차례용 확대 상태로 reset

---

### 3. reset 전용 상태 클래스 도입 방향 정리
이 문제를 해결하기 위해, 단순히 `:not(.is-active)`로 처리하지 않고  
**“원복 타이밍 전용 상태 클래스”를 따로 두는 방향**으로 구조를 정리했다.

예시 개념:
- `.is-active` : 현재 재생 중인 슬라이드
- `.is-reset-ready` 또는 유사 reset 상태 클래스 : 전환 후 원복 타이밍이 도달한 슬라이드

이 구조를 쓰는 이유는 다음과 같다.

#### 이유
1. **비활성화와 원복을 분리할 수 있음**
   - 슬라이드가 비활성화됐다고 해서 바로 확대 복귀하지 않아도 됨

2. **전환 타이밍 제어가 쉬워짐**
   - JS에서 `setTimeout` 등으로 원복 시점을 조절 가능

3. **상태가 더 명확해짐**
   - “지금은 비활성”
   - “지금은 원복 준비 완료”
   를 분리해서 읽을 수 있음

---

### 4. CSS 구조 정리 방향
#### 변경 전 문제
다음과 같은 식으로 비활성 상태 전체를 한 번에 처리하면,  
active가 빠지는 즉시 원복이 들어가 버린다.

- 활성 상태가 아니면 곧바로 `scale(1.20)`
- transition 없음
- 결과적으로 전환 중 원복이 보일 수 있음

#### 변경 후 의도
CSS는 **필요한 상태만 명시적으로 관리**하도록 정리했다.

- 기본 상태: 이미지 슬라이드 대기 스케일
- 활성 상태: zoom-out
- reset 준비 상태: transition 없이 확대 원복

그리고 “비활성 + 아직 reset 아님” 상태에 대해서는  
굳이 별도 빈 블록을 만들지 않고, **아무 것도 강제하지 않는 쪽**으로 정리하는 방향을 택했다.

---

### 5. 빈 CSS 블록 경고 원인 파악 및 정리
작업 중 아래와 같은 형태의 CSS 블록이 들어갔고, 에디터에서 노란 경고가 발생했다.

css
.hero-slide[data-type="image"]:not(.is-active):not(.is-reset-ready) .hero-image {
  /* 의도적으로 transform/transition 강제 지정하지 않음 */
}


## 2026-06-25 (THU)

### 

- HERO 텍스트 전환 타이밍 재조정
- 탭 비활성화 시 autoplay 동작 차이 확인
- shrink 중 배경 노출 / translateY 영향 정리
- 모바일 메뉴 오픈 시 스크롤바 제거로 인한 레이아웃 흔들림 해결
- HERO overlay 제거로 밝기 차이 해소
- About 섹션 1회성 reveal 연출의 성격 파악
- z-index / position / stacking context 개념 정리
- SEO 메타 문구 초안 작성


## 2026-06-26 (FRI)

### 어바웃 섹션 와이어프레임, 기초 css 작업


