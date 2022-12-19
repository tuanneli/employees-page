import React, {useContext} from 'react';
import './Navbar.module.scss';
import {observer} from "mobx-react-lite";
import classes from './Navbar.module.scss';
import {Context} from "../../index";

const Navbar = observer(() => {

    const {employeeStore} = useContext(Context);

    return (
        <nav className={classes.navbar}>
            <div className={classes.box}>
                <div className={classes.box__logo}>
                    LOGO
                </div>
                <div className={`${classes.box__pages} ${classes.page}`}>
                    {employeeStore._openPages.map((page) => {
                        return <div key={page.id}
                                    onClick={() => employeeStore.setCurrentOpenPageId(page.id)}
                                    className={`${classes.page__title} 
                                    ${classes.title} 
                                    ${employeeStore.currentOpenPageId === page.id && classes.title_active}`}>
                            <div className={`${classes.title__text}`}>Список сотрудников</div>
                            <button onClick={() => employeeStore.deleteOpenPage(page.id)}
                                    className={`${classes.title__close}`}>x
                            </button>
                        </div>
                    })}
                </div>
            </div>
        </nav>
    );
});

export default Navbar;