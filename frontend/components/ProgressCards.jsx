import { View, Text, StyleSheet } from "react-native";
import { SHADOWS } from "../styles/global";

export default function ProgressCards({ title, description }) {}
<View style={styles.container}>
  <View>
    <Text>{title}</Text>
  </View>
  <View>
    <Text>{description}</Text>
  </View>
  <View></View>
</View>;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 24,
    alignSelf: "center",
    ...SHADOWS.card,
  },
});
