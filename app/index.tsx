import { Image, StyleSheet, useColorScheme } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
const Todo = () => {
  const theme = useColorScheme();
  const backgroundColor = theme === "light" ? "#50C2C9" : "white";
  const [openTaskForm, setTaskForm] = useState(false);
  const [updatedValue, setUpdatedValue] = useState("");
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins SemiBold.ttf"),
  });
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView
        style={{
          flex: 0.4,
          backgroundColor: theme === "light" ? "#50C2C9" : "#fefefe",
          justifyContent: "center",
          alignItems: "center",
          gap: 5
        }}
      >
        <ThemedView style={styles.profileCircle}>
          <Image source={require("../assets/images/user.png")} />
        </ThemedView>
        <ThemedText
          style={{ color: theme === "light" ? "black" : "black", fontSize: 20, fontWeight: 'bold',fontFamily: "Poppins-SemiBold"}}
          type="title"
        >
          Welcome User
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.bottomContainer}>
        <ThemedView style={styles.topText}>
          {/* <ThemedText style={styles.greet}>Good Afternoon</ThemedText> */}
        </ThemedView>
        <ThemedView style={styles.task}>
          {openTaskForm && (
            <TaskForm
              updatedValue={updatedValue}
              setUpdatedValue={setUpdatedValue}
              onPress={() => {
                setUpdatedValue("");
                setTaskForm(false);
              }}
            />
            // <TaskModal
            //   onPress={() => {
            //     setTaskForm(false);
            //   }}
            // />
          )}
          <ThemedText
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            Task list
          </ThemedText>
          <TaskCard
            openTaskForm={openTaskForm}
            setTaskForm={setTaskForm}
            setUpdatedValue={setUpdatedValue}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default Todo;

const styles = StyleSheet.create({
  upperContainer: {},
  bottomContainer: { flex: 1, marginRight: 20, marginLeft: 20 },
  topText: {},
  greet: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    marginTop: 15,
  },
  task: {
    marginTop: 10,
    flex: 0.95,
  },
  profileCircle: {
    width: 100, // Diameter of the circle
    height: 100,
    borderRadius: 50, // Half of width/height
    borderWidth: 1, // Thickness of the border
    borderColor: "black", // Border color
    justifyContent: "center", // Optional, for aligning content inside
    alignItems: "center", // Optional, for aligning content inside
  },
});
