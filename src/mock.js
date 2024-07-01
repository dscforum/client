const entries = [
  {
    id: 1,
    title: 'Example Title Pinned Entry',
    date: '2021-10-10T12:00:00.000Z',
    category: 'announcements',
    publisher: {
      id: 1,
      username: '@username',
      avatar_url: 'https://placehold.co/32x32'
    },
    flags: {
      isPinned: true
    },
    reply_count: 5
  },
  {
    id: 2,
    title: 'Example Title Not-Pinned Entry',
    date: '2021-10-10T12:00:00.000Z',
    category: 'announcements',
    publisher: {
      id: 2,
      username: '@username',
      avatar_url: 'https://placehold.co/32x32'
    },
    flags: {
      isPinned: false
    },
    reply_count: 5
  }
];

export { entries };