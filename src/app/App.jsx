import { Component } from 'react';
import { Route, Routes } from 'react-router';

import {
  Men, Women, Kids, Customise, NotFound 
} from '../pages';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  onUpdateSearch = (value) => {
    this.setState(({ search: value }));
  };
    
  render() {
    const { search } = this.state;
    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={(
              <Header 
                onUpdateSearch={this.onUpdateSearch}
              />
)}
          >
            <Route index element={<Men search={search} />} />
            <Route path="women" element={<Women />} />
            <Route path="kids" element={<Kids />} />
            <Route path="customise" element={<Customise />} />
          </Route>
          <Route path="*" element={<NotFound />} /> 
        </Routes>

        <Footer />
      </div>          
    );
  }
}

export default App;
