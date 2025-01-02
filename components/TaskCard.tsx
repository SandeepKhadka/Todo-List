import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useFonts } from "expo-font";
import { Controller, useForm } from "react-hook-form";
import { Link, Stack } from "expo-router";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import TaskModal from "./TaskModal";

export default function TaskCard({ openTaskForm, setTaskForm }: any) {
  const [isChecked, setChecked] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins SemiBold.ttf"),
  });
  const taskData = [
    "Wake up at 7am",
    "Learn DSA by 9am",
    "Do the chores by 12pm",
    "Start coding after 12pm",
    "Do Coding upto 5pm",
    "Eat meal for gym by 6pm",
    "Go to gym and return by 8pm",
    "Do chores by 9pm",
    "Learn new topics by 10pm",
    "Learn Book by 11pm",
    "Go to Sleep after 11pm",
  ];
  return (
    <>
      <View style={styles.taskCard}>
        <View style={styles.taskHeader}>
          <ThemedText
            style={{
              color: "#000000",
              fontFamily: "Poppins-SemiBold",
              fontSize: 12,
              width: "80%",
            }}
          >
            Daily Task
          </ThemedText>
          <AddTask
            onPress={() => {
              setTaskForm(true);
            }}
          />
        </View>
        <FlatList
          data={taskData}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <View style={styles.taskLists}>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#4630EB" : undefined}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 12,
                  width: "100%",
                }}
              >
                {item}
              </Text>
            </View>
          )}
        />
      </View>
    </>
  );
}

function AddTask({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome size={25} name="plus" color={"#50C2C9"} />
    </Pressable>
  );
}

export function CloseTaskForm({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      style={{
        position: "absolute",
        top: 0,
        right: 0,
      }}
      onPress={onPress}
    >
      <FontAwesome size={22} name="close" color={"#05050548"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 15,
    borderWidth: 2,
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    borderColor: "#ffffff",
    borderRadius: 10,
  },
  taskHeader: {
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  taskLists: {
    flexDirection: "row",
    width: "100%",
    margin: 10,
  },
  container: { width: "100%", padding: 10 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    color: "black",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
