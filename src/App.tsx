import React, {useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import EmployeesPage from "./components/main/EmployeesPage";
import {IEmployee} from "./types/UsersTypes";

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

    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState<IEmployee | null>(null);

    return (
        <div className="App">
            <>
                <Navbar/>
                <Sidebar setEmployeeToEdit={setEmployeeToEdit}
                         setShowAddEmployee={setShowAddEmployee}/>
                <EmployeesPage employeeToEdit={employeeToEdit}
                               setEmployeeToEdit={setEmployeeToEdit}
                               setShowAddEmployee={setShowAddEmployee}
                               showAddEmployee={showAddEmployee}/>
            </>
        </div>
    );
}

export default App;
