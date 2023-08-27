import EndPoints from "#/endpoints"
import IMusics from "#/interfaces/IMusics"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function MusicsToId() {

    const [musics, setMusics] = useState<IMusics[]>([])
    const { id } = useParams()


    useEffect(() => {
        const getMusics = async () => {
            if(!id) return;
            const data = await EndPoints.getMusicsToId(id)
            setMusics(data)
        }

        getMusics()
    }, [id])

    return (
        <div>
            {
                musics.map((item) => {
                    return (
                        <div key={item.id}>
                            <h1>{item.name}</h1>
                            <img
                                src={item.logo}
                                alt=""
                            />
                            <p>{item.singer}</p>
                        </div>
                    )
                })
            }
        </div>
    )
 }