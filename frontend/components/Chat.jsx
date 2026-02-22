import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { User, Building2, ChevronLeft } from "lucide-react-native";
import { COLORS } from "../styles/global";

// Firebase imports
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

function Avatar({ name, role }) {
  return (
    <View style={[styles.avatar, { backgroundColor: COLORS.primary }]}>
      {role === "volunteer" ? (
        <User color="#fff" width={18} height={18} />
      ) : (
        <Building2 color="#fff" width={18} height={18} />
      )}
    </View>
  );
}

function ConversationItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.convItem} onPress={() => onPress(item)}>
      <Avatar
        name={item.name}
        role={item.role === "volunteer" ? "volunteer" : "organization"}
      />
      <View style={styles.convText}>
        <Text style={styles.convTitle}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.convSnippet}>
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.convMeta}>
        <Text style={styles.convTime}>{item.lastTime}</Text>
        {item.unread > 0 ? (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

function MessageBubble({ m, me }) {
  const isMe = m.from === me;
  return (
    <View
      style={[
        styles.bubbleRow,
        isMe ? styles.bubbleRowRight : styles.bubbleRowLeft,
      ]}
    >
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
        <Text style={isMe ? styles.bubbleTextMe : styles.bubbleTextThem}>
          {m.text}
        </Text>
        <Text style={styles.bubbleTime}>{m.time}</Text>
      </View>
    </View>
  );
}

export default function Chat({ role = "volunteer" }) {
  const window = useWindowDimensions();
  const isNarrow = window.width < 720;

  const [data, setData] = useState([]);
  const [view, setView] = useState("list"); // 'list' | 'chat'
  const [selected, setSelected] = useState(null);
  const [messageText, setMessageText] = useState("");

  // Who am I in the database?
  const myUid = auth.currentUser?.uid;

  // 1. Listen to Firestore for real-time messages
  useEffect(() => {
    if (!myUid) return;

    const fieldToQuery =
      role === "volunteer" ? "volunteerId" : "organizationId";

    const q = query(
      collection(db, "conversations"),
      where(fieldToQuery, "==", myUid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convos = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          // If I am a volunteer, show me the Org's name. If I am an Org, show me the Vol's name.
          name:
            role === "volunteer"
              ? docData.organizationName
              : docData.volunteerName,
          role: role === "volunteer" ? "organization" : "volunteer",
        };
      });

      setData(convos);

      if (selected) {
        const updatedSelected = convos.find((c) => c.id === selected.id);
        if (updatedSelected) setSelected(updatedSelected);
      }
    });

    return () => unsubscribe();
  }, [role, selected, myUid]);

  function openConv(conv) {
    setSelected(conv);
    setView("chat");
  }

  // 2. Send a message to Firestore
  async function sendMessage() {
    if (!messageText.trim() || !selected || !myUid) return;

    const newMsg = {
      id: `m${Date.now()}`,
      from: myUid, // Tag the message with MY user ID
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      const docRef = doc(db, "conversations", selected.id);

      await updateDoc(docRef, {
        messages: arrayUnion(newMsg),
        lastMessage: newMsg.text,
        lastTime: newMsg.time,
      });

      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <View style={styles.container}>
      {view === "list" && (
        <View style={styles.listPaneFull}>
          <View style={styles.listHeaderFull}>
            <Text style={styles.listTitle}>Messages</Text>
          </View>

          <FlatList
            data={data}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <ConversationItem item={item} onPress={openConv} />
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: "#eee" }} />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyChat}>
                <Text style={styles.emptyText}>No messages yet.</Text>
                <Text style={styles.emptyText}>
                  {role === "volunteer"
                    ? "Claim a delivery to start chatting!"
                    : "Chats will appear when a volunteer claims your request."}
                </Text>
              </View>
            )}
          />
        </View>
      )}

      <View
        style={view === "chat" ? styles.chatPaneFull : styles.chatPaneHidden}
      >
        {!selected ? (
          <View style={styles.emptyChat}>
            <Text style={styles.emptyText}>Select a conversation</Text>
          </View>
        ) : (
          <View style={styles.chatInnerFull}>
            <View style={styles.chatHeaderFull}>
              <TouchableOpacity
                onPress={() => setView("list")}
                style={{ marginRight: 12 }}
              >
                <ChevronLeft color="#111" width={20} height={20} />
              </TouchableOpacity>
              <Text style={styles.chatHeaderTitleFull}>{selected.name}</Text>
            </View>
            <FlatList
              data={selected.messages}
              keyExtractor={(m) => m.id}
              // Pass myUid so the bubble knows which side to render on
              renderItem={({ item }) => <MessageBubble m={item} me={myUid} />}
              contentContainerStyle={{ padding: 12 }}
            />
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={messageText}
                onChangeText={setMessageText}
                placeholder="Write a message..."
              />
              <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  listPaneFull: { flex: 1, backgroundColor: "#F7F7F7" },
  listHeaderFull: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  convItem: { flexDirection: "row", alignItems: "center", padding: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  convText: { flex: 1 },
  convTitle: { fontWeight: "600", marginBottom: 2 },
  convSnippet: { color: "#666" },
  convMeta: { alignItems: "flex-end" },
  convTime: { color: "#999", fontSize: 12 },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 6,
  },
  unreadText: { color: "#fff", fontSize: 12 },
  emptyChat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: { color: "#777", marginTop: 10 },
  chatPaneFull: { flex: 1, backgroundColor: "#fff" },
  chatPaneHidden: { width: 0, height: 0 },
  chatInnerFull: { flex: 1 },
  chatHeaderFull: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  chatHeaderTitleFull: {
    fontWeight: "700",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    marginRight: 32,
  },
  bubbleRow: { marginVertical: 8, flexDirection: "row", paddingHorizontal: 12 },
  bubbleRowLeft: { justifyContent: "flex-start" },
  bubbleRowRight: { justifyContent: "flex-end" },
  bubble: { maxWidth: "75%", padding: 14, borderRadius: 12 },
  bubbleMe: { backgroundColor: COLORS.primary },
  bubbleThem: { backgroundColor: "#e6f4ea" },
  bubbleTextMe: { color: "#fff" },
  bubbleTextThem: { color: "#0b2f16" },
  bubbleTime: { fontSize: 10, color: "#666", marginTop: 6 },
  inputRow: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: { color: "#fff", fontWeight: "600" },
  listTitle: { fontWeight: "700", fontSize: 16 },
  iconButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
});
