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
