import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { heroRemove, fetchHeroes, filteredHeroesSelector } from '../../reducers/heroesSlice';
// import { fetchHeroes, heroRemove } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroList.sass'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния +
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE +

const HeroesList = () => {
    // const heroes = useSelector(state => {
    //     console.log('render')
    //     if(state.filters.activeFilter === 'all') {
    //         return state.heroes.heroes
    //     } else {
    //         return state.heroes.heroes.filter(hero => hero.element === state.filters.activeFilter)
    //     }
    // })
    const heroes = useSelector(filteredHeroesSelector)
    const  heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const getHeroes = useCallback(() => {
        dispatch(fetchHeroes());
        // dispatch(heroesFetching());
        // request("http://localhost:3001/heroes")
        //     .then(data => dispatch(heroesFetched(data)))
        //     .catch(() => dispatch(heroesFetchingError()))
    }, [request, dispatch])

    useEffect(() => {
        getHeroes()
        // eslint-disable-next-line
    }, []);

    const onDelete = (id) => {
        dispatch(heroRemove(id));
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(() => getHeroes());
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({...props}) => {
            return (
                <CSSTransition 
                    key={props.id}
                    in
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem key={props.id} removeHero={onDelete} {...props}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(heroes);

    return (
        <TransitionGroup component="ul">
            <ul>
                {elements}
            </ul>
        </TransitionGroup>
    )
}

export default HeroesList;