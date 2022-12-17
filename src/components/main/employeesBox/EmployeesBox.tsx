import React, {Dispatch, useContext, useEffect, useState} from 'react';
import classes from "../EmployeesPage.module.scss";
import dayjs from "dayjs";
import {IEmployee} from "../../../types/UsersTypes";
import {Edit} from "@mui/icons-material";
import {Context} from "../../../index";

interface IProps {
    currentListOfPages: IEmployee[]
    setCurrentListOfPages: Dispatch<IEmployee[]>
    setShowAddEmployee: Dispatch<boolean>
    setEmployeeToEdit: Dispatch<IEmployee>
}

const EmployeesBox = ({currentListOfPages, setCurrentListOfPages, setShowAddEmployee, setEmployeeToEdit}: IProps) => {

    const {employeeStore} = useContext(Context);

    const editHandler = (employee: IEmployee) => {
        setShowAddEmployee(true);
        setEmployeeToEdit(employee);
    }

    return (
        <div className={classes.box}>
            <div key={"header"} className={`${classes.box__user} ${classes.user}`}>
                {employeeStore.categoriesToShow.includes('id') && <div className={classes.user__item}>
                    ID
                </div>}
                {employeeStore.categoriesToShow.includes('name') && <div className={classes.user__item}>
                    NAME
                </div>}
                {employeeStore.categoriesToShow.includes('sex') && <div className={classes.user__item}>
                    SEX
                </div>}
                {employeeStore.categoriesToShow.includes('job') && <div className={classes.user__item}>
                    JOB
                </div>}
                {employeeStore.categoriesToShow.includes('birthday') && <div className={classes.user__item}>
                    BIRTHDAY
                </div>}
                {employeeStore.categoriesToShow.includes('edit') && <div className={classes.user__item}>
                    EDIT
                </div>}
            </div>
            {currentListOfPages?.map((employee) => {
                return <div key={employee.id} className={`${classes.box__user} ${classes.user}`}>
                    {employeeStore.categoriesToShow.includes('id') && <div className={classes.user__item}>
                        {employee.id}
                    </div>}
                    {employeeStore.categoriesToShow.includes('name') && <div className={classes.user__item}>
                        {employee.name}
                    </div>}
                    {employeeStore.categoriesToShow.includes('sex') && <div className={classes.user__item}>
                        {employee.sex}
                    </div>}
                    {employeeStore.categoriesToShow.includes('job') && <div className={classes.user__item}>
                        {employee.job}
                    </div>}
                    {employeeStore.categoriesToShow.includes('birthday') && <div className={classes.user__item}>
                        {dayjs(employee.birthday).format('DD.MM.YY')}
                    </div>}
                    <div className={`${classes.user__item}`}>
                        <div onClick={() => editHandler(employee)}
                             className={`${classes.user__edit}`}>
                            {<Edit/>}
                        </div>
                    </div>
                </div>
            })}
        </div>
    );
};

export default EmployeesBox;