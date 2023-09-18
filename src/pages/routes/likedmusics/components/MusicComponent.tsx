import IMusics from "#/interfaces/IMusics";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MusicComponent({
    item,
    onDeslikeMusic,
}: {
    item: IMusics;
    onDeslikeMusic: (event: { preventDefault: () => void }) => void;
}) {
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
                        onClick={onDeslikeMusic}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                        }}
                    >
                        <FavoriteIcon />
                    </button>
                </div>
            </div>
        </Link>
    );
}
