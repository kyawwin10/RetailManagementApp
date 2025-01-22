import type { CartProductType, GetAllProductyPayload } from "@/api/product/types";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useCartStore = defineStore("cart", {
  state: () => ({
    products: [] as GetAllProductyPayload[], // You can use this for product list if needed.
    cartItems: [] as CartProductType[], // Items in the cart.
  }),
  getters: {
    countCartItems(state) {
      // return state.cartItems.length;
      return state.cartItems.reduce((total, item) => total + item.cartQuantity, 0);
    },
  },
  actions: {
    addToCart(item: GetAllProductyPayload) {
      const cartIndex = this.cartItems.findIndex(
        product => product.productID === item.productID
      );
      if (cartIndex !== -1) {
        // Check if the current cart quantity is less than the available stock
        if (this.cartItems[cartIndex].cartQuantity < item.stock) {
          this.cartItems[cartIndex].cartQuantity += 1;
          toast.success(`Your Quantity Increase has been Updated`, {
            autoClose: 2000,
          });
        } else {
          toast.warn("Cannot add more, exceeds available stock.", {
            autoClose: 2000,
          });
        }
      } else {
        if (item.stock > 0) {
          // Add new item to cart
          this.cartItems.push({ ...item, cartQuantity: 1 });
          toast.success("Item added to cart Successfully.", {
            autoClose: 2000,
          });
        } else {
          // Notify user that the item is out of stock
          toast.error("Item is out of stock.", {
            autoClose: 2000,
          });
        }
      }
    },

    decrementQuantity(item: CartProductType) {
      let cartIndex = this.cartItems.findIndex(
        product => product.productID === item.productID
      );
      if (cartIndex !== -1) {
        this.cartItems[cartIndex].cartQuantity -= 1;
        if (this.cartItems[cartIndex].cartQuantity === 0) {
          this.cartItems = this.cartItems.filter(
            product => product.productID !== item.productID
          );
        }
        toast.success("Your Quantity Decrease has been Updated", {
          autoClose: 2000,
        });
      }
    },

    removeFromCart(item: CartProductType) {
      this.cartItems = this.cartItems.filter(
        product => product.productID !== item.productID
      );
      toast.success("Your Quantity has been removed", {
        autoClose: 2000,
      });
    },
  },
});
