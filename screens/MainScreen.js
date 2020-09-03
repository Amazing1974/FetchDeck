import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import firestore from '@react-native-firebase/firestore';
import ProductCard from '../components/ProductCard';
import { Palette, GlobalStyles } from '../styles';
import { HOST } from '../constants';

const CATGEGORY = ['ALL', 'FREE SHIPPING', 'HOME & HOMBBIES', 'ELECTRONIC', 'FASHION & BEAUTY', 'JEWELRY'];

// axios.defaults.baseURL = HOST;
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['X-Shopify-Access-Token'] = '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';

const MainScreen = ({ navigation }) => {

  const [products, setProducts] = useState();
  
  function fetchData() {
    firestore()
    .collection('Products')
    .onSnapshot(querySnapshot => {
      let products = [];
      querySnapshot.forEach(snapshot => {
        let temp = snapshot.data()
        temp.uid = snapshot.id;
        products.push(temp);
      });
      setProducts(products);
    })
  }

  useEffect(() => {
    fetchData()
  }, []);

  const renderHeaderBar = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="navicon" size={28} color={Palette.dark}/>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          <Text style={styles.boldTitle}>FETCH</Text>
          <Text style={styles.headerTitle}>DECK</Text>
        </View>
      </View>
    )
  }

  const renderCategory = () => {
    return (
        <View style={[styles.headerContainer, {paddingHorizontal: 6}]}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              CATGEGORY.map((item, index) => {
                return (
                  <TouchableOpacity style={styles.cateContainer} key={index}>
                    <Text style={styles.cateTitle}>{item}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </ScrollView>
        </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeaderBar()}
      {renderCategory()}
      <ScrollView>
        {
          products && products.map((product) => {
            return (<ProductCard product={product} key={product.product.id} navigation={navigation} />);
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default MainScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  headerTitle: {
    fontSize: 22,
    color: Palette.purple,
    letterSpacing: 0.5,
  },
  boldTitle: {
    fontSize: 22,
    color: Palette.purple,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  headerContainer: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: Palette.grey,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  cateContainer: {
    paddingHorizontal: 8,
  },
}