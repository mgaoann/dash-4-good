import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, useWindowDimensions } from 'react-native';
import { User, Building2 } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '../styles/global';
import { Plus, Menu, ChevronLeft } from 'lucide-react-native';

function Avatar({ name, role }) {
  return (
    <View style={[styles.avatar, { backgroundColor: COLORS.primary }]}> 
      {role === 'volunteer' ? <User color="#fff" width={18} height={18} /> : <Building2 color="#fff" width={18} height={18} />}
    </View>
  );
}

function ConversationItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.convItem} onPress={() => onPress(item)}>
      <Avatar name={item.name} role={item.role === 'volunteer' ? 'volunteer' : 'organization'} />
      <View style={styles.convText}>
        <Text style={styles.convTitle}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.convSnippet}>{item.lastMessage}</Text>
      </View>
      <View style={styles.convMeta}>
        <Text style={styles.convTime}>{item.lastTime}</Text>
        {item.unread ? <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unread}</Text></View> : null}
      </View>
    </TouchableOpacity>
  );
}

function MessageBubble({ m, me }) {
  const isMe = m.from === me;
  return (
    <View style={[styles.bubbleRow, isMe ? styles.bubbleRowRight : styles.bubbleRowLeft]}>
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
        <Text style={isMe ? styles.bubbleTextMe : styles.bubbleTextThem}>{m.text}</Text>
        <Text style={styles.bubbleTime}>{m.time}</Text>
      </View>
    </View>
  );
}

export default function Chat({ conversations = [], me = 'vol', role = 'volunteer' }) {
  const window = useWindowDimensions();
  const isNarrow = window.width < 720; // treat <720 as narrow/mobile

  const [data, setData] = useState(conversations);
  // Single-pane default: show list full-screen. When a conversation is opened, show chat full-screen.
  const [view, setView] = useState('list'); // 'list' | 'chat'
  const [selected, setSelected] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Keep state in sync if window size or conversations change
  useEffect(() => {
    setData(conversations);
  }, [conversations]);
  function openConv(conv) {
    setSelected(conv);
  }

  function sendMessage() {
    if (!messageText.trim()) return;
    const newMsg = { id: `m${Date.now()}`, from: me, text: messageText.trim(), time: 'Now' };
    if (!selected) return;
    const newData = data.map(c => {
      if (c.id === selected.id) {
        return { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, lastTime: 'Now' };
      }
      return c;
    });
    setData(newData);
    setSelected(newData.find(d => d.id === selected.id));
    setMessageText('');
  }

  return (
    <View style={styles.container}>
      {/* List pane: show on wide screens or when showList is true */}
      {view === 'list' && (
        <View style={styles.listPaneFull}>
          <View style={styles.listHeaderFull}>
            <Text style={styles.listTitle}>Messages</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  // Create a quick new conversation and open it
                  const newConv = {
                    id: `c${Date.now()}`,
                    name: role === 'volunteer' ? 'New Organization' : 'New Volunteer',
                    role: role === 'volunteer' ? 'organization' : 'volunteer',
                    lastMessage: '',
                    lastTime: 'Now',
                    unread: 0,
                    messages: [],
                  };
                  setData([newConv, ...data]);
                  setSelected(newConv);
                  setView('chat');
                }}
                style={styles.iconButton}
                accessibilityLabel="New conversation"
              >
                <Plus color="#fff" width={14} height={14} />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={data}
            keyExtractor={i => i.id}
            renderItem={({ item }) => <ConversationItem item={item} onPress={(c) => { openConv(c); setView('chat'); }} />}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#eee' }} />}
          />
        </View>
      )}

      {/* Chat pane */}
      <View style={view === 'chat' ? styles.chatPaneFull : styles.chatPaneHidden}>
        {!selected ? (
          <View style={styles.emptyChat}><Text style={styles.emptyText}>Select a conversation to view messages</Text></View>
        ) : (
          <View style={styles.chatInnerFull}>
            <View style={styles.chatHeaderFull}>
              <TouchableOpacity onPress={() => setView('list')} style={{ marginRight: 12 }}>
                <ChevronLeft color="#111" width={20} height={20} />
              </TouchableOpacity>
              <Text style={styles.chatHeaderTitleFull}>{selected.name}</Text>
            </View>
            <FlatList
              data={selected.messages}
              keyExtractor={m => m.id}
              renderItem={({ item }) => <MessageBubble m={item} me={me} />}
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
  container: { flex: 1, backgroundColor: '#fff' },
  // Full screen list
  listPaneFull: { flex: 1, backgroundColor: '#F7F7F7' },
  listHeaderFull: { padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  convItem: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  convText: { flex: 1 },
  convTitle: { fontWeight: '600', marginBottom: 2 },
  convSnippet: { color: '#666' },
  convMeta: { alignItems: 'flex-end' },
  convTime: { color: '#999', fontSize: 12 },
  unreadBadge: { backgroundColor: COLORS.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12, marginTop: 6 },
  unreadText: { color: '#fff', fontSize: 12 },
  emptyChat: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#777' },
  // Full screen chat
  chatPaneFull: { flex: 1, backgroundColor: '#fff' },
  chatPaneHidden: { width: 0, height: 0 },
  chatInnerFull: { flex: 1 },
  chatHeaderFull: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  chatHeaderTitleFull: { fontWeight: '700', fontSize: 18, textAlign: 'center' },
  bubbleRow: { marginVertical: 8, flexDirection: 'row', paddingHorizontal: 12 },
  bubbleRowLeft: { justifyContent: 'flex-start' },
  bubbleRowRight: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '75%', padding: 14, borderRadius: 12 },
  bubbleMe: { backgroundColor: COLORS.primary },
  // increase contrast for other-person bubble
  bubbleThem: { backgroundColor: '#e6f4ea' },
  bubbleTextMe: { color: '#fff' },
  bubbleTextThem: { color: '#0b2f16' },
  bubbleTime: { fontSize: 10, color: '#666', marginTop: 6 },
  inputRow: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  input: { flex: 1, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  sendBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#fff', fontWeight: '600' },
  listTitle: { fontWeight: '700', fontSize: 16 },
  iconButton: { backgroundColor: COLORS.primary, padding: 8, borderRadius: 8, marginLeft: 8 }
});
