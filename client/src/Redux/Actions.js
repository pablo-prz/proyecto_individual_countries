import axios from 'axios';

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRYBYID = "GET_COUNTRYBYID";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY"
export const ALPHA_ORD = "ALPHA_ORD";
export const REV_ALPHA_ORD = "REV_ALPHA_ORD";
export const POPU_ORD = "POPU_ORD";
export const REV_POPU_ORD = "REV_POPU_ORD";
export const CONTINENT_ORD = "CONTINENT_ORD";
export const GET_ACTIVITIES = "GET_ACTIVITIES";

export const getCountries = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get("http://localhost:3001/countries");
            const countries = apiData.data;
            dispatch({ type: GET_COUNTRIES, payload: countries })
        }
        catch (error) {
            console.log(error);
        }
    };
};

export const getCountryById = (id) => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`http://localhost:3001/countries/${id}`);
            const country = apiData.data;
            dispatch({ type: GET_COUNTRYBYID, payload: country })

        } catch (error) {
            console.log(error)
        }
    };
};
export const getCountriesByName = (name) => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`http://localhost:3001/countries?name=${name}`);
            const countries = apiData.data;
            dispatch({ type: SEARCH_COUNTRY, payload: countries })
        } catch (error) {
            console.log(error);
        }
    }
};
export const alphaOrder = () => {
    return { type: ALPHA_ORD };
};
export const revAlphaOrder = () => {
    return { type: REV_ALPHA_ORD };
};
export const popuOrder = () => {
    return { type: POPU_ORD };
};
export const revPopuOrder = () => {
    return { type: REV_POPU_ORD };
};
export const continentOrder = (payload) => {
    return { type: CONTINENT_ORD, payload };
};
export const getActivities = (payload) => {
    return { type: GET_ACTIVITIES, payload };
};
export const createActivity = (activity) => {
    return async function () {
        try {
            // eslint-disable-next-line no-unused-vars
            const newActiv = await axios.post(
                "http://localhost:3001/activities", activity
            );
            console.log(newActiv)
        } catch (error) {
            console.log(error)
        }
    };
};