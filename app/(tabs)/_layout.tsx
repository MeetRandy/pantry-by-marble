import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hide tab labels
        tabBarActiveTintColor: "#E3E4DF", // Light gray (active)
        tabBarInactiveTintColor: "#A5A896", // Muted greenish-gray (inactive)
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarItemStyle: {padding: 5},
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: "#54634B", // Match background color from the image
            position: 'absolute',
            borderTopWidth: 0, // Remove top border
          },
          android: {
            backgroundColor: "#54634B",
            borderTopWidth: 0,
          },
          default: {
            backgroundColor: "#54634B",
            borderTopWidth: 0,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="storefront-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: 'Favourite',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="heart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="search-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="cart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="person-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
