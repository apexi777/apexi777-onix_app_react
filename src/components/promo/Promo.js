
import './Promo.scss';

const Promo = ({activePromo}) => {
    
    //Checking the current element PromoShowing
    const showing = (activePromo.length !== 0) ? <PromoShowing activePromo={activePromo}/> : null;

    return (
        <div className="promo">
            <div className="container">
                <div className="promo_block">
                    <div className="promo_block_header">
                        JUST <br /> DO <br /> IT <br />
                    </div>
                    <div className="promo_block_subheader">
                        Innovated to withstand your toughest matches, this updated design puts flexible, durable materials exactly where they're needed most. 
                    </div>
                </div>
               {showing}
            </div>
        </div>
    )
}

const PromoShowing = ({activePromo}) => {

    return(
        <div className="promo_showing">
            <div className="promo_showing_title">
                <p> NikeCourt Zoom <br /> {activePromo[0].name} </p>
            </div>
        <img className="promo_showing_element" src={activePromo[0].promo} alt="promo_image" />
    </div>
    )
}

export default Promo;