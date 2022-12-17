import React, {Dispatch, useContext, useEffect, useState} from 'react';
import './EmployeesPage.module.scss';
import {observer} from "mobx-react-lite";
import classes from './EmployeesPage.module.scss';
import {Context} from "../../index";
import EmployeesBox from "./employeesBox/EmployeesBox";
import EmployeesPageNavigation from "./employeePageNavigation/EmployeesPageNavigation";
import {IEmployee} from "../../types/UsersTypes";
import AddEmployee from "./addEmployee/AddEmployee";
import SortingColumns from "./sortingColumns/SortingColumns";

interface IEmployeesPage {
    showAddEmployee: boolean,
    setShowAddEmployee: Dispatch<boolean>
    setEmployeeToEdit: Dispatch<IEmployee | null>
    employeeToEdit: IEmployee | null
}

const EmployeesPage = observer(({
                                    showAddEmployee,
                                    setShowAddEmployee,
                                    setEmployeeToEdit,
                                    employeeToEdit
                                }: IEmployeesPage) => {
    const {employeeStore} = useContext(Context);
    const [amountOfPages, setAmountOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentListOfPages, setCurrentListOfPages] = useState<IEmployee[]>([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        employeeStore.fetchEmployees()
            .then(() => {
                setAmountOfPages(Math.ceil(employeeStore.employees.length / 20));
                setCurrentListOfPages(employeeStore._employees.slice(20 * (currentPage - 1), 20 * (currentPage - 1) + 20));
            });
    }, []);

    useEffect(() => {
        setCurrentListOfPages(employeeStore._employees.slice(20 * (currentPage - 1), 20 * (currentPage - 1) + 20));
    }, [currentPage, showAddEmployee]);

    return (
        <nav className={classes.main}>
            <SortingColumns setToggle={setToggle} toggle={toggle}/>
            <EmployeesBox setShowAddEmployee={setShowAddEmployee}
                          currentListOfPages={currentListOfPages}
                          setEmployeeToEdit={setEmployeeToEdit}
                          setCurrentListOfPages={setCurrentListOfPages}/>
            <EmployeesPageNavigation currentPage={currentPage} amountOfPages={amountOfPages}
                                     setCurrentPage={setCurrentPage}/>
            {showAddEmployee && <AddEmployee employeeToEdit={employeeToEdit} setShowAddEmployee={setShowAddEmployee}/>}
        </nav>
    );
});

export default EmployeesPage;