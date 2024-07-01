'use client';

import Button from '@/app/components/Button';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import deleteEntry from '@/request/deleteEntry';
import deleteReply from '@/request/deleteReply';
import { useAuth } from '@clerk/nextjs';

function DeleteEntryButton({ entry }) {
  const userData = useUser();
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(false);

  async function continueDeleteEntry() {
    setLoading(true);

    deleteEntry(entry._id, await getToken())
      .then(() => window.location.reload())
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  return (
    userData.isSignedIn && (
      // Allow admins and the entry's publisher to delete the entry
      userData.user.publicMetadata.role === 'admin' ||
      userData.user.id === entry.publisherId
    ) && (
      <Button
        style='ghost'
        loading={loading}
        onClick={continueDeleteEntry}
      >
        Delete Entry
      </Button>
    )
  );
}

function DeleteReplyButton({ entry, reply }) {
  const userData = useUser();
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(false);

  async function continueDeleteReply() {
    setLoading(true);

    deleteReply(entry._id, reply._id, await getToken())
      .then(() => window.location.reload())
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  return (
    userData.isSignedIn && (
      // Allow admins and the reply's publisher to delete the reply
      userData.user.publicMetadata.role === 'admin' ||
      userData.user.id === reply.publisherId
    ) && (
      <Button
        style='ghost'
        loading={loading}
        onClick={continueDeleteReply}
      >
        Delete Reply
      </Button>
    )
  );
}

export {
  DeleteEntryButton,
  DeleteReplyButton
};