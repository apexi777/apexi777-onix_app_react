import { Component } from "react";
import Select from "react-select";

import "./SelectMenu.scss";

class SelectMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            options : [
                { value: 'Price: High-Low', label: 'Price: High-Low' },
                { value: 'Price: Low-High', label: 'Price: Low-High' },
                { value: 'Featured', label: 'Featured' }
            ],
        }
    }

    render() {
        return (
            <div className="select">
                <div className="container">
                    <div className="select_view">
                        <Select 
                            placeholder="Sort shoes by ..."
                            onChange={(value) => {
                                this.props.setSelectState(value.value);
                            }}
                            options={this.state.options}/>  
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectMenu;