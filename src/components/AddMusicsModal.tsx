import EndPoints from "#/endpoints";
import IMusics from "#/interfaces/IMusics";
import { useEffect, useRef, useState } from "react";
import Loading from "react-loading";

export default function AddMusicsModal({
    isOpen,
    playlist_id,
    musicsExistentIds,
    updateMusics,
    closeModal,
}: {
    isOpen: boolean,
    playlist_id: string,
    musicsExistentIds: number[],
    updateMusics: (updated: boolean) => void
    closeModal: () => void
}) {

    const [musics, setMusics] = useState<IMusics[]>([])
    const [form, setForm] = useState({
        musicsIds: [] as number[],
    })
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    const ref = useRef<HTMLDivElement>(null);

    const disabledButton = form.musicsIds.length === 0 || loading

    const searchMusic = (musicName: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(musicName.target.value)
    }

    const onLoading = () => {
        return loading ? <Loading type="spin" height="25px" width="25px" /> : 'Criar'
    }

    const addMusics = (musicId: number) => {
        const musicsIds = form.musicsIds.includes(musicId)
            ? form.musicsIds.filter((item) => item !== musicId)
            : [...form.musicsIds, musicId]

        setForm({
            musicsIds,
        })
    };

    const addMusicsToPlaylist = async () => {

        try {
            form.musicsIds = form.musicsIds.filter((item) => !musicsExistentIds.includes(item))

            setLoading(true)

            setTimeout(async () => {
                await EndPoints.addMusicsToPlaylist(form.musicsIds, parseInt(playlist_id))
                setLoading(false)
                updateMusics(true)
                closeModal()
            }, 1000)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getMusics = async () => {
            const data = await EndPoints.getMusics({
                limit: 10,
                offset: 0,
                search: search,
            })
            setMusics(data)
        }

        if (ref.current) {
            setTimeout(() => {
                if (isOpen) {
                    ref.current?.classList.add('show');
                    getMusics()
                } else {
                    ref.current?.classList.remove('show');
                }
            }, 100);
        }
    }, [isOpen, search]);

    return (
        <>
            <div className='modal-backdrop fade show'></div>
            <div className="modal-open">
                <div
                    ref={ref}
                    className="modal fade" role="dialog"
                    style={{
                        display: isOpen ? 'block' : 'none',
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <h2 className="mt-3">Escolha as musicas</h2>
                            <div className="d-flex flex-column">
                                <label>
                                    Buscar musica
                                </label>

                                <input type="text" onChange={searchMusic} className="modal-input mt-2" />
                            </div>
                            <div className="modal-musicsList mt-3">
                                {
                                    musics.map((item) => {
                                        return (
                                            <div key={item.id} className="music-card" onClick={() => addMusics(item.id)}>

                                                <div className="musicContent">
                                                    <h1>{item.name}</h1>
                                                    <p>{item.singer}</p>
                                                </div>
                                                <div className="card-checkbox">
                                                    <input type="checkbox"
                                                        checked={form.musicsIds.includes(item.id)}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <button
                                onClick={addMusicsToPlaylist}
                                disabled={disabledButton}
                            >{onLoading()}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}