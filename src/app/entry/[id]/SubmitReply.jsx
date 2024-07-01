'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import { GoPaperAirplane } from 'react-icons/go';
import createReply from '@/request/createReply';
import { useAuth } from '@clerk/nextjs';

export default function SubmitReply({ entryId, replies }) {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const userData = useUser();
  if (!userData.isSignedIn) return null;

  const hasReplied = replies.some(reply => reply.publisherId === userData.user.id);
  if (hasReplied) return null;

  async function submitReply() {
    setLoading(true);

    createReply(entryId, reply, await getToken())
      .then(() => window.location.reload())
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }
  
  return (
    <div className="flex w-full gap-x-4">
      <div className='flex flex-col gap-y-4'>
        <Image
          src={userData.user.imageUrl}
          alt={`Avatar for ${userData.user.username}`}
          width={40}
          height={40}
          className="rounded-full w-[40px] h-[40px]"
        />

        <Button
          style='ghost'
          onClick={submitReply}
          className='px-0 py-2'
          loading={loading}
        >
          {!loading && <GoPaperAirplane size={14} strokeWidth={1} />}
        </Button>
      </div>

      <Input
        style='paragraph'
        value={reply}
        placeholder='Share your thoughts about this entry..'
        onChange={event => setReply(event.target.value)}
        disabled={loading}
      />
    </div>
  );
}