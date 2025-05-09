import { AuthStore } from './modules/AuthStore';
import { ProfileStore } from './modules/ProfileStore';
import { ProductStore } from './modules/ProductStore';
import { ArticleStore } from './modules/ArticleStore';
import { CartStore } from './modules/CartStore';
import { ViewProfileStore } from './modules/ViewProfileStore';
import { FeedStore } from './modules/FeedStore';

export const authStore = new AuthStore();
export const profileStore = new ProfileStore();
export const productStore = new ProductStore();
export const articleStore = new ArticleStore();
export const cartStore = new CartStore();
export const viewProfileStore = new ViewProfileStore();
export const feedStore = new FeedStore();

export const stores = [
  authStore,
  profileStore,
  productStore,
  articleStore,
  cartStore,
  viewProfileStore,
  feedStore
];
