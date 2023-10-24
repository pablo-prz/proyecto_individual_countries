import axios from 'axios';

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRYBYID = "GET_COUNTRYBYID";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const CLEAN_SEARCH = "CLEAN_SEARCH";
export const ALPHA_ORD = "ALPHA_ORD";
export const POPU_ORD = "POPU_ORD";
export const CONTINENT_ORD = "CONTINENT_ORD";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY"
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const ACTIVITY_FILT = "ACTIVITY_FILT";

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
export const cleanSearch = () => {
    return { type: CLEAN_SEARCH, };
};
export const alphaOrder = (order) => {
    return { type: ALPHA_ORD, payload: order };
};
export const popuOrder = (order) => {
    return { type: POPU_ORD, payload: order };
};
export const continentOrder = (payload) => {
    return { type: CONTINENT_ORD, payload };
};
export const getActivities = () => {
    return async function (dispatch) {
        const apidata = await axios.get("http://localhost:3001/activities")
        const activities = apidata.data
        dispatch({ type: GET_ACTIVITIES, payload: activities })
    };
};
export const createActivity = (activity) => {
    return async function (dispatch) {
        try {
            const newActiv = await axios.post("http://localhost:3001/activities", activity);
            dispatch({ type: CREATE_ACTIVITY, payload: newActiv })
        } catch (error) {
            console.log(error)
        }
    };
};
export const filterByActivity = (activity) => {
    return {
        type: ACTIVITY_FILT,
        payload: activity,
    };
};