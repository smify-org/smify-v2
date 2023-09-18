import IMusics from "#/interfaces/IMusics";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import IPlaylist from "#/interfaces/IPlaylist";
import EndPoints from "#/endpoints";
import { useEffect } from "react";

export default function MusicItem({
    item,
    favoritesMusic,
    setLikeOrDeslike,
    expandItem,
    expands,
}: {
    item: IMusics;
    favoritesMusic: { favorite_music_id: number }[];
    setLikeOrDeslike: (music_id: number) => Promise<void>;
    expandItem: (id: number) => void;
    expands: number;
}) {
    const [expandMoreOptions, setExpandMoreOptions] = useState(false);
    const [expandPlaylists, setExpandPlaylists] = useState(false);
    const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

    // eslint-disable-next-line
    const openMoreOptions = (event: any) => {
        event.preventDefault();
        expandItem(item.id);
        setExpandMoreOptions(!expandMoreOptions);
    };

    useEffect(() => {
        if (expands !== item.id) {
            setExpandMoreOptions(false);
        }
    }, [expands, item.id]);

    // eslint-disable-next-line
    const openPlaylists = async (event: any) => {
        event.preventDefault();
        const result = await EndPoints.getUserPlaylists();
        setPlaylists(result);
        setExpandPlaylists(!expandPlaylists);
    };

    // eslint-disable-next-line
    const onPreventReload = (event: any) => {
        event.preventDefault();
    };

    // eslint-disable-next-line
    const addMusicToPlaylist = (playlist_id: number, event: any) => {
        event.preventDefault();
        EndPoints.addMusicsToPlaylist([item.id], playlist_id);
    };

    return (
        <Link to={`/musics/${item.id}`} key={item.id} className="more-musics">
            <div className="music-informations">
                <div className="card-image">
                    <img src={item.logo} />
                </div>
                <div className="card-content">
                    <h1
                        className="fs-6 mb-0"
                        style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            width: "100%",
                        }}
                    >
                        {item.name}
                    </h1>
                    <p
                        className="mb-0"
                        style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            width: "100%",
                        }}
                    >
                        {item.singer}
                    </p>
                </div>
            </div>
            <div className="position-relative">
                <div className="buttons-container">
                    <button
                        onClick={onPreventReload}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                        }}
                    >
                        {favoritesMusic.some(
                            (favorite) =>
                                favorite.favorite_music_id === item.id,
                        ) ? (
                            <FavoriteIcon
                                onClick={() => setLikeOrDeslike(item.id)}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                onClick={() => setLikeOrDeslike(item.id)}
                            />
                        )}
                    </button>

                    <button
                        onClick={openMoreOptions}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                        }}
                    >
                        <MoreHorizIcon />
                    </button>
                </div>

                {expandMoreOptions && (
                    <>
                        <div className="expand-more-options">
                            <button
                                onClick={openPlaylists}
                                className="add-music"
                            >
                                Adicionar a playlist
                            </button>
                        </div>

                        {expandPlaylists && (
                            <div className="expand-playlists">
                                {playlists.map((playlist) => {
                                    return (
                                        <button
                                            className="expand-playlists-link"
                                            onClick={(event) =>
                                                addMusicToPlaylist(
                                                    playlist.id,
                                                    event,
                                                )
                                            }
                                        >
                                            <p>{playlist.playlist_name}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Link>
    );
}
