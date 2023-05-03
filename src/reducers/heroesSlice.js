import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // heroesFetching: state => {
        //     state.heroesLoadingStatus = 'loading';
        // }, //важно при использовании createSlice reducers не должны возвращать ничего, иначе не будет происходить компиляция в иммутабельный вариант
        // heroesFetched: (state, action) => {
        //     state.heroesLoadingStatus = 'idle';
        //     state.heroes = action.payload;
        // },
        // heroesFetchingError: state => {
        //     state.heroesLoadingStatus = 'error';
        // },
        heroRemove: (state, action) => {
            heroesAdapter.removeOne(state, action.payload)
            // state.heroes.filter(item => item.id !== action.payload);
        },
        addHero: (state, action) => {
            heroesAdapter.addOne(state, action.payload)
            // state.heroes.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }

})

const {actions, reducer} = heroesSlice;

export default reducer;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroRemove,
    addHero
} = actions;

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        console.log('render')
        if(filter === 'all') {
            return heroes
        } else {
            return heroes.filter(hero => hero.element === filter)
        }
    }
)