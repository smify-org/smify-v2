import EndPoints from "#/endpoints";
import IMusics from "#/interfaces/IMusics";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";



export default function MoreMusics({
    musicId,
}: {
    musicId: string,
}) {
    const [musics, setMusics] = useState<IMusics[]>([])



    useEffect(() => {
        const getMusics = async () => {
            const data = await EndPoints.getMusics({
                limit: 20,
                offset: 0,
                search: '',
            })

    
            const filterMusics = data.filter((item: {id: number}) => item.id !== parseInt(musicId))
    
            setMusics(filterMusics)
        }

        getMusics()
    }, [musicId])



    return (
        <div className="container-fluid">
            <h1>Mais Musicas</h1>
            <div className="row">
                {
                    musics.map(item => (
                        <Link to={`/musics/${item.id}`} key={item.id} className="col-md-6 col-lg-4 col-xl-2 h-100 mb-5" style={{
                            textDecoration: 'none',
                            color: '#fff',
                        }}>
                                <div className="music_moreMusics_card bg-dark w-100 p-2">
                                    <div className="card-image">
                                        <img src={item.logo} />
                                    </div>
                                    <div>
                                        <h1 className="fs-5">{item.name}</h1>
                                        <p>{item.singer}</p>
                                    </div>
                                </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}