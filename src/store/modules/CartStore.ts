import { PayloadAction, type SliceCaseReducers } from '@reduxjs/toolkit';
import { BaseStoreModule } from '@/store/base/BaseStoreModule';

type CartState = Product.Cart;

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
};

export class CartStore extends BaseStoreModule<CartState, SliceCaseReducers<CartState>> {
    constructor() {
        super('cart', initialState);
    }

    protected createReducers() {
        return {
            setCart: (_: CartState, action: PayloadAction<CartState>) => action.payload,
            clearCart: () => initialState,
            patchCart: this.createPatchReducer()
        };
    }

    override get selectors() {
        return {
            selectCart: (state: { cart: CartState }) => state.cart,

            ...this.createSelectorMap([
                'items',
                'totalQuantity',
                'totalPrice'
            ] as const)
        };
    }
}
