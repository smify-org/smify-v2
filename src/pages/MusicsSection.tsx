import EndPoints from "#/endpoints";
import IMusics from "#/interfaces/IMusics";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MusicsSection() {
    const [musics, setMusics] = useState<IMusics[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getMusics = async () => {
            const data = await EndPoints.getMusics({
                limit: 30,
                offset: 0,
                search: "",
            });
            setMusics(data);
            setIsLoading(false);
        };

        getMusics();
    }, []);

    return (
        <div className="m-5">
            <h1>Musicas Disponíveis</h1>
            <div className="border-bar"></div>

            <div className="musics-container row">
                {isLoading ? (
                    Array.from({ length: 11 }).map((_, index) => (
                        <div key={index} className="col-md-3 col-sm-6 mb-4">
                            <div className="card bg-dark text-white">
                                <Skeleton height={20} width={120} className="mt-3" />
                                <Skeleton height={150} />
                                <Skeleton height={15} width={80} className="mt-3" />
                            </div>
                        </div>
                    ))
                ) : (
                    musics.map((item) => (
                        <div key={item.id} className="col-md-3 col-sm-6 mb-4">
                            <Link to={`/musics/${item.id}`} className="text-white text-decoration-none">
                                <div className="card bg-dark">
                                    <h1 className="mt-3">{item.name}</h1>
                                    <img src={item.logo} alt="" />
                                    <p>{item.singer}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
