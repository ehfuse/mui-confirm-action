# 시작하기

## 설치

```bash
npm install @ehfuse/mui-confirm-action
```

peer 의존성(이미 MUI 앱이면 대개 갖춰져 있다):

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

## 가장 짧은 사용

앵커(누른 버튼)를 상태로 들고, 확인에서 실제 조작을 실행한다.

```tsx
import { useState } from "react";
import { Button } from "@mui/material";
import { ConfirmActionPopper } from "@ehfuse/mui-confirm-action";

export function DeleteButton({ onDelete }: { onDelete: () => void }) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    return (
        <>
            <Button onClick={(event) => setAnchorEl(event.currentTarget)}>삭제</Button>
            <ConfirmActionPopper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                title="삭제하시겠습니까?"
                onCancel={() => setAnchorEl(null)}
                onConfirm={() => {
                    onDelete();
                    setAnchorEl(null);
                }}
            />
        </>
    );
}
```

`open` 을 따로 두지 않고 `anchorEl` 하나로 열림/닫힘을 표현하는 것이 이 컴포넌트의 통상 사용법이다
(모바일에서는 앵커를 쓰지 않지만, 같은 상태로 열림을 판정하면 분기 코드가 필요 없다).

## 클릭 가능한 카드·행 안에서 쓸 때

카드 전체가 클릭 대상이면 **버튼에서 전파를 끊는다**. 팝퍼/다이얼로그 내부 클릭은 이 패키지가 이미 끊는다.

```tsx
<Box onClick={() => openDetail(item)}>
    <Button
        onClick={(event) => {
            event.stopPropagation(); // 카드 클릭으로 번지지 않게
            setAnchorEl(event.currentTarget);
        }}
    >
        완료
    </Button>
    <ConfirmActionPopper ... />
</Box>
```

## 모바일 판정을 앱 기준에 맞추기

기본값은 MUI 테마의 `lg` 미만이다. 앱이 자체 기준(예: Provider 설정·강제 모바일 모드)을 쓰면 `isMobile` 로 넘긴다.

```tsx
<ConfirmActionPopper isMobile={useMyAppIsMobile()} ... />
```

---

## 관련 문서

- [API](./api.md)
- [예제](./example.md)
