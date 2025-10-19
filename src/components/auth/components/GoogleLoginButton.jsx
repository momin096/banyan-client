import { Button } from '@/components/ui/button';

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => { 
        // console.log(object);
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