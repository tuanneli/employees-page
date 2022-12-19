import React, {Dispatch, useContext, useEffect, useState} from 'react';
import './Sidebar.module.scss';
import {observer} from "mobx-react-lite";
import classes from './Sidebar.module.scss';
import {Context} from "../../index";
import {IEmployee} from "../../types/UsersTypes";
import PopupWindow from "./popupWIndow/PopupWindow";

interface ISidebar {
    setShowAddEmployee: Dispatch<boolean>
    setEmployeeToEdit: Dispatch<IEmployee | null>
}

const Sidebar = observer(({setShowAddEmployee, setEmployeeToEdit}: ISidebar) => {

    const {employeeStore} = useContext(Context);
    const [showPopupWindow, setShowPopupWindow] = useState(false);
    const [closeFirstWindow, setCloseFirstWindow] = useState(false);

    const addListOfEmployees = () => {
        if (employeeStore._openPages.length < 20) {
            employeeStore.addOpenPage();
        } else {
            setShowPopupWindow(true);
        }
    }

    useEffect(() => {
        if (closeFirstWindow && !showPopupWindow) {
            employeeStore.addOpenPage();
            closeFirstWindow && employeeStore.shiftOpenPage();
        }
    }, [showPopupWindow]);

    const addEmployeeHandler = () => {
        setShowAddEmployee(true);
        setEmployeeToEdit(null);
    }

    return (
        <>
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
            {showPopupWindow &&
                <PopupWindow setCloseFirstWindow={setCloseFirstWindow} setShowPopupWindow={setShowPopupWindow}/>}
        </>
    );
});

export default Sidebar;