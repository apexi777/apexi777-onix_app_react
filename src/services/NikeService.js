import shoes_1 from '../assets/img/rafa-hard-court.png';
import shoes_2 from '../assets/img/pro-hard-court.png';
import shoes_3 from '../assets/img/vapor-cage-4-rafa.png';

import promo_shoes_1 from '../assets/img/promo/promo_green_shoes_3.png';
import promo_shoes_2 from '../assets/img/promo/promo_green_shoes_2.png';
import promo_shoes_3 from '../assets/img/promo/promo_green_shoes.png';

class NikeServices {
    data = [
        {image : shoes_1,
            id : 1,
            name : 'Rafa Hard Court',
            visibleOnPromo : false,
            promo : promo_shoes_1,
            price : 75,
            select : {}},
        {image : shoes_2,
            id : 2,
            name : 'Pro Hard Court',
            visibleOnPromo : false,
            promo : promo_shoes_2,
            price : 82,
            select : {}},
        {image : shoes_3,
            id : 3,
            name : 'Vapor Cage 4 Rafa',
            visibleOnPromo : true,
            promo : promo_shoes_3,
            price : 60,
            select : {}},
            //Temporary data
        {image : shoes_1,
            id : 4,
            name : 'Only Hard pro',
            visibleOnPromo : false,
            promo : promo_shoes_1,
            price : 39,
            select : {}},
        {image : shoes_2,
            id : 5,
            name : 'Super Court',
            visibleOnPromo : false,
            promo : promo_shoes_2,
            price : 100,
            select : {}},
        {image : shoes_3,
            id : 6,
            name : 'Brain',
            visibleOnPromo : false,
            promo : promo_shoes_3,
            price : 70,
            select : {}}
    ];

    //Getting data object
    getData = () => {
        return this.data;
    }

    //Returns a data object with one active element
    showVisible = (data) => {
        const count = data.reduce((result, value) => result + value.visibleOnPromo, 0);
        if ( count === 0 || count > 1) {
            return data.map((element, index) => {
                return index === 0 ? {...element, visibleOnPromo : true} : {...element, visibleOnPromo : false};
            })
        }
        else if (count === 1) return data;
    }

    //Sort by search
    searchCards = (data, term) => {
        let secondaryData;
        if (term.length === 0){
            secondaryData = data;
        } else {
            secondaryData = data.filter(item => {
                return item.name.toLowerCase().includes(term.toLowerCase());
            })
        }
        return this.showVisible(secondaryData);
    } 

    //Sort data object by price and featured
    onSortDataByPrice = (data, text) => {
        switch (text) {
            case 'Price: Low-High':
                // return data.sort(function (prev, next) {
                //     if (prev.price > next.price) {
                //       return 1;
                //     }
                //     if (prev.price < next.price) {
                //       return -1;
                //     }
                //     return 0;
                // });
                return this.bubbleSort(data);
            case 'Price: High-Low': 
                return data.sort(function (prev, next) {
                    if (prev.price < next.price) {
                    return 1;
                    }
                    if (prev.price < next.price) {
                    return -1;
                    }
                    return 0;
                });
                case 'Featured':
                    let secondaryData;
                    const count = data.reduce((result, value) => result + (JSON.stringify(value.select) !== '{}'), 0);
                    if (count !== 0) {
                        secondaryData = data.filter(value => value.select.favorite);
                    } else {
                        secondaryData = [];
                    }
                    return this.showVisible(secondaryData);
            default:
                return data
        }
    }
    
   //Remove selected object by id from object data
    deletedCard = (data, id) => {
        let secondaryData;
        if (id) {
            secondaryData = data.filter(item => item.id !== id)
        } else {
            return data;
        }
        return this.showVisible(secondaryData);
    }

    //Sort array by price value from lowest to highest
    bubbleSort = (array) => {
        for (let i = 0; i < array.length; i++) {
            for (let a = 0; a < array.length-1; a++) {
                if (array[a].price > array[a + 1].price) {
                    let secondaryValue = array[a].price;
                    array[a].price = array[a + 1].price;
                    array[a + 1].price = secondaryValue;
                }
            }
        }
        return array;
    }
    
}


export default NikeServices;