const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload, filteredProducts: action.payload };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SEARCH_PRODUCTS':
      const searchTerm = action.payload.toLowerCase();
      const filtered = state.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
      return { ...state, filteredProducts: filtered };
    default:
      return state;
  }
};

export default productReducer;