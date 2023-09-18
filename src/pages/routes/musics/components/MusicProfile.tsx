import EndPoints from "#/endpoints";
import IMusics from "#/interfaces/IMusics";
import { useEffect, useState } from "react";
import { ColorExtractor } from "react-color-extractor";

export default function MusicProfile({ musicId }: { musicId: string }) {
    const [colors, setColors] = useState<string[]>([]);
    const [music, setMusic] = useState<IMusics[]>([]);

    useEffect(() => {
        const getMusics = async () => {
            if (!musicId) return;
            const data = await EndPoints.getMusicToId(musicId);
            setMusic(data);
        };

        getMusics();
    }, [musicId]);

    useEffect(() => {
        console.log("Buscando favoritos");
        const getFavoriteMusics = async () => {
            const data = await EndPoints.getFavoriteMusics();
            console.log("Musicas favoritas", data);
        };

        getFavoriteMusics();
    }, [musicId]);

    return (
        <div
            className="container-fluid"
            style={{
                paddingBottom: 20,
                paddingTop: 20,
                marginBottom: 30,
                backgroundColor: colors[0],
                boxShadow: "rgb(22, 22, 22) 0px -243px 112px -49px inset",
            }}
        >
            {music.map((item) => (
                <div key={item.id} className="music-profile row">
                    <div className="card-image col-md-4 mb-3">
                        <ColorExtractor
                            getColors={(colors: string[]) => setColors(colors)}
                        >
                            <img src={item.logo} alt="" />
                        </ColorExtractor>
                    </div>
                    <div className="music_profile-info col-12 col-md-8">
                        <h1 className="fs-2 mb-0">{item.name}</h1>
                        <p>{item.singer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
