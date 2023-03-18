import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import BankService from '../../services/BankService';

// Import components
import Promo from '../../components/Promo/Promo';
import Sorting from '../../components/Sorting/Sorting';
import Catalog from '../../components/Catalog/Catalog';
import Modal from '../../components/Modal/Modal';

// Import content by data object
import shoes1 from '../../assets/img/rafa-hard-court.png';
import shoes2 from '../../assets/img/pro-hard-court.png';
import shoes3 from '../../assets/img/vapor-cage-4-rafa.png';
import promoShoes1 from '../../assets/img/promo/promo_green_shoes_3.png';
import promoShoes2 from '../../assets/img/promo/promo_green_shoes_2.png';
import promoShoes3 from '../../assets/img/promo/promo_green_shoes.png';

class Men extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          image: shoes1,
          id: '1',
          order: 1,
          name: 'Rafa Hard Court',
          visibleOnPromo: false,
          promo: promoShoes1,
          price: 75,
          select: {} 
        },
        {
          image: shoes2,
          id: '2',
          order: 2,
          name: 'Pro Hard Court',
          visibleOnPromo: false,
          promo: promoShoes2,
          price: 82,
          select: {} 
        },
        {
          image: shoes3,
          id: '3',
          order: 3,
          name: 'Vapor Cage 4 Rafa',
          visibleOnPromo: true,
          promo: promoShoes3,
          price: 60,
          select: {} 
        },
        // Temporary data
        {
          image: shoes1,
          id: '4',
          order: 4,
          name: 'Only Hard pro',
          visibleOnPromo: false,
          promo: promoShoes1,
          price: 39,
          select: {} 
        },
        {
          image: shoes2,
          id: '5',
          order: 5,
          name: 'Super Court',
          visibleOnPromo: false,
          promo: promoShoes2,
          price: 100,
          select: {} 
        },
        {
          image: shoes3,
          id: '6',
          order: 6,
          name: 'Brain',
          visibleOnPromo: false,
          promo: promoShoes3,
          price: 70,
          select: {} 
        }
      ],
      activeModal: false,
      activePromo: {},
      select: null,
      showData: [],
      currency: []
    };
  }
 
  componentDidMount() {
    const { data } = this.state;
    const getData = new BankService();

    // Initializing the initial value of the data to be viewed
    this.setState(({ showData: data }));

    getData.getValues()
      .then((result) => {
        this.setState(({ currency: result }));
      })
      .catch('error');

    // Select the active item for Promo component
    this.showPromo(data);
  }

  // Update data in case of input in the search
  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props;
    const { select, showData, data } = this.state;

    // If the value in the search string has changed, the data is validated
    if (prevProps.search !== search) {
      this.searchCards(showData, search);
    }

    // If the user has selected a value in the sort menu, the object is validated
    if (prevState.select !== select) {
      let temporaryValue = showData.slice(0);
      if (showData.length === 0) {
        temporaryValue = data.slice(0);
      }
      temporaryValue = this.onSortDataByPrice(temporaryValue, select);
      this.setState(({ showData: temporaryValue }));
    }

    if (prevState.showData !== showData) {
      this.showPromo(showData);
    }
  }

  // Add new object to data object
  addNewCards = (name, price) => {
    const { showData } = this.state;
    if (typeof (name) === 'string' || typeof (price) === 'number') {
      const newCards = {
        image: shoes3,
        name,
        order: showData.length + 1,
        visibleOnPromo: false,
        promo: promoShoes3,
        id: uuidv4(),
        price,
        select: {}
      };
      // eslint-disable-next-line no-shadow
      this.setState(({ showData }) => {
        const newArr = [...showData, newCards];
        return {
          showData: newArr
        };
      });
    }
  };

  // Writing a value to state on click in the Select component
  setSelectState = (value) => {
    this.setState(({ select: value }));
  };

  // Add/remove from favorites
  toggleFavorite = (id) => {
    const selected = { favorite: true };
    this.setState(({ showData }) => ({    
      showData: showData.map((elem) => {
        if (elem.id === id) {
          if (!elem.select.favorite) {
            return { ...elem, ...{ select: selected } };
          } 
          return { ...elem, ...{ select: {} } };
        } 
        return elem;
      })
    }));
  };

  // Changing the state on the selection of a catalog item
  onSelectCatalog = (id) => {
    this.setState(({ showData }) => ({
      showData: showData.map((elem) => ({
        ...elem, 
        visibleOnPromo: elem.id === id
      }))
    }));
  };

  // Remove selected object by id from object data
  deletedCard = (id) => {
    this.setState(({ showData }) => ({
      showData: showData.filter((item) => item.id !== id)
    }));
  };

  // modal state on click
  onSelectModal = (e) => {
    e.preventDefault();
    this.setState(({ activeModal }) => ({ activeModal: !activeModal }));
  };

  // Activation of the selected element in the section
  showPromo = (data) => {
    const temporaryValue = data.find((item) => { return item.visibleOnPromo; });
    this.setState(({ activePromo: temporaryValue }));
  };

  // Sort data object by price and featured
  onSortDataByPrice = (data, text) => {
    switch (text) {
      case 'Price: Low-High':
        return this.bubbleSort(data, 'low');
      case 'Price: High-Low': 
        return this.bubbleSort(data, 'high');
      case 'Featured': {
        let secondaryData = [];
        const count = data.reduce((result, value) => result + (JSON.stringify(value.select) !== '{}'), 0);
        if (count !== 0) {
          secondaryData = data.filter((value) => value.select.favorite);
        } else {
          return secondaryData;
        }
        return this.showVisible(secondaryData);
      }    
      default:
        return data;
    }
  };

  // Sort array by price value from lowest to highest
  bubbleSort = (array, text) => {
    const secondaryArray = array.slice(0);
    for (let i = 0; i < array.length; i += 1) {
      for (let a = 0; a < secondaryArray.length - 1; a += 1) {
        if (text === 'low') {
          if (secondaryArray[a].price > secondaryArray[a + 1].price) {
            const secondaryValue = secondaryArray[a].price;
            secondaryArray[a].price = secondaryArray[a + 1].price;
            secondaryArray[a + 1].price = secondaryValue;
          }
        } else if (secondaryArray[a].price < secondaryArray[a + 1].price) {
          const secondaryValue = secondaryArray[a].price;
          secondaryArray[a].price = secondaryArray[a + 1].price;
          secondaryArray[a + 1].price = secondaryValue;
        }
      }
    }
    return secondaryArray;
  };

  // Sort by search
  searchCards = (array, term) => {
    const { data } = this.state;
    let secondaryData;
    if (term.length === 0) {
      secondaryData = data;
    } else {
      secondaryData = array.filter((item) => {
        return item.name.toLowerCase().includes(term.toLowerCase());
      });
    }
    secondaryData = this.showVisible(secondaryData);
    this.setState(({ showData: secondaryData })); 
  }; 
  
  // Returns a data object with one active element
  showVisible = (data) => {
    const count = data.reduce((result, value) => result + value.visibleOnPromo, 0);
    if (count === 0 || count > 1) {
      return data.map((element, index) => {
        return index === 0 ? { ...element, visibleOnPromo: true } : { ...element, visibleOnPromo: false };
      });
    }
    return data; 
  };

  updateData = (inDragBlock, inDragOverBlock) => {
    this.setState(({ showData }) => ({
      showData: showData.map((card) => {
        if (card.id === inDragOverBlock.id) {
          return { ...card, order: inDragBlock.order };
        }
        if (card.id === inDragBlock.id) {
          return { ...card, order: inDragOverBlock.order };
        }
        return card;
      })
    }));
  };
   
  render() {  
    const {
      showData, activeModal, activePromo, currency 
    } = this.state;
    return (
      <>  
        <Helmet>
          <meta name="description" content="Nike - Men Page" />
          <title>Nike - Men Page</title>
        </Helmet>
        <Promo 
          activePromo={activePromo}
        />
        <Sorting
          setSelectState={this.setSelectState}
        />
        <Catalog 
          updateData={this.updateData}
          onSelectModal={this.onSelectModal} 
          data={showData} 
          onSelectCatalog={this.onSelectCatalog}
          deletedCard={this.deletedCard}
          toggleFavorite={this.toggleFavorite}
          addNewCards={this.addNewCards}
        />  
        {activeModal 
          ? (
            <Modal 
              onSelectModal={this.onSelectModal} 
              activePromo={activePromo}
              currency={currency}
            />
          ) 
          : null}
      </>
    );
  }
}

Men.propTypes = {
  search: PropTypes.string.isRequired,

};

export default Men;
