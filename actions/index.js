import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  HOST,
  LOGIN,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  PROFILE_UPDATE_ON_INIT,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_RANDOM_BIDDERS,
  FETCH_RANDOM_BIDDERS_SUCCESS,
  ADD_ADDRESS,
  ADD_ADDRESS_ERROR,
  ADD_ADDRESS_SUCCESS
} from '../constants';
import axios from 'axios';

axios.defaults.baseURL = `${HOST}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Shopify-Access-Token'] = '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';

export const fetchProfile = (props) => async (dispatch) => {
  const user = await firestore()
  .collection('Users')
  .doc(props)
  .get();
  dispatch({ type: PROFILE_UPDATE_ON_INIT, payload: {...user.data(), uid: props}})
}

export const addAddress = (data, callback) => async (dispatch) => {
  dispatch({ type: ADD_ADDRESS});
  await axios.post(`/customers/${data.id}/addresses.json`, {address: data.address})
  .then(res => {
    dispatch({ type: ADD_ADDRESS_SUCCESS });
    callback();
  })
  .catch(err => {
    const errObj = err.response.data.errors;
    const key = Object.keys(errObj)[0];
    const errorMessage = key + ' ' + errObj[key];
    dispatch({ type: ADD_ADDRESS_ERROR, payload: errorMessage});
  });
}

export const register = (props) => async (dispatch) => {
  const { callback, email, password, confirmPassword, firstName, lastName } = props;
  dispatch({ type: LOGIN});

  if(_.eq(password, confirmPassword)) {
    await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async(data) => {
      const response = await axios.post('/customers.json', {
        customer: {
          email: email,
          first_name: firstName,
          last_name: lastName,
        }
      });
      firestore()
      .collection('Users')
      .doc(data.user.uid)
      .set(response.data.customer)
      .then(() => {
        dispatch({ type: REGISTER_SUCCESS, payload: {...response.data.customer, uid: data.user.uid}});
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
    dispatch({ type: LOGIN_ERROR, payload: 'The Password Confirmation does not match.' });
  }
}

export const updateAccount = (props) => async (dispatch) => {
  const { callback, email, password, confirmPassword, firstName, lastName } = props;
  dispatch({ type: LOGIN});

  firestore()
  .collection('Users')
  .doc(data.user.uid)
  .set(response.data.customer)
  .then(() => {
    dispatch({ type: REGISTER_SUCCESS, payload: {...response.data.customer, uid: data.user.uid}});
    callback();
  })
  .catch(error => console.log(error));
}

export const fetchProducts = () => async (dispatch) => {
  let products = [];
  let uid = [];
  dispatch({ type: FETCH_PRODUCTS});
  await firestore()
  .collection('Products')
  .get()
  .then(querySnapshot => {
    console.log(querySnapshot);
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