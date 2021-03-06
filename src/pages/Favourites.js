import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import SavedRecipe from '../components/SavedRecipe';

function Favourites({ updateCount, savedCount }) {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    const getUserSavedRecipes = () => {
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
        setRecipes(savedRecipes);
    }

    const getSearch = e => {
        setQuery(search);
        navigate(`/search/${search}`)
    }

    useEffect(() => {
        getUserSavedRecipes();
    }, [savedCount]);

    console.log(recipes.length)
    return (
    <motion.div className="favourites__page"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
        <div className="favourites__header">
            <div className="favourites__title">
                <h1>My Saved Recipes</h1>
                {savedCount ===  1 ? (
                    <p>You have <span>{savedCount} saved recipe</span></p>
                ): (
                    <p>You have <span>{savedCount} saved recipes</span></p>
                )}
            </div>
            <form onSubmit={getSearch}>
                <div className="form">
                    <div className="search__box">
                        <SearchIcon className="search__icon" />
                        <input type="text" spellCheck="false" value={search} onChange={e => setSearch(e.target.value)} placeholder="Add some new recipes!" />
                    </div>
                </div>
            </form>
            <span className="divider"></span>
        </div>
        
        <motion.div  className="saved__recipes">
            {recipes?.map((recipe) =>
                <SavedRecipe key={recipe.label} updateCount={updateCount} recipe={recipe} />
            )}
        </motion.div>
    </motion.div>
    )
}

export default Favourites