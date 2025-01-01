import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, View } from "react-native";

export default function TaskCard() {
  return (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <ThemedText style={{color: '#000000'}}>Daily Task</ThemedText>
        <FontAwesome size={25} name="plus" color={"#50C2C9"} />
      </View>
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
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
