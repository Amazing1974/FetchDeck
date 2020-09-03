import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ProgressBar from '../components/ProgressBar';
import { Spinner } from 'native-base';
import { Palette, GlobalStyles } from '../styles';

const ProductCard = ({product, navigation}) => {

  const [isLoading, setLoading] = useState(false);
  const [randomBuyers, setRandomBuyers] = useState();
  const [buyer, setBuyer] = useState();
  const [myName, setMyName] = useState('Jal');
  const [isSold, setSold] = useState(false);
  const progressBarRef = useRef();

  useEffect(() => {
    fetchBuyer();
  }, []);

  const fetchBuyer = () => {
    let buyers = [];
    firestore().collection('RandomUser').get()
    .then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        buyers.push(snapshot.data().name);
      })
      setRandomBuyers(buyers);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const onBid = async(auto) => {
    setLoading(true);
    let updatedBid = product.bid;
    updatedBid.current_bid = product.bid.current_bid + 1;
    updatedBid.winning_name = buyer;
    console.log(buyer);

    await firestore().collection('Products').doc(product.uid).update({ bid: updatedBid })
    .then(() => {
      progressBarRef.current.resetProgressBar();
      if(!auto) {
        setBuyer(myName);
      }
    })
    .catch(error => {
      console.log(error);
    })
    
    setLoading(false);
  }
  
  const onChangeBuyer = () => {
    console.log('===========onChangeBuyer');
    if(randomBuyers) {
      let temp = randomBuyers;
      temp = temp.sort(() => Math.random() - 0.5); // sort product random
      setBuyer(temp[0]);
    }
  }

  const onSold = () => {
    console.log(buyer);
    setSold(true);
  }

  const image = product && product.product.images[0].src;
  const current_bid = product && product.bid.current_bid;
  const seller_name = product && product.bid.seller_name;
  const ranNum = Math.random() * 10000 % 300;
  return (
    <View style={styles.cateContainer}>
      <View style={styles.splitBar} />
      <View style={{flexDirection: 'row'}}>
        {/** Left Panel */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', { product: product.product, sellerName: seller_name })}
          style={styles.leftPan}>
          <Image source={image && {uri: image}} style={{flex: 1}} />
        </TouchableOpacity>
        {/** Right Panel */}
        <View style={{flex: 1, marginLeft: 4}}>
          {
            !isSold ? (
              <TouchableOpacity
                onPress={() => onBid(false)}
                style={styles.priceBox}>
                  {
                    isLoading ? (
                      <Spinner color={Palette.white} style={{height: 47}} />
                    ) : (
                      <View style={{alignItems: 'center'}}>
                        <Text style={styles.priceTitle}>{`BID $${current_bid + 1}`}</Text>
                        <Text style={styles.priceSubTitle}>+ FREE SHIPPING</Text>
                      </View>
                    )
                  }
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.priceBox,
                  {
                    backgroundColor: Palette.white,
                    borderWidth: 1,
                    borderColor: Palette.dark,
                    borderRadius: 4,
                  }]}>
                  {
                    isLoading ? (
                      <Spinner color={Palette.white} style={{height: 47}} />
                    ) : (
                      <View style={{alignItems: 'center', height: 47, justifyContent: 'center'}}>
                        <Text style={[styles.priceTitle, {fontSize: 24, letterSpacing: 3, color: Palette.dark}]}>{`SOLD`}</Text>
                      </View>
                    )
                  }
              </TouchableOpacity>
            )
          }
          {
            !isSold && (
              <View style={styles.progressContainer}>
                <ProgressBar
                  ref={progressBarRef}
                  price={product.product.variants[0].price}
                  current_bid={current_bid}
                  onBid={() => onBid(true)}
                  reserve={ranNum < 200 ? ranNum < 100 ? ranNum + 150 : ranNum + 50 : ranNum}
                  onChangeBuyer={() => onChangeBuyer()}
                  onSold={() => onSold()}
                />
              </View>
            )
          }
          {
            !isSold ? (
              <Text style={styles.acceptBids}>ACCEPTING BIDS</Text>
            ) : null
          }
          {
            !isSold && buyer && (
              <View style={{flexDirection: 'row'}}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarTitle}>{buyer.slice(0, 1)}</Text>
                </View>
                <View>
                  <Text style={styles.userName}>{buyer}</Text>
                  <Text style={GlobalStyles.darkLabel}>IS WINNING</Text>
                </View>
              </View>
            )
          }
        </View>
      </View>
      <Text style={{...GlobalStyles.darkLabel, marginVertical: 10}}>{'1 BID'}</Text>
    </View>
  )
}

export default ProductCard;

const styles = {  
  cateContainer: {
    paddingHorizontal: 8,
  },
  cateTitle: {
    ...GlobalStyles.label,
  },
  splitBar: {    
    height: 8,
    backgroundColor: Palette.light,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 8,
  },
  leftPan: {
    flex: 1,
    backgroundColor: Palette.overlay,
    borderRadius: 4,
    height: 180,
    marginRight: 4,
  },
  priceBox: {
    borderTopRightRadius: 4,
    borderTopStartRadius: 4,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.lightBlue,
  },
  priceTitle: {
    color: Palette.white,
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 0.6
  },
  priceSubTitle: {
    color: Palette.white,
    letterSpacing: 0.6
  },
  progressContainer: {
    borderBottomLeftRadius: 4,
    borderBottomEndRadius: 4,
    backgroundColor: Palette.overlay,
    height: 10,
  },
  acceptBids: {
    color: Palette.purple,
    marginVertical: 5
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  avatarTitle: {
    color: Palette.white,
    fontWeight: 'bold',
    fontSize: 18
  },
  userName: {
    ...GlobalStyles.darkLabel,
    fontWeight: 'bold'
  }
}