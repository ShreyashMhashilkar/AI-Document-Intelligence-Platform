import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

import { useState } from "react";

export default function UploadDocumentDialog({
    open,
    handleClose,
    onUpload
}) {

    const [file, setFile] = useState(null);

    const handleSubmit = () => {

        if (!file) return;

        onUpload(file);

        setFile(null);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Upload Document
            </DialogTitle>

            <DialogContent>

                <input
                    type="file"
                    onChange={(e) =>
                        setFile(
                            e.target.files[0]
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
                    Upload
                </Button>

            </DialogActions>

        </Dialog>
    );
}