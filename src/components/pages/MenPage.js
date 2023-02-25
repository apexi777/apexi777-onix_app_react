import { Component } from "react";
import { Helmet } from "react-helmet";
import { v4 as uuidv4 } from 'uuid';

import SelectMenu from "../selectMenu/SelectMenu";
import SliderMenu from "../sliderMenu/SliderMenu";

import Promo from '../promo/Promo';
import Modal from "../modal/Modal";


import shoes_3 from '../../assets/img/vapor-cage-4-rafa.png';
import promo_shoes_3 from '../../assets/img/promo/promo_green_shoes.png';

class MenPage extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data,
            activeModal : false,
            select : null
        }
        this.visibleData = this.state.data;
    }

    //Writing a value to state on click in the SelectMenu component
    setSelectState = (value) => {
        this.setState(({select}) => ({select : value}))
    }
    
    //Changing the state on the selection of a catalog item
    onSelectCatalog = (id) => {
        this.setState(({data}) => ({
            data : data.map((elem) => ({
               ...elem, 
               visibleOnPromo : elem.id === id
             }))
        }))
    }

    //Add/remove from favorites
    toggleFavorite = (id) => {
        const selected = {favorite : true};
        this.setState(({data}) => ({    
            data : data.map((elem) => {
                if (elem.id === id) {
                    if (JSON.stringify(elem.select) === '{}') {
                        return {...elem, ...{select : selected}}
                    } else {
                        return {...delete elem.select.favorite, ...elem };
                    }
                } else {
                    return elem;
                }
            })
        }))
    }

    //Remove selected object by id from object data
    deletedCard = (id) => {
        this.setState(({data}) => ({
            data : data.filter(item => item.id !== id)
        }));
    }

    //modal state on click
    onSelectModal = (e) => {
        e.preventDefault();
        this.setState(({activeModal}) => ({activeModal : !activeModal}))
    }

    //Activation of the selected element in the section
    showPromo = (data) => {
        return data.find(item => { return item.visibleOnPromo })
    }

    //Add new object to data object
    addNewCards = (name, price) => {
        if ( typeof(name) === "string" || typeof(price) === "number") {
            const newCards = {
                image : shoes_3,
                name,
                visibleOnPromo : false,
                promo : promo_shoes_3,
                id : uuidv4(),
                price,
                select : {}
            }
            this.setState(({data}) => {
                const newArr = [...data, newCards];
                return {
                  data : newArr
                }
              })
        }
    };

    // componentDidUpdate(prevProps) {
    //     if (this.props.search !== prevProps.search) {
    //         this.visibleData = this.props.searchCards(this.state.data, this.props.search);
    //       } else if (this.state.select !== prevProps.select) {
    //         this.visibleData = this.props.onSortDataByPrice(this.visibleData, this.state.select)
    //       }
    // }
   
    render () {  
        const { data, activeModal, select } = this.state;
        const { search, searchCards, onSortDataByPrice} = this.props;

        //Update data in case of input in the search
        this.visibleData = searchCards(data, search);
        
        this.visibleData = onSortDataByPrice(this.visibleData, select);

        //Select the active item for Promo component
        const activePromo = this.showPromo(this.visibleData);
        
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
                <SelectMenu
                    data={this.visibleData}
                    setSelectState={this.setSelectState}
                    onSortDataByPrice={this.props.onSortDataByPrice}
                />
                <SliderMenu 
                    onSelectModal={this.onSelectModal} 
                    data={this.visibleData} 
                    onSelectCatalog={this.onSelectCatalog}
                    deletedCard={this.deletedCard}
                    toggleFavorite={this.toggleFavorite}
                    addNewCards={this.addNewCards}
                    />  
                {modal}
            </>
        )
    }
}

export default MenPage;