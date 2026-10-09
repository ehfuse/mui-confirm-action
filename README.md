# @ehfuse/mui-confirm-action

되돌리기 어려운 조작(완료 체크·삭제·검수완료 등) 앞에 세우는 **확인 UI** 다.
데스크탑에서는 앵커에 붙는 팝퍼로, 모바일에서는 화면 가운데 다이얼로그로 스스로 갈라진다.

```bash
npm install @ehfuse/mui-confirm-action
```

peer: `react`, `react-dom`, `@mui/material`, `@emotion/react`, `@emotion/styled`

## 무엇을 해 주는가

- **한 컴포넌트, 두 표현** — 데스크탑=앵커 팝퍼(바깥 클릭이면 취소), 모바일=중앙 다이얼로그(폭 `min(92vw, 420px)`).
- **모바일 확대** — 모바일에서는 제목 19 / 버튼 19·최소높이 64px·세로여백 2 로 키운다(호출부가 더 크게 주면 그 값).
- **터치 ghost click 방어** — 확인 직후 같은 자리로 떨어지는 합성 클릭을 한 번 삼킨다.
- **클릭 전파 차단** — portal 로 그려져도 React 이벤트는 트리를 타고 오르므로, 확인/취소/배경 클릭이 앵커를 품은 카드·행의 `onClick` 까지 닿지 않게 끊는다.

## 시그니처

```tsx
import { ConfirmActionPopper } from "@ehfuse/mui-confirm-action";

function ConfirmActionPopper(props: ConfirmActionPopperProps): JSX.Element;

interface ConfirmActionPopperProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    title?: React.ReactNode;
    content?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    placement?: PopperProps["placement"];
    minWidth?: number;
    minHeight?: number;
    titleFontSize?: number;
    actionFontSize?: number;
    actionMinHeight?: number;
    actionPaddingY?: number;
    zIndex?: number;
    isMobile?: boolean;
    mobileActionHeight?: number; // 모바일 다이얼로그의 버튼 높이(px, 기본 55 — Provider 로 앱 전체 기본값을 줄 수도 있다)
    mobileTitleFontSize?: number; // 모바일 다이얼로그의 제목 글자 크기(px, 기본 19 — Provider 로도 줄 수 있다)
    mobileActionFontSize?: number; // 모바일 다이얼로그의 버튼 글자 크기(px, 기본 19 — Provider 로도 줄 수 있다)
    onCancel: () => void;
    onConfirm: () => void;
}

function swallowGhostClick(): void;

/** 호스트 앱의 모바일 판정을 하위 ConfirmActionPopper 전체에 한 번 내려준다(prop > Provider > MUI lg 미만). */
function ConfirmActionProvider(props: { isMobile?: boolean; mobileActionHeight?: number; mobileTitleFontSize?: number; mobileActionFontSize?: number; children: React.ReactNode }): JSX.Element;
```

### 호스트 앱의 모바일 기준 주입

앱마다 "모바일" 기준이 다르면(예: 768px 레이아웃 전환) 루트에서 한 번만 내려준다. 소비처는 래퍼 없이 패키지를 바로 쓴다.

```tsx
<ConfirmActionProvider isMobile={useIsMobile()}>
    <App />
</ConfirmActionProvider>
```

## 문서

- [시작하기](./docs/ko/getting-started.md)
- [API](./docs/ko/api.md)
- [예제](./docs/ko/example.md)
