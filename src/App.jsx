import React, { useState, useEffect } from "react";
import { login, logout } from "./store/slice";
import { useDispatch } from "react-redux";
import authservice from "./Appwrite/auth"; 
import { Header, Footer } from "./components";

function App() {
    const [status, setStatus] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authservice.getCurrentUser()  // Use `authservice` here
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setStatus(false));
    }, [dispatch]);

    return !status ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <Header/>
            <Footer/>

            
          
        </div>
    ) : null;
}

export default App;
