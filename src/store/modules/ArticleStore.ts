import { PayloadAction, type SliceCaseReducers } from '@reduxjs/toolkit';
import { BaseStoreModule } from '@/store/base/BaseStoreModule';

type ArticleState = Product.Article;

const initialState: ArticleState = {
    product: {
        id: '',
        name: '',
        quantity: 0,
        price: 0,
        categoryId: ''
    },
    reviews: [],
    rating: 0
};

export class ArticleStore extends BaseStoreModule<ArticleState, SliceCaseReducers<ArticleState>> {
    constructor() {
        super('article', initialState);
    }

    protected createReducers() {
        return {
            setArticle: (_: ArticleState, action: PayloadAction<ArticleState>) => action.payload,
            clearArticle: () => initialState,
            patchArticle: this.createPatchReducer()
        };
    }

    override get selectors() {
        return {
            selectArticle: (state: { article: ArticleState }) => state.article,

            ...this.createSelectorMap([
                'product',
                'reviews',
                'rating',
                ['product', 'id'],
                ['product', 'name'],
                ['product', 'quantity'],
                ['product', 'price'],
                ['product', 'unitcost'],
                ['product', 'manufacturer'],
                ['product', 'imageUrl'],
                ['product', 'categoryId']
            ] as const)
        };
    }
}
