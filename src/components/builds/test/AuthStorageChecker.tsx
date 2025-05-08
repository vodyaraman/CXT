'use client';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import { authStore } from '@/store/storeRegistry';
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

function InnerAuthStorageChecker() {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const updateAuth = () => {
    dispatch(authStore.actions.patchAuth({
      accessToken: 'token-123',
      refreshToken: 'refresh-abc',
    }));
  };  

  const clearAuth = () => {
    dispatch(authStore.actions.clearTokens({}));
  };

  return (
    <ContentBox type="flex-center">
      <h2>Auth State</h2>
      <HighlightedJSON code={auth} />

      <MainButton onClick={updateAuth} text="Обновить авторизацию" />
      <MainButton className="outlined" onClick={clearAuth} text="Очистить авторизацию" />
    </ContentBox>
  );
}

export function AuthStorageChecker() {
  return (
    <Provider store={store}>
      <InnerAuthStorageChecker />
    </Provider>
  );
}
