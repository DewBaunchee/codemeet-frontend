import React from "react";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ReactDOM from "react-dom";
import {AuthenticationService, TokenPair} from "./domain/services/security/AuthenticationService";
import {allPresent} from "./tools/util-functions";

axios.defaults.baseURL = "http://192.168.1.144:8080";

axios.interceptors.request.use((config) => {
    const tokens: TokenPair = AuthenticationService.getTokens();
    if (allPresent(tokens, config)) {
        config.headers!["Authorization"] = `Bearer ${tokens.access_token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById("root")!
);
