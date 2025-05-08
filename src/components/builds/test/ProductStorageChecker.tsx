'use client';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import { productStore } from '@/store/storeRegistry';
import { ContentBox } from '@/components/containers/ContentBox';
import { MainButton } from '@/components/buttons';
import Skeleton from '@/components/skeleton/Skeleton';
import dynamic from 'next/dynamic';

const HighlightedJSON = dynamic(
  () => import('@/components/code/HighlightedCode').then((mod) => mod.HighlightedJSON),
  {
    ssr: false,
    loading: () => <Skeleton />
  }
);

function InnerProductStorageChecker() {
  const dispatch = useDispatch<AppDispatch>();
  const catalog = useSelector((state: RootState) => state.productCatalog);

  const setFullCatalog = () => {
    dispatch(productStore.actions.setProducts([
      {
        id: 'p-1',
        name: 'Яблоки Гала',
        quantity: 50,
        price: 120,
        unitcost: '/кг',
        manufacturer: 'Фрукты Юг',
        imageUrl: '/images/apple.jpg',
        categoryId: 'c-1'
      },
      {
        id: 'p-2',
        name: 'Молоко 3.2%',
        quantity: 30,
        price: 95,
        unitcost: '/1 л',
        manufacturer: 'Молвест',
        imageUrl: '/images/milk.jpg',
        categoryId: 'c-2'
      }
    ]));

    dispatch(productStore.actions.setCategories([
      { id: 'c-1', name: 'Фрукты' },
      { id: 'c-2', name: 'Молочные продукты' }
    ]));

    dispatch(productStore.actions.setMetadata({
      lastUpdated: new Date().toISOString(),
      totalCount: 2
    }));
  };

  const updateCatalog = () => {
    dispatch(productStore.actions.patchCatalog({
      filters: {
        searchQuery: 'молоко',
      },
      selectedCategoryId: 'c-2',
    }));
  };

  const clearCatalog = () => {
    dispatch(productStore.actions.patchCatalog({
      categories: [],
      products: [],
      selectedCategoryId: undefined,
      selectedProductId: undefined,
      filters: { searchQuery: '' },
      metadata: { lastUpdated: '', totalCount: 0 },
    }));
  };

  return (
    <ContentBox type="flex-center">
      <h2>Product Catalog State</h2>

      <HighlightedJSON code={catalog} />

      <MainButton l onClick={setFullCatalog} text="Загрузить каталог" />
      <MainButton l onClick={updateCatalog} text="Обновить фильтры" />
      <MainButton l className="outlined" onClick={clearCatalog} text="Очистить каталог" />
    </ContentBox>
  );
}

export function ProductStorageChecker() {
  return (
    <Provider store={store}>
      <InnerProductStorageChecker />
    </Provider>
  );
}
