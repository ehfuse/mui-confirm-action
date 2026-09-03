/** 모바일 판정 훅이다 — MUI lg 미만(기본 테마 1200px, 커스텀 테마면 그 값)을 모바일로 본다. */

import { useMediaQuery, useTheme } from "@mui/material";

/** 모바일 여부를 반환한다(소비처가 자체 판정을 쓰면 isMobile prop 으로 덮어쓴다). */
export function useIsMobile(): boolean {
    const theme = useTheme();
    // Rules of Hooks — 조건과 무관하게 항상 호출한다.
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
    return !lgUp;
}
