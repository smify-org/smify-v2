import SideBar from '#/components/Sidebar';
import { Outlet } from 'react-router-dom';
import React from 'react';
import EndPoints from './endpoints';


function Home() {
    const session = async () => {
        const sessionStatus = await EndPoints.getSession();

        if (sessionStatus && window.location.pathname !== '/') {
            window.location.href = '/';
        } else if (!sessionStatus && window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }

    React.useEffect(() => {
        session();
    }, []);


    return (
        <main>
        <SideBar />
        <Outlet />
        </main>
    )
}

export default Home
