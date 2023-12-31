import EndPoints from "#/endpoints";
import IMusics from "#/interfaces/IMusics";
import IPlaylist, { ICreatePlaylist } from "#/interfaces/IPlaylist";
import { useEffect, useRef, useState } from "react";
import Loading from "react-loading";

export default function CreatePlaylistModal({
    isOpen,
    handleOpenModal,
    userPlaylists,
    reloadUserPlaylist,
}: {
    isOpen: boolean;
    handleOpenModal: (
        isOpen: boolean,
        modalType: {
            type: "createPlaylist" | "editUserProfile";
        },
    ) => void;
    userPlaylists: IPlaylist[];
    reloadUserPlaylist: () => void;
}) {
    const [musics, setMusics] = useState<IMusics[]>([]);
    const [form, setForm] = useState<ICreatePlaylist>({
        playlist_name: "",
        musicsIds: [],
    });
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const disabledButton = form.playlist_name === "" || loading;

    const searchMusic = (musicName: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(musicName.target.value);
    };

    const onLoading = () => {
        return loading ? (
            <Loading type="spin" height="25px" width="25px" />
        ) : (
            "Criar"
        );
    };

    const onChangePlaylistName = (
        currentValue: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const playlist_name = currentValue.target.value;

        setForm((prevForm) => ({
            ...prevForm,
            playlist_name,
        }));
    };

    const addMusics = (musicId: number) => {
        setForm((prevForm) => {
            if (prevForm.musicsIds.includes(musicId)) {
                return {
                    ...prevForm,
                    musicsIds: prevForm.musicsIds.filter(
                        (id) => id !== musicId,
                    ),
                };
            } else {
                return {
                    ...prevForm,
                    musicsIds: [...prevForm.musicsIds, musicId],
                };
            }
        });
    };

    const onCloseModal = () => {
        setForm({
            playlist_name: "",
            musicsIds: [],
        });

        handleOpenModal(false, {
            type: "createPlaylist",
        });
    };

    const createPlaylist = async () => {
        setLoading(true);
        if (
            userPlaylists.find(
                (item) => item.playlist_name === form.playlist_name,
            )
        ) {
            let count = 1;
            let newName = `${form.playlist_name} - ${userPlaylists.filter(
                (item) => item.playlist_name === form.playlist_name,
            ).length + count
                }`;

            while (
                userPlaylists.find((item) => item.playlist_name === newName)
            ) {
                count++;
                newName = `${form.playlist_name} - ${userPlaylists.filter(
                    (item) => item.playlist_name === form.playlist_name,
                ).length + count
                    }`;
            }

            form.playlist_name = newName;
        }

        await EndPoints.createPlaylist(form);
        reloadUserPlaylist();
        onCloseModal();
        setLoading(false);
    };

    useEffect(() => {
        const getMusics = async () => {
            const data = await EndPoints.getMusics({
                limit: 11,
                offset: 0,
                search: search,
            });
            setMusics(data);
        };

        getMusics();
    }, [isOpen, search]);

    useEffect(() => {
        if (ref.current) {
            setTimeout(() => {
                if (isOpen) {
                    ref.current?.classList.add("show");
                } else {
                    ref.current?.classList.remove("show");
                }
            }, 100);
        }
    }, [isOpen]);

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal-open">
                <div
                    ref={ref}
                    className="modal fade"
                    role="dialog"
                    style={{
                        display: isOpen ? "block" : "none",
                    }}
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    onClick={onCloseModal}
                                    style={{
                                        background: "none",
                                    }}
                                >
                                    <p>X</p>
                                </button>
                            </div>
                            <h2>Digite o nome</h2>
                            <input
                                type="text"
                                onChange={onChangePlaylistName}
                                className="modal-input"
                            />
                            <h2 className="mt-3">Escolha as musicas</h2>
                            <div className="d-flex flex-column">
                                <label>Buscar musica</label>

                                <input
                                    type="text"
                                    onChange={searchMusic}
                                    className="modal-input mt-2"
                                />
                            </div>
                            <div className="modal-musicsList mt-3">
                                {musics.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className="music-card"
                                            onClick={() => addMusics(item.id)}
                                        >
                                            <div className="musicContent">
                                                <h1>{item.name}</h1>
                                                <p>{item.singer}</p>
                                            </div>
                                            <div className="card-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={form.musicsIds.includes(
                                                        item.id,
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={createPlaylist}
                                disabled={disabledButton}
                            >
                                {onLoading()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
