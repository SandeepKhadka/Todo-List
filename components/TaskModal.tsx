import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { CloseTaskForm } from "./TaskCard";

const TaskModal = ({ onPress }: { onPress: () => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <KeyboardAvoidingView>
      <Animated.View
        entering={FadeIn}
        style={{
          flex: 0.6,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000017",
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
          <View style={styles.container}>
            {/* Form Girdileri */}
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  style={styles.input}
                  placeholder="Task Name"
                />
              )}
              name="task_name"
              rules={{ required: "You must enter task name" }}
            />
            {/* {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )} */}
            {/* Submit Butonu */}
            <Button title="Submit" />

            {/* Gönderilen Veriler */}
          </View>
        </Animated.View>
        <CloseTaskForm onPress={onPress} />
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
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
