import React, {Dispatch, useContext, useEffect, useState} from 'react';
import classes from './PopupWindow.module.scss';
import {IEmployee} from "../../../types/UsersTypes";
import {Close, Done} from "@mui/icons-material";

interface IAddEmployee {
    setShowPopupWindow: Dispatch<boolean>
    setCloseFirstWindow: Dispatch<boolean>
}

const PopupWindow = ({setShowPopupWindow, setCloseFirstWindow}: IAddEmployee) => {

    const handleClick = (answer: boolean) => {
        setShowPopupWindow(false);
        setCloseFirstWindow(answer);
    }

    return (
        <div className={classes.popup_container}>
            <div onClick={() => handleClick(false)} className={classes.popup_container__bg}/>
            <div className={classes.popup_box}>
                <div className={classes.popup_box__text}>The first window will be closed. Continue?</div>
                <div className={classes.popup_box__buttons}>
                    <button onClick={() => handleClick(true)}
                            className={`${classes.popup_box__button} ${classes.popup_box__yes}`}>Yes {<Done/>}</button>
                    <button onClick={() => handleClick(false)}
                            className={`${classes.popup_box__button} ${classes.popup_box__no}`}>No {<Close/>}</button>
                </div>
            </div>
        </div>
    );
};

export default PopupWindow;
