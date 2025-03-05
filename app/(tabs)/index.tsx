import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import Divider from '../../components/ui/Divider'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMeals } from "../../context/mealsProvider";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { router } from 'expo-router';

const categories = ["All", "Beef", "Fish", "Pork", "Poultry"];

const categoryMapping = [
  { key: 'All', value: 'all' },
  { key: 'Beef', value: 'beef' },
  { key: 'Fish', value: 'seafood' },
  { key: 'Pork', value: 'pork' },
  { key: 'Poultry', value: 'chicken' },
];

export default function index() {
  const [selected, setSelected] = useState("all");
  const { meals, loading } = useMeals();
  const dispatch = useDispatch();

  const allMeals = [
    ...meals.fish || [],
    ...meals.pork || [],
    ...meals.beef || [],
    ...meals.chicken || [],
  ];

  const handleCategoryChange = (filterName: string) => {
    const category = categoryMapping.find((item) => item.key === filterName)?.value;
    if (category) {
      setSelected(category);
    }
  };

  const handleAddToCart = (item: any) => {
    const newItem = {
      id: "3",
      name: item.srtMeal,
      price: 250.0,
      quantity: 1,
      image: item.strMealThumb,
    };
    dispatch(addItem(newItem));
  };

  const data = selected === 'all' ? allMeals : meals[selected] || [];

  if (loading) return <ActivityIndicator size="large" color="#54634B" />

  return (
    <SafeAreaView style={{ backgroundColor: 'white', padding: 16 }} >
      <View style={styles.topheader}>
        <View style={styles.columnleft}>
          <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', gap: 5 }}>
            <Ionicons size={20} name={'chevron-back'} color="#54634B" />
            <Text style={{ color: '#54634B' }}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columnright}>
          <Text style={{ color: "#54634B" }}>Filter</Text>
          <Ionicons size={20} name={'options'} color="#54634B" />
        </View>
      </View>

      <View>
        <Text style={[styles.title]}>Meat</Text>
        <Divider />
      </View>

      <View style={styles.chipsContainer}>
        {categoryMapping.map((category) => (
          <Pressable
            key={category.value}
            onPress={() => handleCategoryChange(category.key)}
            style={[styles.chip, selected === category.key && styles.chipSelected]}
          >
            <Text style={[styles.text, selected === category.value && styles.textSelected]}>
              {category.key}
            </Text>
          </Pressable>
        ))}
      </View>

      <View>
        <Text style={styles.smallprint}>Based on your selection</Text>
        <Text style={styles.subtitle}>Our products</Text>
      </View>


      <FlatList showsVerticalScrollIndicator={false} data={data} numColumns={2} renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.strMealThumb }} style={styles.image} />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
              {item.strMeal.length > 20 ? `${item.strMeal.substring(0, 20)}...` : item.strMeal}
          </Text>
          <View style={styles.priceRow}>
            <Text allowFontScaling style={styles.price}>R XXX.XX</Text>
            <TouchableOpacity onPress={(item) => handleAddToCart(item)} style={styles.cartButton}>
              <Ionicons name="cart-outline" size={18} color="#2E4B26" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      />

    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  topheader: {
    flexDirection: "row",  // Places children in a row
    justifyContent: "space-between",  // Spaces columns evenly
    marginBottom: 24,
  },
  columnleft: {
    flex: 1,  // Makes each column take equal space
    flexDirection: "row",

    alignItems: "flex-start",  // Centers text horizontally
    justifyContent: "flex-start",  // Centers text vertically
    borderRadius: 10,
    gap: 10,
  },
  columnright: {
    flex: 1,  // Makes each column take equal space
    flexDirection: "row",
    justifyContent: "flex-end",  // Centers text vertically
    borderRadius: 10,
    gap: 10
  },
  title: {
    fontSize: 40,
    color: '#54634B',
    fontFamily: 'AGaramondProBold',
    lineHeight: 50,
  },
  subtitle: {
    fontSize: 30,
    fontFamily: 'AGaramondProBold',
    color: '#54634B',
    lineHeight: 40
  },
  smallprint: {
    fontSize: 12,
    fontFamily: 'Avenir',
    lineHeight: 16,
    color: '#54634B'
  },
  chipsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  chip: {
    paddingHorizontal: 0,
    paddingVertical: 5,
    borderRadius: 15,
  },
  chipSelected: {
    backgroundColor: "transparent", // Keeps it minimal like in the image
  },
  text: {
    fontSize: 16,
    color: "#A0A0A0", // Inactive color
    fontFamily: 'Avenir'
  },
  textSelected: {
    color: "#2E4B26", // Active color (dark green)
    fontWeight: "bold",
    fontFamily: 'Avenir'
  },
  card: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: "white",
    borderRadius: 6,
    padding: 6,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 6,
  },
  name: {
    fontSize: 14,
    color: "#A0A0A0",
    flexWrap: 'wrap',
    fontFamily: 'Avenir',
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  price: {
    fontSize: 16,
    color: "#2E4B26",
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 80,
    borderColor: "#2E4B26",
    borderWidth: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Adjusts spacing between columns
    //marginHorizontal: 10, 
    //paddingHorizontal: 10// Optional: Adds horizontal margin to the entire row
  },
});