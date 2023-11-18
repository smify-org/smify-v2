import SelectUserIconModal from "#/components/SelectUserIconModal";
import EndPoints from "#/endpoints";
import IUser from "#/interfaces/IUser";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterScreen() {
    const navigate = useNavigate();

    const [user, setUser] = useState<Partial<IUser>>({
        name: "",
        icon_name: "default",
        email: "",
        password: "",
    });

    console.log(user);

    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIconSelected = (icon: string) => {
        setUser({
            ...user,
            icon_name: icon,
        });

        setIsModalOpen(false);
    };

    const handleUserName = (name: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            name: name.target.value,
        });
    };

    const handleUserEmail = (email: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            email: email.target.value,
        });
    };

    const handleUserPassword = (
        password: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setUser({
            ...user,
            password: password.target.value,
        });
    };

    const registerUser = async () => {
        const response = await EndPoints.registerUser(user);

        console.log(response);

        if (response?.status === 422) {
            return alert(response?.error);
        }

        return navigate("/login", { replace: true });
    };

    useEffect(() => {
        if (!user?.email?.length || !user?.password?.length)
            return setDisabledButton(true);

        return setDisabledButton(false);
    }, [user.email, user.password]);

    return (
        <main className="auth-screen-container">
            <h1>Fazer Cadastro</h1>
            <div className="auth-screen__inputs">
                <div>
                    <img
                        src={`./users-icons/${user.icon_name}.png`}
                        alt=""
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    />
                </div>
                <input
                    type="text"
                    placeholder="Nome de usuario"
                    onChange={handleUserName}
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={handleUserEmail}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    onChange={handleUserPassword}
                />
                <button
                    type="submit"
                    onClick={registerUser}
                    disabled={disabledButton}
                >
                    Cadastar
                </button>
            </div>
            <p>
                Já tem uma conta?{" "}
                <Link
                    to={"/login"}
                    style={{
                        color: "#451fed",
                        fontWeight: "bold",
                    }}
                >
                    Fazer login
                </Link>
            </p>

            {isModalOpen && (
                <SelectUserIconModal
                    isOpen={isModalOpen}
                    setIconSelected={handleIconSelected}
                />
            )}
        </main>
    );
}
