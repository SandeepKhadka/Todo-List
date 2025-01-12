import * as MediaLibrary from "expo-media-library";
import { Alert, Linking } from "react-native";

const useStoragePermission = async () => {
  try {
    const permissionResponse = await MediaLibrary.requestPermissionsAsync();
    let { status, canAskAgain } = permissionResponse;

    if (status === "granted") {
      console.log("Storage permission granted");
    } else if (!canAskAgain) {
      Alert.alert(
        "Permission Denied",
        "Storage access is required. Please enable it in your device settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
    } else {
      console.log("Permission denied, but we can ask again.");
    }

    return status;
  } catch (error) {
    console.error("Error requesting storage permission", error);
    return "denied"; // Return 'denied' in case of an error
  }
};

export default useStoragePermission;
