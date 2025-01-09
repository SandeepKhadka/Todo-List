import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Pressable,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { CloseTaskForm } from "./TaskCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { FontAwesome } from "@expo/vector-icons";

const TaskForm = ({
  onPress,
  updatedValue,
  setUpdatedValue,
}: {
  onPress: () => void;
  updatedValue: any;
  setUpdatedValue: any;
}) => {
  const [charCount, setCharCount] = useState(0);
  const [taskLength, setTaskLength] = useState(updatedValue?.task_name?.length);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    // Check if we are editing an existing todo or adding a new one
    if (updatedValue) {
      // This means you're in edit mode and need to update an existing todo
      try {
        const todos = await AsyncStorage.getItem("data");
        const allTodos = todos != null ? JSON.parse(todos) : [];
        console.log("I am here at update");
        console.log(updatedValue.id);
        // Find the todo to update using the ID and update it
        const updatedTodos = allTodos.map((todo: any) =>
          todo.id === updatedValue.id
            ? { ...todo, task_name: data.task_name, isChecked: false }
            : todo
        );

        // Save the updated todos list to AsyncStorage
        await AsyncStorage.setItem("data", JSON.stringify(updatedTodos));

        Alert.alert("Todo Updated Successfully");
        onPress();
      } catch (error) {
        console.error("Error updating data", error);
        Alert.alert(`Error: Failed to update data`);
      }
    } else {
      // This block handles the creation of a new todo
      const todosData = [
        { ...data, isChecked: false, id: Date.now().toString() },
      ];
      try {
        const todos = await AsyncStorage.getItem("data");
        const allTodos = todos != null ? JSON.parse(todos) : [];
        const updatedTodo = [...allTodos, ...todosData];
        await AsyncStorage.setItem("data", JSON.stringify(updatedTodo));

        Alert.alert("Todo Added Successfully");
        onPress();
      } catch (error) {
        console.error("Error saving data", error);
        Alert.alert(`Error: Failed to save data`);
      }
    }
  };

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        snapPoints={["98%"]}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{ display: "none" }}
        handleStyle={{ display: "none" }}
        onClose={onPress}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Animated.View
            entering={FadeIn}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Dismiss modal when pressing outside */}

            <Animated.View
              entering={SlideInDown}
              style={{
                width: "95%",
                height: "90%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <View style={styles.formContainer}>
                <Text style={{ marginBottom: 10, fontSize: 18 }}>
                  {updatedValue !== "" ? "Update Task" : "Add Task"}{" "}
                  <Text style={{ fontSize: "12" }}>
                    ({(updatedValue !== "" ? taskLength : charCount) + "/" + 30}
                    )
                  </Text>
                </Text>
                {/* Form Girdileri */}
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      {/* Conditionally render TextInput for edit or new task */}
                      <TextInput
                        style={styles.input}
                        placeholder="Task Name"
                        onChangeText={(text) => {
                          setCharCount(text.length);
                          setTaskLength(text.length);
                          onChange(text);
                        }}
                        defaultValue={
                          updatedValue !== "" ? updatedValue.task_name : value
                        } // For editing or adding new
                        maxLength={30}
                        keyboardType="default"
                        multiline={true}
                      />
                    </>
                  )}
                  name="task_name"
                  rules={{ required: "You must enter task name" }}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name.message}</Text>
                )}
                <Pressable
                  style={{
                    paddingVertical: 8,
                    backgroundColor: "black",
                    borderRadius: 30,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 8,
                  }}
                  onPress={handleSubmit(onSubmit)}
                >
                  <View style={{ marginTop: 5 }}>
                    <FontAwesome size={20} name="send" color={"#ffffff"} />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      Submit
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  style={{ borderRadius: "20" }}
                />

                <Pressable />
                {/* Gönderilen Veriler */}
              </View>
            </Animated.View>
          </Animated.View>
          <CloseTaskForm onPress={onPress} />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    zIndex: 999999999999999999,
  },
  formContainer: { width: "100%", padding: 10 },
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

export default TaskForm;
