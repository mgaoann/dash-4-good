import { View, StyleSheet } from "react-native";
import Card from "./Card";
import { Building, Users, TrendingUp } from "lucide-react-native";

export default function CardList() {
  return (
    <View style={styles.container}>
      <Card
        icon={<Building width={24} height={24} color="white" />}
        title="For Organizations"
        description="Post food delivery requests and track impact"
      />
      <Card
        icon={<Users width={24} height={24} color="white" />}
        title="For Volunteers"
        description="Find nearby delivery opportunities in your area"
      />
      <Card
        icon={<TrendingUp width={24} height={24} color="white" />}
        title="Real Impact"
        description="See how your contributions help reduce waste"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
  },
});
