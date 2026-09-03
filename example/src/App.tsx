/** 예제 라우터다 — 페이지 목록 + 각 예제 라우트. */

import { Link, Route, Routes } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { BasicPage } from "./pages/BasicPage";
import { ReasonPage } from "./pages/ReasonPage";
import { InsideCardPage } from "./pages/InsideCardPage";

/** 예제 페이지 목록이다. */
const PAGES = [
    { path: "/", label: "기본 확인" },
    { path: "/reason", label: "사유 입력 확인" },
    { path: "/card", label: "클릭 가능한 카드 안에서" },
];

/** 예제 앱이다. */
export function App() {
    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 700 }}>@ehfuse/mui-confirm-action 예제</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
                {PAGES.map((page) => (
                    <Link key={page.path} to={page.path}>
                        {page.label}
                    </Link>
                ))}
            </Box>
            <Typography sx={{ fontSize: 13.5, color: "#555" }}>
                창 폭을 1200px 아래로 줄이면 모바일 다이얼로그로 바뀐다.
            </Typography>
            <Routes>
                <Route path="/" element={<BasicPage />} />
                <Route path="/reason" element={<ReasonPage />} />
                <Route path="/card" element={<InsideCardPage />} />
            </Routes>
        </Box>
    );
}
