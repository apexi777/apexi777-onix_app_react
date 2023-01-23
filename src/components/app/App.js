import { useState } from 'react';
import { Route, Routes } from 'react-router';
import {MenPage, WomenPage, KidsPage, CustomisePage, Page404} from "../pages";
import NikeServices from '../../services/NikeService';

import Header from "../header/Header";
import Footer from '../footer/Footer';


import './App.scss';

const App = () => {

    //Getting data
    const Service = new NikeServices();
    const [listData] = useState(Service.getData());

    //Intermediate search result
    const [search, setSearch] = useState('');

    //search record
    function onUpdateSearch(value) {
        setSearch(value)
    }
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Header 
                    onUpdateSearch={onUpdateSearch}
                    />}>
                    <Route index element={ <MenPage
                        searchCards={Service.searchCards}
                        data={listData}
                        search={search}
                    />}/>
                    <Route path="women" element={<WomenPage/>}/>
                    <Route path="kids" element={<KidsPage/>}/>
                    <Route path="customise" element={<CustomisePage/>}/>
                </Route>
                <Route path="*" element={<Page404 />}/> 
            </Routes>

            <Footer />
        </div>          
    )
}

export default App;