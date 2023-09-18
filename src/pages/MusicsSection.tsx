import EndPoints from "#/endpoints";
import IMusics from "#/interfaces/IMusics";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
        <div className="container-fluid">
            <h1 className="mt-3">Musicas Disponíveis</h1>
            <div className="border-bar mb-5"></div>

            <div className="musics-container row">
                {isLoading
                    ? Array.from({ length: 11 }).map((_, index) => (
                          <div
                              key={index}
                              className="col-md-2 col-sm-12 h-100 mb-5"
                          >
                              <div className="card bg-dark w-100 p-2">
                                  <Skeleton
                                      height={20}
                                      width={120}
                                      className="mt-3"
                                  />
                                  <Skeleton height={150} />
                                  <Skeleton
                                      height={15}
                                      width={80}
                                      className="mt-3"
                                  />
                              </div>
                          </div>
                      ))
                    : musics.map((item) => (
                          <div
                              key={item.id}
                              className="col-md-4 col-lg-3 col-xl-2 col-sm-5 h-100 mb-5"
                          >
                              <Link
                                  to={`/musics/${item.id}`}
                                  className="text-white text-decoration-none h-100 d-block"
                              >
                                  <div className="card bg-dark w-100 p-2">
                                      <div className="card-image">
                                          <img src={item.logo} alt="" />
                                      </div>
                                      <div>
                                          <h1 className="fs-5">{item.name}</h1>
                                          <p>{item.singer}</p>
                                      </div>
                                  </div>
                              </Link>
                          </div>
                      ))}
            </div>
        </div>
    );
}
