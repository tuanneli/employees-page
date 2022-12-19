import React, {Dispatch, useState} from 'react';
import {MoreVert} from "@mui/icons-material";
import classes from './SortingColumns.module.scss';
import PageStateStore from "../../../store/PageStateStore";

interface ISortingColumns {
    setToggle: Dispatch<boolean>
    toggle: boolean
    store: typeof PageStateStore.prototype
}

const SortingColumns = ({setToggle, toggle, store}: ISortingColumns) => {

    const [showSortingColumn, setShowSortingColumn] = useState(false);
    const [currentItem, setCurrentItem] = useState<null | { id: number, name: string }>(null)

    const handleToggle = (e: any, item: { id: number, name: string }) => {
        if (e.target.checked) {
            store.setCategoriesToShow([...store.categoriesToShow, item]);
        } else {
            store.setCategoriesToShow(store.categoriesToShow.filter(category => category.name !== item.name));
        }
        setToggle(!toggle);
    }

    function dragOverHandler(e: any) {
        e.preventDefault()
        e.target.style.boxShadow = '0 4px 3px gray'
    }

    function dragLeaveHandler(e: any) {
        e.target.style.boxShadow = 'none'
    }

    function dragStartHandler(e: any, item: { id: number, name: string }) {
        setCurrentItem(item);
    }

    function dragEndHandler(e: any) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e: any, category: { id: number, name: string }) {
        e.target.style.boxShadow = 'none'
        e.preventDefault()
        store.setCategoriesToShowInfo(store.categoriesToShowInfo.map(c => {
            if (category.id === c.id) {
                return {...c, id: currentItem?.id!}
            }
            if (currentItem?.id === c.id) {
                return {...c, id: category.id}
            }
            return c;
        }));
        setToggle(!toggle);
    }

    return (
        <div className={classes.navbar}>
            <MoreVert
                onClick={() => setShowSortingColumn(prev => !prev)}
                className={classes.navbar__icon}/>
            {showSortingColumn &&
                <div className={`${classes.navbar__menu} ${classes.menu}`}>
                    {store.categoriesToShowInfo.map(category => {
                        return <div onDragOver={(e) => dragOverHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragStart={(e) => dragStartHandler(e, category)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    onDrop={(e) => dropHandler(e, category)}
                                    draggable={true}
                                    key={category.id}
                                    className={classes.menu__row}>
                            <input onClick={(e) => handleToggle(e,
                                store.categoriesToShowInfo.find(item => item.name === category.name)!
                            )}
                                   defaultChecked
                                   className={`${classes.menu__checkbox} ${classes.menu__item}`}
                                   type="checkbox"/>
                            <div
                                className={`${classes.menu__text} ${classes.menu__item}`}>{category.name.toUpperCase()}</div>
                        </div>
                    })}
                </div>}
        </div>
    );
};

export default SortingColumns;