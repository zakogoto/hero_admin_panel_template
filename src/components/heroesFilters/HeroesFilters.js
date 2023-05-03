import { useDispatch, useSelector } from "react-redux";
// import { changeActiveFilter } from "../../actions";
import classNames from "classnames";
import Spinner from "../spinner/Spinner";
import { changeActiveFilter, selectAll } from "../../reducers/filtersSlice";
import store from "../../store";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом


const HeroesFilters = () => {

    const {activeFilter, filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState())
    const dispatch = useDispatch();

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderButtons = (filters) => {
        return filters.map(({value, title}) => {

            let filterClass;

            switch (value){
                case 'fire':
                    filterClass = "btn btn-danger"
                    break;
                case 'water':
                    filterClass = "btn btn-primary"
                    break;
                case 'wind':
                    filterClass = "btn btn-success"
                    break;
                case 'earth':
                    filterClass = "btn btn-secondary"
                    break;
                    
                default:
                    filterClass = "btn btn-outline-dark"
            }

            const btnClass = classNames('btn', filterClass, {'active': value === activeFilter})

            return <button 
                        onClick={() => dispatch(changeActiveFilter(value))}
                        key={value} 
                        id={value}
                        className={btnClass}>
                            {title}
                    </button>
        })

    }

    const elem = renderButtons(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elem}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;