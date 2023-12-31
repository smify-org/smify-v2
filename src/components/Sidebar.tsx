import { useEffect, useState } from "react";

import EndPoints from "#/endpoints";
import IUser from "#/interfaces/IUser";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import CreatePlaylistModal from "./CreatePlaylistsModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EditUserProfileModal from "./EditUserProfileModal";
import IPlaylist from "#/interfaces/IPlaylist";
import Favorite from "@mui/icons-material/Favorite";

export default function SideBar() {
    const [userProfile, setUserProfile] = useState<IUser>();
    const [collapsed, setCollapsed] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [createPlaylistModalIsOpen, setCreatePlaylistModalIsOpen] =
        useState(false);
    const [editUserProfileModalIsOpen, setEditUserProfileModalIsOpen] =
        useState(false);
    const [loading, setLoading] = useState(true);

    const getUserProfile = async () => {
        const data = await EndPoints.getUserProfile();
        setUserProfile(data);
    };

    const handleOpenModal = (
        isOpen: boolean,
        modalType: {
            type: "createPlaylist" | "editUserProfile";
        },
    ) => {
        if (modalType.type === "createPlaylist") {
            setCreatePlaylistModalIsOpen(isOpen);
        } else {
            setEditUserProfileModalIsOpen(isOpen);
        }
    };

    function expandeSidebar() {
        setCollapsed(!collapsed);
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });

        if (windowWidth > 768) setCollapsed(false);
        else setCollapsed(true);
    }, [windowWidth]);

    useEffect(() => {
        setLoading(false);
        getUserProfile();
    }, []);

    if (!userProfile) return;

    return (
        <Sidebar
            backgroundColor="#1F1F1F"
            style={{
                borderColor: "#303030",
                position:
                    windowWidth < 768 && !collapsed ? "fixed" : "relative",
                zIndex: 1,
            }}
            collapsed={collapsed}
        >
            <Menu
                className="SideBar"
                style={{
                    height: "100vh",
                }}
                menuItemStyles={{
                    button: {
                        color: "white",
                        backgroundColor: "#1F1F1F",

                        "&:hover": {
                            backgroundColor: "#303030",
                        },
                    },
                }}
            >
                <MenuItem
                    onClick={expandeSidebar}
                    icon={
                        collapsed ? (
                            <ArrowForwardIcon />
                        ) : (
                            <ArrowForwardIcon
                                style={{ transform: "rotate(180deg)" }}
                            />
                        )
                    }
                >
                    {collapsed ? "" : "Recolher"}
                </MenuItem>

                <MenuItem
                    icon={
                        <img
                            key={userProfile.icon_name}
                            src={`./users-icons/${userProfile.icon_name}.png`}
                            alt="Avatar"
                            width={50}
                            height={50}
                        />
                    }
                    style={{
                        marginTop: 10,
                    }}
                >
                    {loading ? (
                        <div className="user-profile">
                            <Skeleton
                                height={20}
                                width={120}
                                style={{ marginTop: 5 }}
                            />
                            <Skeleton height={150} />
                        </div>
                    ) : (
                        <p>{userProfile.name}</p>
                    )}
                </MenuItem>

                <Link
                    to={"/"}
                    style={{
                        textDecoration: "none",
                    }}
                >
                    <MenuItem icon={<HomeOutlinedIcon />}>Inicio</MenuItem>
                </Link>
                <MenuItem
                    onClick={() =>
                        handleOpenModal(true, { type: "createPlaylist" })
                    }
                    icon={<PlaylistAdd />}
                >
                    Criar playlist
                </MenuItem>

                {createPlaylistModalIsOpen && (
                    <CreatePlaylistModal
                        isOpen={createPlaylistModalIsOpen}
                        handleOpenModal={handleOpenModal}
                        userPlaylists={userProfile.playlists}
                        reloadUserPlaylist={getUserProfile}
                    />
                )}

                {editUserProfileModalIsOpen && (
                    <EditUserProfileModal isOpen={editUserProfileModalIsOpen} />
                )}

                <Link to="/musics/liked" style={{ textDecoration: "none" }}>
                    <MenuItem icon={<Favorite />}>Musicas Curtidas</MenuItem>
                </Link>

                <SubMenu label="Minhas Playlists" icon={<LibraryMusic />}>
                    {userProfile.playlists.length ? (
                        userProfile.playlists.map((playlist: IPlaylist) => {
                            return (
                                <Link
                                    key={playlist.id}
                                    to={`/playlist/${playlist.id}`}
                                    style={{
                                        textDecoration: "none",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                    onClick={expandeSidebar}
                                >
                                    <MenuItem>
                                        {playlist.playlist_name}
                                    </MenuItem>
                                </Link>
                            );
                        })
                    ) : (
                        <MenuItem>Você ainda não possui</MenuItem>
                    )}
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}
