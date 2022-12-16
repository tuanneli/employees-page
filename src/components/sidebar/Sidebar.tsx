import React, {useState} from 'react';
import './Sidebar.module.scss';
import {observer} from "mobx-react-lite";
import classes from './Sidebar.module.scss';

const Sidebar = observer(() => {

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
        <nav className={classes.sidebar}>
            <div className={classes.box}>
                sidebar
            </div>
        </nav>
    );
});

export default Sidebar;