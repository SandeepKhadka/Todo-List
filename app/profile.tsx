import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Profile = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
        Font Not loaded
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
        Custom Font Example
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
