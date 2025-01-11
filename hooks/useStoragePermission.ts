import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

const useStoragePermission = async () => {
  try {
    const permissionResponse = await MediaLibrary.requestPermissionsAsync();
    const { status } = permissionResponse;

    if (status === "granted") {
      console.log("Storage permission granted");
    } else {
      Alert.alert("Permission Denied", "Storage access is required.");
    }

    return status; // Return the status
  } catch (error) {
    console.error("Error requesting storage permission", error);
    return "denied"; // Return 'denied' in case of an error
  }
};

export default useStoragePermission;
