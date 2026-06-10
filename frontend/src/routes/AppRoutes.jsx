import {
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Collections from "../pages/Collections";
import CollectionDetails
from "../pages/CollectionDetails";
import Chat from "../pages/Chat";
export default function AppRoutes() {

    return (
        <Routes>

            <Route
                path="/"
                element={<Dashboard />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />
            <Route
                path="/collections"
                element={<Collections />}
            />
            <Route
                path="/collections/:id"
                element={<CollectionDetails />}
            />
            <Route
    path="/chat"
    element={<Chat />}
/>
<Route
    path="/collections/:id/chat"
    element={<Chat />}
/>
        </Routes>
    );
}