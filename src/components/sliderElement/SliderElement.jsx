

const SliderElement = (props) => {

    const {name, visibleOnPromo, image, onSelectCatalog} = props; 

    //Checking if an element is active
    const classes = visibleOnPromo ? "slider_menu_item activity" : "slider_menu_item" ;

    return (
      <>
        <div onClick={onSelectCatalog}  className={classes}>
            <img src={image} alt={name} />
        </div>
        <p className="slider_menu_name">{name}</p>
      </>
    )
}

export default SliderElement;