import { NavLink } from "react-router-dom";

//Navigation menu component from header
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

export default NavElement;