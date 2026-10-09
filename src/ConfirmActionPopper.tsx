/**
 * 공통 확인 UI 다 — 데스크탑은 앵커에 붙는 팝퍼, 모바일은 화면 가운데 다이얼로그로 분기한다.
 * "한 번의 오클릭으로 되돌리기 어려운 조작(완료 체크·삭제·검수완료 등)은 확인을 거친다"는
 * 규칙을 한 곳에서 지키기 위한 조각이다.
 */

import { Button, ClickAwayListener, Dialog, Paper, Popper, Typography, Box } from "@mui/material";
import { useIsMobile } from "./internal/useIsMobile";
import { useConfirmActionConfig } from "./ConfirmActionProvider";
import { swallowGhostClick } from "./internal/swallowGhostClick";
import type { ConfirmActionBodyProps, ConfirmActionPopperProps } from "./types/confirmAction";

/** 확인 본문(제목 + 추가 콘텐츠 + 취소/확인 버튼)을 렌더링한다. 팝퍼/다이얼로그 공용. */
function ConfirmActionBody({
    title,
    content,
    confirmText,
    cancelText,
    titleFontSize,
    actionFontSize,
    actionMinHeight,
    actionPaddingY,
    onCancel,
    onConfirm,
}: ConfirmActionBodyProps) {
    /** 확인/취소 — 잔여 클릭을 삼킨 뒤 콜백을 실행한다(닫힌 자리의 요소가 다시 눌리지 않게). */
    const handleCancel = () => {
        swallowGhostClick();
        onCancel();
    };
    const handleConfirm = () => {
        swallowGhostClick();
        onConfirm();
    };
    return (
        <>
            <Typography
                component="div"
                sx={{ fontSize: titleFontSize, fontWeight: 700, color: "#0f172a", lineHeight: 1.4 }}
            >
                {title}
            </Typography>
            {content}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                    size="medium"
                    variant="outlined"
                    color="inherit"
                    onClick={handleCancel}
                    fullWidth
                    sx={{ fontSize: actionFontSize, minHeight: actionMinHeight, py: actionPaddingY, fontWeight: 700 }}
                >
                    {cancelText}
                </Button>
                <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                    fullWidth
                    sx={{ fontSize: actionFontSize, minHeight: actionMinHeight, py: actionPaddingY, fontWeight: 700 }}
                >
                    {confirmText}
                </Button>
            </Box>
        </>
    );
}

/** 공통 확인 UI 를 렌더링한다. */
export function ConfirmActionPopper({
    open,
    anchorEl,
    title = "확인하시겠습니까?",
    content,
    confirmText = "확인",
    cancelText = "취소",
    placement = "top",
    minWidth = 160,
    minHeight,
    titleFontSize = 17,
    actionFontSize = 17,
    actionMinHeight = 44,
    actionPaddingY = 1,
    zIndex = 1300,
    isMobile,
    onCancel,
    onConfirm,
}: ConfirmActionPopperProps) {
    // 모바일 판정 우선순위: 호출부 prop > 호스트가 ConfirmActionProvider 로 내려준 값 > 패키지 자체 판정(lg 미만).
    // 앱마다 레이아웃 기준이 달라(768px / lg …) 호스트가 한 번 내려주는 길이 있어야 소비처마다 래퍼를 만들지 않는다.
    const detectedMobile = useIsMobile();
    const { isMobile: providedMobile } = useConfirmActionConfig();
    const mobile = isMobile ?? providedMobile ?? detectedMobile;
    // 모바일 가운데 다이얼로그는 팝퍼 기본값으로는 작아 손가락으로 누르기 불편하다 — 호출부가 더 크게
    // 지정하지 않았으면 제목 19 / 버튼 19·최소높이 64px·세로여백 2 로 키운다(데스크탑 팝퍼는 그대로).
    // ⚠️ 세로여백만 올리면 눈에 띄지 않는다 — 여백+글자 높이가 최소높이를 넘어야 실제로 커진다.
    // 19px 글자(줄높이 ~28px) + 여백 2(16px×2) = 60px 이라 최소높이도 64px 로 함께 올린다.
    const body = (
        <ConfirmActionBody
            title={title}
            content={content}
            confirmText={confirmText}
            cancelText={cancelText}
            titleFontSize={mobile ? Math.max(titleFontSize, 19) : titleFontSize}
            actionFontSize={mobile ? Math.max(actionFontSize, 19) : actionFontSize}
            // 모바일 단추는 52px(0.1.6 — 전에는 64px 라 확인 창의 절반이 단추였다). 손가락으로 누르기에는 48px 이상이면 넉넉하다.
            actionMinHeight={mobile ? Math.max(actionMinHeight, 52) : actionMinHeight}
            actionPaddingY={mobile ? Math.max(actionPaddingY, 1.25) : actionPaddingY}
            onCancel={onCancel}
            onConfirm={onConfirm}
        />
    );

    // 모바일: 앵커 없이 화면 가운데 다이얼로그로 확인한다. 폭은 화면의 92%(최대 420px) 로 넉넉히 잡는다.
    if (mobile) {
        return (
            <Dialog
                open={open}
                onClose={onCancel}
                // portal 로 그려져도 React 이벤트는 트리를 따라 올라간다 — 확인/취소/배경 클릭이
                // 앵커를 품은 카드·행의 onClick 까지 닿으면 안 된다(데스크탑 팝퍼도 Paper 에서 끊는다).
                onClick={(event) => event.stopPropagation()}
                onMouseDown={(event) => event.stopPropagation()}
                sx={{ zIndex }}
                slotProps={{
                    paper: {
                        sx: {
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            width: "min(92vw, 420px)",
                            maxWidth: "92vw",
                            m: 0,
                        },
                    },
                }}
            >
                {body}
            </Dialog>
        );
    }

    return (
        <Popper open={open} anchorEl={anchorEl} placement={placement} sx={{ zIndex }}>
            <ClickAwayListener onClickAway={onCancel}>
                <Paper
                    elevation={4}
                    sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        minWidth,
                        minHeight,
                        justifyContent: minHeight ? "space-between" : "flex-start",
                    }}
                    onClick={(event) => event.stopPropagation()}
                    onMouseDown={(event) => event.stopPropagation()}
                >
                    {body}
                </Paper>
            </ClickAwayListener>
        </Popper>
    );
}
