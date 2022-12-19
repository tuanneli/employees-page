import React, {Dispatch, useState} from 'react';
import classes from '../EmployeesPage.module.scss';
import PageStateStore from "../../../store/PageStateStore";
import {observer} from "mobx-react-lite";

interface IProps {
    currentPage: number,
    amountOfPages: number,
    store: typeof PageStateStore.prototype
}

const EmployeesPageNavigation = ({currentPage, amountOfPages, store}: IProps) => {
    let pages: number[] = []
    const portionSize: number = 5;
    let leftPortion: number;
    let rightPortion: number;
    if (currentPage > 2 && currentPage + 3 <= amountOfPages) {
        leftPortion = currentPage - 2;
        rightPortion = portionSize + currentPage - 3;
    } else if (currentPage + 3 >= amountOfPages) {
        leftPortion = amountOfPages - 4;
        rightPortion = portionSize + currentPage - 2;
    } else {
        leftPortion = 1;
        rightPortion = portionSize;
    }

    for (let i = 1; i <= amountOfPages; i++) {
        amountOfPages !== 1 && pages.push(i)
    }

    return (
        <div className={classes.navigation_box}>
            {pages
                .filter(pages => pages >= leftPortion && pages <= rightPortion)
                .map(page => <p key={page}
                                onClick={() => store.setCurrentPage(page)}
                                className={page === currentPage ?
                                    `${classes.navigation_box__current_page} ${classes.navigation_box__page}` :
                                    classes.navigation_box__page}>
                    {page}
                </p>)}
        </div>
    );
};

export default observer(EmployeesPageNavigation);