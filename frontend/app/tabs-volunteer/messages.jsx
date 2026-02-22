import { View } from "react-native";

import Chat from "../../components/Chat";

export default function MessagesTab() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Chat me={"vol"} role={"volunteer"} />
    </View>
  );
}
