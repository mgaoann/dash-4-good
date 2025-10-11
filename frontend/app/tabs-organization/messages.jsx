import { View, Text } from "react-native";

import React from 'react';
import Chat from '../../components/Chat';
import { organizationConversations } from '../../data/dummyMessages';

export default function MessagesTab() {
  return (
    <View style={{ flex: 1 }}>
      <Chat conversations={organizationConversations} me={'org'} role={'organization'} />
    </View>
  );
}
