import { GoBell, GoCommentDiscussion, GoTelescope } from 'react-icons/go';
import AnnouncementsBanner from '@/public/announcements-banner.jpg';
import UpdatesBanner from '@/public/updates-banner.jpg';
import DiscussionsBanner from '@/public/discussions-banner.jpg';

const categories = [
  {
    icon: GoTelescope,
    name: 'announcements',
    label: 'Announcements',
    description: 'Announcements mostly related to the dscforum.com!',
    image: AnnouncementsBanner,
    permissions: {
      read: ['everyone'],
      write: ['admin'],
      reply: ['everyone']
    }
  },
  {
    icon: GoBell,
    name: 'updates',
    label: 'Updates',
    description: 'Discussion about the latest updates and features of the Discord.',
    image: UpdatesBanner,
    permissions: {
      read: ['everyone'],
      write: ['everyone'],
      reply: ['everyone']
    }
  },
  {
    icon: GoCommentDiscussion,
    name: 'discussions',
    label: 'Discussions',
    description: 'General discussions about the Discord.',
    image: DiscussionsBanner,
    permissions: {
      read: ['everyone'],
      write: ['everyone'],
      reply: ['everyone']
    }
  }
];

export default categories;