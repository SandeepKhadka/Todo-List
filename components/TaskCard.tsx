import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoragePermission from "@/hooks/useStoragePermission";
import DragAndDropCard from "./DragandDrop";

export default function TaskCard({
  openTaskForm,
  setTaskForm,
  setUpdatedValue,
}: any) {
  const [data, setData] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins SemiBold.ttf"),
  });
  const loadAndCombineData = async () => {
    try {
      const todosData = await AsyncStorage.getItem("data");
      const existingTodos = todosData ? JSON.parse(todosData) : [];

      const combinedData: any = [...existingTodos];

      setData(combinedData);

      // Update state
    } catch (error) {
      console.error("Error loading or combining data:", error);
      Alert.alert("Error", "Failed to load data.");
    }
  };

  // UseEffect to load data on component mount
  useEffect(() => {
    loadAndCombineData();
  }, [data]);
  const toggleCheckbox = async (index) => {
    const updatedData = [...data];
    updatedData[index].isChecked = !updatedData[index].isChecked; // Toggle the checkbox state

    try {
      // Update AsyncStorage with the new data
      await AsyncStorage.setItem("data", JSON.stringify(updatedData));
      setData(updatedData); // Update the state to re-render the component
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  const deleteTodo = async (index: any) => {
    const updatedData = data.filter((_, i) => i !== index);

    try {
      await AsyncStorage.setItem("data", JSON.stringify(updatedData));
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting task:", error);
      Alert.alert("Error", "Failed to delete task.");
    }
  };

  const requestStoragePermission = async () => {
    const status = await useStoragePermission();

    if (status === "granted") {
      setTaskForm(true);
    }
  };
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
          <AddTask onPress={requestStoragePermission} />
        </View>
        {data.length !== 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <DragAndDropCard
                container={
                  <View style={styles.taskLists}>
                    <Checkbox
                      value={item.isChecked}
                      onValueChange={() => toggleCheckbox(index)}
                      color={item.isChecked ? "#03950f80" : undefined}
                    />
                    <TouchableOpacity
                      style={{
                        marginLeft: 10,
                        fontFamily: "Poppins-SemsiBold",
                        fontSize: 12,
                      }}
                      onPress={() => toggleCheckbox(index)}
                      onLongPress={() => {
                        setUpdatedValue(item);
                        setTaskForm(true);
                      }}
                    >
                      <Text
                        style={{ fontFamily: "Poppins-SemiBold", fontSize: 12 }}
                      >
                        {item.task_name}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteTodo(index)}
                      style={{
                        position: "absolute",
                        top: -1,
                        right: 0,
                      }}
                    >
                      <FontAwesome size={20} name="close" color={"#fb0404d9"} />
                    </TouchableOpacity>
                  </View>
                }
              />
            )}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginVertical: "auto",
              color: "#a3a0a0",
            }}
          >
            Let's Get Started
          </Text>
        )}
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
    fontFamily: "Poppins-SemsiBold",
  },
  taskLists: {
    flexDirection: "row",
    marginHorizontal: 4,
    marginVertical: 10,
    overflow: "hidden",
    textAlign: "center",
  },
  container: { padding: 10 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    color: "black",
    fontFamily: "Poppins-SemsiBold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
