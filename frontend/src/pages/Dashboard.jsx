import {
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Button,
    Stack
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../api/axios";

export default function Dashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        collections: 0,
        documents: 0,
        chats: 0
    });

    useEffect(() => {

        fetchDashboardData();

    }, []);

    const fetchDashboardData = async () => {

        try {

            const collectionsResponse =
                await api.get("/collections");

            const documentsResponse =
                await api.get("/documents");

            const chatResponse =
                await api.get("/chat-sessions");

            setStats({
                collections:
                    collectionsResponse.data.length,

                documents:
                    documentsResponse.data.length,

                chats:
                    chatResponse.data.length
            });

        } catch (error) {

            console.log(error);

        }
    };

    const dashboardCards = [
        {
            title: "Collections",
            value: stats.collections
        },
        {
            title: "Documents",
            value: stats.documents
        },
        {
            title: "Chats",
            value: stats.chats
        }
    ];

    return (

        <DashboardLayout>

            <Card
                sx={{
                    mb: 4,
                    borderRadius: 3,
                    boxShadow: 2
                }}
            >

                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                    >
                        Welcome to AI Document Intelligence Platform
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        Upload documents, organize them into collections,
                        and interact with them using AI-powered Retrieval
                        Augmented Generation (RAG).
                    </Typography>

                </CardContent>

            </Card>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                Dashboard
            </Typography>

            <Grid
                container
                spacing={3}
            >

                {dashboardCards.map(
                    (card) => (

                        <Grid
                            item
                            xs={12}
                            md={4}
                            key={card.title}
                        >

                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: 2
                                }}
                            >

                                <CardContent>

                                    <Typography
                                        color="text.secondary"
                                    >
                                        {card.title}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                    >
                                        {card.value}
                                    </Typography>

                                </CardContent>

                            </Card>

                        </Grid>

                    )
                )}

            </Grid>

            <Box
                sx={{
                    mt: 5
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={2}
                >
                    Quick Actions
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button
                        variant="contained"
                        onClick={() =>
                            navigate("/collections")
                        }
                    >
                        Collections
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() =>
                            navigate("/collections")
                        }
                    >
                        Upload Document
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() =>
                            navigate("/chat")
                        }
                    >
                        Open Chat
                    </Button>

                </Stack>

            </Box>

        </DashboardLayout>

    );
}