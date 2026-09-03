/** 기본 확인 예제다. */

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ConfirmActionPopper } from "@ehfuse/mui-confirm-action";

/** 버튼 하나 + 확인 UI. */
export function BasicPage() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [done, setDone] = useState(false);
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button variant="contained" onClick={(event) => setAnchorEl(event.currentTarget)}>
                완료
            </Button>
            <Typography>{done ? "완료 처리됨" : "아직 처리 전"}</Typography>
            <ConfirmActionPopper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                title="완료 처리하시겠습니까?"
                confirmText="완료"
                onCancel={() => setAnchorEl(null)}
                onConfirm={() => {
                    setDone(true);
                    setAnchorEl(null);
                }}
            />
        </Box>
    );
}
