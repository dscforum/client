'use client';

import Button from '@/app/components/Button';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import pinEntry from '@/request/pinEntry';
import unPinEntry from '@/request/unPinEntry';
import { useAuth } from '@clerk/nextjs';

function PinButton({ entry }) {
  const userData = useUser();
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(false);

  async function continuePinEntry() {
    setLoading(true);

    pinEntry(entry._id, await getToken())
      .then(() => window.location.reload())
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  return (
    userData.isSignedIn && (
      // Only allow admins to pin entries
      userData.user.publicMetadata.role === 'admin'
    ) && (
      <Button
        style='ghost'
        loading={loading}
        onClick={continuePinEntry}
      >
        Pin Entry
      </Button>
    )
  );
}

function UnPinButton({ entry }) {
  const userData = useUser();
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(false);

  async function continueUnPinEntry() {
    setLoading(true);

    unPinEntry(entry._id, await getToken())
      .then(() => window.location.reload())
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  return (
    userData.isSignedIn && (
      // Only allow admins to unpin entries
      userData.user.publicMetadata.role === 'admin'
    ) && (
      <Button
        style='ghost'
        loading={loading}
        onClick={continueUnPinEntry}
      >
        Unpin Entry
      </Button>
    )
  );
}

export {
  PinButton,
  UnPinButton
};