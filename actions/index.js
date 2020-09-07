import firestore from '@react-native-firebase/firestore';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_RANDOM_BIDDERS,
  FETCH_RANDOM_BIDDERS_SUCCESS,
} from '../constants';

export const fetchProducts = () => async (dispatch) => {
  let products = [];
  let uid = [];
  dispatch({ type: FETCH_PRODUCTS});
  await firestore()
  .collection('Products')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(snapshot => {
      let temp = snapshot.data()
      temp.uid = snapshot.id;
      products.push(temp);
      uid.push(snapshot.id);
    });
    products = products.sort(() => Math.random() - 0.5); // sort product random
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: { products, uid }});
  })
}

export const fetchRandomBidders = () => async (dispatch) => {
  let buyers = [];
  dispatch({ type: FETCH_RANDOM_BIDDERS});
  await firestore()
  .collection('RandomUser')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(snapshot => {
      buyers.push(snapshot.data().name);
    })
    dispatch({ type: FETCH_RANDOM_BIDDERS_SUCCESS, payload: buyers });
  });
}