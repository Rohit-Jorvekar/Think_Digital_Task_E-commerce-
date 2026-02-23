import api from '../../services/api';

export const fetchProducts = () => async dispatch => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await api.get('/products');
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const searchProducts = (term) => ({
  type: 'SEARCH_PRODUCTS',
  payload: term,
});