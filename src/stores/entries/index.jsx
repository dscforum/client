import { create } from 'zustand';

const useEntriesStore = create(set => ({
  entries: [],
  setEntries: entries => set({ entries }),
  loading: false,
  setLoading: loading => set({ loading }),
  page: 1,
  setPage: page => set({ page })
}));

export default useEntriesStore;