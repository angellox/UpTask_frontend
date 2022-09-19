import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/clientAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isStoraged = false;
        const authUser = async () => {
            const token = localStorage.getItem('UpTaskToken');

            if(!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clientAxios('/users/account', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data);
                setAuth({});
            }
            
            setLoading(false);

        }
        return () => {
            if(!isStoraged) {
                authUser();
            }
            isStoraged = true;
        }

    }, [auth.fullName]);

    const logOutSession = () => setAuth({});

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                loading,
                logOutSession
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext;
