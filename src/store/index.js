// import heroReducer from '../reducers/heroes';
import heroes from '../reducers/heroesSlice'
import filters from '../reducers/filtersSlice';
import { configureStore } from '@reduxjs/toolkit';

// const rootReducer = combineReducers({
//     heroes: heroReducer,
//     filters: filtersReducer
// })

//устройство функции middleWare изнутри, первым агрументом на месте store принимает две функции, если это необходимо, { dispatch, getState }
//next на самом деле это следущий dispatch
const stringMiddleWare = (store) => (next) => (action) => { 
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

//посволяет усилить диспатч, так, что если экшеном приходит строка, он будет вызывать соответствующий тип действия
// const enchancer = (createStore) => (...args) => {
//     const store = createStore();

//     const oldDispatch = store.dispatch;

//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store
// }

// const store = createStore(
//                             rootReducer, 
//                             compose(
//                                 applyMiddleware(ReduxThunk, stringMiddleWare),
//                                 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                             )
//                             // compose(
//                             //     enchancer,
//                             //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                             // )
// );

const store = configureStore({
    reducer: {
        heroes,
        filters
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;
