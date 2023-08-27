import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from './Home.js';
import MusicsSection from './pages/MusicsSection.js';
import LoginScreen from './pages/routes/auth/login/index.js';
import RegisterScreen from './pages/routes/auth/register/index.js';
import MusicsToId from './pages/routes/musics/index.js';
import PlaylistsToId from './pages/routes/playlists/index.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <MusicsSection />,
            },
            {
                path: "/musics/:id",
                element: <MusicsToId />,
            },
            {
                path: "/playlist/:id",
                element: <PlaylistsToId />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginScreen />,
    },
    {
        path: "/register",
        element: <RegisterScreen />,
    },
]);

export default function App() {
    return (
        <RouterProvider router={router} />
    );
}