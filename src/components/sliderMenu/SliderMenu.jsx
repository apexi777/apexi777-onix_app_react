import { Component } from "react";
import Slider from "react-slick";
import SliderElement from "../sliderElement/SliderElement";
import SliderButtons from "../sliderButtons/SliderButtons";
import './SliderMenu.scss';


class SliderMenu extends Component {

  //Slider elements
  elements = (data) => {
    return data.map(item => {
      const {id, ...itemProps} = item;
      return (
          <SliderElement 
              key={id}
              {...itemProps}
              onSelectCatalog={()=> this.props.onSelectCatalog(id)}
              toggleFavorite={() => this.props.toggleFavorite(id)}
              deletedCard={ () => {this.props.deletedCard(id)}}
          />
      )
    })
  }
  //Sets value to show items slider
  setSlidesToShow = data => {
    if (window.matchMedia("(max-width: 575px)").matches) {
      return 2;
    } else {
      if (data.length > 0 && data.length <= 3 ) return data.length
      else return 3 ;
    }
  }

  render() {
    const {data, onSortDataByPrice, onSelectModal, addNewCards} = this.props;

    //button activity
    const showButton = (this.props.data.length !== 0) ?  <SliderButtons data={data} onSortDataByPrice={onSortDataByPrice} onSelectModal={onSelectModal} addNewCards={addNewCards}/>: null;
    
    //Settings by Slick Slider library
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: this.setSlidesToShow(this.props.data),
      slidesToScroll: 1,
      initialSlide: 1
    };
    return (
      <div className="slider">
          <div className="container">
              {showButton}
              
              <div className="slider_menu">
                <Slider {...settings}>
                  {this.elements(this.props.data)}
                </Slider>
              </div>
          </div>
      </div>
    );
  }
}

export default SliderMenu;