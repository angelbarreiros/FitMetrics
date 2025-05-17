import { useState } from "react";
import PrincipalForm from "../components/shared/PrincipalForm";
import PrincipalFormError from "../components/shared/PrincipalFormError";
import PrincipalFormField from "../components/shared/PrincipalFormField";
import { PrincipalSubmitButton } from "../components/shared/PrincipalSubmitButton";
import type { LoginResponse } from "../types/responsesTypes";
import { fetchData } from "../util/fetch";
import { validateEmail } from "../util/validate";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
type LoginState = {
    email: string;
    password: string;
    errors: string[];
}

export const LoginPage = () => {
    const login = userStore(state => state.login)
    const navigate = useNavigate()
    const [loginState, setLoginState] = useState<LoginState>({ email: "", password: "", errors: [], })
    const cleanErrors = () => { setLoginState(prev => ({ ...prev, errors: [] })) }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        cleanErrors()
        event.preventDefault();
        const { email, password } = loginState;
        if (!email || !password) {
            setLoginState(prev => ({
                ...prev,
                errors: [...prev.errors, "Please fill in all fields"]
            }))
            return;
        }
        if (!validateEmail(email)) {
            setLoginState(prev => ({
                ...prev,
                errors: [...prev.errors, "Please enter a valid email address"]
            }))
            return;
        }
        const result = await fetchData<LoginResponse>({ apiName: "login", method: "POST", url: "/api/v1/login", body: { email, pwd: password } })
        if (result.status === 400) {
            setLoginState(prev => ({
                ...prev,
                errors: [...prev.errors, result.data.message]
            }))
            return
        }
        if (result.status === 200 && result.data.token) {
            login(result.data.token)
            navigate("/home")
            return
        }

        setLoginState(prev => ({
            ...prev,
            errors: [...prev.errors, "Server error"]
        }))

    }
    return (
        <div>

            <div className="flex items-center justify-center min-h-screen">
                <div className="m-auto min-w-sm md:min-w-lg p-6 bg-white shadow-xl rounded-default">
                    <header className="mb-6 space-y-5">
                        <h2 className="text-center text-3xl font-bold text-black">
                            Welcome Back
                        </h2>
                        <p className="text-xl text-center text-formLabel">Please, Sign In To Continue </p>
                    </header>
                    <PrincipalForm onSubmit={handleSubmit}>
                        <PrincipalFormField
                            type="string"
                            name="email"
                            label="Email"
                            value={loginState.email}
                            placeholder="john@doe.com"
                            getValue={email => setLoginState(prev => ({ ...prev, email }))}
                        />
                        <PrincipalFormField
                            type="password"
                            label="Password"
                            name="password"
                            value={loginState.password}
                            placeholder="Password"
                            getValue={password => setLoginState(prev => ({ ...prev, password }))}
                        />
                        <PrincipalSubmitButton text="Login" />
                        <PrincipalFormError errors={loginState.errors} />

                    </PrincipalForm>
                </div>

            </div>
        </div>
    );
}