/** 터치 잔여 클릭(ghost click) 방어 유틸이다. */

/**
 * 확인/취소 직후 같은 자리로 떨어지는 잔여 클릭(터치 ghost click)을 한 번만 삼킨다.
 * 터치는 tap 후 ~300ms 뒤 합성 click 을 한 번 더 보내는데, 그 사이 확인 UI 가 닫히면 그 클릭이
 * 아래에 있던 요소(체크박스 등)로 떨어져 방금 한 조작이 곧바로 되돌려진다.
 */
export function swallowGhostClick(): void {
    if (typeof document === "undefined") return;
    let timer = 0;
    const handler = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        cleanup();
    };
    const cleanup = () => {
        window.clearTimeout(timer);
        document.removeEventListener("click", handler, true);
    };
    document.addEventListener("click", handler, true);
    // 진짜 다음 조작까지 막지 않도록 짧게만 건다(합성 click 은 300ms 안에 온다).
    timer = window.setTimeout(cleanup, 350);
}
