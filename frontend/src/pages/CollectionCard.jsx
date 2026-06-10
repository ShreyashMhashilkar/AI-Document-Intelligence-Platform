import {
    Card,
    CardContent,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function CollectionCard({
    collection
}) {
    const navigate = useNavigate();
    return (
        <Card
    onClick={() =>
        navigate(`/collections/${collection.id}`)
    }
    sx={{
        borderRadius: 3,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
            transform: "translateY(-3px)"
        }
    }}
>
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    📁 {collection.name}
                </Typography>

                <Typography
                    color="text.secondary"
                >
                    {collection.description}
                </Typography>

            </CardContent>
        </Card>
    );
}