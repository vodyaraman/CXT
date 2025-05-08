import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

export abstract class BaseStoreModule<
  S,
  R extends SliceCaseReducers<S> = SliceCaseReducers<S>
> {
  public readonly slice: Slice<S, R>;

  constructor(name: string, initialState: S) {
    const reducers = (this as any).createReducers() as ValidateSliceCaseReducers<S, R>;

    this.slice = createSlice({
      name,
      initialState,
      reducers,
    });
  }

  protected abstract createReducers(): ValidateSliceCaseReducers<S, R>;

  get name(): string {
    return this.slice.name;
  }

  get reducer() {
    return this.slice.reducer;
  }

  get actions() {
    return this.slice.actions;
  }

  get selectors(): Record<string, unknown> {
    return {};
  }

  protected createPatchReducer(): (state: S, action: PayloadAction<Partial<S>>) => void {
    return (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        const typedKey = key as keyof S;
        const current = state[typedKey];

        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value) &&
          typeof current === 'object' &&
          current !== null
        ) {
          state[typedKey] = {
            ...(current as object),
            ...value,
          } as S[typeof typedKey];
        } else {
          state[typedKey] = value as S[typeof typedKey];
        }
      });
    };
  }

  protected createSelectorMap(
    keys: readonly (keyof S | readonly [keyof S, ...string[]])[]
  ): Record<string, (state: Record<string, S>) => any> {
    const result: Record<string, (state: Record<string, S>) => any> = {};

    keys.forEach((entry) => {
      const path = Array.isArray(entry) ? entry.map(String) : [String(entry)];
      const name = `get${path.map(p => p[0].toUpperCase() + p.slice(1)).join('')}`;

      result[name] = (state: Record<string, S>) =>
        path.reduce((acc: any, key) => acc?.[key], state[this.name]);
    });

    return result;
  }
}
