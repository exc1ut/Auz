import {combineReducers} from 'redux';
import Categories from './category';
import Lang from './lang';
import Products from './products'
import Search from './search'

export default combineReducers({
    category: Categories,
    lang: Lang,
    products: Products,
    search: Search,
})