import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_RANDOM_BIDDERS,
  FETCH_RANDOM_BIDDERS_SUCCESS,
} from '../constants'

const INITIAL_STATE = {
  products: [],
  productsUID: [],
  countOfProducts: 0,
  isLoadingFetchProducts: true,
  randomBidders: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        countOfProducts: action.payload.products.length,
        productsUID: action.payload.uid,
        isLoadingFetchProducts: false,
      }
    case FETCH_PRODUCTS:
      return {
        ...state,
        isLoadingFetchProducts: true,
      }
    case FETCH_RANDOM_BIDDERS_SUCCESS:
      return {
        ...state,
        randomBidders: action.payload,
        isLoadingFetchProducts: false,
      }
    case FETCH_RANDOM_BIDDERS:
      return {
        ...state,
        isLoadingFetchProducts: true,
      }
    default: 
      return state;
  }
}