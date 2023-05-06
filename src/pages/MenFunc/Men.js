import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useHttp } from '../../hooks/httpHook';

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

function Men({ searchValue }) {
  const [data, setData] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [activePromo, setActivePromo] = useState({});
  const [currency, setCurrency] = useState([]);
  const [select, setSelect] = useState(null);

  const { request } = useHttp();

  const setDataByRequest = () => {
    request('http://localhost:3001/data', true)
      .then((result) => setData(result));
  };

  const setSelectState = useCallback((value) => {
    setSelect(value);
  }, [select]);

  // Add new object to data object
  const addNewCards = useCallback((name, price) => {
    if (typeof (name) === 'string' && typeof (price) === 'number') {
      const newCards = {
        image: '',
        name,
        order: data.length + 1,
        visibleOnPromo: false,
        promo: `${process.env.PUBLIC_URL}/assets/img/promo/promo_green_shoes.png`,
        id: uuidv4(),
        price,
        select: {}
      };
      request('http://localhost:3001/data', true, 'POST', JSON.stringify(newCards))
        // eslint-disable-next-line no-console
        .then((res) => console.log(res, 'Отправка успешна'));
      setData((prevData) => [...prevData, newCards]);
    }
  }, [data]);

  // Add/remove from favorites
  const toggleFavorite = useCallback((id) => {
    const selected = { favorite: true };   
    const receivedData = data.map((elem) => {
      if (elem.id === id) {
        if (!elem.select.favorite) {
          return { ...elem, ...{ select: selected } };
        } 
        return { ...elem, ...{ select: {} } };
      } 
      return elem;
    });
    setData(receivedData);
  }, [data]);

  // Changing the state on the selection of a catalog item
  const onSelectCatalog = useCallback((id) => {
    const receivedData = data.map((elem) => ({
      ...elem, 
      visibleOnPromo: elem.id === id
    }));
    setData(receivedData);
  }, [data]);

  // Remove selected object by id from object data
  const deletedCard = useCallback((id) => {
    const receivedData = data.filter((item) => item.id !== id);
    setData(receivedData);
  }, [data]);

  // modal state on click
  const onSelectModal = useCallback((e) => {
    e.preventDefault();
    setActiveModal((prevActiveModal) => !prevActiveModal);
  }, [activeModal]);

  // Activation of the selected element in the section
  const showPromo = useCallback((array) => {
    const temporaryValue = array.find((item) => item.visibleOnPromo);
    setActivePromo(temporaryValue);
  }, [activePromo]);

  const bubbleSort = (array, text) => {
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

  // Returns a data object with one active element
  const showVisible = (array) => {
    const count = array.reduce((result, value) => result + value.visibleOnPromo, 0);
    if (count === 0 || count > 1) {
      return array.map((element, index) => {
        return index === 0 ? { ...element, visibleOnPromo: true } : { ...element, visibleOnPromo: false };
      });
    }
    return array; 
  };

  // Sort data object by price and featured
  const onSortDataByPrice = (array, text) => {
    switch (text) {
      case PRICE_LOW_TO_HIGH:
        return bubbleSort(array, LABEL_LOW_PRICE);
      case PRICE_HIGH_TO_LOW: 
        return bubbleSort(array, LABEL_HIGH_PRICE);
      case PRICE_FEATURED: {
        let secondaryData = [];
        const count = array.reduce((result, value) => result + (JSON.stringify(value.select) !== '{}'), 0);
        if (count !== 0) {
          secondaryData = array.filter((value) => value.select.favorite);
        } else {
          return secondaryData;
        }
        return showVisible(secondaryData);
      }    
      default:
        return array;
    }
  };

  // Sort by search
  const searchCards = (array, term) => {
    let secondaryData;
    if (term.length === 0) {
      setDataByRequest();
      secondaryData = array.slice(0);
    } else {
      secondaryData = array.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));
    }
    secondaryData = showVisible(secondaryData);
    setData(secondaryData);
  }; 

  const updateData = useCallback((inDragBlock, inDragOverBlock) => {
    if (inDragBlock !== inDragOverBlock) {
      const receivedData = data.map((card) => {
        if (card.id === inDragOverBlock.id) {
          return { ...card, order: inDragBlock.order };
        }
        if (card.id === inDragBlock.id) {
          return { ...card, order: inDragOverBlock.order };
        }
        return card;
      });
      setData(receivedData);
    }
  }, [data]);

  useEffect(() => {
    request('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((result) => {
        setCurrency(result);
      })
      .catch((error) => new Error(error));
    
    setDataByRequest();

    // Select the active item for Promo component
    showPromo(data);
  }, []);

  // If the value in the search string has changed, the data is validated
  useEffect(() => {
    searchCards(data, searchValue);
  }, [searchValue]);

  // If the user has selected a value in the sort menu, the object is validated
  useEffect(() => {
    if (data.length === 0) {
      setDataByRequest();
    }
    const temporaryValue = onSortDataByPrice(data, select);
    setData(temporaryValue);
  }, [select]);

  useEffect(() => {
    showPromo(data);
  }, [data]);
   
  return (
    <>  
      <Helmet>
        <meta name="description" content="Nike - Men Page" />
        <title>Nike - Men Page</title>
      </Helmet>
      <MyContext.Provider value={activePromo}>
        <Promo />
      </MyContext.Provider>
      <Sorting
        setSelectState={setSelectState}
      />
      <Catalog 
        updateData={updateData}
        onSelectModal={onSelectModal} 
        data={data} 
        onSelectCatalog={onSelectCatalog}
        deletedCard={deletedCard}
        toggleFavorite={toggleFavorite}
        addNewCards={addNewCards}
      />  
      {activeModal 
        ? (
          <Modal 
            onSelectModal={onSelectModal} 
            activePromo={activePromo}
            currency={currency}
          />
        ) 
        : null}
    </>
  );
}

Men.propTypes = {
  searchValue: PropTypes.string.isRequired,

};

export default Men;
