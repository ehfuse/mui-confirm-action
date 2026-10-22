/**
 * 호스트 앱의 모바일 판정을 한 번만 내려주는 Provider 다.
 *
 * 앱마다 "모바일" 의 기준이 다르다(어떤 앱은 768px 레이아웃 전환, 어떤 앱은 MUI lg). 예전에는 각 호스트가
 * ConfirmActionPopper 를 감싸는 자기 래퍼를 두고 isMobile prop 을 넣었는데, 같은 이름의 파일이 여러 곳에 생겨
 * 소비처가 패키지 대신 그 사본을 import 하는 일이 생겼다. 이제 호스트는 루트에서 이 Provider 로 판정을 한 번 내려주고,
 * 소비처는 어디서나 패키지의 ConfirmActionPopper 를 바로 쓴다.
 *
 * 우선순위: ConfirmActionPopper 의 isMobile prop > 이 Provider 값 > 패키지 자체 판정(MUI lg 미만).
 * Provider 가 없어도 종전과 똑같이 동작한다.
 */

import { createContext, useContext, useMemo } from "react";
import type { ConfirmActionConfig, ConfirmActionProviderProps } from "./types/confirmAction";

/** 주입 설정 컨텍스트다(기본값 = 빈 설정 — 팝퍼가 자체 판정으로 폴백한다). */
const ConfirmActionContext = createContext<ConfirmActionConfig>({});

/** 호스트의 모바일 판정을 하위 ConfirmActionPopper 전체에 내려준다. */
export function ConfirmActionProvider({
    isMobile,
    mobileActionHeight,
    mobileTitleFontSize,
    mobileActionFontSize,
    maxWidth,
    titleFontSize,
    actionFontSize,
    actionMinHeight,
    actionPaddingY,
    contentFontSize,
    children,
}: ConfirmActionProviderProps) {
    // 바깥 Provider 가 있으면 그 값이 먼저다(0.1.12) — 앱 루트가 정한 판정 · 크기를, 패키지(업무함 · 메일 UI)가 제 안에 둔 Provider 가
    // 덮어써 그 화면들의 확인창만 앱 설정을 따르지 않았다. 안쪽 Provider 는 바깥이 정하지 않은 값만 채운다.
    const parent = useContext(ConfirmActionContext);
    const value = useMemo<ConfirmActionConfig>(() => {
        const own: ConfirmActionConfig = {
            isMobile,
            mobileActionHeight,
            mobileTitleFontSize,
            mobileActionFontSize,
            maxWidth,
            titleFontSize,
            actionFontSize,
            actionMinHeight,
            actionPaddingY,
            contentFontSize,
        };
        const merged: ConfirmActionConfig = { ...own };
        for (const [key, parentValue] of Object.entries(parent) as [keyof ConfirmActionConfig, unknown][]) {
            if (parentValue !== undefined) (merged as Record<string, unknown>)[key] = parentValue;
        }
        return merged;
    }, [parent, isMobile, mobileActionHeight, mobileTitleFontSize, mobileActionFontSize, maxWidth, titleFontSize, actionFontSize, actionMinHeight, actionPaddingY, contentFontSize]);
    return <ConfirmActionContext.Provider value={value}>{children}</ConfirmActionContext.Provider>;
}

/** 현재 주입 설정을 읽는다(Provider 없으면 빈 설정). */
export function useConfirmActionConfig(): ConfirmActionConfig {
    return useContext(ConfirmActionContext);
}
