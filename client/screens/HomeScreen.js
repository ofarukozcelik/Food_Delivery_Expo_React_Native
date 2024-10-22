import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Categories from "../components/categories";
import FeatureRow from "../components/featuredRow";
import { getFeaturedRestaurants } from "../api";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";

export default function HomeScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const fetchFeaturedRestaurants = async () => {
      try {
        const data = await getFeaturedRestaurants();
        setFeaturedCategories(data);
      } catch (error) {
        console.error("Öne çıkan restoranları getirirken hata oluştu.", error);
      }
    };
    fetchFeaturedRestaurants();
  }, []);

  const iconStrokeColor = themeColors.text;

  return (
    <SafeAreaView style={{ backgroundColor: themeColors.bgColor(0.5) }}>
      <StatusBar barStyle="dark-content" />

      <View className="flex-row items-center space-x-2 px-4 pb-2 mt-3">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-400">
          <Icon.Search height="25" width="25" stroke={iconStrokeColor} />
          <TextInput
            placeholder="Restaurants"
            className="ml-2 flex-1"
            keyboardType="default"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke={iconStrokeColor} />
            <Text className="text-gray-600">Ankara, TR</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 rounded-full"
        >
          <Icon.Sliders
            height={20}
            width={20}
            strokeWidth="2.5"
            stroke="white"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <Categories />

        <View className="mt-5">
          {featuredCategories.map((category) => (
            <FeatureRow
              key={category._id}
              id={category._id}
              title={category.name}
              restaurants={category?.restaurants}
              description={category.description}
              featuredCategory={category._type}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
