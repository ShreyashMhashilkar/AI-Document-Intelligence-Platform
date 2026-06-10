import DashboardLayout from "../layouts/DashboardLayout";

import {
    Typography,
    TextField,
    Button,
    Paper,
    Box
} from "@mui/material";

import {
    useState
} from "react";
import {
    useParams
} from "react-router-dom";
import api from "../api/axios";

export default function Chat() {

    const [question, setQuestion] =
        useState("");

    const [answer, setAnswer] =
        useState("");

    const [sources, setSources] =
        useState([]);

    const [loading, setLoading] =
        useState(false);
const { id } = useParams();
    const askQuestion =
        async () => {

            if (!question.trim()) {
                return;
            }

            try {

                setLoading(true);

                const response =
                    await api.post(
                        "/chat",
                        {
                            collection_id: Number(id),
                            question: question
                        }
                    );

                setAnswer(
                    response.data.answer
                );

                setSources(
                    response.data.sources || []
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to get response"
                );

            } finally {

                setLoading(false);

            }
        };

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                AI Chat
            </Typography>

            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3
                }}
            >

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Ask a question about your documents"
                    value={question}
                    onChange={(e) =>
                        setQuestion(
                            e.target.value
                        )
                    }
                />

                <Button
                    variant="contained"
                    sx={{
                        mt: 2
                    }}
                    onClick={askQuestion}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Thinking..."
                            : "Ask"
                    }
                </Button>

            </Paper>

            {answer && (

                <Paper
                    sx={{
                        mt: 4,
                        p: 3,
                        borderRadius: 3
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        mb={2}
                    >
                        Answer
                    </Typography>

                    <Typography>
                        {answer}
                    </Typography>

                </Paper>

            )}

            {sources.length > 0 && (

                <Paper
                    sx={{
                        mt: 3,
                        p: 3,
                        borderRadius: 3
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        mb={2}
                    >
                        Sources
                    </Typography>

                    <Box>

                        {sources.map(
                            (
                                source,
                                index
                            ) => (

                                <Typography
                                    key={index}
                                    sx={{
                                        mb: 1
                                    }}
                                >
                                    📄 {
                                        source.file_name
                                    }
                                    {" "}
                                    | Page {
                                        source.page
                                    }
                                </Typography>

                            )
                        )}

                    </Box>

                </Paper>

            )}

        </DashboardLayout>

    );
}