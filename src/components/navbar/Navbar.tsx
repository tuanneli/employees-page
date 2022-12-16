import React, {useState} from 'react';
import './Navbar.module.scss';
import {observer} from "mobx-react-lite";
import classes from './Navbar.module.scss';

const Navbar = observer(() => {

    const [isActive, setIsActive] = useState('explore');
    const [showAddAServer, setShowAddAServer] = useState(false);
    const [showDownloads, setShowDownloads] = useState(false);

    // const {userStore, todoStore} = useContext(Context);

    // const handleClick = (info: string) => {
    // setIsActive(info);
    // if (info === 'download') {
    //     setShowDownloads(true)
    // } else if (info === 'add') {
    //     setShowAddAServer(true)
    // }
    // }

    const openPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    console.log('render')

    return (
        <nav className={classes.navbar}>
            <div className={classes.box}>
                <div className={classes.box__logo}>
                    LOGO
                </div>
                <div className={`${classes.box__pages} ${classes.page}`}>
                    {openPages.map((page) => {
                        return <div key={page} className={`${classes.page__title} ${classes.title}`}>
                            <div className={`${classes.title__text}`}>Список сотрудников</div>
                            <button className={`${classes.title__close}`}>x</button>
                        </div>
                    })}
                </div>
            </div>
        </nav>
    );
});

export default Navbar;