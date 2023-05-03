import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all',
// }

const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
    activeFilter: 'all',
    filtersLoadingStatus: 'idle',
})

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp()
        return request("http://localhost:3001/filters")
    }
) 
// {
//     dispatch(filtersFetching());
//         request("http://localhost:3001/filters")
//         .then(data => dispatch(filtersFetched(data)))
//         .catch(() => dispatch(filtersFetchingError()))
// }

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // filtersFetching: state => {
        //     state.filtersLoadingStatus = 'loading'
        // },
        // filtersFetchingError: state => {
        //     state.filtersLoadingStatus = 'error'
        // },
        // filtersFetched: (state, action) => {
        //     state.filters = action.payload;
        //     state.filtersLoadingStatus = 'idle';
        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: {
        [fetchFilters.pending]: state => {
            state.filtersLoadingStatus = 'loading'
        },
        [fetchFilters.fulfilled]: (state, action) => {
            filterAdapter.setAll(state, action.payload)
            state.filtersLoadingStatus = 'idle';
        },
        [fetchFilters.rejected]: state => {
            state.filtersLoadingStatus = 'error'
        }
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;

export const {selectAll} = filterAdapter.getSelectors(state => state.filters);

export const {
    changeActiveFilter, 
    filtersFetched, 
    filtersFetching, 
    filtersFetchingError
} = actions;