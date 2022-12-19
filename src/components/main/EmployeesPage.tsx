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
import PageStateStore from "../../store/PageStateStore";

interface IEmployeesPage {
    showAddEmployee: boolean,
    setShowAddEmployee: Dispatch<boolean>
    setEmployeeToEdit: Dispatch<IEmployee | null>
    employeeToEdit: IEmployee | null
    store: typeof PageStateStore.prototype
}

const EmployeesPage = observer(({
                                    showAddEmployee,
                                    setShowAddEmployee,
                                    setEmployeeToEdit,
                                    employeeToEdit,
                                    store
                                }: IEmployeesPage) => {
    const {employeeStore} = useContext(Context);
    const [amountOfPages, setAmountOfPages] = useState(1);
    const [toggle, setToggle] = useState(true);

    const setListOfPages = () => store.setCurrentListOfPages(employeeStore._employees.slice(20 * (store.currentPage - 1), 20 * (store.currentPage - 1) + 20)
        .sort(function (a, b): any {
            if (store.sortByWord && store.sortByWord !== 'id') {
                return store.toggle ?
                    ('' + a[store.sortByWord as keyof IEmployee]).localeCompare(b[store.sortByWord as keyof IEmployee]) :
                    ('' + b[store.sortByWord as keyof IEmployee]).localeCompare(a[store.sortByWord as keyof IEmployee]);
            } else {
                return store.toggle ?
                    (parseInt(a[store.sortByWord as keyof IEmployee])) - parseInt(b[store.sortByWord as keyof IEmployee]) :
                    (parseInt(b[store.sortByWord as keyof IEmployee])) - parseInt(a[store.sortByWord as keyof IEmployee])
            }
        }));

    useEffect(() => {
        employeeStore.fetchEmployees()
            .then(() => {
                setAmountOfPages(Math.ceil(employeeStore.employees.length / 20));
                setListOfPages();
            });
    }, []);


    useEffect(() => {
        store.setCurrentListOfPages(employeeStore._employees.slice(20 * (store.currentPage - 1), 20 * (store.currentPage - 1) + 20));
        setListOfPages();
    }, [store.currentListOfPages[0]?.id, store.currentPage, showAddEmployee]);

    return (
        <nav className={classes.main}>
            <SortingColumns store={store}
                            setToggle={setToggle}
                            toggle={toggle}/>
            <EmployeesBox store={store}
                          tog={toggle}
                          setShowAddEmployee={setShowAddEmployee}
                          setEmployeeToEdit={setEmployeeToEdit}/>
            <EmployeesPageNavigation store={store}
                                     currentPage={store.currentPage}
                                     amountOfPages={amountOfPages}/>
            {showAddEmployee && <AddEmployee employeeToEdit={employeeToEdit} setShowAddEmployee={setShowAddEmployee}/>}
        </nav>
    );
});

export default EmployeesPage;