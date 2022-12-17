import React, {useContext, useState} from 'react';
import './Navbar.module.scss';
import {observer} from "mobx-react-lite";
import classes from './Navbar.module.scss';
import {Context} from "../../index";

const Navbar = observer(() => {

    const [isActive, setIsActive] = useState('explore');
    const [showAddAServer, setShowAddAServer] = useState(false);
    const [showDownloads, setShowDownloads] = useState(false);

    const {employeeStore} = useContext(Context);

    return (
        <nav className={classes.navbar}>
            <div className={classes.box}>
                <div className={classes.box__logo}>
                    LOGO
                </div>
                <div className={`${classes.box__pages} ${classes.page}`}>
                    {employeeStore._openPages.map((page) => {
                        return <div key={page} className={`${classes.page__title} ${classes.title}`}>
                            <div className={`${classes.title__text}`}>Список сотрудников</div>
                            <button onClick={() => employeeStore.deleteOpenPage(page)}
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