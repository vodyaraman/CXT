import { AuthStore } from './modules/AuthStore';
import { ProfileStore } from './modules/ProfileStore';
import { ProductStore } from './modules/ProductStore';

export const authStore = new AuthStore();
export const profileStore = new ProfileStore();
export const productStore = new ProductStore();

export const stores = [authStore, profileStore, productStore];
