import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// 예제는 빌드 산출물이 아니라 라이브러리 소스를 직접 본다(수정이 즉시 반영된다).
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@ehfuse/mui-confirm-action": path.resolve(__dirname, "../src"),
        },
    },
});
