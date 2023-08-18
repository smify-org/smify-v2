import '#/styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from './Home.tsx';
import MusicsSection from './pages/MusicsSection.tsx';
import LoginScreen from './pages/routes/auth/login/index.tsx';
import RegisterScreen from './pages/routes/auth/register/index.tsx';
import MusicsToId from './pages/routes/musics/index.tsx';
import PlaylistsToId from './pages/routes/playlists/index.tsx';

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

function App() {
    return (
        <RouterProvider router={router} />
    );
}


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
