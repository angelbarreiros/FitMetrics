
import { CircleUserRound, Loader2, Save } from "lucide-react";
import { SEO } from "../../components/SEO";
import PagesHeader from "../../components/shared/PageHeader";
import { useState } from "react";
import EditableField from "../../components/shared/EditableFiled";
import { userStore } from "../../stores/userStore";
import PasswordModifier from "../../components/shared/PasswordModifier";
import { fetchData } from "../../util/fetch";
import { TOKEN_NAME } from "../../auth/Auth";
import { validateEmail, validatePassword } from "../../util/validate";
type AccountPageProps = {
    userName: string;
    email: string;
    password: string;
    newPassword: string;
    repeatPassword: string;
}
export default function AccountPage() {
    const userInfo = userStore((state) => state.user.userInfo);
    const { logout, editAccount } = userStore((state) => state);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [accountState, setAccountState] = useState<AccountPageProps>({
        userName: userInfo?.Name || "",
        email: userInfo?.Email || "",
        password: "",
        newPassword: "",
        repeatPassword: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        userName: "",
        oldPwd: "",
        newPwd: "",
        confirmNewPwd: ""
    })
    const handleSaveChanges = async () => {
        validateEmail(accountState.email)
        validatePassword(accountState.newPassword)
        const areEqual = accountState.newPassword === accountState.repeatPassword;

        const userData = {
            name: accountState.userName.trim(),
            email: accountState.email.trim(),
            oldPwd: accountState.password.trim() === "" ? undefined : accountState.password.trim(),
            newPwd: accountState.newPassword.trim() === "" ? undefined : accountState.newPassword.trim(),

        };
        setIsSubmitting(true);
        fetchData({ apiName: "login", url: "/api/v1/edit", method: "PUT", body: userData, auth: { tokenName: TOKEN_NAME } }, {
            onForbiddenError: () => { logout() },
            onNotFoundError: () => { logout() },
            onServerError: () => { logout() },
            onUnexpectedError: () => { logout() },
            onUserError: () => { logout() },
            onSuccess: () => { }
        })
        setIsSubmitting(false);
    }
    return (
        <section>
            <SEO title="FitMetrics - Account Details" ></SEO>
            <PagesHeader title="Account Details" icon={CircleUserRound}>
                <div className="mr-8">
                    <button onClick={handleSaveChanges} className="bg-primary px-4 py-2 rounded-default font-semibold text-text flex items-center gap-2 hover:bg-primary/80 transition-all duration-200 hover:cursor-pointer">
                        {isSubmitting ? <Loader2 className="animate-spin w-6 h-6 text-text" /> : <Save className="w-6 h-6 text-text" />}
                        Save Changes
                    </button>
                </div>

            </PagesHeader>
            <div className="grid md:grid-cols-2 p-6 gap-4">
                <EditableField name="Username" label="Username" type="text" error={errors.userName} value={accountState.userName} getValue={(userName) => setAccountState({ ...accountState, userName })}></EditableField>
                <EditableField name="Email" label="Email" type="text" error={errors.email} value={accountState.email} getValue={(email) => setAccountState({ ...accountState, email })}></EditableField>
                <PasswordModifier
                    oldPwd={accountState.password}
                    setOldPwd={(password) => { setAccountState({ ...accountState, password }) }}
                    newPwd={accountState.newPassword}
                    setNewPwd={(newPassword) => { setAccountState({ ...accountState, newPassword }) }}
                    confirmNewPwd={accountState.repeatPassword}
                    setConfirmNewPwd={(repeatPassword) => { setAccountState({ ...accountState, repeatPassword }) }}
                    errors={errors}

                >
                </PasswordModifier>
                <button onClick={handleSaveChanges} className="md:hidden bg-primary px-4 py-2 rounded-default font-semibold text-text flex items-center gap-2 hover:bg-primary/80 transition-all duration-200 hover:cursor-pointer">
                    {isSubmitting ? <Loader2 className="animate-spin w-6 h-6 text-text" /> : <Save className="w-6 h-6 text-text" />}
                    Save Changes
                </button>


            </div>


        </section>



    );
}