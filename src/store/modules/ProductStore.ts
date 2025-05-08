import { PayloadAction } from '@reduxjs/toolkit';
import { BaseStoreModule } from '@/store/base/BaseStoreModule';

const initialState: Product.ProductsCatalogState = {
  categories: [],
  products: [],
  selectedCategoryId: undefined,
  selectedProductId: undefined,
  filters: {
    searchQuery: '',
  },
  metadata: {
    lastUpdated: '',
    totalCount: 0,
  },
};

export class ProductStore extends BaseStoreModule<Product.ProductsCatalogState> {
  constructor() {
    super('productCatalog', initialState);
  }

  protected createReducers() {
    return {
      setProducts: (
        state: Product.ProductsCatalogState,
        action: PayloadAction<Product.Product[]>
      ) => {
        state.products = action.payload;
      },

      setCategories: (
        state: Product.ProductsCatalogState,
        action: PayloadAction<Product.Category[]>
      ) => {
        state.categories = action.payload;
      },

      selectProduct: (
        state: Product.ProductsCatalogState,
        action: PayloadAction<string | undefined>
      ) => {
        state.selectedProductId = action.payload;
      },

      selectCategory: (
        state: Product.ProductsCatalogState,
        action: PayloadAction<string | undefined>
      ) => {
        state.selectedCategoryId = action.payload;
      },

      setSearchQuery: (
        state: Product.ProductsCatalogState,
        action: PayloadAction<string>
      ) => {
        state.filters.searchQuery = action.payload;
      },

      setMetadata: (
        state: Product.ProductsCatalogState,
        action: PayloadAction<Product.ProductsCatalogState['metadata']>
      ) => {
        state.metadata = action.payload;
      },

      patchCatalog: this.createPatchReducer(),
    };
  }

  override get selectors() {
    return {
      getProducts: (state: { productCatalog: Product.ProductsCatalogState }) =>
        state.productCatalog.products,
  
      getCategories: (state: { productCatalog: Product.ProductsCatalogState }) =>
        state.productCatalog.categories,
  
      ...this.createSelectorMap([
        'selectedCategoryId',
        'selectedProductId',
        ['filters', 'searchQuery'],
        ['metadata', 'lastUpdated'],
        ['metadata', 'totalCount'],
      ] as const),
    };
  }
  
}
