import EndPoints from "#/endpoints";
import IMusics from "#/interfaces/IMusics";
import { useEffect, useState } from "react";
import MusicComponent from "./components/MusicComponent";

export default function LikedMusics() {
    const [musics, setMusics] = useState<IMusics[]>([]);

    const getLikedMusics = async () => {
        const data = await EndPoints.getLikedMusics();
        setMusics(data);
    };

    const onDeslikeMusic = async (
        id: number,
        event: {
            preventDefault: () => void;
        },
    ) => {
        event.preventDefault();
        await EndPoints.likeOrDeslike(id);
        getLikedMusics();
    };

    useEffect(() => {
        getLikedMusics();
    }, []);

    if (!musics.length)
        return <h1 className="container-fluid">Nenhuma musica curtida</h1>;

    return (
        <div className="container-fluid">
            <div>
                <h1>Musicas Curtidas</h1>
            </div>
            <div>
                {musics.map((item) => {
                    return (
                        <MusicComponent
                            item={item}
                            onDeslikeMusic={(event: {
                                preventDefault: () => void;
                            }) => onDeslikeMusic(item.id, event)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
