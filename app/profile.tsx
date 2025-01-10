import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Appearance,
  Button,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { Colors } from "../constants/Colors";
import { Link } from "expo-router";

export default function Profile() {
  const [pictureOpen, setPictureOpen] = useState(false);
  return (
    <ThemedView style={{ flex: 1 }}>
      <Header />
      <ThemedView style={{ flex: 1 }}>
        <LoginButtons />
        <Settings />
        <About />
      </ThemedView>
    </ThemedView>
  );
}

function Header() {
  return (
    <ThemedView style={styles.textContainer}>
      <ThemedText style={styles.textBig}>Panels</ThemedText>
      <ThemedText style={styles.textSmall}>
        Sign in to save your data
      </ThemedText>
    </ThemedView>
  );
}

function AuthButton({ label, icon }: { label: string; icon: any }) {
  const theme = useColorScheme() ?? "light";

  return (
    <Pressable
      style={{
        margin: 10,
        padding: 15,
        backgroundColor: theme === "light" ? "black" : "white",
        borderRadius: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <ThemedView style={{ marginTop: 2, backgroundColor: "none" }}>
        {icon}
      </ThemedView>
      <ThemedView style={{ backgroundColor: "none" }}>
        <ThemedText
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: theme === "dark" ? "#000000" : "#ffffff",
          }}
        >
          {label}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

function LoginButtons() {
  const theme = useColorScheme() ?? "light";
  return (
    <>
      <AuthButton
        label="Sign up"
        icon={
          <FontAwesome
            size={20}
            name="google"
            color={theme === "light" ? Colors.dark.text : Colors.light.text}
          />
        }
      />
      <AuthButton
        label="Sign up"
        icon={
          <FontAwesome
            size={20}
            name="apple"
            color={theme === "light" ? Colors.dark.text : Colors.light.text}
          />
        }
      />
    </>
  );
}

function Settings() {
  return (
    <>
      <ThemedView style={styles.textContainer}>
        <ThemedText style={styles.textBig}>Settings</ThemedText>
        <ThemedText style={styles.textSmall}>Choose Theme</ThemedText>
      </ThemedView>
      <ThemedView style={styles.themeContainer}>
        <ThemeButton label="Dark" selected={false} colorScheme={"dark"} />
        <ThemeButton label="Light" selected={false} colorScheme={"light"} />
        <ThemeButton label="System" selected={false} colorScheme={null} />
      </ThemedView>
    </>
  );
}

function ThemeButton({
  label,
  selected,
  colorScheme,
}: {
  label: string;
  selected: boolean;
  colorScheme: "light" | "dark" | null;
}) {
  const theme = useColorScheme();
  return (
    <Pressable
      style={{
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        borderColor: theme === "light" ? "#000000" : "#ffffff",
        borderWidth: 1,
        flex: 0.3,
        borderRadius: 5,
      }}
      onPress={() => Appearance.setColorScheme(colorScheme)}
    >
      <ThemedView>
        <ThemedText
          style={{
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          {label}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

function About() {
  return (
    <ThemedView style={styles.aboutContainer}>
      <ThemedText style={styles.textBig}>About</ThemedText>
      <ThemedView style={styles.innerAboutLinks}>
        <Link href="/" style={styles.aboutLinks}>
          <ThemedText style={{ fontSize: 18 }}>Account</ThemedText>
        </Link>
        <Link href="/" style={styles.aboutLinks}>
          <ThemedText style={{ fontSize: 18 }}>Privacy and Policy</ThemedText>
        </Link>
        <Link href="/" style={styles.aboutLinks}>
          <ThemedText style={{ fontSize: 18 }}>Terms and Services</ThemedText>
        </Link>
        <Link href="/" style={styles.aboutLinks}>
          <ThemedText style={{ fontSize: 18 }}>Licenes</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 20,
  },
  textBig: {
    paddingTop: 20,
    fontSize: 34,
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 16,
  },
  themeContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxHeight: 80,
  },
  aboutContainer: {
    paddingHorizontal: 20,
  },
  innerAboutLinks: {},
  aboutLinks: {
    paddingVertical: 5,
  },
});
