import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api.js';

const authContext = createContext();

function AuthProvider({children}){
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        
        if(access_token){
            api.defaults.data = {'access_token': access_token};
            setAuthenticated(true);
        }
        
        setLoading(false);

    }, []);

    function login(requestData) {
        api.post('/login', requestData)
            .then ((response) => {
                localStorage.setItem('access_token', JSON.stringify(response.data.access_token))
                setAuthenticated(true);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err)
                setAuthenticated(false);
                navigate('/login', { state: {error: true, error_message: err.response.data.message}});
        });    
    }

    function logout(){
        localStorage.removeItem('access_token');
        api.defaults.data = {};
        setAuthenticated(false);
        navigate('/login')
    }

    return (
        <authContext.Provider value={{ authenticated, login, logout, loading, setLoading }}>
            {children}
        </authContext.Provider>
    )
}

export { AuthProvider,  authContext };