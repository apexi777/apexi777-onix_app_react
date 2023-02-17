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
            price : 75},
        {image : shoes_2,
            id : 2,
            name : 'Pro Hard Court',
            visibleOnPromo : false,
            promo : promo_shoes_2,
            price : 82},
        {image : shoes_3,
            id : 3,
            name : 'Vapor Cage 4 Rafa',
            visibleOnPromo : true,
            promo : promo_shoes_3,
            price : 60},
            //Temporary data
        {image : shoes_1,
            id : 4,
            name : 'Only Hard pro',
            visibleOnPromo : false,
            promo : promo_shoes_1,
            price : 75},
        {image : shoes_2,
            id : 5,
            name : 'Super Court',
            visibleOnPromo : false,
            promo : promo_shoes_2,
            price : 82},
        {image : shoes_3,
            id : 6,
            name : 'Brain',
            visibleOnPromo : false,
            promo : promo_shoes_3,
            price : 60}
    ];

    //Return data object
    getData = () => {
        return this.data;
    }

    //Returns a data object with one active element
    showVisible = (data) => {
        let count = 0;
        data.forEach((element) => {
             if (element.visibleOnPromo) count=+1;
        })
        if ( count === 0 || count > 1) {
            return data.map((element, index) => {
                return index === 0 ? {...element, visibleOnPromo : true} : {...element, visibleOnPromo : false};
            })
        }
        else if (count === 1) return data;
    }

    //Sort by search
    searchCards = (items, term) => {
        if (term.length === 0){
            return items;
        } else {

            const secondaryData = items.filter(item => {
                return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            })

            return this.showVisible(secondaryData);
        }
    } 


}

export default NikeServices;