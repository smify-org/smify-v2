import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import EndPoints from "#/endpoints"
import IMusics from "#/interfaces/IMusics"
import AddMusicsModal from "#/components/AddMusicsModal"


export default function PlaylistsToId() {
    const { id } = useParams()

    const [musics, setMusics] = useState<IMusics[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

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
        )
    }

    const getMusicsToPlaylistId = async () => {
        if (!id) return;
        const data = await EndPoints.getMusicsToPlaylistId(id)
        setMusics(data)
    }

    const removeMusicToPlaylist = async (music_id: number) => {
        if (!id) return;

        setMusics(musics.filter((item) => item.id !== music_id))

        await EndPoints.deleteMusicToPlaylist(id, music_id)
    }

    useEffect(() => {
        getMusicsToPlaylistId()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    if (musics.length === 0) return (
        <div style={{
            marginLeft: '20px',
        }}>
            <div>
                <h1>Nenhuma música por aqui</h1>
                <button onClick={handleOpenModal} className="addmusics__button">Adicionar Musicas</button>

                <div>
                    <ModalWrapper />
                </div>
            </div>
        </div>
    )


    return (
        <div>
            <div>
                <button onClick={handleOpenModal}>Adicionar mais musicas</button>
                <div>
                    <ModalWrapper />
                </div>
            </div>
            <div>
                {
                    musics.map((item) => (
                        <div key={item.id}>
                            <Link to={`/musics/${item.id}`} style={{
                                textDecoration: 'none',
                                color: 'white',
                            }}>
                                <div>
                                    <h1>{item.name}</h1>
                                    <img
                                        src={item.logo}
                                        alt=""
                                    />
                                    <p>{item.singer}</p>
                                </div>
                            </Link>

                            <button onClick={() => removeMusicToPlaylist(item.id)}>
                                Remover da playlist
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );


}