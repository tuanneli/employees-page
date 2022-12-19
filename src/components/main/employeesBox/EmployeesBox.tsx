import React, {Dispatch, useContext, useEffect, useState} from 'react';
import classes from "../EmployeesPage.module.scss";
import dayjs from "dayjs";
import {IEmployee} from "../../../types/UsersTypes";
import {ArrowDownward, ArrowUpward, Edit} from "@mui/icons-material";
import {Context} from "../../../index";
import PageStateStore from "../../../store/PageStateStore";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

interface IProps {
    setShowAddEmployee: Dispatch<boolean>
    setEmployeeToEdit: Dispatch<IEmployee>
    store: typeof PageStateStore.prototype
    tog: boolean
}

const EmployeesBox = ({
                          store,
                          setShowAddEmployee,
                          setEmployeeToEdit,
                          tog
                      }: IProps) => {

    const editHandler = (employee: IEmployee) => {
        setShowAddEmployee(true);
        setEmployeeToEdit(employee);
    }

    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        store.setCategoriesToShow(store.categoriesToShow.map(category => {
            if (store.categoriesToShowInfo.find(item => item.id === category.id)) {
                return store.categoriesToShowInfo.find(item => item.id === category.id)!;
            }
            return category;
        }))
    }, [toggle, tog])

    const sortHandler = (str: string) => {
        store.setCurrentListOfPages(store.currentListOfPages.sort(function (a, b) {
            store.setSortByWord(str);
            if (str !== 'id') {
                return toggle ?
                    ('' + a[str as keyof IEmployee]).localeCompare(b[str as keyof IEmployee]) :
                    ('' + b[str as keyof IEmployee]).localeCompare(a[str as keyof IEmployee]);
            } else {
                return toggle ?
                    (parseInt(a[str as keyof IEmployee])) - parseInt(b[str as keyof IEmployee]) :
                    (parseInt(b[str as keyof IEmployee])) - parseInt(a[str as keyof IEmployee])
            }
        }))
        store.setToggle(toggle);
        setToggle(!toggle);
    }

    return (
        <div className={classes.box}>
            <div key={"header"} className={`${classes.box__user} ${classes.user}`}>
                {store.categoriesToShow.map(category => {
                    return <div key={category.id}
                                onClick={() => sortHandler(category.name)}
                                className={`${classes.user__item} ${classes.user__item_header}`}>
                        <div
                            className={classes.user__item_header_text}>{category.name.toUpperCase()} {store.sortByWord === category.name && (store.toggle ?
                            <ArrowDownward/> : <ArrowUpward/>)}</div>
                    </div>
                })}
                <div className={`${classes.user__item}`} style={{userSelect: 'none'}}>
                    <div
                        className={classes.user__item_header_text}>EDIT
                    </div>
                </div>
            </div>
            {store.currentListOfPages?.map((employee, index) => {
                return <div key={employee.id} className={`${classes.box__user} ${classes.user}`}>
                    {store.categoriesToShow.map(category => {
                        if (category.name === 'birthday') {
                            return <div key={category.id}
                                        style={index % 2 === 0 ? {backgroundColor: 'rgba(255, 255, 0, 0.2)'} : {backgroundColor: "rgba(0, 0, 255, 0.2)"}}
                                        className={classes.user__item}>
                                {dayjs(employee.birthday).format('DD.MM.YY')}
                            </div>
                        }
                        return <div key={category.id}
                                    style={index % 2 === 0 ? {backgroundColor: 'rgba(255, 255, 0, 0.2)'} : {backgroundColor: "rgba(0, 0, 255, 0.2)"}}
                                    className={classes.user__item}>
                            {employee[category.name as keyof IEmployee]}
                        </div>
                    })}
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

export default observer(EmployeesBox);