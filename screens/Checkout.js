import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  Dimensions
} from 'react-native';
import { Palette, GlobalStyles } from '../styles';
import firestore from '@react-native-firebase/firestore';
import { CreditCardInput, LiteCreditCardInput } from "react-native-input-credit-card";
import axios from 'axios';
import Button from '../components/Button';
import Client from 'shopify-buy';

const Checkout = (props) => {

  const [isLoading, setLoading] = useState();
  const [product, setProduct] = useState();
  const [buyer, setBuyer] = useState();
  const [price, setPrice] = useState();
  const [variantId, setVariantId] = useState();
  const [variantType, setVariantType] = useState();
  const [variantValue, setVariantValue] = useState();
  const [arrAddress, setArrAddress] = useState();
  const [addressId, setAddressId] = useState();
  const [shippingAddress, setShippingAddress] = useState();
  const [cardValid, setCardValid] = useState(false);

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(props.user.uid)
      .collection('Order')
      .doc('checkout')
      .get()
      .then(snapshot => {
        setPrice(snapshot.data().price);
        firestore()
        .collection('Products')
        .doc(snapshot.data().productID)
        .get()
        .then(snapshot => {
          setBuyer(snapshot.data().bid.seller_name);
          setProduct(snapshot.data().product);
        })
      })
      .catch(err => console.log(err));
    getAddress();
  }, []);

  const getAddress = () => {
    axios.get(`/customers/${props.user.id}/addresses.json`)
    .then(res => {
      setArrAddress(res.data.addresses);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const renderHeader = () => {
    return(
      <View style={{backgroundColor: Palette.white, padding: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: product.image.src}} style={{width: 100, height: 100}} />
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.headerTitle}>{product.title}</Text>
            <Text style={styles.price}>{`$${price}`}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
          <Text style={GlobalStyles.darkLabel}>{`Sold by: `}</Text>
          <Text style={GlobalStyles.label}>{buyer}</Text>
        </View>
        {
          variantType && (
            <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
              <Text style={GlobalStyles.darkLabel}>{`${variantType}: `}</Text>
              <Text style={GlobalStyles.label}>{variantValue}</Text>
              <TouchableOpacity
                onPress={() => setVariantType(null)}
                style={{position: 'absolute', right: 10}}>
                <Text style={{color: Palette.blue}}>{'Edit'}</Text>
              </TouchableOpacity>
            </View>
          )
        }
        {
          addressId && (
            <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
              <Text style={GlobalStyles.darkLabel}>{'Address_Id: '}</Text>
              <Text style={GlobalStyles.label}>{addressId}</Text>
              <TouchableOpacity
                onPress={() => setAddressId(null)}
                style={{position: 'absolute', right: 10}}>
                <Text style={{color: Palette.blue}}>{'Edit'}</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    )
  }

  const renderOptions = () => {
    if(variantType) return null;

    return(
      <View style={{backgroundColor: 'white', marginTop: 10, padding: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{'Choose a Color / Size'}</Text>
        {
          product.variants.map(variant => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setVariantId(variant.id);
                  setVariantType(product.options[0].name);
                  setVariantValue(variant.option1);
                }}
                style={{flexDirection: 'row', paddingVertical: 4, marginTop: 10}}
                key={variant.id}>
                <Text style={{fontSize: 16}}>{`${product.options[0].name}: `}</Text>
                <Text style={{fontSize: 16}}>{variant.option1}</Text>
                <Text style={{fontSize: 16}}>{product.options[1] && ` / ${product.options[1].name}: `}</Text>
                <Text style={{fontSize: 16}}>{variant.option2 && variant.option2}</Text>
                <Text style={{fontSize: 16}}>{product.options[2] && ` / ${product.options[2].name}: `}</Text>
                <Text style={{fontSize: 16}}>{variant.option3 && variant.option3}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  const renderShippingAddress = () => {
    if(!variantType) return null;
    if(addressId) return null;

    return(
      <View style={{backgroundColor: 'white', marginTop: 10, padding: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{'Your Shipping Address'}</Text>
        {
          arrAddress ? arrAddress.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setShippingAddress(item);
                  setAddressId(item.id);
                }}
                style={{backgroundColor: Palette.white}}
                key={item.id}>
                <View style={{padding: 10}}>
                  <Text style={{fontSize: 18}}>{item.first_name + ' ' + item.last_name}</Text>
                  <Text>{item.address1 && item.address1 + ' ' + item.address2 && item.address2}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text>{item.city && item.city + ' '}</Text>
                    <Text>{item.province && item.province + ' '}</Text>
                    <Text>{item.country_name && item.country_name + ' '}</Text>
                  </View>
                  <Text>{item.zip && item.zip}</Text>
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: Palette.overlay, paddingLeft: -100}} />
              </TouchableOpacity>
            )
          }) : (
            <Text>{'Select Shipping Address'}</Text>
          )
        }
      </View>
    )
  }

  const renderPaymentMethod = () => {
    if(_.isNull(addressId) || !variantType) return null;

    return(
      <View style={{backgroundColor: 'white', marginTop: 10, padding: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>{'Add Your Payment Method'}</Text>
        <LiteCreditCardInput
          onChange={form => setCardValid(form.valid)}
        />
      </View>
    )
  }

  const client = Client.buildClient({
    domain: 'fetchdeckdev.myshopify.com',
    storefrontAccessToken: 'your-storefront-access-token'
  });

  const onCompletePayment = () => {
    console.log(variantId);
    console.log(props.user.id);
    console.log(shippingAddress);

    let orderData = {
      order: {
        line_items: [
          {
            variant_id: variantId,
            quantity: 1,
          }
        ],
        customer: {
          id: props.user.id
        },
        financial_status: 'pending',
        shipping_address: shippingAddress,
      }
    }


  }

  const renderCompletePaymentBtn = () => {
    // if (props.isLoading) { 
    //   return <Spinner color={Palette.green} />;
    // }
    
    return(
      <View style={{marginBottom: 20, paddingTop: 10, flexDirection: 'row', marginHorizontal: 10}}>
        <Button
          title={'COMPLETE PAYMENT'}
          onPress={onCompletePayment}
          style={{backgroundColor: cardValid ? Palette.green : Palette.overlay}}
          disabled={!cardValid}
        />
      </View>
    )
  }

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {product && renderHeader()}
        {product && renderOptions()}
        {renderShippingAddress()}
        {renderPaymentMethod()}
      </ScrollView>
      {renderCompletePaymentBtn()}
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Checkout);

const styles = {
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    width: 300
  },
  price: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: 'bold'
  }
}