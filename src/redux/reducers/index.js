import { combineReducers } from "redux";
import auth from "./auth";
import cargo from "./cargo";
import client from "./client";
import company from "./company";
import transport from "./transport";
import news from "./news";
import profile from "./profile";
import review from './review'

export default combineReducers({
    authState: auth,
    clientsState: client,
    companyState: company,
    cargoState: cargo,
    transportState: transport,
    newsState: news,
    profileState: profile,
    reviewState: review
});