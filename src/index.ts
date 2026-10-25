/** @ehfuse/mui-confirm-action 공개 진입점이다. */

export { ConfirmActionPopper } from "./ConfirmActionPopper";
export { ConfirmActionProvider, useConfirmActionConfig } from "./ConfirmActionProvider";
export { swallowGhostClick } from "./internal/swallowGhostClick";
export type {
    ConfirmActionPopperProps,
    ConfirmActionBodyProps,
    ConfirmActionConfig,
    ConfirmActionProviderProps,
} from "./types";
// 화면 문구 언어(기본 한국어 — 2026-10-26)
export { setMuiConfirmActionLocale, getMuiConfirmActionLocale } from "./i18n";
export type { MuiConfirmActionLang } from "./i18n";
