import React, {useContext, useState} from 'react';
import './App.scss';
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import {IEmployee} from "./types/UsersTypes";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

function App() {

    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState<IEmployee | null>(null);
    const {employeeStore} = useContext(Context);

    return (
        <div className="App">
            <>
                <Navbar/>
                <Sidebar setEmployeeToEdit={setEmployeeToEdit}
                         setShowAddEmployee={setShowAddEmployee}/>
                {employeeStore._openPages.map(Page => {
                    if (Page.id === employeeStore.currentOpenPageId) {
                        return <Page.EmployeesPage key={Page.id}
                                                   store={Page.store}
                                                   employeeToEdit={employeeToEdit}
                                                   setEmployeeToEdit={setEmployeeToEdit}
                                                   setShowAddEmployee={setShowAddEmployee}
                                                   showAddEmployee={showAddEmployee}/>
                    }
                })}
            </>
        </div>
    );
}

export default observer(App);
