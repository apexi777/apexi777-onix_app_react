import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import HttpService from '../../services/httpService';

// Import components
import Promo from '../../componentsClass/Promo/Promo';
import Sorting from '../../componentsClass/Sorting/Sorting';
import Catalog from '../../componentsClass/Catalog/Catalog';
import Modal from '../../componentsClass/Modal/Modal';

import { 
  PRICE_HIGH_TO_LOW, 
  PRICE_LOW_TO_HIGH,
  PRICE_FEATURED, 
  LABEL_LOW_PRICE,
  LABEL_HIGH_PRICE
} from '../../constans/translates';

import MyContext from '../../context';

class Men extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeModal: false,
      activePromo: {},
      select: null,
      currency: []
    };
  }
 
  componentDidMount() {
    const { data } = this.state;
    const getData = new HttpService();

    getData.getValues('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((result) => {
        this.setState(({ currency: result }));
      })
      .catch((error) => new Error(error));
    
    this.setDataByRequest();

    // Select the active item for Promo component
    this.showPromo(data);
  }

  // Update data in case of input in the search
  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props;
    const { select, data } = this.state;

    // If the value in the search string has changed, the data is validated
    if (prevProps.search !== search) {
      this.searchCards(data, search);
    }

    // If the user has selected a value in the sort menu, the object is validated
    if (prevState.select !== select) {
      let temporaryValue = data.slice(0);
      if (data.length === 0) {
        this.setDataByRequest();
        temporaryValue = data.slice(0);
      }
      temporaryValue = this.onSortDataByPrice(data, select);
      this.setState(({ data: temporaryValue }));
    }

    if (prevState.data !== data) {
      this.showPromo(data);
    }
  }

  setDataByRequest = () => {
    const getData = new HttpService();
    getData.getValues('http://localhost:3001/data', true)
      .then((result) => { this.setState(({ data: result })); });
  };

  // Add new object to data object
  addNewCards = (name, price) => {
    const getData = new HttpService();
    const { data } = this.state;
    if (typeof (name) === 'string' || typeof (price) === 'number') {
      const newCards = {
        image: '',
        name,
        order: data.length + 1,
        visibleOnPromo: false,
        promo: `${`${process.env.PUBLIC_URL}/assets/img/promo/promo_green_shoes.png`}`,
        id: uuidv4(),
        price,
        select: {}
      };
      getData.getValues('http://localhost:3001/data', true, 'POST', JSON.stringify(newCards))
        // eslint-disable-next-line no-console
        .then((res) => console.log(res, 'Отправка успешна'));
      this.setState(({ data: prevData }) => ({
        data: [...prevData, newCards]
      }));
    }
  };

  // Writing a value to state on click in the Select component
  setSelectState = (value) => {
    this.setState(({ select: value }));
    // dispatch(onSetSelect(value)
  };

  // Add/remove from favorites
  toggleFavorite = (id) => {
    const selected = { favorite: true };
    this.setState(({ data }) => ({    
      data: data.map((elem) => {
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
    this.setState(({ data }) => ({
      data: data.map((elem) => ({
        ...elem, 
        visibleOnPromo: elem.id === id
      }))
    }));
  };

  // Remove selected object by id from object data
  deletedCard = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((item) => item.id !== id)
    }));
  };

  // modal state on click
  onSelectModal = (e) => {
    e.preventDefault();
    this.setState(({ activeModal }) => ({ activeModal: !activeModal }));
  };

  // Activation of the selected element in the section
  showPromo = (data) => {
    const temporaryValue = data.find((item) => item.visibleOnPromo);
    this.setState(({ activePromo: temporaryValue }));
  };

  // Sort data object by price and featured
  onSortDataByPrice = (data, text) => {
    switch (text) {
      case PRICE_LOW_TO_HIGH:
        return this.bubbleSort(data, LABEL_LOW_PRICE);
      case PRICE_HIGH_TO_LOW: 
        return this.bubbleSort(data, LABEL_HIGH_PRICE);
      case PRICE_FEATURED: {
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

  bubbleSort = (array, text) => {
    const secondaryArray = array.slice(0);
    let count = 0;
    for (let i = 0; i < array.length; i += 1) {
      for (let a = 0; a < secondaryArray.length - 1; a += 1) {
        if (text === LABEL_LOW_PRICE) {
          if (secondaryArray[a].price > secondaryArray[a + 1].price) {
            const secondaryValue = secondaryArray[a];
            secondaryArray[a] = secondaryArray[a + 1];
            secondaryArray[a + 1] = secondaryValue;
          }
        } else if (secondaryArray[a].price < secondaryArray[a + 1].price) {
          const secondaryValue = secondaryArray[a];
          secondaryArray[a] = secondaryArray[a + 1];
          secondaryArray[a + 1] = secondaryValue;
        }
      }
    }
    return secondaryArray.map((elem) => {
      count += 1;
      return { ...elem, order: count };
    });
  };

  // Sort by search
  searchCards = (array, term) => {
    const { data } = this.state;
    let secondaryData;
    if (term.length === 0) {
      this.setDataByRequest();
      secondaryData = data;
    } else {
      secondaryData = data.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));
    }
    secondaryData = this.showVisible(secondaryData);
    this.setState(({ data: secondaryData })); 
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
    if (inDragBlock !== inDragOverBlock) {
      this.setState(({ data }) => ({
        data: data.map((card) => {
          if (card.id === inDragOverBlock.id) {
            return { ...card, order: inDragBlock.order };
          }
          if (card.id === inDragBlock.id) {
            return { ...card, order: inDragOverBlock.order };
          }
          return card;
        })
      }));
    }
  };
   
  render() {  
    const {
      data, activeModal, activePromo, currency 
    } = this.state;
    return (
      <>  
        <Helmet>
          <meta name="description" content="Nike - Men Page" />
          <title>Nike - Men Page</title>
        </Helmet>
        <MyContext.Provider value={activePromo}>
          <Promo activePromo={activePromo} />
        </MyContext.Provider>
        <Sorting
          setSelectState={this.setSelectState}
        />
        <Catalog 
          updateData={this.updateData}
          onSelectModal={this.onSelectModal} 
          data={data} 
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
