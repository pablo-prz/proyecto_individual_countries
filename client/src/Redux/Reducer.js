import {
    GET_COUNTRIES,
    GET_COUNTRYBYID,
    SEARCH_COUNTRY,
    ALPHA_ORD,
    REV_ALPHA_ORD,
    POPU_ORD,
    REV_POPU_ORD,
    CONTINENT_ORD,
    GET_ACTIVITIES
} from "./Actions"
import { alphaOrd, popuOrd } from "./Orders";

export const initialState = {
    countries: [],
    countryDetail: [],
};
const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_COUNTRIES:
            return { ...state, countries: payload };

        case GET_COUNTRYBYID:
            return { ...state, countryDetail: payload };

        case SEARCH_COUNTRY:
            return { ...state, countries: payload };

        case ALPHA_ORD:
            return { ...state, countries: state.countries.slice().sort(alphaOrd) };

        case REV_ALPHA_ORD:
            return { ...state, countries: state.countries.slice().sort(alphaOrd).reverse() };

        case POPU_ORD:
            return { ...state, countries: state.countries.slice().sort(popuOrd) };

        case REV_POPU_ORD:
            return { ...state, countries: state.countries.slice().sort(popuOrd).reverse() };

        case CONTINENT_ORD:
            return { ...state, countries: state.countries.filter((el) => el.continent === payload) };

        case GET_ACTIVITIES:
            return {
                ...state, countries: state.countries.filter((country) => {
                    return country.activities.some((activ) => activ.name === payload)
                })
            }
        default:
            return { ...state }
    }
}
export default rootReducer;