import { PayloadAction, type SliceCaseReducers } from '@reduxjs/toolkit';
import { BaseStoreModule } from '@/store/base/BaseStoreModule';

type ViewProfileState = User.ViewProfileState;

const initialState: ViewProfileState = {
    id: '',
    username: '',
    profilePicture: '',
    bio: '',
    social: {
        friendsCount: 0,
        followersCount: 0,
        isFriend: false,
        isBlocked: false
    }
};

export class ViewProfileStore extends BaseStoreModule<ViewProfileState, SliceCaseReducers<ViewProfileState>> {
    constructor() {
        super('viewProfile', initialState);
    }

    protected createReducers() {
        return {
            setViewProfile: (_: ViewProfileState, action: PayloadAction<ViewProfileState>) => action.payload,
            clearViewProfile: () => initialState,
            patchViewProfile: this.createPatchReducer()
        };
    }

    override get selectors() {
        return {
            selectViewProfile: (state: { viewProfile: ViewProfileState }) => state.viewProfile,

            ...this.createSelectorMap([
                'id',
                'username',
                'profilePicture',
                'bio',
                ['social', 'friendsCount'],
                ['social', 'followersCount'],
                ['social', 'isFriend'],
                ['social', 'isBlocked']
            ] as const)
        };
    }
}
