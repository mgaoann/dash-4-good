// Shared dummy messages and conversations for volunteer and organization tabs
export const volunteerConversations = [
  {
    id: 'c1',
    name: 'Helping Hands Org',
    role: 'organization',
    lastMessage: 'Thanks — we received your offer!',
    lastTime: '2:30 PM',
    unread: 1,
    messages: [
      { id: 'm1', from: 'org', text: 'Hi Alex, thanks for volunteering!', time: '10:01 AM' },
      { id: 'm2', from: 'vol', text: 'Happy to help — what do you need?', time: '10:03 AM' },
      { id: 'm3', from: 'org', text: 'We need help with a delivery tomorrow.', time: '2:30 PM' }
    ]
  },
  {
    id: 'c2',
    name: 'Green Shelter',
    role: 'organization',
    lastMessage: "Can you confirm pickup time?",
    lastTime: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm1', from: 'org', text: 'Can you pick up at 9am?', time: 'Yesterday 9:00 AM' },
      { id: 'm2', from: 'vol', text: 'Yes, that works.', time: 'Yesterday 9:12 AM' }
    ]
  }
];

export const organizationConversations = [
  {
    id: 'oc1',
    name: 'Alex Perez',
    role: 'volunteer',
    lastMessage: 'I can take that delivery.',
    lastTime: '11:10 AM',
    unread: 2,
    messages: [
      { id: 'm1', from: 'vol', text: 'I can help with the delivery.', time: '9:00 AM' },
      { id: 'm2', from: 'org', text: 'Amazing — thank you!', time: '9:05 AM' },
      { id: 'm3', from: 'vol', text: 'What time should I arrive?', time: '11:10 AM' }
    ]
  },
  {
    id: 'oc2',
    name: 'Sam K',
    role: 'volunteer',
    lastMessage: 'On my way',
    lastTime: '2 days ago',
    unread: 0,
    messages: [
      { id: 'm1', from: 'vol', text: 'On my way', time: '2 days ago 3:00 PM' },
      { id: 'm2', from: 'org', text: 'Thanks!', time: '2 days ago 3:02 PM' }
    ]
  }
];

// kept as named exports above
