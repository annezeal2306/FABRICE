import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];

  addToCart: (
    product: Product,
    size: string,
    quantity?: number
  ) => void;

  removeFromCart: (
    productId: number,
    size: string
  ) => void;

  updateQuantity: (
    productId: number,
    size: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  getTotalItems: () => number;

  getSubtotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (
        product,
        size,
        quantity = 1
      ) => {
        set((state) => {
          const existingItem =
            state.items.find(
              (item) =>
                item.product.id === product.id &&
                item.size === size
            );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.size === size
                  ? {
                      ...item,
                      quantity:
                        item.quantity + quantity,
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                size,
                quantity,
              },
            ],
          };
        });
      },

      removeFromCart: (
        productId,
        size
      ) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.size === size
              )
          ),
        }));
      },

      updateQuantity: (
        productId,
        size,
        quantity
      ) => {
        if (quantity <= 0) {
          get().removeFromCart(
            productId,
            size
          );
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.size === size
              ? {
                  ...item,
                  quantity,
                }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce(
          (total, item) =>
            total + item.quantity,
          0
        );
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) =>
            total +
            item.product.price *
              item.quantity,
          0
        );
      },
    }),

    {
      name: "fabrice-cart",
    }
  )
);