import React, {Dispatch, useContext, useEffect, useState} from 'react';
import {MoreVert} from "@mui/icons-material";
import classes from './SortingColumns.module.scss';
import {Context} from "../../../index";

interface ISortingColumns {
    setToggle: Dispatch<boolean>
    toggle: boolean
}

const SortingColumns = ({setToggle, toggle}: ISortingColumns) => {

    const {employeeStore} = useContext(Context);
    const [showSortingColumn, setShowSortingColumn] = useState(false);

    const handleToggle = (e: any, item: string) => {
        if (e.target.checked) {
            employeeStore.setCategoriesToShow([...employeeStore.categoriesToShow, item]);
        } else {
            employeeStore.setCategoriesToShow(employeeStore.categoriesToShow.filter(category => category !== item));
        }
        setToggle(!toggle);
    }


    return (
        <div className={classes.navbar}>
            <MoreVert
                onClick={() => setShowSortingColumn(prev => !prev)}
                className={classes.navbar__icon}/>
            {showSortingColumn &&
                <div className={`${classes.navbar__menu} ${classes.menu}`}>
                    <div className={classes.menu__row}>
                        <input onClick={(e) => handleToggle(e, "id")}
                               defaultChecked
                               className={`${classes.menu__checkbox} ${classes.menu__item}`}
                               type="checkbox"/>
                        <div className={`${classes.menu__text} ${classes.menu__item}`}>ID</div>
                    </div>
                    <div className={classes.menu__row}>
                        <input onClick={(e) => handleToggle(e, "name")}
                               defaultChecked
                               className={`${classes.menu__checkbox} ${classes.menu__item}`}
                               type="checkbox"/>
                        <div className={`${classes.menu__text} ${classes.menu__item}`}>NAME</div>
                    </div>
                    <div className={classes.menu__row}>
                        <input onClick={(e) => handleToggle(e, "sex")}
                               defaultChecked
                               className={`${classes.menu__checkbox} ${classes.menu__item}`}
                               type="checkbox"/>
                        <div className={`${classes.menu__text} ${classes.menu__item}`}>SEX</div>
                    </div>
                    <div className={classes.menu__row}>
                        <input onClick={(e) => handleToggle(e, "job")}
                               defaultChecked
                               className={`${classes.menu__checkbox} ${classes.menu__item}`}
                               type="checkbox"/>
                        <div className={`${classes.menu__text} ${classes.menu__item}`}>JOB</div>
                    </div>
                    <div className={classes.menu__row}>
                        <input onClick={(e) => handleToggle(e, "birthday")}
                               defaultChecked
                               className={`${classes.menu__checkbox} ${classes.menu__item}`}
                               type="checkbox"/>
                        <div className={`${classes.menu__text} ${classes.menu__item}`}>BIRTHDAY</div>
                    </div>
                </div>}
        </div>
    );
};

export default SortingColumns;