import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


import Recipes from '../components/Recipes'

import '../styles/styles.scss'

function Results() {
    const [recipes, setRecipes] = useState([]);
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const { id } = useParams();
    const [pagination, setPagination] = useState(0)
    const [pages, setPages] = useState()

    const APP_ID = "8ba5b485";
    const APP_KEY = "b4e695ac6bd457749d819e171da3500e";

    const getSearch = e => {
        setQuery(search);
        history.push(`/search/${search}`)
    }

    useEffect(() => {
        getRecipes();
    }, [id, pagination]);

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${id}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${pagination}&to=${pagination+10}`);
        const data = await response.json();
        console.log(data)
        setRecipes(data.hits)
        setPages(data.count)
        console.log(data.count)
    }

    return (
        <div className="results__page">
            <div className="search__header">
                <div className="search__container">
                    <div className="float__bar"></div>
                    <div className="search__title">
                        <h1>Search results for "{id}"</h1>
                        <p>{pages} matching results</p>
                    </div>
                </div>
                <div className="filter">
                    <p>Filter</p>
                    <KeyboardArrowDownIcon className="filter__icon" />
                </div>
            </div>
            <div className="border">
                <span className="bar"></span><p>just in time</p><span className="bar"></span>
            </div>
            <Recipes pages={pages} recipes={recipes} pagination={pagination} setPagination={setPagination} />
            <div className="border">
                <span className="bar"></span><p>just in time</p><span className="bar"></span>
            </div>
        </div>
    )
}

export default Results