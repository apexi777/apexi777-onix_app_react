
const SliderElement = (props) => {

    const {name, price, visibleOnPromo, image, select, onSelectCatalog, toggleFavorite, deletedCard} = props; 

    //Checking if an element is active
    const classes = visibleOnPromo ? "slider_menu_item activity" : "slider_menu_item" ;
    const chosen = (JSON.stringify(select) !== '{}' ) ? "slider_menu_item_favorite select" : "slider_menu_item_favorite";
    return (
      <div className="slider_block">
        <div onClick={onSelectCatalog}  className={classes}>
            <img src={image} alt={name} />
            
        </div>
        <div onClick={toggleFavorite} className={chosen}></div>
        <div onClick={deletedCard} className="slider_menu_item_deleted"></div>
        <p className="slider_menu_name">{name}</p>
        <div className="slider_menu_price">Price : {price}</div>
      </div>
    )
}

export default SliderElement;