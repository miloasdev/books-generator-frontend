import {Button} from "@/shared/components/ui/button.tsx";
import {GoogleIcon} from "@/features/auth/components/GoogleIcon.tsx";

export const GoogleAuthButton = () => {
    const googleUrl = `${import.meta.env.VITE_API_URL}/auth/google/login`;
    const handleClick = () => window.location.href = googleUrl;
    return (
        <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleClick}
        >
            <GoogleIcon/> Continue with Google
        </Button>
    )
}