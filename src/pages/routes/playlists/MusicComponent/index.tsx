import IMusics from "#/interfaces/IMusics";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MusicComponent({
    item,
    favoritesMusic,
    setLikeOrDeslike,
    removeMusicToPlaylist,
}: {
    item: IMusics;
    favoritesMusic: { favorite_music_id: number }[];
    setLikeOrDeslike: (music_id: number) => Promise<void>;
    removeMusicToPlaylist: (music_id: number) => Promise<void>;
}) {
    const onRemoveMusicToPlaylist = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        removeMusicToPlaylist(item.id);
    };

    const onLikeOrDeslikeMusic = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLikeOrDeslike(item.id);
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
                        onClick={onLikeOrDeslikeMusic}
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
                            <FavoriteIcon />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </button>

                    <button
                        onClick={onRemoveMusicToPlaylist}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                        }}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </Link>
    );
}
