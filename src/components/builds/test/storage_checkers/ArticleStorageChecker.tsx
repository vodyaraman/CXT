'use client';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import { articleStore } from '@/store/storeRegistry';
import { ContentBox } from '@/components/containers/ContentBox';
import { MainButton } from '@/components/buttons';
import dynamic from 'next/dynamic';
import Skeleton from '@/components/skeleton/Skeleton';

const HighlightedJSON = dynamic(
  () => import('@/components/code/HighlightedCode').then((mod) => mod.HighlightedJSON),
  {
    ssr: false,
    loading: () => <Skeleton />
  }
);

function InnerArticleStorageChecker() {
  const dispatch = useDispatch<AppDispatch>();
  const article = useSelector((state: RootState) => state.article);

  const setFullArticle = () => {
    dispatch(articleStore.actions.setArticle({
      product: {
        id: 'prod-001',
        name: 'Test Product',
        description: 'Description for test product',
        quantity: 100,
        price: 999,
        unitcost: '/шт.',
        manufacturer: 'TestCorp',
        imageUrl: '/images/test-product.png',
        categoryId: 'cat-123'
      },
      reviews: [
        {
          id: 'rev-001',
          userId: 'user-001',
          rating: 5,
          text: 'Отличный товар!',
          createdAt: new Date().toISOString(),
          responses: []
        }
      ],
      rating: 5
    }));
  };

  const updateArticle = () => {
    dispatch(articleStore.actions.patchArticle({
      product: {
        id: 'prod-001',
        name: 'Updated Product',
        description: 'Updated description',
        quantity: 80,
        price: 899,
        unitcost: '/шт.',
        manufacturer: 'UpdateCorp',
        imageUrl: '/images/updated-product.png',
        categoryId: 'cat-123'
      },
      reviews: [
        {
          id: 'rev-002',
          userId: 'user-002',
          rating: 4,
          text: 'Хороший, но есть нюансы.',
          createdAt: new Date().toISOString(),
          responses: []
        }
      ],
      rating: 4
    }));
  };

  const clearArticle = () => {
    dispatch(articleStore.actions.clearArticle({}));
  };

  return (
    <ContentBox type="flex-center">
      <h2>Article State</h2>

      <HighlightedJSON code={article} />

      <MainButton l onClick={setFullArticle} text="Установить статью" />
      <MainButton l onClick={updateArticle} text="Обновить статью" />
      <MainButton l className="outlined" onClick={clearArticle} text="Очистить статью" />
    </ContentBox>
  );
}

export function ArticleStorageChecker() {
  return (
    <Provider store={store}>
      <InnerArticleStorageChecker />
    </Provider>
  );
}
