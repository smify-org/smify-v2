import EndPoints from "#/endpoints"
import IUser from "#/interfaces/IUser"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";


export default function LoginScreen() {
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>({
        email: '',
        password: '',
        playlists: [],
        icon_name: '',
        name: '',
    })

    const [disabledButton, setDisabledButton] = useState<boolean>(false)

    const handleUserEmail = (email: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            email: email.target.value
        })
    }

    const handleUserPassword = (password: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            password: password.target.value
        })
    }


    const verifyLogin = async () => {
        setDisabledButton(true)
        const verify = await EndPoints.loginUser(user.email, user.password)


        if (verify) {
            return navigate("/", { replace: true });
        }

        setDisabledButton(false)
        return alert("Email ou senha incorretos")
    }

    useEffect(() => {
        if (!user.email.length || !user.password.length) return setDisabledButton(true)

        return setDisabledButton(false)
    }, [user.email, user.password])

    return (
        <main className="auth-screen-container">
            <h1>Fazer login</h1>
            <div className="auth-screen__inputs">
                <input type="email" placeholder="Email" onChange={handleUserEmail} />
                <input type="password" placeholder="Senha" onChange={handleUserPassword} />
                <button
                    type="submit"
                    onClick={verifyLogin}
                    disabled={disabledButton}
                >Entrar</button>
            </div>
            <p>Ainda não tem uma conta? <Link to={'/register'} style={{
                color: '#451fed',
                fontWeight: 'bold',
            }}>Criar conta</Link></p>
        </main>

    )
}