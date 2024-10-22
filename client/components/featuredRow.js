import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import RestaurantCard from "./restaurantCard";
import { getFeaturedRestaurantById } from "../api";
import { themeColors } from "../theme";

export default function FeatureRow({ id, title, description }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getFeaturedRestaurantById(id);
        setRestaurants(data?.restaurants || []);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [id]);

  return (
    <View>
      {/* Başlık ve Açıklama Bölümü */}
      <View
        className="flex-row justify-between items-center px-5 py-1 mx-2 rounded-2xl"
        style={{ backgroundColor: themeColors.bgColor(0.7) }}
      >
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-gray-700 text-xs">{description}</Text>
        </View>

        <TouchableOpacity>
          <Text style={{ color: themeColors.text }} className="font-semibold">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Restaurant Kartları */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="overflow-visible py-5"
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant?.image}
            title={restaurant.name}
            rating={restaurant.rating}
            type={restaurant.type?.name}
            address="112 GMK Street"
            description={restaurant.description}
            dishes={restaurant.dishes}
            lng={restaurant.lng}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}
