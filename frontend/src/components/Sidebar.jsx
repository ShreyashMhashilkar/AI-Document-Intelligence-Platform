import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";

import { Link } from "react-router-dom";

export default function Sidebar() {

    return (
        <Box
            sx={{
                width: 280,
                height: "100vh",
                borderRight: "1px solid #E2E8F0",
                p: 2,
                bgcolor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                mb={4}
            >
                AI Docs
            </Typography>

            <List>

                <ListItemButton
                    component={Link}
                    to="/dashboard"
                >
                    <ListItemText
                        primary="Dashboard"
                    />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/collections"
                >
                    <ListItemText
                        primary="Collections"
                    />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/chat"
                >
                    <ListItemText
                        primary="Chats"
                    />
                </ListItemButton>

            </List>

        </Box>
    );
}