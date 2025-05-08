'use client';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import { profileStore } from '@/store/storeRegistry';
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

function InnerProfileStorageChecker() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile);

  const updateProfile = () => {
    dispatch(profileStore.actions.patchProfile({
      username: 'Anton Test',
      theme: 'dark',
      language: 'ru',
      activity: {
        lastLogin: new Date().toISOString(),
      },
      bio: 'React Ninja 🥷',
      email: 'anton@example.com',
      phoneNumber: '+79991234567',
      social: {
        friendsList: ['user123', 'user456'],
        blockedUsers: ['user789'],
        followers: ['user000', 'user111'],
      },
    }));
  };  

  const setFullProfile = () => {
    dispatch(profileStore.actions.setProfile({
      id: 'test-user-id',
      username: 'Anton Full',
      email: 'anton.full@example.com',
      phoneNumber: '+79991112233',
      language: 'en',
      profilePicture: '/images/anton.png',
      theme: 'light',
      activity: {
        lastLogin: new Date().toISOString()
      },
      social: {
        friendsList: ['full123'],
        blockedUsers: [],
        followers: ['follower001']
      },
      bio: 'Full profile set 🧠'
    }));
  };

  const clearProfile = () => {
    dispatch(profileStore.actions.clearProfile({}));
  };

  return (
    <ContentBox type="flex-center">
      <h2>Profile State</h2>

      <HighlightedJSON code={profile} />

      <MainButton l onClick={setFullProfile} text="Установить полный профиль" />
      <MainButton l onClick={updateProfile} text="Обновить профиль" />
      <MainButton l className="outlined" onClick={clearProfile} text="Очистить профиль" />
    </ContentBox>
  );
}

export function ProfileStorageChecker() {
  return (
    <Provider store={store}>
      <InnerProfileStorageChecker />
    </Provider>
  );
}
