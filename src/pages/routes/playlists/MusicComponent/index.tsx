
import IMusics from '#/interfaces/IMusics';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MusicComponent({
    item,
    favoritesMusic,
    setLikeOrDeslike,
    removeMusicToPlaylist
}: {
    item: IMusics,
    favoritesMusic: { favorite_music_id: number }[],
    setLikeOrDeslike?: (music_id: number) => Promise<void>;
    removeMusicToPlaylist: (music_id: number) => Promise<void>;
}) {

    const onPreventReload = (event: {
        preventDefault: () => void;
    }) => {
        event.preventDefault()
    }

    return (
        <Link to={`/musics/${item.id}`} key={item.id} className="more-musics">
            <div className="music-informations">
                <div className="card-image">
                    <img src={item.logo} />
                </div>
                <div>
                    <h1 className="fs-6 mb-0">{item.name}</h1>
                    <p className="mb-0">{item.singer}</p>
                </div>
            </div>
            <div className='position-relative'>
                <button onClick={onPreventReload} style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white'
                }}>
                    {favoritesMusic.some(favorite => favorite.favorite_music_id === item.id) ? <FavoriteIcon onClick={() => setLikeOrDeslike(item.id)} /> : <FavoriteBorderIcon onClick={() => setLikeOrDeslike(item.id)} />}
                </button>

                <button onClick={onPreventReload} style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white'
                }}>
                    <DeleteIcon onClick={() => removeMusicToPlaylist} />
                </button>
            </div>


        </Link >
    )

}