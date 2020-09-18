import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  Modal,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Form, Spinner } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { Palette, GlobalStyles } from '../styles'
import { updateProfile, addAddress } from '../actions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import axios from 'axios';

const ShippingAddress = (props) => {
  
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [arrAddress, setArrAddress] = useState();

  useEffect(() => {
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

  const deleteAddress = (customer_id, address_id) => {
    axios.delete(`/customers/${customer_id}/addresses/${address_id}.json`)
    .then(res => {
      getAddress();
    })
    .catch(err => {
      console.log(err);
    })
  }

  const renderModal = () => {
    if(!isVisibleModal) {
      return null;
    }

    return(
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVisibleModal}
      >
        <View style={{width: '100%', height: 59, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{'Add Shipping Address'}</Text>
          <TouchableOpacity
            onPress={() => setVisibleModal(false)}
            style={{position: 'absolute', top: 20, left: 20}}>
            <AntDesign name="arrowleft" size={20} color={Palette.black}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={{padding: 10}}>
          <Form style={GlobalStyles.form}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, paddingRight: 10}}>
                <Field
                  name="first_name"
                  component={CustomInput}
                  floatLabel={'First Name'}
                  autoCorrect={false}
                />
              </View>
              <View style={{flex: 1}}>
                <Field
                  name="last_name"
                  component={CustomInput}
                  floatLabel={'Last Name'}
                  autoCorrect={false}
                />
              </View>
            </View>
            <Field
              name="address1"
              component={CustomInput}
              floatLabel={'Address1'}
              autoCorrect={false}
            />
            <Field
              name="address2"
              component={CustomInput}
              floatLabel={'Address2 (Optionsal)'}
              autoCorrect={false}
            />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, paddingRight: 10}}>
                <Field
                  name="city"
                  component={CustomInput}
                  floatLabel={'City'}
                  autoCorrect={false}
                />
              </View>
              <View style={{flex: 1}}>
                <Field
                  name="province"
                  component={CustomInput}
                  floatLabel={'Province'}
                  autoCorrect={false}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, paddingRight: 10}}>
                <Field
                  name="country"
                  component={CustomInput}
                  floatLabel={'Country'}
                  autoCorrect={false}
                />
              </View>
              <View style={{flex: 1}}>
                <Field
                  name="zip"
                  component={CustomInput}
                  floatLabel={'Zip Code'}
                  autoCorrect={false}
                />
              </View>
            </View>            
            <Field
              name="phone"
              component={CustomInput}
              floatLabel={'Phone'}
              autoCorrect={false}
            />
            <Text style={[GlobalStyles.errorMessage, {textAlign: 'center', marginTop: 40, marginBottom: 10}]}>{props.errorMessage}</Text>
            {renderSaveButton()}
          </Form>
        </ScrollView>
      </Modal>
    )
  }

  const renderSaveButton = () => {
    if (props.isLoading) { 
      return <Spinner color={Palette.green} />;
    }

    const { handleSubmit } = props;
    
    return(
      <View style={{marginBottom: 40, flexDirection: 'row'}}>
        <Button
          title={'Save'}
          onPress={handleSubmit(onSave)}
          style={{backgroundColor: Palette.green}}
        />
      </View>
    )
  }
  
  const onSave = (data) => {
    props.addAddress({id: props.user.id, address: data}, () => {setVisibleModal(false)});
    getAddress();
  }

  const renderAddressList = () => {
    if(!arrAddress.length) {
      return <Text style={styles.noShipping}>{'No Shipping Address'}</Text>
    }

    return (
      <FlatList
        data={arrAddress}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          console.log(item);
          return (
            <View style={{backgroundColor: Palette.white}}>
              <TouchableOpacity
                onPress={() => deleteAddress(item.customer_id, item.id)}
                style={{position: 'absolute', top: 10, right: 10, zIndex: 1}}>
                <Text style={{color: Palette.blue}}>{'Delete'}</Text>
              </TouchableOpacity>
              <View style={{padding: 10}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.first_name + ' ' + item.last_name}</Text>
                <Text>{item.address1 && item.address1 + ' ' + item.address2 && item.address2}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>{item.city && item.city + ' '}</Text>
                  <Text>{item.province && item.province + ' '}</Text>
                  <Text>{item.country_name && item.country_name + ' '}</Text>
                </View>
                <Text>{item.zip && item.zip}</Text>
              </View>
              <View style={{width: '100%', height: 1, backgroundColor: Palette.overlay, paddingLeft: -100}} />
            </View>
          )
        }}
      />
    )
  }

  const renderAddShippingBtn = () => {
    return(
      <View style={{position: 'absolute', left: 20, right: 20, bottom: 40}}>
        <Button
          title={'Add Shipping Address'}
          onPress={() => setVisibleModal(true)}
          style={{backgroundColor: Palette.blue}}
        />
      </View>
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {arrAddress && renderAddressList()}
      {renderAddShippingBtn()}
      {renderModal()}
    </SafeAreaView>
  )
}

const mapStateProps = state => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
  errorMessage: state.auth.error
})

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const ShippingAddressForm = reduxForm({
  form: 'shippingAddressForm' // a unique identifier for this form
})(ShippingAddress);

export default connect(mapStateProps, { updateProfile, addAddress })(ShippingAddressForm);

const styles = {
  container: {
    flex: 1,
  },
  noShipping: {
    textAlign: 'center',
    marginTop: 20
  }
}