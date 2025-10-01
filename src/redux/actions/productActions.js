import apiService from '../../services/api';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const addProductSuccess = (product) => ({
  type: ADD_PRODUCT,
  payload: product
});

export const updateProductSuccess = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product
});

export const deleteProductSuccess = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId
});

export const fetchAllProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiService.getAllProducts();
    if (response.success) {
      dispatch(setProducts(response.data));
    }
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const fetchProductsByCategory = (category) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiService.getProductsByCategory(category);
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const fetchNewArrivals = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiService.getNewArrivals();
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const createProduct = (productData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiService.createProduct(productData);
    if (response.success) {
      dispatch(addProductSuccess(response.data));
    }
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiService.updateProduct(productId, productData);
    if (response.success) {
      dispatch(updateProductSuccess(response.data));
    }
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiService.deleteProduct(productId);
    if (response.success) {
      dispatch(deleteProductSuccess(productId));
    }
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};
