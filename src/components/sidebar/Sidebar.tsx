import React, {Dispatch, useContext, useState} from 'react';
import './Sidebar.module.scss';
import {observer} from "mobx-react-lite";
import classes from './Sidebar.module.scss';
import {Context} from "../../index";
import {IEmployee} from "../../types/UsersTypes";

interface ISidebar {
    setShowAddEmployee: Dispatch<boolean>
    setEmployeeToEdit: Dispatch<IEmployee | null>
}

const Sidebar = observer(({setShowAddEmployee, setEmployeeToEdit}: ISidebar) => {

    const [isActive, setIsActive] = useState('explore');
    const [showAddAServer, setShowAddAServer] = useState(false);
    const [showDownloads, setShowDownloads] = useState(false);

    const {employeeStore} = useContext(Context);

    const addListOfEmployees = () => {
        employeeStore.addOpenPage();
        employeeStore._openPages.length > 20 && employeeStore.shiftOpenPage();
        /// here add a question if to add a new tab
    }

    const addEmployeeHandler = () => {
        setShowAddEmployee(true);
        setEmployeeToEdit(null);
    }

    return (
        <nav className={classes.sidebar}>
            <div className={classes.box}>
                <div onClick={addEmployeeHandler}
                     className={`${classes.box__new_employee} ${classes.box__item}`}>
                    Новый Сотрудник
                </div>
                <div onClick={addListOfEmployees}
                     className={`${classes.box__employees_list} ${classes.box__item}`}>
                    Список Сотрудников
                </div>
            </div>
        </nav>
    );
});

export default Sidebar;