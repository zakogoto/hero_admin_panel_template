// import { filtersFetched, filtersFetching, filtersFetchingError } from "../reducers/filtersSlice";
// import { heroesFetched, heroesFetching, heroesFetchingError } from "../reducers/heroesSlice";

// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//         request("http://localhost:3001/heroes")
//             .then(data => dispatch(heroesFetched(data)))
//             .catch(() => dispatch(heroesFetchingError()))
// }

// export const fetchFilters = (request) => (dispatch) => {
//     dispatch(filtersFetching());
//         request("http://localhost:3001/filters")
//         .then(data => dispatch(filtersFetched(data)))
//         .catch(() => dispatch(filtersFetchingError()))
// }

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroRemove = (id) => {
//     return {
//         type: "HERO_REMOVE",
//         payload: id
//     }
// }

// export const addHero = (hero) => {
//     return {
//         type: "ADD_HERO",
//         payload: hero
//     }
// }

// export const filtersFetching =() => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }
// export const filtersFetchingError =() => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: "FILTERS_FETCHED",
//         payload: filters
//     }
// }

// export const changeActiveFilter = (filter) => {
//     return {
//         type: "CHANGE_ACTIVE_FILTER",
//         payload: filter
//     }
// }

// export const changeActiveFilter = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: "CHANGE_ACTIVE_FILTER",
//             payload: filter
//         })
//     }, 1000)
// }