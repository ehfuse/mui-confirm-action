/** 클릭 가능한 카드 안에서 쓰는 예제다 — 확인 클릭이 카드 onClick 으로 번지지 않는다. */

import { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { ConfirmActionPopper } from "@ehfuse/mui-confirm-action";

/** 카드 전체가 상세를 여는 구조. */
export function InsideCardPage() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [log, setLog] = useState<string[]>([]);
    const append = (line: string) => setLog((previous) => [...previous, line]);
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 480 }}>
            <Paper
                onClick={() => append("카드 클릭 — 상세 열림")}
                sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}
            >
                <Typography sx={{ flex: 1 }}>업무 카드(누르면 상세)</Typography>
                <Button
                    size="small"
                    variant="contained"
                    onClick={(event) => {
                        event.stopPropagation();
                        setAnchorEl(event.currentTarget);
                    }}
                >
                    검수완료
                </Button>
                <ConfirmActionPopper
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    title="검수를 완료하시겠습니까?"
                    onCancel={() => setAnchorEl(null)}
                    onConfirm={() => {
                        append("검수완료 처리 — 상세는 열리지 않아야 한다");
                        setAnchorEl(null);
                    }}
                />
            </Paper>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {log.map((line, index) => (
                    <Typography key={index} sx={{ fontSize: 13.5 }}>
                        {line}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
}
