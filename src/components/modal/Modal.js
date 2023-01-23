import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './Modal.scss';

const Modal = ({activePromo, onSelectModal}) => {

    const [count, setCount] = useState(1);
    const [price, setPrice] = useState(1);

    useEffect(() => {
        function update(count) {
            if (count <= 0) setPrice(price => price = 0);
            else setPrice(price => price = count * activePromo[0].price);
        }
        update(count);
    });

    const addCount = (e) => {
        const attribute = e.target.getAttribute("data");
        if (attribute === 'data-rm') {
            if (count === 1) return;
            else setCount(count-1);
        }
        else if (attribute === 'data-add') setCount(count+1)
    }

    return (
        <div className="modal">
                <Helmet>
                    <meta name="description" content="Nike - price" />
                    <title>Nike - price</title>
                </Helmet>
            <img src={activePromo[0].image} alt="images" className="modal_image" />
            <div className="modal_info">
                <p className="modal_info_title">{activePromo[0].name}</p>
                <div className="modal_info_block">
                <button data="data-rm" onClick={(e) => addCount(e)} className='modal_info_btn'>-</button>
                <button data="data-add" onClick={(e) => addCount(e)} className='modal_info_btn'>+</button>
                <div className="modal_info_count">{count}</div>
                </div>
               
            </div>
            <div onClick={(e) => onSelectModal(e)} className="modal_close">x</div>
            
            <div className="modal_price">
                <div className="modal_price_sum">total : {price}$</div>
                <button className="modal_price_button">add to bag</button>
            </div>
        </div>
    )
}

export default Modal;