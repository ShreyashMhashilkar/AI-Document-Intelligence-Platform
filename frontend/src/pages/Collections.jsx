import {
    Typography,
    Grid,
    Button
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import CollectionCard from "./CollectionCard";

import NewCollectionDialog from "../components/NewCollectionDialog";

export default function Collections() {

    const [collections, setCollections] =
        useState([]);

    const [open, setOpen] =
        useState(false);

    useEffect(() => {

        fetchCollections();

    }, []);

    const fetchCollections =
        async () => {

            try {

                const response =
                    await api.get(
                        "/collections"
                    );

                setCollections(
                    response.data
                );

            } catch (error) {

                console.log(error);

            }
        };

    const createCollection =
        async (data) => {

            try {

                await api.post(
                    "/collections",
                    data
                );

                fetchCollections();

                setOpen(false);

            } catch (error) {

                console.log(error);

            }
        };

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                Collections
            </Typography>

            <Button
                variant="contained"
                sx={{
                    mb: 3
                }}
                onClick={() =>
                    setOpen(true)
                }
            >
                New Collection
            </Button>

            <Grid
                container
                spacing={3}
            >

                {collections.map(
                    (collection) => (

                        <Grid
                            item
                            xs={12}
                            md={4}
                            key={collection.id}
                        >

                            <CollectionCard
                                collection={
                                    collection
                                }
                            />

                        </Grid>

                    )
                )}

            </Grid>

            <NewCollectionDialog
                open={open}
                handleClose={() =>
                    setOpen(false)
                }
                onCreate={
                    createCollection
                }
            />

        </DashboardLayout>

    );
}