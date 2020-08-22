import Socket from "../util/Socket";
import { moviesEPs } from "../Config.json";
import Axios from "axios";

const { searchEP, browseEP, getMovieDetailEP } = moviesEPs;

/////////////////////////////////////////////////////////////////////////////////////////////

async function search(filters, email, session_id) {

    let search = filters.search;
    let year = filters.year;
    let director = filters.director;
    let genre = filters.genre;

    let limit = filters.limit;
    let orderby = filters.orderby;
    let direction = filters.direction;
    let offset = filters.offset;

    /////////////////////////////////////////////////

    const { common } = Axios.defaults.headers;

    let finalSearchEP = searchEP;

    // limit, orderby, direction, offset have defaults, so initial is 4
    let queryCount = 4;
    if (search !== "") {
        queryCount++;
    }
    if (year !== "") {
        queryCount++;
    }
    if (director !== "") {
        queryCount++;
    }
    if (genre !== "") {
        queryCount++;
    }
    

    let count = 3; // for deciding whether to add another '&' character
                   // limit, orderby, and direction guarantee 3 '&'s 
    
    finalSearchEP += "?";
    // Append query parameters based on how many there are

    finalSearchEP += "limit=" + limit + "&";
    finalSearchEP += "orderby=" + orderby + "&";
    finalSearchEP += "direction=" + direction + "&";

    finalSearchEP += "offset=" + offset;
    if (count+1 < queryCount) {
        count++;
        finalSearchEP += "&";
    }

    if (search !== "") {
        finalSearchEP += "title=" + search;
        if (count+1 < queryCount) {
            count++;
            finalSearchEP += "&";
        }
    }
    if (year !== "") {
        finalSearchEP += "year=" + year;
        if (count+1 < queryCount) {
            count++;
            finalSearchEP += "&";
        }
    }
    if (director !== "") {
        finalSearchEP += "director=" + director;
        if (count+1 < queryCount) {
            count++;
            finalSearchEP += "&";
        }
    }
    if (genre !== "") {
        finalSearchEP += "genre=" + genre;
        if (count+1 < queryCount) {
            count++;
            finalSearchEP += "&";
        }
    }

    /////////////////////////////////////////////////
    console.log(finalSearchEP);

    common["email"] = email;
    common["session_id"] = session_id;

    return await Socket.GET(finalSearchEP);
}

/////////////////////////////////////////////////////////////////////////////////////////////

async function browse(filters, email, session_id) {
    let finalBrowseEP = browseEP;
    let keywords = filters.search;
    let limit = filters.limit;
    let offset = filters.offset;
    let orderby = filters.orderby;
    let direction = filters.direction;

    const { common } = Axios.defaults.headers;

    /////////////////////////////////////////////////

    finalBrowseEP += keywords;

    finalBrowseEP += "?";

    finalBrowseEP += "limit=" + limit + "&";
    finalBrowseEP += "orderby=" + orderby + "&";
    finalBrowseEP += "direction=" + direction + "&";

    finalBrowseEP += "offset=" + offset;

    console.log(finalBrowseEP);

    /////////////////////////////////////////////////

    common["email"] = email;
    common["session_id"] = session_id;

    return await Socket.GET(finalBrowseEP)
}

/////////////////////////////////////////////////////////////////////////////////////////////

async function movieDetails(movie_id, email, session_id) {
    let finalMovieDetailEP = getMovieDetailEP;

    const { common } = Axios.defaults.headers;

    /////////////////////////////////////////////////

    finalMovieDetailEP += movie_id;

    /////////////////////////////////////////////////

    common["email"] = email;
    common["session_id"] = session_id;

    console.log(finalMovieDetailEP);

    return await Socket.GET(finalMovieDetailEP);
}

export default {
    search,
    browse,
    movieDetails
}