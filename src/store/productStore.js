import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      toggleLike: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, liked: !p.liked } : p
          ),
        })),
      toggleCart: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, inCart: !p.inCart } : p
          ),
        })),
    }),
    {
      name: 'product-storage', // LocalStorage ga saqlash uchun key
    }
  )
);

export default useProductStore;