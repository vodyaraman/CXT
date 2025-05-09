import { PayloadAction, type SliceCaseReducers } from '@reduxjs/toolkit';
import { BaseStoreModule } from '@/store/base/BaseStoreModule';

type FeedState = Media.FeedState;

const initialState: FeedState = {
    posts: [],
    hasMore: true,
    isLoading: false,
    error: undefined
};

export class FeedStore extends BaseStoreModule<FeedState, SliceCaseReducers<FeedState>> {
    constructor() {
        super('feed', initialState);
    }

    protected createReducers() {
        return {
            setFeed: (_: FeedState, action: PayloadAction<FeedState>) => action.payload,
            clearFeed: (): FeedState => initialState,
            patchFeed: this.createPatchReducer(),

            appendPosts: (state: FeedState, action: PayloadAction<Media.Post[]>) => {
                state.posts.push(...action.payload);
            },

            setLoading: (state: FeedState, action: PayloadAction<boolean>) => {
                state.isLoading = action.payload;
            },

            setError: (state: FeedState, action: PayloadAction<string | undefined>) => {
                state.error = action.payload;
            },

            setHasMore: (state: FeedState, action: PayloadAction<boolean>) => {
                state.hasMore = action.payload;
            }
        };
    }

    override get selectors() {
        return {
            selectFeed: (state: { feed: FeedState }) => state.feed,

            ...this.createSelectorMap([
                'posts',
                'hasMore',
                'isLoading',
                'error'
            ] as const)
        };
    }
}
