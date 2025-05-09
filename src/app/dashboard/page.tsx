import {
  AuthStorageChecker,
  ProductStorageChecker,
  ProfileStorageChecker,
  ArticleStorageChecker,
  CartStorageChecker,
  ViewProfileStorageChecker,
  FeedStorageChecker
} from "@/components/builds/test/storage-scheckers.index";

import { HorizontalScrollBox } from "@/components/containers/HorizontalScrollBox";

export default function HomePage() {
  return (
    <main>
      <HorizontalScrollBox>
        <AuthStorageChecker />
        <ProfileStorageChecker />
        <ProductStorageChecker />
        <ArticleStorageChecker />
        <CartStorageChecker />
        <ViewProfileStorageChecker />
        <FeedStorageChecker />
      </HorizontalScrollBox>
    </main>
  );
}

