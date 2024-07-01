import config from '@/config';
import axios from 'axios';

export default function getTopEntries(category, page) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const url = `${config.api.url}/entries?category=${category}&page=${page}`;

    try {
      const response = await axios.get(url);
      resolve(response.data);
    } catch (error) {
      reject(error instanceof axios.AxiosError ? (error.response?.data?.error || error.message) : error.message);
    }
  });
}