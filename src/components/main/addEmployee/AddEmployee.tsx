import React, {Dispatch, useContext, useEffect, useState} from 'react';
import classes from './AddEmployee.module.scss';
import Error from "../../../error/Error";
import {IEmployee} from "../../../types/UsersTypes";
import dayjs from "dayjs";
import {EmployeesService} from "../../../api/API";
import {v4 as uuid} from 'uuid';
import {Context} from "../../../index";

interface IAddEmployee {
    setShowAddEmployee: Dispatch<boolean>
    employeeToEdit: IEmployee | null
}

const AddEmployee = ({setShowAddEmployee, employeeToEdit}: IAddEmployee) => {

    const [id, setId] = useState("");
    const [name, setName] = useState<string>('');
    const [job, setJob] = useState<string>('');
    const [sex, setSex] = useState<string>('')
    const [birthday, setBirthday] = useState<string>('')
    const [error, setError] = useState<string>()

    const {employeeStore} = useContext(Context);

    useEffect(() => {
        if (employeeToEdit !== null) {
            setId(employeeToEdit.id);
            setName(employeeToEdit.name);
            setJob(employeeToEdit.job);
            setSex(employeeToEdit.sex);
            setBirthday(dayjs(employeeToEdit.birthday).format('YYYY-MM-DD'));
        } else {
            setId("");
            setName("");
            setJob("");
            setSex("");
            setBirthday("");
        }
    }, [employeeToEdit]);

    const createEmployee = async (e: any) => {
        e.stopPropagation();
        if (!name || !sex || !job || !birthday) {
            setError("The fields can't be empty")
        } else {
            setError("");
            if (employeeToEdit === null) {
                await EmployeesService.createEmployee({id: uuid(), name, sex, job, birthday})
                    .then(() => employeeStore.fetchEmployees());
            } else {
                await EmployeesService.deleteEmployee(id);
                await EmployeesService.createEmployee({id, name, sex, job, birthday})
                    .then(() => employeeStore.fetchEmployees());
            }
            setShowAddEmployee(false);
        }
    }

    return (
        <div className={classes.add_employee_container}>
            <div onClick={() => setShowAddEmployee(false)} className={classes.add_employee_container__bg}/>
            <div className={classes.add_employee_box}>
                <div className={classes.add_employee_box__input_container}>
                    <div className={classes.add_employee_box__label}>Name</div>
                    <input value={name}
                           onChange={(e) => setName(e.target.value)}
                           className={classes.add_employee_box__input}
                           type="text"/>
                </div>
                <div className={classes.add_employee_box__input_container}>
                    <div className={classes.add_employee_box__label}>Sex</div>
                    <input value={sex}
                           onChange={(e) => setSex(e.target.value)}
                           className={classes.add_employee_box__input}
                           type="text"/>
                </div>
                <div className={classes.add_employee_box__input_container}>
                    <div className={classes.add_employee_box__label}>Job</div>
                    <input value={job}
                           onChange={(e) => setJob(e.target.value)}
                           className={classes.add_employee_box__input}
                           type="text"/>
                </div>
                <div className={classes.add_employee_box__input_container}>
                    <div className={classes.add_employee_box__label}>Birthday</div>
                    <input value={birthday}
                           onChange={(e) => setBirthday(e.target.value)}
                           className={classes.add_employee_box__input}
                           type="date"/>
                </div>
                {error && <Error errorText={error}/>}
                <div className={classes.add_employee_box__input_container}>
                    <button onClick={createEmployee}
                            className={classes.add_employee_box__button}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
