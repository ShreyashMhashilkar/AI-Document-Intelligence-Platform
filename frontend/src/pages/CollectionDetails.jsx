import {
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper
} from "@mui/material";

import {
    useState,
    useEffect
} from "react";

import {
    useParams
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import {
    useNavigate
} from "react-router-dom";
import UploadDocumentDialog from "../components/UploadDocumentDialog";

import api from "../api/axios";

export default function CollectionDetails() {

    const { id } = useParams();

    const [open, setOpen] =
        useState(false);

    const [documents, setDocuments] =
        useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchDocuments();

    }, []);

    const fetchDocuments =
        async () => {

            try {

                const response =
                    await api.get(
                        `/documents/${id}`
                    );

                setDocuments(
                    response.data
                );

            } catch (error) {

                console.log(error);

            }
        };

    const uploadDocument =
        async (file) => {

            try {

                const formData =
                    new FormData();

                formData.append(
                    "file",
                    file
                );

                await api.post(
                    `/upload/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );

                fetchDocuments();

                setOpen(false);

                alert(
                    "Document uploaded successfully"
                );

            } catch (error) {

                console.log(error);

            }
        };

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                Collection {id}
            </Typography>

            <Button
                variant="contained"
                onClick={() =>
                    setOpen(true)
                }
            >
                Upload Document
            </Button>

            <Paper
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 3
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                >
                    Documents
                </Typography>

                <List>

                    {documents.map(
                        (doc) => (

                            <ListItem
                                key={doc.id}
                            >

                                <ListItemText
                                    primary={`📄 ${doc.filename}`}
                                />

                            </ListItem>

                        )
                    )}

                </List>

            </Paper>

            <UploadDocumentDialog
                open={open}
                handleClose={() =>
                    setOpen(false)
                }
                onUpload={
                    uploadDocument
                }
            />
            <Button
    variant="outlined"
    sx={{
        ml: 2
    }}
    onClick={() =>
        navigate(`/collections/${id}/chat`)
    }
>
    Open Chat
</Button>

        </DashboardLayout>

    );
}