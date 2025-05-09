'use client';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import { feedStore } from '@/store/storeRegistry';
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

function InnerFeedStorageChecker() {
  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector((state: RootState) => state.feed);

  const setFullFeed = () => {
    dispatch(feedStore.actions.setFeed({
      posts: [
        {
          id: 'post-001',
          authorId: 'user-001',
          content: 'Первый пост в ленте',
          mediaUrls: ['/media/pic1.jpg'],
          createdAt: new Date().toISOString(),
          likesCount: 12,
          commentsCount: 3,
          isLiked: true
        },
        {
          id: 'post-002',
          authorId: 'user-002',
          content: 'Второй пост с видео',
          mediaUrls: ['/media/video1.mp4'],
          createdAt: new Date().toISOString(),
          likesCount: 5,
          commentsCount: 1,
          isLiked: false
        }
      ],
      hasMore: true,
      isLoading: false,
      error: undefined
    }));
  };

  const updateFeed = () => {
    dispatch(feedStore.actions.patchFeed({
      posts: [
        {
          id: 'post-003',
          authorId: 'user-003',
          content: 'Обновлённый пост',
          mediaUrls: [],
          createdAt: new Date().toISOString(),
          likesCount: 0,
          commentsCount: 0,
          isLiked: false
        }
      ],
      hasMore: false,
      isLoading: false,
      error: undefined
    }));
  };

  const clearFeed = () => {
    dispatch(feedStore.actions.clearFeed({}));
  };

  return (
    <ContentBox type="flex-center">
      <h2>Feed State</h2>

      <HighlightedJSON code={feed} />

      <MainButton l onClick={setFullFeed} text="Установить ленту" />
      <MainButton l onClick={updateFeed} text="Обновить ленту" />
      <MainButton l className="outlined" onClick={clearFeed} text="Очистить ленту" />
    </ContentBox>
  );
}

export function FeedStorageChecker() {
  return (
    <Provider store={store}>
      <InnerFeedStorageChecker />
    </Provider>
  );
}
