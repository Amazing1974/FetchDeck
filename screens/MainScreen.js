import React, { useState } from 'react';
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
import { fetchProducts } from '../actions';
import Icon from 'react-native-vector-icons/EvilIcons';
import ProductCard from '../components/ProductCard';

const { width, height } = Dimensions.get('window');

const MainScreen = (props) => {

  const {navigation, countOfProducts, products} = props;
  const [mockData, setMockData] = useState(products.slice(0, countOfProducts < 9 ? countOfProducts : 8));
  const [currentPage, setCurrentPage] = useState(1);

  const CATGEGORY = ['ALL', 'FREE SHIPPING', 'HOME & HOMBBIES', 'ELECTRONIC', 'FASHION & BEAUTY', 'JEWELRY'];

  const renderHeaderBar = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="navicon" size={28} color={Palette.dark}/>
        </TouchableOpacity>
        <Image
          source={require('../assets/images/splash.jpeg')}
          style={styles.image}
        />
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

  const handleLoadMore = () => {
    if(countOfProducts > currentPage * 8) {
      setCurrentPage(currentPage + 1);
      setMockData([...mockData, ...products.slice(currentPage * 8 - 1, 8)]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeaderBar()}
      {renderCategory()}
      <FlatList
        data={mockData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (<ProductCard uid={item.uid} navigation={navigation} />)
        }}
        initialNumToRender={1}   // how many item to display first
        onEndReachedThreshold={1} // so when you are at 5 pixel from the bottom react run onEndReached function
        onEndReached={() => {
          handleLoadMore();
        }}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  countOfProducts: state.products.countOfProducts,
  products: state.products.products,
  user: state.auth.user,
});

export default connect(mapStateToProps, { fetchProducts })(MainScreen);

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
  image: {
    marginTop: 0,
    width: width - 240,
    height: height / 12,
  },
}