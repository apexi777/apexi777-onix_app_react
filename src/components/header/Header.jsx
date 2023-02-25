import { useState } from 'react';
import { Outlet } from "react-router-dom";
import NavElement from '../navElement/NavElement';
import './Header.scss';
import logo from '../../assets/icons/logo.png';
import buy from "../../assets/icons/buy-icon.png";
import search from "../../assets/icons/search-icon.png";

const Header = (props) => {

    const [menuItems] = useState([
        { name : 'Men', action : true, id : 101},
        { name : 'Women', action : false, id : 102},
        { name : 'Kids', action : false, id : 103},
        { name : 'Customise', action : false, id : 104}
    ]);

    const [classMenu, setClassMenu] = useState('menu');

    //Intermediate values ​​of search data
    const [terminate, setTerminate] = useState('');

    //Sending the search data to the parent component
    const onUpdateSearch = (e) => {
        const value = e.target.value.replace(/[^A-Za-z0-9]/, '');
        setTerminate(value)
        props.onUpdateSearch(value);
    }


    const onShowNavMenu = () => {
        if (classMenu === "menu") setClassMenu('menu acivity')
        else setClassMenu('menu')
    }

    //Forming navigation menu elements
    const menu_element = menuItems.map(element => {
        const {name, id} = element;
        return(
            <NavElement 
                key={id}
                name={name}
            />
        )
    });

    return (
        <header className="header">
            <div className="container">
                <div className="header__logo">
                    <p className="header__logo_title">
                        nike
                    </p>
                    <img className="header__logo_icon" src={logo} alt="logo" />
                </div>
                <nav className="header__nav">
                    <div onClick={onShowNavMenu} className="header__nav_btn"></div>
                    <ul className={classMenu}>
                        {menu_element}
                        <form className="menu_search" action="#">
                            <input onChange={onUpdateSearch} value={terminate} placeholder="Search" type="text" className="menu_search_input" />
                            <input onClick={(e) => {e.preventDefault()}} className="menu_search_submit" type="image" alt="submit" src={search} />
                        </form>
                        <div className="menu_buy">
                            <a onClick={(e) => {e.preventDefault()}} href="#top">
                                <img src={buy} alt="buy_icon" />
                            </a>
                        </div>
                    </ul>
                </nav>
            </div>

            <Outlet/>
        </header>
    )
}

export default Header;