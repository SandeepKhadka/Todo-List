import React, { useCallback, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { CloseTaskForm } from "./TaskCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskForm = ({ onPress }: { onPress: () => void }) => {
  // ref
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
    const todosData = [{taskname :Object.values(data), isChecked: false}]

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
                {/* Form Girdileri */}
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      // {...field}
                      style={styles.input}
                      placeholder="Task Name"
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="task_name"
                  rules={{ required: "You must enter task name" }}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name.message}</Text>
                )}
                {/* Submit Butonu */}
                <Button title="Submit" onPress={handleSubmit(onSubmit)} />

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
