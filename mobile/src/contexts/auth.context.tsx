import { createContext, ReactNode, useEffect, useState } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {api} from '../services/api'

WebBrowser.maybeCompleteAuthSession();

interface UserInfoResponse {
    data: {
        user: User
    }
}

interface User {
    name: string;
    avatar: string;
    sub: string;
    iat: string;
    exp: string
}

export interface AuthContextData {
    user: User;
    signIn: ()=> Promise<void>;
    isUserLoading: boolean;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);



export const AuthContextProvider: React.FunctionComponent<AuthContextProviderProps> = ({children}) => {
    const [isUserLoading, setIsUserLoading] = useState<boolean>(false)
    const [user, setUser]= useState<User>({} as User);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: process.env.GOOGLE_CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile', 'email']
    }) 

    
    const signIn = async () => {
        try{
            setIsUserLoading(true)
            await promptAsync()
        } catch(error){
            console.log(error)
            throw error
        } finally {
            setIsUserLoading(false)
        }
    }

    const signInWithGoogle = async(access_token: string) => {
        try{
            setIsUserLoading(true)
            const tokenResponse: {data: {token: string}} = await api.post('/users', { access_token })
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

            const userInfoResponse: UserInfoResponse = await api.get('/me')
            setUser(userInfoResponse.data.user)

        }catch(error){
            console.log(error)
            throw error
        }finally{
            setIsUserLoading(false)
        }
    }

    useEffect(()=>{
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogle(response.authentication?.accessToken)
        }
    },[response])

    return(
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}