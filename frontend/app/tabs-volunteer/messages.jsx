import { View, Text } from "react-native";

import React from 'react';
import Chat from '../../components/Chat';
import { volunteerConversations } from '../../data/dummyMessages';

export default function Messages() {
  return (
    <View style={{ flex: 1 }}>
      <Chat conversations={volunteerConversations} me={'vol'} role={'volunteer'} />
    </View>
  );
}
