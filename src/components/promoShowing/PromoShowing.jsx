

const PromoShowing = ({activePromo}) => {

    return(
        <div className="promo_showing">
            <div className="promo_showing_title">
                <p> NikeCourt Zoom <br /> {activePromo.name} </p>
            </div>
        <img className="promo_showing_element" src={activePromo.promo} alt="promo_image" />
    </div>
    )
}

export default PromoShowing;