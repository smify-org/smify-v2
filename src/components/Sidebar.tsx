import { useEffect, useState } from 'react';

import EndPoints from '#/endpoints';
import IUser from '#/interfaces/IUser';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import CreatePlaylistModal from './CreatePlaylistsModal';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EditUserProfileModal from './EditUserProfileModal';
import IPlaylist from '#/interfaces/IPlaylist';



export default function SideBar() {

    const [userProfile, setUserProfile] = useState<IUser>()
    const [createPlaylistModalIsOpen, setCreatePlaylistModalIsOpen] = useState(false);
    const [editUserProfileModalIsOpen, setEditUserProfileModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleOpenModal = ({
        type,
    }: {
        type: 'createPlaylist' | 'editUserProfile',
    }) => {
        switch (type) {
            case 'createPlaylist':
                setCreatePlaylistModalIsOpen(true)
                break;

            case 'editUserProfile':
                setEditUserProfileModalIsOpen(true)
                break;
        }
    }

    useEffect(() => {
        const getUserProfile = async () => {
            const data = await EndPoints.getUserProfile()
            setUserProfile(data)
        }

        setLoading(false)

        getUserProfile()
    }, [])


    if (!userProfile) return;

    return (
        <Sidebar
            color='white'
            backgroundColor='#1F1F1F'
        >
            <Menu className='SideBar' menuItemStyles={{
                button: {
                    color: 'white',
                    backgroundColor: '#1F1F1F',

                    '&:hover': {
                        backgroundColor: '#303030',
                    }
                }
            }}>
                <MenuItem>
                    {
                        loading ? (
                            <div className='user-profile'>
                                <Skeleton height={20} width={120} style={{ marginTop: 5 }} />
                                <Skeleton height={150} />
                            </div>
                        ) : (
                            <div className='user-profile' onClick={() => handleOpenModal({
                                type: 'editUserProfile',
                            })}>
                                <img
                                    key={userProfile.icon_name}
                                    src={`./users-icons/${userProfile.icon_name}.png`}
                                    alt="Avatar"
                                />
                                <p>{userProfile.name}</p>
                            </div>
                        )
                    }
                </MenuItem>

                <Link to={'/'} style={{
                    textDecoration: 'none',
                }}>
                    <MenuItem icon={<HomeOutlinedIcon />}>Inicio</MenuItem>
                </Link>
                <MenuItem
                    onClick={() => handleOpenModal({ type: 'createPlaylist' })}
                    icon={<PlaylistAdd />}
                >Criar playlist</MenuItem>

                {createPlaylistModalIsOpen && (
                    <CreatePlaylistModal
                        isOpen={createPlaylistModalIsOpen}
                    />
                )}

                {editUserProfileModalIsOpen && (
                    <EditUserProfileModal
                        isOpen={editUserProfileModalIsOpen}
                    />
                )}

                <SubMenu label="Minhas Playlists" icon={<LibraryMusic />}>
                    {
                        userProfile.playlists.length ? (
                            userProfile.playlists.map((playlist: IPlaylist) => {
                                return (
                                    <Link
                                        key={playlist.id}
                                        to={`/playlist/${playlist.id}`}
                                        style={{
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <MenuItem>{playlist.playlist_name}</MenuItem>
                                    </Link>
                                )
                            })
                        ) : (
                            <MenuItem>Você ainda não possui</MenuItem>
                        )
                    } 
                </SubMenu>


            </Menu>
        </Sidebar>
    )
}