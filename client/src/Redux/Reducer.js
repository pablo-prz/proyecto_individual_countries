/* eslint-disable no-case-declarations */
import {
    GET_COUNTRIES,
    GET_COUNTRYBYID,
    SEARCH_COUNTRY,
    CLEAN_SEARCH,
    ALPHA_ORD,
    POPU_ORD,
    CONTINENT_ORD,
    CREATE_ACTIVITY,
    GET_ACTIVITIES,
    ACTIVITY_FILT
}
    from "./Actions"

export const initialState = {
    countries: [],
    countryDetail: [],
    searchResult: [],
    activities: [],
};
const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_COUNTRIES:
            return { ...state, countries: payload };

        case GET_COUNTRYBYID:
            return { ...state, countryDetail: payload };

        case SEARCH_COUNTRY:
            return { ...state, searchResult: payload };

        case CLEAN_SEARCH:
            return { ...state, searchResult: [] };

        case ALPHA_ORD:
            const sortByAlpha = [...state.searchResult].sort((a, b) => {
                if (payload === "a-z") {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            }); const allSortByAlpha = [...state.countries].sort((a, b) => {
                if (payload === "a-z") {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
            return {
                ...state,
                searchResult: sortByAlpha,
                countries: allSortByAlpha
            };
        case POPU_ORD:
            // eslint-disable-next-line no-case-declarations
            const sortByPopulation = [...state.searchResult].sort((a, b) => {
                if (payload === "population ⌃") {
                    return a.population - b.population;
                } else if (payload === "population ⌄") {
                    return b.population - a.population;
                }
            });
            const allSortByPopulation = [...state.countries].sort((a, b) => {
                if (payload === "population ⌃") {
                    return a.population - b.population;
                } else if (payload === "population ⌄") {
                    return b.population - a.population;
                }
            });
            return {
                ...state,
                searchResult: sortByPopulation,
                countries: allSortByPopulation
            };
        case CONTINENT_ORD:
            return { ...state, searchResult: state.countries.filter((el) => el.continent === payload) };

        case CREATE_ACTIVITY:
            return {
                ...state, countries: state.countries.map((country) => {
                    if (country.id === payload.id) {
                        return {
                            ...country, activities: [...country.activities, payload],
                        }
                    } else return country;
                })
            };

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: payload,
            };

        case ACTIVITY_FILT:
            const filtByActivity = state.countries.filter((country) => {
                return country.Activities.some(
                    (activity) => activity.name === payload
                );
            });
            return {
                ...state,
                searchResult: filtByActivity,
            };

        default:
            return { ...state };

    }
};
console.log(initialState.activities)
export default rootReducer;