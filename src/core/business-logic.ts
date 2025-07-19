/**
 * Business Logic Separation Utilities
 *
 * This module provides utilities for separating business logic from presentation
 * components, ensuring clean architecture and better testability.
 */

import React, { useCallback, useMemo, useRef } from 'react';
import type { ComponentSize, ComponentVariant } from './base-component';

// Generic business logic hook type
export type BusinessLogicHook<T = any, P = any> = (props: P) => T;

// State management utilities
export interface StateManager<T> {
  state: T;
  setState: (newState: T | ((prevState: T) => T)) => void;
  updateState: (updates: Partial<T>) => void;
  resetState: () => void;
}

// Action definition
export interface Action<T = any> {
  type: string;
  payload?: T;
}

// Reducer function type
export type Reducer<S, A> = (state: S, action: A) => S;

// Event handler factory
export type EventHandlerFactory<
  T extends HTMLElement,
  E extends Event = Event,
> = (...args: any[]) => (event: E & { currentTarget: T }) => void;

/**
 * Create a business logic hook for component state management
 */
export function createBusinessLogicHook<
  TState,
  TProps,
  TActions extends Record<string, (...args: any[]) => any>,
>(
  initialStateFactory: (props: TProps) => TState,
  actionsFactory: (
    state: TState,
    setState: (newState: TState | ((prevState: TState) => TState)) => void,
    props: TProps
  ) => TActions
): BusinessLogicHook<{ state: TState; actions: TActions }, TProps> {
  return (props: TProps) => {
    const initialState = useMemo(() => initialStateFactory(props), [props]);
    const [state, setState] = React.useState<TState>(initialState);

    const actions = useMemo(
      () => actionsFactory(state, setState, props),
      [state, props]
    );

    return { state, actions };
  };
}

/**
 * Create a reducer-based business logic hook
 */
export function createReducerBusinessLogic<
  TState,
  TAction extends Action,
  TProps,
>(
  initialStateFactory: (props: TProps) => TState,
  reducer: Reducer<TState, TAction>,
  effectsFactory?: (
    state: TState,
    dispatch: (action: TAction) => void,
    props: TProps
  ) => void
): BusinessLogicHook<
  { state: TState; dispatch: (action: TAction) => void },
  TProps
> {
  return (props: TProps) => {
    const initialState = useMemo(() => initialStateFactory(props), [props]);
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
      if (effectsFactory) {
        effectsFactory(state, dispatch, props);
      }
    }, [state, props]);

    return { state, dispatch };
  };
}

/**
 * Create event handlers with business logic separation
 */
export function useEventHandlers<TElement extends HTMLElement, TState, TProps>(
  state: TState,
  setState: (newState: TState | ((prevState: TState) => TState)) => void,
  props: TProps
) {
  const handlersRef = useRef<Map<string, EventHandlerFactory<TElement>>>(
    new Map()
  );

  const createHandler = useCallback(
    <E extends Event>(
      name: string,
      handler: (
        event: E & { currentTarget: TElement },
        state: TState,
        setState: (newState: TState | ((prevState: TState) => TState)) => void,
        props: TProps
      ) => void
    ): EventHandlerFactory<TElement, E> => {
      const factory: EventHandlerFactory<TElement, E> = () => event => {
        handler(
          event as E & { currentTarget: TElement },
          state,
          setState,
          props
        );
      };

      handlersRef.current.set(name, factory as EventHandlerFactory<TElement>);
      return factory;
    },
    [state, setState, props]
  );

  return { createHandler, handlersRef };
}

/**
 * Form business logic utilities
 */
export interface FormState<T = Record<string, any>> {
  values: T;
  errors: Record<keyof T, string | null>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

export interface FormActions<T = Record<string, any>> {
  setValue: (name: keyof T, value: T[keyof T]) => void;
  setError: (name: keyof T, error: string | null) => void;
  setTouched: (name: keyof T, touched: boolean) => void;
  validateField: (name: keyof T) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: () => void;
}

export function createFormBusinessLogic<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Record<keyof T, (value: any) => string | null>,
  onSubmit?: (values: T) => void | Promise<void>
): BusinessLogicHook<{ state: FormState<T>; actions: FormActions<T> }, {}> {
  return () => {
    const [state, setState] = React.useState<FormState<T>>({
      values: initialValues,
      errors: {} as Record<keyof T, string | null>,
      touched: {} as Record<keyof T, boolean>,
      isValid: true,
      isSubmitting: false,
      isDirty: false,
    });

    const actions = useMemo(
      (): FormActions<T> => ({
        setValue: (name: keyof T, value: T[keyof T]) => {
          setState(prev => ({
            ...prev,
            values: { ...prev.values, [name]: value },
            isDirty: true,
          }));
        },

        setError: (name: keyof T, error: string | null) => {
          setState(prev => ({
            ...prev,
            errors: { ...prev.errors, [name]: error },
          }));
        },

        setTouched: (name: keyof T, touched: boolean) => {
          setState(prev => ({
            ...prev,
            touched: { ...prev.touched, [name]: touched },
          }));
        },

        validateField: (name: keyof T) => {
          if (validationRules && validationRules[name]) {
            const error = validationRules[name](state.values[name]);
            setState(prev => ({
              ...prev,
              errors: { ...prev.errors, [name]: error },
            }));
          }
        },

        validateForm: () => {
          if (!validationRules) {
            return true;
          }

          const errors: Record<keyof T, string | null> = {} as Record<
            keyof T,
            string | null
          >;
          let isValid = true;

          Object.keys(validationRules).forEach(key => {
            const fieldName = key as keyof T;
            const error = validationRules[fieldName](state.values[fieldName]);
            errors[fieldName] = error;
            if (error) {
              isValid = false;
            }
          });

          setState(prev => ({
            ...prev,
            errors,
            isValid,
          }));

          return isValid;
        },

        resetForm: () => {
          setState({
            values: initialValues,
            errors: {} as Record<keyof T, string | null>,
            touched: {} as Record<keyof T, boolean>,
            isValid: true,
            isSubmitting: false,
            isDirty: false,
          });
        },

        submitForm: async () => {
          if (!onSubmit) {
            return;
          }

          setState(prev => ({ ...prev, isSubmitting: true }));

          try {
            const isValid = actions.validateForm();
            if (isValid) {
              await onSubmit(state.values);
            }
          } catch (error) {
            console.error('Form submission error:', error);
          } finally {
            setState(prev => ({ ...prev, isSubmitting: false }));
          }
        },
      }),
      [state]
    );

    return { state, actions };
  };
}

/**
 * Table/List business logic utilities
 */
export interface TableState<T = any> {
  items: T[];
  selectedItems: T[];
  sortBy: string | null;
  sortDirection: 'asc' | 'desc';
  filterBy: string;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  isLoading: boolean;
}

export interface TableActions<T = any> {
  setItems: (items: T[]) => void;
  selectItem: (item: T) => void;
  selectAll: () => void;
  deselectAll: () => void;
  sortBy: (field: string) => void;
  filter: (query: string) => void;
  paginate: (page: number) => void;
  setItemsPerPage: (count: number) => void;
}

export function createTableBusinessLogic<T extends Record<string, any>>(
  initialItems: T[] = [],
  itemsPerPage: number = 10
): BusinessLogicHook<{ state: TableState<T>; actions: TableActions<T> }, {}> {
  return () => {
    const [state, setState] = React.useState<TableState<T>>({
      items: initialItems,
      selectedItems: [],
      sortBy: undefined,
      sortDirection: 'asc',
      filterBy: '',
      currentPage: 1,
      itemsPerPage,
      totalItems: initialItems.length,
      isLoading: false,
    });

    const actions = useMemo(
      (): TableActions<T> => ({
        setItems: (items: T[]) => {
          setState(prev => ({
            ...prev,
            items,
            totalItems: items.length,
            currentPage: 1,
          }));
        },

        selectItem: (item: T) => {
          setState(prev => ({
            ...prev,
            selectedItems: prev.selectedItems.includes(item)
              ? prev.selectedItems.filter(i => i !== item)
              : [...prev.selectedItems, item],
          }));
        },

        selectAll: () => {
          setState(prev => ({
            ...prev,
            selectedItems: [...prev.items],
          }));
        },

        deselectAll: () => {
          setState(prev => ({
            ...prev,
            selectedItems: [],
          }));
        },

        sortBy: (field: string) => {
          setState(prev => ({
            ...prev,
            sortBy: field,
            sortDirection:
              prev.sortBy === field && 'asc' === prev.sortDirection
                ? 'desc'
                : 'asc',
          }));
        },

        filter: (query: string) => {
          setState(prev => ({
            ...prev,
            filterBy: query,
            currentPage: 1,
          }));
        },

        paginate: (page: number) => {
          setState(prev => ({
            ...prev,
            currentPage: page,
          }));
        },

        setItemsPerPage: (count: number) => {
          setState(prev => ({
            ...prev,
            itemsPerPage: count,
            currentPage: 1,
          }));
        },
      }),
      []
    );

    return { state, actions };
  };
}

/**
 * Modal/Dialog business logic utilities
 */
export interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  size: ComponentSize;
  variant: ComponentVariant;
  closable: boolean;
  backdrop: boolean;
}

export interface ModalActions {
  open: (config?: Partial<ModalState>) => void;
  close: () => void;
  toggle: () => void;
  setTitle: (title: string) => void;
  setContent: (content: React.ReactNode) => void;
  setSize: (size: ComponentSize) => void;
  setVariant: (variant: ComponentVariant) => void;
}

export function createModalBusinessLogic(
  initialState: Partial<ModalState> = {}
): BusinessLogicHook<{ state: ModalState; actions: ModalActions }, {}> {
  return () => {
    const [state, setState] = React.useState<ModalState>({
      isOpen: false,
      title: '',
      content: undefined,
      size: 'md',
      variant: 'primary',
      closable: true,
      backdrop: true,
      ...initialState,
    });

    const actions = useMemo(
      (): ModalActions => ({
        open: (config = {}) => {
          setState(prev => ({
            ...prev,
            ...config,
            isOpen: true,
          }));
        },

        close: () => {
          setState(prev => ({
            ...prev,
            isOpen: false,
          }));
        },

        toggle: () => {
          setState(prev => ({
            ...prev,
            isOpen: !prev.isOpen,
          }));
        },

        setTitle: (title: string) => {
          setState(prev => ({
            ...prev,
            title,
          }));
        },

        setContent: (content: React.ReactNode) => {
          setState(prev => ({
            ...prev,
            content,
          }));
        },

        setSize: (size: ComponentSize) => {
          setState(prev => ({
            ...prev,
            size,
          }));
        },

        setVariant: (variant: ComponentVariant) => {
          setState(prev => ({
            ...prev,
            variant,
          }));
        },
      }),
      []
    );

    return { state, actions };
  };
}

/**
 * Generic async data fetching business logic
 */
export interface AsyncDataState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

export interface AsyncDataActions<T = any> {
  fetchData: () => Promise<void>;
  setData: (data: T) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  refetch: () => Promise<void>;
  clearData: () => void;
}

export function createAsyncDataBusinessLogic<T>(
  fetchFunction: () => Promise<T>,
  cacheTimeout: number = 5 * 60 * 1000 // 5 minutes
): BusinessLogicHook<
  { state: AsyncDataState<T>; actions: AsyncDataActions<T> },
  {}
> {
  return () => {
    const [state, setState] = React.useState<AsyncDataState<T>>({
      data: undefined,
      loading: false,
      error: undefined,
      lastFetch: undefined,
    });

    const actions = useMemo(
      (): AsyncDataActions<T> => ({
        fetchData: async () => {
          setState(prev => ({ ...prev, loading: true, error: undefined }));

          try {
            const data = await fetchFunction();
            setState(prev => ({
              ...prev,
              data,
              loading: false,
              lastFetch: Date.now(),
            }));
          } catch (error) {
            setState(prev => ({
              ...prev,
              error:
                error instanceof Error ? error.message : 'An error occurred',
              loading: false,
            }));
          }
        },

        setData: (data: T) => {
          setState(prev => ({
            ...prev,
            data,
            lastFetch: Date.now(),
          }));
        },

        setError: (error: string | null) => {
          setState(prev => ({
            ...prev,
            error,
          }));
        },

        setLoading: (loading: boolean) => {
          setState(prev => ({
            ...prev,
            loading,
          }));
        },

        refetch: async () => {
          await actions.fetchData();
        },

        clearData: () => {
          setState({
            data: undefined,
            loading: false,
            error: undefined,
            lastFetch: undefined,
          });
        },
      }),
      []
    );

    // Auto-fetch if cache is expired
    React.useEffect(() => {
      const shouldFetch =
        !state.data &&
        !state.loading &&
        (!state.lastFetch || Date.now() - state.lastFetch > cacheTimeout);

      if (shouldFetch) {
        actions.fetchData();
      }
    }, [state.data, state.loading, state.lastFetch, actions]);

    return { state, actions };
  };
}

// All types are already exported above - no need for re-export
