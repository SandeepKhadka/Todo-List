import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useFonts } from "expo-font";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  loadData();
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
        right: 10,
      }}
      onPress={onPress}
    >
      <FontAwesome size={28} name="close" color={"#05050548"} />
    </Pressable>
  );
}

const loadData = async () => {
  try {
    const storedData = await AsyncStorage.getItem("data");
    if (storedData) {
      console.log("Retrieved Data", JSON.parse(storedData));
    } else {
      console.log("No data found");
    }
  } catch (error) {
    console.error("Error saving data", error);
    Alert.alert(`Error Failed to save data${error}`);
  }
};
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
