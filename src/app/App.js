import { Route, Routes } from 'react-router';
import '../i18n';

import {
  Men, Women, Kids, Customise, NotFound 
} from '../pages';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import './App.scss';

function App() {   
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={(
            <Header />
          )}
        >
          <Route index element={<Men />} />
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
