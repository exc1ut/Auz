import {FETCH_PRODUCT,LOADING_PRODUCT,SEARCH_PRODUCT} from '../types'

export function changeLang(text) {
  return { type: "Lang", payload: text }
}

export function searchText(text) {
  return { type: SEARCH_PRODUCT, payload: text }
}

export function fetchCategories(lang) {
  return dispatch => {
      fetch('http://auz.uz/api/getcategories?lang='+lang)
      .then(res => res.json())
      .then(res => {
          dispatch({ type: "CATEGORY_LIST", payload: res});
      })
  }
}


export function fetchProducts(lang,category_id=0,limit=10,offset=0) {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCT, payload: true});
      fetch(`http://auz.uz/api/articleByCategory?offset=${offset}&lang=${lang}&limit=${limit}&category_id=${category_id}`)
      .then(res => res.json())
      .then(res => {
          dispatch({ type: FETCH_PRODUCT, payload: res, offset: offset});
          dispatch({ type: LOADING_PRODUCT, payload: false});
      })
  }
}


// export const fetchData = (data) => {
//   return {
//     type: 'CATEGORY_LIST',
//     payload: data,
//   }
// };

// export const fetchCategories = () => {
//   return (dispatch) => {
//     return fetch('http://auz.uz/api/getcategories?lang=uz').then(res => res.json)
//       .then(json => {
//         console.log(json);
//         dispatch(fetchData(json))
//       })
//       .catch(error => {
//         throw(error);
//       });
//   };
// };