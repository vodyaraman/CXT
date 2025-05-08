import { PayloadAction, type SliceCaseReducers } from '@reduxjs/toolkit';
import { BaseStoreModule } from '@/store/base/BaseStoreModule';

type ProfileState = User.ProfileState;

const initialState: ProfileState = {
    id: '',
    username: '',
    email: '',
    phoneNumber: '',
    language: 'en',
    profilePicture: '',
    activity: {
        lastLogin: ''
    },
    social: {
        friendsList: [],
        blockedUsers: [],
        followers: []
    },
    bio: ''
};

export class ProfileStore extends BaseStoreModule<ProfileState, SliceCaseReducers<ProfileState>> {
    constructor() {
        super('profile', initialState);
    }

    protected createReducers() {
        return {
            setProfile: (_: ProfileState, action: PayloadAction<ProfileState>) => action.payload,
            clearProfile: () => initialState,
            patchProfile: this.createPatchReducer(),
        };
    }

    override get selectors() {
        return {
            selectProfile: (state: { profile: ProfileState }) => state.profile,

            ...this.createSelectorMap([
                'username',
                'email',
                'phoneNumber',
                'language',
                'profilePicture',
                'bio',
                ['activity', 'lastLogin'],
                ['social', 'friendsList'],
                ['social', 'blockedUsers'],
                ['social', 'followers'],
            ] as const),
        };
    }
}
