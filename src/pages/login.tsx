import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import PrincipalForm from "../components/shared/PrincipalForm";
import PrincipalFormError from "../components/shared/PrincipalFormError";
import PrincipalFormField from "../components/shared/PrincipalFormField";
import { PrincipalSubmitButton } from "../components/shared/PrincipalSubmitButton";
import { userStore } from "../stores/userStore";
import type { LoginResponse } from "../types/responsesTypes";
import { fetchData, responseSelector } from "../util/fetch";
import { validateEmail } from "../util/validate";
import { SEO } from "../components/SEO";
type LoginState = {
    email: string;
    password: string;
    errors: string[];
}

export const LoginPage = () => {
    const login = userStore(state => state.login)
    const isAuthenticated = userStore(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    const [loginState, setLoginState] = useState<LoginState>({ email: "", password: "", errors: [], })
    const [isLoading, setIsLoading] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/facilities");
        }
    }, [isAuthenticated, navigate]);

    const cleanErrors = () => { setLoginState(prev => ({ ...prev, errors: [] })) }

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        cleanErrors()
        event.preventDefault();
        setIsLoading(true);

        const { email, password } = loginState;
        if (!email || !password) {
            setLoginState(prev => ({
                ...prev,
                errors: [...prev.errors, "Please fill in all fields"]
            }))
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setLoginState(prev => ({
                ...prev,
                errors: [...prev.errors, "Please enter a valid email address"]
            }))
            setIsLoading(false);
            return;
        }

        if (!executeRecaptcha) {
            console.log('reCAPTCHA not loaded yet');
            setIsLoading(false);
            return;
        }

        try {
            const token = await executeRecaptcha('LOGIN');
            const result = await fetchData<LoginResponse>({
                apiName: "login",
                method: "POST",
                url: "/api/v1/login",
                body: { email, pwd: password, token }
            });
            responseSelector({
                status: result.status,
                onSuccess: () => {
                    login(result.data.Token, result.data.UserInfo);
                    navigate("/facilities");
                },
                onServerError: () => {
                    setLoginState(prev => ({
                        ...prev,
                        errors: [...prev.errors, "No conexion to the server"]
                    }));
                },
                onUnexpectedError: () => {
                    setLoginState(prev => ({
                        ...prev,
                        errors: [...prev.errors, "Unexpected error occurred"]
                    }));
                },
                onUserError: () => {
                    setLoginState(prev => ({
                        ...prev,
                        errors: [...prev.errors, result.data.message]
                    }));
                },
                onForbiddenError: () => { },
                onNotFoundError: () => { },

            })
        } catch (error) {
            setLoginState(prev => ({
                ...prev,
                errors: [...prev.errors, "An error occurred during login"]
            }))
        } finally {
            setIsLoading(false);
        }
    }, [executeRecaptcha, loginState, login, navigate]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin w-10 h-10 text-secundary" />
            </div>
        );
    }

    return (
        <div>
            <SEO title="FiteMetrics - Login" ></SEO>
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