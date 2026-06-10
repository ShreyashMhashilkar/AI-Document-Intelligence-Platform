import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from "@mui/material";

import { useState } from "react";

export default function NewCollectionDialog({
    open,
    handleClose,
    onCreate
}) {

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const handleSubmit = () => {

        onCreate({
            name,
            description
        });

        setName("");
        setDescription("");
    };

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>
                Create Collection
            </DialogTitle>

            <DialogContent>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Collection Name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={handleClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Create
                </Button>

            </DialogActions>

        </Dialog>

    );
}