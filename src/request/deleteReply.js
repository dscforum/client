import config from '@/config';
import axios from 'axios';

export default function deleteEntry(entryId, replyId, token) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const url = `${config.api.url}/entries/${entryId}/replies/${replyId}`;

    try {
      await axios.delete(url, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      resolve();
    } catch (error) {
      reject(error instanceof axios.AxiosError ? (error.response?.data?.error || error.message) : error.message);
    }
  });
}