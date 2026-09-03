# 예제

## 목차

- [기본 확인](#기본-확인)
- [사유를 함께 받는 확인](#사유를-함께-받는-확인)
- [클릭 가능한 카드 안에서](#클릭-가능한-카드-안에서)
- [예제 앱 실행](#예제-앱-실행)

## 기본 확인

```tsx
const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

<Button onClick={(event) => setAnchorEl(event.currentTarget)}>완료</Button>
<ConfirmActionPopper
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    title="완료 처리하시겠습니까?"
    confirmText="완료"
    onCancel={() => setAnchorEl(null)}
    onConfirm={() => {
        complete();
        setAnchorEl(null);
    }}
/>
```

## 사유를 함께 받는 확인

`content` 로 입력칸을 얹고, 값은 호출부가 들고 있다가 `onConfirm` 에서 쓴다.

```tsx
const [reason, setReason] = useState("");

<ConfirmActionPopper
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    title="되돌리시겠습니까?"
    minWidth={320}
    content={
        <TextField
            autoFocus
            fullWidth
            multiline
            minRows={2}
            placeholder="사유를 적어 주세요"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
        />
    }
    onCancel={() => setAnchorEl(null)}
    onConfirm={() => {
        returnTask(reason);
        setReason("");
        setAnchorEl(null);
    }}
/>
```

## 클릭 가능한 카드 안에서

카드 자체가 상세를 여는 구조라면, **버튼에서만** 전파를 끊으면 된다.
확인 UI 내부(확인·취소·배경) 클릭은 패키지가 끊는다.

```tsx
<Box onClick={() => openDetail(item)}>
    <Button
        onClick={(event) => {
            event.stopPropagation();
            setAnchorEl(event.currentTarget);
        }}
    >
        검수완료
    </Button>
    <ConfirmActionPopper open={Boolean(anchorEl)} anchorEl={anchorEl} ... />
</Box>
```

## 예제 앱 실행

```bash
cd example
npm install
npm run dev
```

`example/vite.config.ts` 가 패키지를 `../src` 로 alias 하므로 소스 수정이 바로 반영된다.

---

## 관련 문서

- [시작하기](./getting-started.md)
- [API](./api.md)
