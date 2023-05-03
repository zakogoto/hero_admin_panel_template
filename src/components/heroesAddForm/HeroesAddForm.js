import { Field, Form, Formik } from "formik";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup'
import { fetchFilters, selectAll } from "../../reducers/filtersSlice";
import { useCallback, useEffect } from "react";
import { addHero, heroesFetchingError } from "../../reducers/heroesSlice";
import store from "../../store";

const HeroesAddForm = () => {

    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        getFilters();
        // eslint-disable-next-line
    },[])

    const HandleAddHero = useCallback((value) => {
        const newHero = {
            id: uuidv4(),
            name: value.name,
            description: value.text,
            element: value.element
        }
        dispatch(addHero(newHero));
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        .catch(() => dispatch(heroesFetchingError()))

    }, [request, dispatch])

    const getFilters = useCallback(() => {
        dispatch(fetchFilters());
    }, [dispatch, request])

    const renderFilters = (filters) => {
        return filters.map(({value, title, id}) => {
            return value === 'all' ? null : <option key={id} value={value}>{title}</option>
        })
    }

    return (
        <Formik
            initialValues={{
                name: '',
                text: '',
                element: ''
            }}
            validationSchema= { Yup.object({
                name: Yup.string()
                    .min(2, 'Минимум 2 символа для заполнения')
                    .required('Обязательное поле!'),
                text: Yup.string().min(5, "Не менее 5 символов"),
                element: Yup.string().required("Выберите стихию"),
    
            })}
            onSubmit={(values, actions) => {
                HandleAddHero(values);
                actions.resetForm()}}
            >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        as='textarea'
                        required
                        name="text" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        as='select'
                        required
                        className="form-select" 
                        id="element" 
                        name="element">
                            <option value="">Я владею элементом...</option>
                            {renderFilters(filters)}
                    </Field>
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;