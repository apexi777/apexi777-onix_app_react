import { Component } from "react";
import { Helmet } from "react-helmet";
import ReactSlick from "../reactSlick/ReactSlick";

import Promo from '../promo/Promo';
import Modal from "../modal/Modal";


class MenPage extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data,
            activeModal : false,
        }
    }

    //Changing the state on the selection of a catalog item
    onSelectCatalog = (id) => {
        // e.preventDefault();       
        this.setState(({data}) => ({
            data : data.map((elem) => {
                if (elem.id === id && !elem.visibleOnPromo) {
                    return {...elem, visibleOnPromo : true}
                } else if (elem.id !== id && elem.visibleOnPromo){
                    return {...elem, visibleOnPromo : false}
                }
                return elem
            })
        }))
    }

    //modal state on click
    onSelectModal = (e) => {
        e.preventDefault();
        this.setState(({activeModal}) => ({activeModal : !activeModal}))
    }

    //Activation of the selected element in the section
    showPromo = (data) => {
        return data.filter(item => { return item.visibleOnPromo })
    }
   
    render () {   
        const { data, activeModal } = this.state;
        const { search, searchCards } = this.props;

        //Updated Data and selecting the active item
        const visibleData = searchCards(data, search);
        const activePromo = this.showPromo(visibleData);
        
        //Checking the current element Modal
        const modal = activeModal ? <Modal onSelectModal={this.onSelectModal} activePromo={activePromo} /> : null    

        return (
            <>  
                <Helmet>
                    <meta name="description" content="Nike - Men Page" />
                    <title>Nike - Men Page</title>
                </Helmet>
                <Promo 
                    activePromo={activePromo}/>
                <ReactSlick 
                    onSelectModal={this.onSelectModal} 
                    data={visibleData} 
                    onSelectCatalog={this.onSelectCatalog}/>  
                {modal}
            </>
        )
    }
}

export default MenPage;