import { Component } from "react";
import Slider from "react-slick";
import SliderElement from "../sliderElement/SliderElement";
import './ReactSlick.scss';


class ReactSlick extends Component {

  //Slider elements
  elements = (data) => {
    return data.map(item => {
      const {id, ...itemProps} = item;
      return (
          <SliderElement 
              key={id}
              {...itemProps}
              onSelectCatalog={()=> this.props.onSelectCatalog(id)}
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
    //button activity
    const showButton = (this.props.data.length !== 0) ? <button onClick={(e) => this.props.onSelectModal(e)} className='slider_btn'>shop now</button> : null;
    
    //Settings by Slick Slider library
    const settings = {
      dots: true,
      fade: false,
      infinite: true,
      speed: 500,
      slidesToShow: this.setSlidesToShow(this.props.data),
      slidesToScroll: 1
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

export default ReactSlick;