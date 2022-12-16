import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";

function App() {

    // const {userStore} = useContext(Context);
    // const [loading, setLoading] = useState(true)

    // const checkAuthorization = async () => {
    //     if (localStorage.getItem('token')) {
    //         await userStore.checkAuth();
    //     }
    // }
    //
    // useEffect(() => {
    //     checkAuthorization();
    //     setLoading(false);
    // }, [])

    // if (userStore.isLoading || loading) {
    //     return (
    //         <Loader/>
    //     );
    // }

    return (
        <div className="App">
            <>
                <Navbar/>
                <Sidebar/>
                <Main/>
            </>
        </div>
    );
}

export default App;
