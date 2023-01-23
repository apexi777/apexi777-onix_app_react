import { useState } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import './Header.scss';
import logo from '../../resources/icons/logo.png';
import buy from "../../resources/icons/buy-icon.png";
import search from "../../resources/icons/search-icon.png";

const Header = (props) => {

    const [menuItems] = useState([
        { name : 'Men', action : true, id : 101},
        { name : 'Women', action : false, id : 102},
        { name : 'Kids', action : false, id : 103},
        { name : 'Customise', action : false, id : 104}
    ]);

    //Intermediate values ​​of search data
    const [terminate, setTerminate] = useState('');

    //Sending the search data to the parent component
    const onUpdateSearch = (e) => {
        const value = e.target.value.replace(/[^A-Za-z0-9]/, '');
        setTerminate(value)
        props.onUpdateSearch(value);
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
                    <ul className="menu">
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

//Navigation menu component
const NavElement = ({name}) => {

    const path = ((name === "Men") ? "/" : name).toLowerCase();

    return (
        <li >
            <NavLink 
                className={({ isActive }) => "menu_item" + (isActive ? " active_item" : "")}
                end 
                to={path}>
            {name}
            </NavLink>
            
        </li>
    )
}

export default Header;