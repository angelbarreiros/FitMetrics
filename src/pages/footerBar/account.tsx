import { CircleUserRound, Loader2, Save, SaveIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { TOKEN_NAME } from "../../auth/Auth";
import { SEO } from "../../components/SEO";
import SingleEditableField from "../../components/shared/SingleEditableField";
import PagesHeader from "../../components/shared/PageHeader";
import PasswordModifier from "../../components/shared/PasswordModifier";
import { userStore } from "../../stores/userStore";
import type { EditAccountResponse } from "../../types/responsesTypes";
import { fetchData } from "../../util/fetch";
import { validateEmail, validatePassword } from "../../util/validate";


export default function AccountPage() {
    const { Name, Email } = userStore((state) => state.user.userInfo);
    const { logout, editAccount } = userStore((state) => state);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState("");
    const [stopEditing, setStopEditing] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        userName: "",
        oldPwd: "",
        newPwd: "",
        confirmNewPwd: ""
    });

    const userNameRef = useRef(Name);
    const emailRef = useRef(Email);
    const passwordRef = useRef("");
    const newPasswordRef = useRef("");
    const repeatPasswordRef = useRef("");
    const cleanErrors = () => {
        setErrors({
            email: "",
            userName: "",
            oldPwd: "",
            newPwd: "",
            confirmNewPwd: ""
        });
        setFetchError("");

    };
    const handleSaveChanges = async () => {
        cleanErrors();

        let isValidPassword = true
        let isValidNewPassword = true
        let areEqual = true

        const isValidMail = validateEmail(emailRef.current.trim());
        if (passwordRef.current.trim() !== "") {
            isValidPassword = validatePassword(passwordRef.current.trim());
            isValidNewPassword = validatePassword(newPasswordRef.current.trim());
            areEqual = newPasswordRef.current === repeatPasswordRef.current;
        }

        if (!isValidMail) {
            setErrors((prev) => ({ ...prev, email: "Invalid email" }));
        }
        if (!isValidPassword) {
            setErrors((prev) => ({ ...prev, oldPwd: "Invalid password" }));
        }
        if (!isValidNewPassword) {
            setErrors((prev) => ({ ...prev, newPwd: "Invalid password" }));
        }
        if (!areEqual) {
            setErrors((prev) => ({ ...prev, confirmNewPwd: "Passwords do not match" }));
        }
        if (!isValidMail || !isValidPassword || !isValidNewPassword || !areEqual) {
            console.log("Invalid data");
            return;
        }
        setStopEditing(!stopEditing);


        const userData = {
            name: userNameRef.current.trim(),
            email: emailRef.current.trim(),
            oldPwd: passwordRef.current.trim() === "" ? undefined : passwordRef.current.trim(),
            newPwd: newPasswordRef.current.trim() === "" ? undefined : newPasswordRef.current.trim(),
        };

        setIsSubmitting(true);
        await fetchData<EditAccountResponse>(
            { apiName: "login", url: "/api/v1/edit", method: "PUT", body: userData, auth: { tokenName: TOKEN_NAME } },
            {
                onUnauthorizedError: (value) => { setFetchError(value.message); },
                onForbiddenError: () => { logout(); },
                onNotFoundError: () => { logout(); },
                onServerError: () => { logout(); },
                onUnexpectedError: () => { logout(); },
                onUserError: (value) => { setFetchError(value.message); },
                onSuccess: (value) => {
                    editAccount(value)
                    if (newPasswordRef.current.trim() != "") {
                        logout()
                    }
                }
            }
        );
        setIsSubmitting(false);
    };

    return (
        <section>
            <SEO title="FitMetrics - Account Details" />
            <PagesHeader title="Account Details" icon={CircleUserRound}>
                <div className="mr-8">
                    <button
                        onClick={handleSaveChanges}
                        className="bg-primary px-4 py-2 rounded-default  text-text flex items-center gap-2 hover:bg-primary/80 transition-all duration-200 hover:cursor-pointer"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin w-6 h-6 text-text" />
                        ) : (
                            <SaveIcon className="w-6 h-6 text-text" />
                        )}
                        Save Changes
                    </button>
                </div>
            </PagesHeader>
            <div className="grid md:grid-cols-2 p-6 gap-4">
                <SingleEditableField
                    stopEditing={stopEditing}
                    name="Username"
                    label="Username"
                    type="text"
                    error={errors.userName}
                    value={Name}
                    getValue={useCallback((userName) => { userNameRef.current = userName; setErrors({ ...errors, userName: "" }); }, [errors])}
                />
                <SingleEditableField
                    stopEditing={stopEditing}
                    name="Email"
                    label="Email"
                    type="text"
                    error={errors.email}
                    value={Email}
                    getValue={useCallback((email) => { userNameRef.current = email; setErrors({ ...errors, email: "" }); }, [errors])}
                />
                <PasswordModifier
                    oldPwd={passwordRef.current}
                    setOldPwd={(password) => { passwordRef.current = password; }}
                    newPwd={newPasswordRef.current}
                    setNewPwd={(newPassword) => { newPasswordRef.current = newPassword; }}
                    confirmNewPwd={repeatPasswordRef.current}
                    setConfirmNewPwd={(repeatPassword) => { repeatPasswordRef.current = repeatPassword; }}
                    errors={errors}
                />
                <p>
                    <span className="text-md text-error">{fetchError}</span>
                </p>

                <button
                    onClick={handleSaveChanges}
                    className="md:hidden bg-primary px-4 py-2 rounded-default font-semibold text-text flex items-center gap-2 hover:bg-primary/80 transition-all duration-200 hover:cursor-pointer"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin w-6 h-6 text-text" />
                    ) : (
                        <Save className="w-6 h-6 text-text" />
                    )}
                    Save Changes
                </button>
            </div>
        </section>
    );
}