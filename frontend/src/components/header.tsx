import { useAuthStore } from "@/stores/auth"
import logoIcon from "@/assets/logo-icon.svg"

export function Header() {
    const { user, isAuthenticated } = useAuthStore()

    return (
        <div className="w-ful px-16 pt-6">
            {isAuthenticated && (
                <div className="flex justify-between w-full">
                    <div className="min-w-48">
                        <img src={logoIcon} alt="logo" />
                    </div>
                </div>
            )}
        </div>
    )
}