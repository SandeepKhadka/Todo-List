import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

const useStoragePermission = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === "granted") {
    console.log("Storage permission granted");
  } else {
    Alert.alert("Permission Denied", "Storage access is required.");
  }
};

export default useStoragePermission;
