import {
    Box
} from "@mui/material";

import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
    children
}) {

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "#F8FAFC"
            }}
        >
            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    p: 4
                }}
            >
                {children}
            </Box>

        </Box>
    );
}