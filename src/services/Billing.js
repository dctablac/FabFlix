import Socket from "../util/Socket";
import { billingEPs } from "../Config.json";
import Axios from "axios";

const { cartInsertEP, cartUpdateEP, cartDeleteEP, 
        cartRetrieveEP, cartClearEP, orderPlaceEP, orderRetrieveEP, orderCompleteEP } = billingEPs;

async function cartInsert(movieid, quantity, newEmail, session_id) {
    const { common } = Axios.defaults.headers;

    const payLoad = {
        email: newEmail,
        movie_id: movieid,
        quantity: quantity
    }

    common["email"] = newEmail;
    common["session_id"] = session_id;

    return await Socket.POST(cartInsertEP, payLoad);
}

async function cartDelete(movieID, newEmail, session_id) {
    const { common } = Axios.defaults.headers;

    const payLoad = {
        email: newEmail,
        movie_id: movieID
    }

    common["email"] = newEmail;
    common["session_id"] = session_id;

    return await Socket.POST(cartDeleteEP, payLoad);
}

async function cartRetrieve(newEmail, session_id) {
    const { common } = Axios.defaults.headers;

    const payLoad = {
        email: newEmail
    }

    common["email"] = newEmail;
    common["session_id"] = session_id;

    return await Socket.POST(cartRetrieveEP, payLoad)
}

async function cartClear(newEmail, session_id) {
    const { common } = Axios.defaults.headers;

    const payLoad = {
        email: newEmail
    }

    common["email"] = newEmail;
    common["session_id"] = session_id;

    return await Socket.POST(cartClearEP, payLoad)    
}

async function cartUpdate(newEmail, session_id, movieID, quantity) {
    const { common } = Axios.defaults.headers;

    const payLoad = {
        email: newEmail,
        movie_id: movieID,
        quantity: quantity
    }

    common["email"] = newEmail;
    common["session_id"] = session_id;

    return await Socket.POST(cartUpdateEP, payLoad)  
}

async function orderPlace(newEmail, session_id) {
    const { common } = Axios.defaults.headers;

    const payLoad = {
        email: newEmail
    }

    common["email"] = newEmail;
    common["session_id"] = session_id;

    return await Socket.POST(orderPlaceEP, payLoad)  
}

async function orderRetrieve(newEmail, session_id) {
    const { common } = Axios.defaults.headers;

    const payLoad = {
        email: newEmail
    }

    common["email"] = newEmail;
    common["session_id"] = session_id;

    console.log(orderRetrieveEP);

    return await Socket.POST(orderRetrieveEP, payLoad)  
}

async function orderComplete(newToken, newPayerID, newEmail, session_id) {

    const { common } = Axios.defaults.headers;

    let completeURL = orderCompleteEP;

    completeURL += "?";
    completeURL += "token="+newToken;
    completeURL += "&";
    completeURL += "PayerID="+newPayerID;

    common["email"] = newEmail;
    common["session_id"] = session_id;

    console.log(completeURL);

    return await Socket.GET(completeURL) 
}

export default {
    cartInsert,
    cartUpdate,
    cartDelete,
    cartRetrieve,
    cartClear,
    orderPlace,
    orderRetrieve,
    orderComplete
};