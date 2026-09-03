# API

## 목차

- [ConfirmActionPopper](#confirmactionpopper)
    - [열림 제어 — open · anchorEl](#열림-제어--open--anchorel)
    - [문구 — title · content · confirmText · cancelText](#문구--title--content--confirmtext--canceltext)
    - [크기 — minWidth · minHeight · 폰트 · 버튼 높이](#크기--minwidth--minheight--폰트--버튼-높이)
    - [배치 — placement · zIndex](#배치--placement--zindex)
    - [모바일 판정 — isMobile](#모바일-판정--ismobile)
    - [콜백 — onConfirm · onCancel](#콜백--onconfirm--oncancel)
- [swallowGhostClick](#swallowghostclick)

## ConfirmActionPopper

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `open` | [`boolean`](#열림-제어--open--anchorel) | — | 열림 여부 |
| `anchorEl` | [`HTMLElement \| null`](#열림-제어--open--anchorel) | — | 데스크탑 팝퍼가 붙을 앵커 |
| `title` | [`ReactNode`](#문구--title--content--confirmtext--canceltext) | `"확인하시겠습니까?"` | 확인 제목 |
| `content` | [`ReactNode`](#문구--title--content--confirmtext--canceltext) | — | 제목과 버튼 사이 추가 콘텐츠(사유 입력칸 등) |
| `confirmText` | [`string`](#문구--title--content--confirmtext--canceltext) | `"확인"` | 확인 버튼 문구 |
| `cancelText` | [`string`](#문구--title--content--confirmtext--canceltext) | `"취소"` | 취소 버튼 문구 |
| `placement` | [`PopperProps["placement"]`](#배치--placement--zindex) | `"top"` | 팝퍼 배치(데스크탑) |
| `minWidth` | [`number`](#크기--minwidth--minheight--폰트--버튼-높이) | `160` | 팝퍼 최소 폭(데스크탑) |
| `minHeight` | [`number`](#크기--minwidth--minheight--폰트--버튼-높이) | — | 팝퍼 최소 높이(데스크탑) |
| `titleFontSize` | [`number`](#크기--minwidth--minheight--폰트--버튼-높이) | `17` | 제목 폰트 크기 |
| `actionFontSize` | [`number`](#크기--minwidth--minheight--폰트--버튼-높이) | `17` | 버튼 폰트 크기 |
| `actionMinHeight` | [`number`](#크기--minwidth--minheight--폰트--버튼-높이) | `44` | 버튼 최소 높이 |
| `actionPaddingY` | [`number`](#크기--minwidth--minheight--폰트--버튼-높이) | `1` | 버튼 세로 여백(MUI spacing) |
| `zIndex` | [`number`](#배치--placement--zindex) | `1300` | z-index |
| `isMobile` | [`boolean`](#모바일-판정--ismobile) | 자동(테마 `lg` 미만) | 모바일 판정 강제 |
| `onCancel` | [`() => void`](#콜백--onconfirm--oncancel) | — | 취소 |
| `onConfirm` | [`() => void`](#콜백--onconfirm--oncancel) | — | 확인 |

### 열림 제어 — open · anchorEl

`open` 이 열림을 정하고, `anchorEl` 은 데스크탑 팝퍼가 붙을 자리를 정한다. 모바일 다이얼로그는 앵커를 쓰지 않으므로
`anchorEl` 이 `null` 이어도 정상 동작한다. 보통은 앵커 상태 하나로 둘을 함께 표현한다 — `open={Boolean(anchorEl)}`.

### 문구 — title · content · confirmText · cancelText

`content` 는 제목과 버튼 사이에 들어간다. 반려 사유 입력처럼 "확인 전에 한 가지 더 받아야 하는" 경우에 쓴다.
입력값은 호출부가 상태로 들고 `onConfirm` 에서 읽는다.

### 크기 — minWidth · minHeight · 폰트 · 버튼 높이

데스크탑 팝퍼는 넘긴 값을 그대로 쓴다. **모바일 다이얼로그는 손가락 조작 기준으로 아래 값보다 작아지지 않는다.**

| 항목 | 데스크탑 기본 | 모바일 하한 |
| --- | --- | --- |
| 제목 폰트 | 17 | 19 |
| 버튼 폰트 | 17 | 19 |
| 버튼 최소 높이 | 44 | 64 |
| 버튼 세로 여백 | 1 | 2 |
| 폭 | `minWidth`(기본 160) | `min(92vw, 420px)` 고정 |

호출부가 하한보다 큰 값을 주면 그 값을 쓴다(`Math.max`).

### 배치 — placement · zIndex

`placement` 는 MUI Popper 규칙 그대로다. 다이얼로그(zIndex 1300) 위에서 열어야 하면 `zIndex` 를 그보다 올린다.

### 모바일 판정 — isMobile

미지정이면 MUI 테마의 `lg` 브레이크포인트 미만을 모바일로 본다(기본 테마 1200px, 커스텀 테마면 그 값).
앱이 Provider 설정이나 강제 모바일 모드를 쓰면 그 값을 그대로 넘긴다.

### 콜백 — onConfirm · onCancel

둘 다 호출 직전에 [`swallowGhostClick`](#swallowghostclick) 이 실행된다. 호출부는 상태를 닫는 일(`setAnchorEl(null)`)을 함께 한다.
바깥 클릭(데스크탑)·배경 클릭(모바일)도 `onCancel` 로 들어온다.

## swallowGhostClick

```ts
function swallowGhostClick(): void;
```

터치 tap 후 ~300ms 뒤 따라오는 합성 click 을 캡처 단계에서 한 번만 삼킨다. 확인 UI 가 닫힌 자리에 있던
요소(체크박스 등)가 그 클릭을 받아 방금 한 조작이 곧바로 되돌려지는 것을 막는다. 이 패키지의 확인/취소는
이미 내부에서 호출하므로, 직접 만든 확인 UI 를 같은 규칙으로 보호할 때만 쓰면 된다.

---

## 관련 문서

- [시작하기](./getting-started.md)
- [예제](./example.md)
