import { create } from 'zustand';
import categories from '@/categories';

const useCategoryStore = create(set => ({
  currentCategory: 'announcements',
  categoryData: categories.find(({ name }) => name === 'announcements'),
  setCurrentCategory: category => {
    set({
      currentCategory: category,
      categoryData: categories.find(({ name }) => name === category)
    });
  }
}));

export default useCategoryStore;