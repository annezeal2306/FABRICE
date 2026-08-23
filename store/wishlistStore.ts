import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Product } from "@/data/products";

type WishlistStore = {
  items: Product[];

  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
};

export const useWishlistStore =
  create<WishlistStore>()(
    persist(
      (set, get) => ({
        items: [],

        toggleWishlist: (product) => {
          const exists = get().items.some(
            (item) => item.id === product.id
          );

          if (exists) {
            set((state) => ({
              items: state.items.filter(
                (item) => item.id !== product.id
              ),
            }));
          } else {
            set((state) => ({
              items: [...state.items, product],
            }));
          }
        },

        isWishlisted: (productId) => {
          return get().items.some(
            (item) => item.id === productId
          );
        },

        removeFromWishlist: (productId) => {
          set((state) => ({
            items: state.items.filter(
              (item) => item.id !== productId
            ),
          }));
        },

        clearWishlist: () => {
          set({ items: [] });
        },
      }),
      {
        name: "fabrice-wishlist",
      }
    )
  );