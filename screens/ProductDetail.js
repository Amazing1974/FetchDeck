import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import axios from 'axios';
import ViewPager from '@react-native-community/viewpager';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTML from "react-native-render-html";
import firestore from '@react-native-firebase/firestore';
import { Palette, GlobalStyles } from '../styles';

const ProductDetail = ({ navigation, route }) => {

  const [product, setProduct] = useState(route.params.product);
  const [sellerName, setSellerName] = useState(route.params.sellerName);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      title: 'Details',
    });
  }, []);

  const onPageSelected = (event) => {
    const {position} = event.nativeEvent;
    setCurrentPage(position);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

          {/** Images */}
          <View>
            <ViewPager
              style={styles.viewPager}
              initialPage={0}
              onPageSelected={onPageSelected}
            >
              {
                product && product.images.map(image => {
                  return (
                    <View key={image.id}>
                      <Image source={image && {uri: image.src}} style={styles.image} />
                    </View>
                  )
                })
              }
            </ViewPager>
            <View
              style={{
                width: 60,
                height: 30,
                backgroundColor: '#ffffff88',
                borderRadius: 15,
                position: 'absolute',
                right: 10,
                bottom: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={GlobalStyles.darkLabel}>{product && `${currentPage + 1}/${product.images.length}`}</Text>
            </View>
          </View>

          <View style={styles.content}>

            {/** Title */}
            <Text style={GlobalStyles.label}>{product && product.title}</Text>

            {/** Retail Price */}
            <View style={styles.icon}>
              <AntDesign name="infocirlce" size={20} color={Palette.black}/>
              <Text style={styles.headerTitle}>Retail Price</Text>
            </View>
            <View style={{height: 1, backgroundColor: Palette.dark}}/>
            <Text style={{...GlobalStyles.label, marginTop: 10}}>The Retail Price is set by the Merchant selling this item. The discount shown is based off this merchant provided price. We value your feedback. If you believe the merchant-set price is inaccurate, please report this item below.</Text>

            {/** Shipping */}
            <View style={styles.icon}>
              <MaterialIcons name="local-shipping" size={24} color={Palette.black}/>
              <Text style={styles.headerTitle}>Shipping</Text>
            </View>
            <View style={{height: 1, backgroundColor: Palette.dark}}/>
            <Text style={{...GlobalStyles.label, marginTop: 10}}>
              FREE shipping - delivered to you between September 1 and September 3.
            </Text>

            {/** Ratings & Reviews */}
            <View style={styles.icon}>
              <MaterialIcons name="star" size={24} color={Palette.black}/>
              <Text style={styles.headerTitle}>Ratings & Reviews</Text>
            </View>
            <View style={{height: 1, backgroundColor: Palette.dark}}/>
            <View style={{flexDirection: 'row', paddingTop: 10, alignItems: 'center'}}>
              <MaterialIcons name="star" size={30} color={Palette.orange}/>
              <MaterialIcons name="star" size={30} color={Palette.orange}/>
              <MaterialIcons name="star-half" size={30} color={Palette.orange}/>
              <MaterialIcons name="star-border" size={30} color={Palette.orange}/>
              <MaterialIcons name="star-border" size={30} color={Palette.orange}/>

              <Text style={{...GlobalStyles.label, fontWeight: 'bold', fontSize: 20}}>
                2.6
              </Text>
            </View>

            {/** Description */}
            <View style={styles.icon}>
              <MaterialIcons name="description" size={24} color={Palette.black}/>
              <Text style={styles.headerTitle}>Description</Text>
            </View>
            <View style={{height: 1, backgroundColor: Palette.dark, marginBottom: 10}}/>
            { product && (<HTML html={product.body_html} />) }

            {/** Easy Returns */}
            <View style={styles.icon}>
              <FontAwesome name="shield" size={22} color={Palette.black}/>
              <Text style={styles.headerTitle}>Easy Returns</Text>
            </View>
            <View style={{height: 1, backgroundColor: Palette.dark}}/>
            <Text style={{...GlobalStyles.label, marginTop: 10}}>
              We want you to be completely satisfied with your purchase on Fetch Deck. If you are not satisfied you may return any item within 30 days of delivery.
            </Text>

            {/** Seller */}
            <View style={styles.icon}>
              <Ionicons name="person" size={20} color={Palette.black}/>
              <Text style={styles.headerTitle}>Seller</Text>
            </View>
            <View style={{height: 1, backgroundColor: Palette.dark}}/>
            <Text style={{...GlobalStyles.label, marginTop: 10}}>
              {sellerName}
            </Text>

          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductDetail;

const styles = {
  container: {
    flex: 1,
    
  },
  viewPager: {
    height: 400,
  },
  image: {
    flex: 1,
    resizeMode: 'contain'
  },
  content: {
    padding: 14,
    paddingTop: 20,
    backgroundColor: Palette.white
  },
  icon: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    ...GlobalStyles.label,
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16
  }
}