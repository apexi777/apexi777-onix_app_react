import { useState } from "react";
import AddCards from "../addCards/AddCards";
import './SliderButtons.scss';

const SliderButtons = ({onSelectModal, onSortDataByPrice, data, addNewCards}) => {
    const [filterMenuView, setFilterMenuView] = useState('buttons');
  
    const toggleMenuFilter = () => {
      if (filterMenuView === "buttons") {
        setFilterMenuView("buttons active");
        
      }
      else setFilterMenuView("buttons")
    }
    
    return (
      <div className={filterMenuView}>
        <button onClick={(e) => onSelectModal(e)} className='slider_btn'>shop now</button> 
        <button onClick={toggleMenuFilter} className='slider_btn sort'>
          <p className="sort_title">Add new Card</p>
        </button>
          <AddCards 
            data={data}
            onSortDataByPrice={onSortDataByPrice}
            toggleMenuFilter={toggleMenuFilter}
            addNewCards={addNewCards}/>
      </div>
    )
  }

  export default SliderButtons;