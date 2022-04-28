import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM
    .createRoot(document.getElementById('root')!)
    .render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
