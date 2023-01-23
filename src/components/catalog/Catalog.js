import './Catalog.scss';

const Catalog = ({data, onSelectCatalog, onSelectModal}) => {

    //formation of list elements
    const slideElements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <ViewCatalog 
                key={id}
                {...itemProps}
                onSelectCatalog={(e)=> onSelectCatalog(id, e)}
            />
        )
    })

    //Checking the state of a button
    const showButton = (data.length !== 0) ? <button onClick={(e) => onSelectModal(e)} className='catalog_btn'>shop now</button> : null;

    return (
        <div className="catalog">
            <div className="container">
                {showButton}
                <ul className="catalog_menu">
                    {slideElements}
                </ul>
            </div>
        </div>
    )
}

const ViewCatalog = (props) => {

    const {name, visibleOnPromo, image, onSelectCatalog} = props; 

    //Checking if an element is active
    const classes = visibleOnPromo ? "catalog_menu_item activity" : "catalog_menu_item" ;

    return (
        <li className={classes}>
            <img onClick={onSelectCatalog} src={image} alt={name} />
            <p>{name}</p>
        </li>
    )
}

export default Catalog;