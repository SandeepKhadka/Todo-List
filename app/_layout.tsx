import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const RootLayout = () => {
  const theme = useColorScheme() ?? "light";
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[theme].background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
