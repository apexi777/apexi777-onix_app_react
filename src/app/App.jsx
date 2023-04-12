import { useState } from 'react';
import { Route, Routes } from 'react-router';

import {
  Men, Women, Kids, Customise, NotFound 
} from '../pages';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import './App.scss';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const onUpdateSearch = (value) => {
    setSearchValue(value);
  };
    
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={(
            <Header 
              onUpdateSearch={onUpdateSearch}
            />
          )}
        >
          <Route index element={<Men searchValue={searchValue} />} />
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

export default App;
