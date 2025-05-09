'use client';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import { viewProfileStore } from '@/store/storeRegistry';
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

function InnerViewProfileStorageChecker() {
  const dispatch = useDispatch<AppDispatch>();
  const viewProfile = useSelector((state: RootState) => state.viewProfile);

  const setFullViewProfile = () => {
    dispatch(viewProfileStore.actions.setViewProfile({
      id: 'user-view-001',
      username: 'PublicUser',
      profilePicture: '/avatars/public-user.png',
      bio: 'Просто наблюдатель',
      social: {
        friendsCount: 10,
        followersCount: 42,
        isFriend: false,
        isBlocked: false
      }
    }));
  };

  const updateViewProfile = () => {
    dispatch(viewProfileStore.actions.patchViewProfile({
      id: 'user-view-001',
      username: 'UpdatedViewer',
      profilePicture: '/avatars/updated.png',
      bio: 'Обновлённый профиль',
      social: {
        friendsCount: 12,
        followersCount: 50,
        isFriend: true,
        isBlocked: false
      }
    }));
  };

  const clearViewProfile = () => {
    dispatch(viewProfileStore.actions.clearViewProfile({}));
  };

  return (
    <ContentBox type="flex-center">
      <h2>View Profile State</h2>

      <HighlightedJSON code={viewProfile} />

      <MainButton l onClick={setFullViewProfile} text="Установить просмотр профиля" />
      <MainButton l onClick={updateViewProfile} text="Обновить просмотр профиля" />
      <MainButton l className="outlined" onClick={clearViewProfile} text="Очистить просмотр профиля" />
    </ContentBox>
  );
}

export function ViewProfileStorageChecker() {
  return (
    <Provider store={store}>
      <InnerViewProfileStorageChecker />
    </Provider>
  );
}
