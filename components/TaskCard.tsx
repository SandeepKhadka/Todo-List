import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useFonts } from "expo-font";

export default function TaskCard() {
  const [isChecked, setChecked] = useState(false);
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
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <ThemedText
          style={{
            color: "#000000",
            fontFamily: "Poppins-SemiBold",
            fontSize: 12,
          }}
        >
          Daily Task
        </ThemedText>
        <FontAwesome size={25} name="plus" color={"#50C2C9"} />
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
              }}
            >
              {item}
            </Text>
          </View>
        )}
      />
    </View>
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
    margin: 8,
  },
});
