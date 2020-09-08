import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  LOGIN,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_RANDOM_BIDDERS,
  FETCH_RANDOM_BIDDERS_SUCCESS,
} from '../constants';

export const register = (props) => async (dispatch) => {
  const { callback, email, password, confirmPassword, fullName } = props;
  dispatch({ type: LOGIN});

  if(_.eq(password, confirmPassword)) {
    console.log('confirmPas')
    await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      firestore()
      .collection('Users')
      .doc(data.user.uid)
      .set({name: fullName, email: email})
      .then(() => {
        dispatch({ type: REGISTER_SUCCESS, payload: {name: fullName, email: email, uid: data.user.uid}});
        callback();
      })
      .catch(error => console.log(error));
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        dispatch({ type: LOGIN_ERROR, payload: 'That email address is already in use!' });
      }
      if (error.code === 'auth/invalid-email') {
        dispatch({ type: LOGIN_ERROR, payload: 'That email address is invalid!' });
      }
      if (error.code === 'auth/weak-password') {
        dispatch({ type: LOGIN_ERROR, payload: 'Password should be at least 6 characters' });
      }
    });
  } else {
    console.log('no confirm');
    dispatch({ type: LOGIN_ERROR, payload: 'The Password Confirmation does not match.' });
  }
}

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