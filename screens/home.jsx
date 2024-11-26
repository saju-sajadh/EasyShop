import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuth } from "@clerk/clerk-expo";
import Sidebar from "../components/sidebar";
import {
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomeScreen = () => {
  const { isSignedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Fruits & Vegetables",
      image: require("../assets/fruits.png"),
    },
    { id: 2, name: "Meat & Seafood", image: require("../assets/meat.png") },
    { id: 3, name: "Dairy & Eggs", image: require("../assets/dairy.png") },
    { id: 4, name: "Beverages", image: require("../assets/beverages.png") },
    {
      id: 5,
      name: "Snacks & Sweets",
      image: require("../assets/snacks.png"),
    },
    {
      id: 6,
      name: "Household Essentials",
      image: require("../assets/household.png"),
    },
  ]);

  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 1,
      name: "Apple",
      image: require("../assets/fruits.png"),
      price: 1.99,
    },
    {
      id: 2,
      name: "Banana",
      image: require("../assets/meat.png"),
      price: 0.99,
    },
    {
      id: 3,
      name: "Milk",
      image: require("../assets/snacks.png"),
      price: 2.99,
    },
    {
      id: 4,
      name: "Bread",
      image: require("../assets/household.png"),
      price: 1.49,
    },
  ]);

  const [weeklyDeals, setWeeklyDeals] = useState([
    {
      id: 1,
      name: "Chicken Breast",
      image: require("../assets/dairy.png"),
      price: 4.99,
      discount: 20,
    },
    {
      id: 2,
      name: "Salmon",
      image: require("../assets/meat.png"),
      price: 7.99,
      discount: 15,
    },
    {
      id: 3,
      name: "Eggs",
      image: require("../assets/snacks.png"),
      price: 2.49,
      discount: 10,
    },
    {
      id: 4,
      name: "Yogurt",
      image: require("../assets/household.png"),
      price: 1.99,
      discount: 5,
    },
  ]);

  return (
    <View style={styles.container}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <View style={styles.searchbarContainer}>
        {isSignedIn && (
          <TouchableOpacity
            onPress={() => setIsSidebarOpen(true)}
            style={styles.menuButton}
          >
            <Entypo name="menu" size={24} color="black" />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.searchbar}
          placeholder="Search for products..."
        />
        {!isSignedIn && (
          <TouchableOpacity
            onPress={() => navigation.navigate("signin")}
            style={styles.searchButton}
          >
            <AntDesign name="user" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryItem}>
                <Image source={item.image} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.featuredProductsContainer}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={featuredProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productItem}>
                <Image source={item.image} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.freshProduceContainer}>
          <Text style={styles.sectionTitle}>Fresh Produce</Text>
          <Image
            source={require("../assets/fresh-produce.png")}
            style={styles.freshProduceImage}
          />
        </View>
        <View style={styles.weeklyDealsContainer}>
          <Text style={styles.sectionTitle}>Weekly Deals</Text>
          <FlatList
            data={weeklyDeals}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productItem}>
                <Image source={item.image} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                <Text style={styles.discountText}>-{item.discount}%</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    height: 56,
  },
  searchbar: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  searchButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  menuButton: {
    marginRight: 8,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoryItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  categoryImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  categoryText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
  featuredProductsContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productItem: {
    alignItems: "center",
    marginHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  productTitle: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
  discountText: {
    marginTop: 4,
    fontSize: 12,
    color: "#f00",
  },
  freshProduceContainer: {
    marginTop: 16,
  },
  freshProduceImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  weeklyDealsContainer: {
    marginTop: 16,
  },
});

export default HomeScreen;
