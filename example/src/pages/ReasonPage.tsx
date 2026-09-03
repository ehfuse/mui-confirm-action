/** 사유를 함께 받는 확인 예제다. */

import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ConfirmActionPopper } from "@ehfuse/mui-confirm-action";

/** content 슬롯에 입력칸을 얹는다. */
export function ReasonPage() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [reason, setReason] = useState("");
    const [saved, setSaved] = useState("");
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}>
                되돌리기
            </Button>
            <Typography>{saved ? `사유: ${saved}` : "사유 없음"}</Typography>
            <ConfirmActionPopper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                title="되돌리시겠습니까?"
                minWidth={320}
                content={
                    <TextField
                        autoFocus
                        fullWidth
                        multiline
                        minRows={2}
                        placeholder="사유를 적어 주세요"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                    />
                }
                onCancel={() => setAnchorEl(null)}
                onConfirm={() => {
                    setSaved(reason);
                    setReason("");
                    setAnchorEl(null);
                }}
            />
        </Box>
    );
}
