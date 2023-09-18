import EndPoints from "#/endpoints";
import IUser from "#/interfaces/IUser";
import { useEffect, useRef, useState } from "react";
import SelectUserIconModal from "./SelectUserIconModal";

export default function EditUserProfileModal({ isOpen }: { isOpen: boolean }) {
    const [user, setUser] = useState<Partial<IUser>>({});
    const [openEditUserIconModal, setOpenEditUserIconModal] = useState(false);

    const handleOpenModal = () => {
        setOpenEditUserIconModal(true);
    };

    useEffect(() => {
        const getUserProfile = async () => {
            const data = await EndPoints.getUserProfile();
            setUser(data);
        };

        getUserProfile();
    }, []);

    console.log(user);

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

    const ref = useRef<HTMLDivElement>(null);

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
                                <h1>Editar perfil</h1>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <div className="editUser__modal__image">
                                        <div onClick={handleOpenModal}>
                                            <img
                                                src={`./users-icons/${user.icon_name}.png`}
                                                alt={`${user.icon_name}, icone`}
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {openEditUserIconModal && (
                <SelectUserIconModal isOpen={openEditUserIconModal} />
            )}
        </>
    );
}
