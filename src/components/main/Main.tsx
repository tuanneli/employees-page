import React, {useState} from 'react';
import './Main.module.scss';
import {observer} from "mobx-react-lite";
import classes from './Main.module.scss';

const Main = observer(() => {

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

    return (
        <nav className={classes.main}>
            <div className={classes.box}>
                main
            </div>
        </nav>
    );
});

export default Main;