import EndPoints from "#/endpoints";
import IMusics from "#/interfaces/IMusics";
import { useState } from "react";
import { useEffect } from "react";
import MusicItem from "./components/MusicItem";

export default function MoreMusics({ musicId }: { musicId: string }) {
    const [musics, setMusics] = useState<IMusics[]>([]);
    const [favoritesMusic, setFavoritesMusic] = useState<
        { favorite_music_id: number }[]
    >([]);
    const [expands, setExpands] = useState(0);

    console.log("expands", expands);

    const expandItem = (id: number) => {
        setExpands(id);
    };

    const setLikeOrDeslike = async (music_id: number) => {
        await EndPoints.likeOrDeslike(music_id);

        const verifyFavoriteMusic = favoritesMusic.some(
            (favorite) => favorite.favorite_music_id === music_id,
        );

        if (verifyFavoriteMusic) {
            setFavoritesMusic(
                favoritesMusic.filter(
                    (item) => item.favorite_music_id !== music_id,
                ),
            );
            return;
        }

        setFavoritesMusic((prev) => [
            ...prev,
            {
                favorite_music_id: music_id,
            },
        ]);
    };

    useEffect(() => {
        const getMusics = async () => {
            const data = await EndPoints.getMusics({
                limit: 20,
                offset: 0,
                search: "",
            });

            const filterMusics = data.filter(
                (item: { id: number }) => item.id !== parseInt(musicId),
            );

            setMusics(filterMusics);
        };

        getMusics();
    }, [musicId]);

    useEffect(() => {
        const getFavoriteMusics = async () => {
            const data = await EndPoints.getFavoriteMusics();

            setFavoritesMusic(data);
        };

        getFavoriteMusics();
    }, [musicId]);

    return (
        <div className="container-fluid">
            <h1>Mais Musicas</h1>
            <div className="row">
                {musics.map((item) => (
                    <MusicItem
                        favoritesMusic={favoritesMusic}
                        item={item}
                        setLikeOrDeslike={setLikeOrDeslike}
                        key={item.id}
                        expandItem={expandItem}
                        expands={expands}
                    />
                ))}
            </div>
        </div>
    );
}
