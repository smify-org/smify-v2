
import { useParams } from "react-router-dom"
import MusicProfile from "./components/MusicProfile"
import MoreMusics from "./components/MoreMusics";



export default function MusicsToId() {
    const { id } = useParams() as { id: string };
 

    return (
        <div>
        <MusicProfile musicId={id} />
        <MoreMusics musicId={id} />
        </div>        
    )
}