import { Button } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {app} from '../firebase.js'
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try{
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    photoURL: resultsFromGoogle.user.photoURL
                }),
            })
            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/home');
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <Button onClick={handleGoogleClick}>
        Sign in with Google
    </Button>
  )
}
