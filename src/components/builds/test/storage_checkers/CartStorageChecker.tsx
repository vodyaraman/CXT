'use client';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import { cartStore } from '@/store/storeRegistry';
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

function InnerCartStorageChecker() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const setFullCart = () => {
    dispatch(cartStore.actions.setCart({
      items: [
        {
          product: {
            id: 'prod-001',
            name: 'Sample Product 1',
            quantity: 100,
            price: 250,
            categoryId: 'cat-001'
          },
          quantity: 2
        },
        {
          product: {
            id: 'prod-002',
            name: 'Sample Product 2',
            quantity: 50,
            price: 150,
            categoryId: 'cat-002'
          },
          quantity: 1
        }
      ],
      totalQuantity: 3,
      totalPrice: 650
    }));
  };

  const updateCart = () => {
    dispatch(cartStore.actions.patchCart({
      items: [
        {
          product: {
            id: 'prod-001',
            name: 'Updated Product 1',
            quantity: 80,
            price: 200,
            categoryId: 'cat-001'
          },
          quantity: 3
        }
      ],
      totalQuantity: 3,
      totalPrice: 600
    }));
  };

  const clearCart = () => {
    dispatch(cartStore.actions.clearCart({}));
  };

  return (
    <ContentBox type="flex-center">
      <h2>Cart State</h2>

      <HighlightedJSON code={cart} />

      <MainButton l onClick={setFullCart} text="Установить корзину" />
      <MainButton l onClick={updateCart} text="Обновить корзину" />
      <MainButton l className="outlined" onClick={clearCart} text="Очистить корзину" />
    </ContentBox>
  );
}

export function CartStorageChecker() {
  return (
    <Provider store={store}>
      <InnerCartStorageChecker />
    </Provider>
  );
}
