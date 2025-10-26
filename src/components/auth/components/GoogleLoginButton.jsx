import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
    const { google } = useAuth();
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            const result = await google()
            console.log(result);
            if (result?.user) return navigate('/')
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Button
                onClick={handleGoogleLogin}
                type="button"
                variant="outline"
                className="w-full border-border text-foreground hover:bg-muted"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                Login with Google
            </Button>
        </>
    );
};

export default GoogleLoginButton;