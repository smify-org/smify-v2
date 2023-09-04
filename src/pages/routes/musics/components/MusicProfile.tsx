import { ColorExtractor } from 'react-color-extractor'
import { useState } from 'react'
import EndPoints from '#/endpoints'
import { useEffect } from 'react'
import IMusics from '#/interfaces/IMusics'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function MusicProfile({
    musicId,
}: {
    musicId: string,
}) {
    const [colors, setColors] = useState<string[]>([])
    const [music, setMusic] = useState<IMusics[]>([])
    const [isFavorite, setIsFavorite] = useState(false)
    console.log(isFavorite)

    useEffect(() => {
        const getMusics = async () => {
            if (!musicId) return;
            const data = await EndPoints.getMusicToId(musicId)
            setMusic(data)
        }

        getMusics()
    }, [musicId])

    useEffect(() => {
        console.log('Buscando favoritos')
        const getFavoriteMusics = async () => {
            const data = await EndPoints.getFavoriteMusics()
            console.log('Musicas favoritas', data)
            
            const isFavorite = data.some((item: {favorite_music_id: number}) => item.favorite_music_id === parseInt(musicId))
            
            console.log('isFavorite', isFavorite)

            setIsFavorite(isFavorite)
        }



        getFavoriteMusics()
    }, [musicId])


    return (
        <div className='music_container p-3' style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: colors[3],
        }}>
            <div>
                {
                    music.map(item => (
                        <div key={item.id} className="music_profile-container">
                            <div>
                                <ColorExtractor getColors={(colors: string[]) => setColors(colors)}>
                                    <img src={item.logo} alt="" className="rounded img-fluid" />
                                </ColorExtractor>
                            </div>
                            <div>
                                <h1>{item.name}</h1>
                                <p>{item.singer}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div>
                {
                    isFavorite ? (
                        <FavoriteIcon style={{
                            fontSize: 40,
                        }} />
                    ) : (
                        <FavoriteBorderIcon  style={{
                            fontSize: 40,
                        }}/>
                    )
                }
            </div>
        </div>
    )
}