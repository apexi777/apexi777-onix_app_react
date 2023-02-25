import PromoShowing from '../promoShowing/PromoShowing';
import './Promo.scss';

const Promo = ({activePromo}) => {
      
    //Checking the current element PromoShowing
    const showing = (activePromo) ? <PromoShowing activePromo={activePromo}/> : null;

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

export default Promo;