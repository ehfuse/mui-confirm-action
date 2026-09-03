/** 확인 UI 의 공개 타입이다. */

import type { ReactNode } from "react";
import type { PopperProps } from "@mui/material/Popper";

/** ConfirmActionPopper 속성이다. */
export interface ConfirmActionPopperProps {
    open: boolean; // 열림 여부
    // 앵커(데스크탑 팝퍼 기준 — 모바일 다이얼로그는 쓰지 않는다).
    // MUI Popper 와 같은 타입이라 가상 앵커({ getBoundingClientRect })도 그대로 넘길 수 있다
    // (메일 목록의 행 우클릭 좌표처럼 실제 DOM 요소가 없는 자리).
    anchorEl: PopperProps["anchorEl"];
    title?: ReactNode; // 확인 제목
    content?: ReactNode; // 제목과 버튼 사이에 렌더할 추가 콘텐츠(사유 입력칸 등)
    confirmText?: string; // 확인 버튼 문구
    cancelText?: string; // 취소 버튼 문구
    placement?: PopperProps["placement"]; // 팝퍼 배치(데스크탑)
    minWidth?: number; // 팝퍼 최소 폭(데스크탑)
    minHeight?: number; // 팝퍼 최소 높이(데스크탑)
    titleFontSize?: number; // 제목 폰트 크기(모바일은 이 값과 19 중 큰 값)
    actionFontSize?: number; // 버튼 폰트 크기(모바일은 이 값과 18 중 큰 값)
    actionMinHeight?: number; // 버튼 최소 높이(모바일은 이 값과 56 중 큰 값)
    zIndex?: number; // z-index
    isMobile?: boolean; // 모바일 판정 강제(미지정이면 MUI lg 미만을 모바일로 본다)
    onCancel: () => void; // 취소
    onConfirm: () => void; // 확인
}

/** 확인 본문(제목 + 추가 콘텐츠 + 취소/확인 버튼) 속성이다 — 팝퍼/다이얼로그 공용 내부 조각. */
export interface ConfirmActionBodyProps {
    title?: ReactNode; // 확인 제목
    content?: ReactNode; // 추가 콘텐츠
    confirmText: string; // 확인 버튼 문구
    cancelText: string; // 취소 버튼 문구
    titleFontSize: number; // 제목 폰트 크기
    actionFontSize: number; // 버튼 폰트 크기
    actionMinHeight: number; // 버튼 최소 높이
    onCancel: () => void; // 취소
    onConfirm: () => void; // 확인
}
