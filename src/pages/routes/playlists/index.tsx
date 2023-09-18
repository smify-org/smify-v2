import AddMusicsModal from "#/components/AddMusicsModal";
import EndPoints from "#/endpoints";
import IMusics from "#/interfaces/IMusics";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MusicComponent from "./MusicComponent";
import IPlaylist from "#/interfaces/IPlaylist";

export default function PlaylistsToId() {
    const { id } = useParams();

    const [musics, setMusics] = useState<IMusics[]>([]);
    const [playlist, setPlaylist] = useState<IPlaylist>();
    const [isOpen, setIsOpen] = useState(false);
    const [favoritesMusic, setFavoritesMusic] = useState<
        { favorite_music_id: number }[]
    >([]);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const ModalWrapper = () => {
        return (
            <>
                {isOpen && (
                    <AddMusicsModal
                        isOpen={isOpen}
                        playlist_id={id as string}
                        musicsExistentIds={musics.map((item) => item.id)}
                        updateMusics={getMusicsToPlaylistId}
                        closeModal={handleCloseModal}
                    />
                )}
            </>
        );
    };

    const getMusicsToPlaylistId = async () => {
        if (!id) return;
        const data = await EndPoints.getMusicsToPlaylistId(id);
        setMusics(data);
    };

    const getPlaylist = async (id: string) => {
        if (!id) return;
        const data = await EndPoints.getPlaylist(id);
        setPlaylist(data);
    };

    const getFavoritesMusics = async () => {
        const data = await EndPoints.getFavoriteMusics();
        setFavoritesMusic(data);
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

    const removeMusicToPlaylist = async (music_id: number) => {
        console.log("Hope");
        if (!id) return;

        setMusics(musics.filter((item) => item.id !== music_id));

        await EndPoints.deleteMusicToPlaylist(id, music_id);
    };

    useEffect(() => {
        getPlaylist(id as string);
        getMusicsToPlaylistId();
        getFavoritesMusics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (musics.length === 0)
        return (
            <div
                style={{
                    marginLeft: "20px",
                }}
            >
                <div>
                    <h1>Nenhuma música por aqui</h1>
                    <button
                        onClick={handleOpenModal}
                        className="addmusics__button"
                    >
                        Adicionar Musicas
                    </button>

                    <div>
                        <ModalWrapper />
                    </div>
                </div>
            </div>
        );

    if (!playlist) return null;

    return (
        <div className="container-fluid">
            <div>
                <h1>{playlist.playlist_name}</h1>
            </div>
            <div>
                <button
                    style={{
                        marginBottom: "20px",
                    }}
                    onClick={handleOpenModal}
                >
                    Adicionar mais musicas
                </button>
                <div>
                    <ModalWrapper />
                </div>
            </div>
            <div>
                {musics.map((item) => {
                    return (
                        <MusicComponent
                            item={item}
                            key={item.id}
                            favoritesMusic={favoritesMusic}
                            setLikeOrDeslike={setLikeOrDeslike}
                            removeMusicToPlaylist={removeMusicToPlaylist}
                        />
                    );
                })}
            </div>
        </div>
    );
}
