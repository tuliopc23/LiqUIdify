/**
 * Business Logic Separation Utilities
 *
 * This module provides utilities for separating business logic from presentation
 * components, ensuring clean architecture and better testability.
 */

import React, { useCallback, useMemo, useRef } from "react";
import type { ComponentSize, ComponentVariant } from "./base-component";

// Generic business logic hook type
type BusinessLogicHook<T = unknown, P = unknown> = (props: P) => T;

// State management utilities
interface StateManager<T> {
  state: T;
  setState: (newState: T | ((previousState: T) => T)) => void;
  updateState: (updates: Partial<T>) => void;
  resetState: () => void;
}

// Action definition
interface Action<T = unknown> {
  type: string;
  payload?: T;
}

// Reducer function type
type Reducer<S, A> = (state: S, action: A) => S;

// Event handler factory
type EventHandlerFactory<T extends HTMLElement, E extends Event = Event> = (
  ...arguments_: Array<unknown>
) => (event: E & { currentTarget: T }) => void;

/**
 * Create a business logic hook for component state management
 */
export function createBusinessLogicHook<
  TState,
  TProps,
  TActions extends Record<string, (...arguments_: Array<unknown>) => unknown>,
>(
  initialStateFactory: (props: TProps) => TState,
  actionsFactory: (
    state: TState,
    setState: (newState: TState | ((previousState: TState) => TState)) => void,
    props: TProps,
  ) => TActions,
): BusinessLogicHook<{ state: TState; actions: TActions }, TProps> {
  return (props: TProps) => {
    const initialState = useMemo(
      () => initialStateFactory(props),
      [props, initialStateFactory],
    );
    const [state, setState] = React.useState<TState>(initialState);

    const actions = useMemo(
      () => actionsFactory(state, setState, props),
      [state, props, actionsFactory],
    );

    return { state, actions };
  };
}

/**
 * Create a reducer-based business logic hook
 */
function _createReducerBusinessLogic<TState, TAction extends Action, TProps>(
  initialStateFactory: (props: TProps) => TState,
  reducer: Reducer<TState, TAction>,
  effectsFactory?: (
    state: TState,
    dispatch: (action: TAction) => void,
    props: TProps,
  ) => void,
): BusinessLogicHook<
  { state: TState; dispatch: (action: TAction) => void },
  TProps
> {
  return (props: TProps) => {
    const initialState = useMemo(
      () => initialStateFactory(props),
      [props, initialStateFactory],
    );
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
      if (effectsFactory) {
        effectsFactory(state, dispatch, props);
      }
    }, [state, props, effectsFactory]);

    return { state, dispatch };
  };
}

/**
 * Create event handlers with business logic separation
 */
function _useEventHandlers<TElement extends HTMLElement, TState, TProps>(
  state: TState,
  setState: (newState: TState | ((previousState: TState) => TState)) => void,
  props: TProps,
) {
  const handlersRef = useRef<Map<string, EventHandlerFactory<TElement>>>(
    new Map(),
  );

  const createEventHandler = useCallback(
    <E extends Event>(
      event: E & { currentTarget: TElement },
      handler: (
        event: E & { currentTarget: TElement },
        state: TState,
        setState: (
          newState: TState | ((previousState: TState) => TState),
        ) => void,
        props: TProps,
      ) => void,
    ) => {
      handler(event as E & { currentTarget: TElement }, state, setState, props);
    },
    [state, setState, props],
  );

  const createHandler = useCallback(
    <E extends Event>(
      name: string,
      handler: (
        event: E & { currentTarget: TElement },
        state: TState,
        setState: (
          newState: TState | ((previousState: TState) => TState),
        ) => void,
        props: TProps,
      ) => void,
    ): EventHandlerFactory<TElement, E> => {
      const factory: EventHandlerFactory<TElement, E> = () => (event) => {
        createEventHandler(event, handler);
      };

      handlersRef.current.set(name, factory as EventHandlerFactory<TElement>);
      return factory;
    },
    [createEventHandler],
  );

  return { createHandler, handlersRef };
}

/**
 * Form business logic utilities
 */
interface FormState<T = Record<string, unknown>> {
  values: T;
  errors: Record<keyof T, string | null>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

interface FormActions<T = Record<string, unknown>> {
  setValue: (name: keyof T, value: T[keyof T]) => void;
  setError: (name: keyof T, error: string | null) => void;
  setTouched: (name: keyof T, touched: boolean) => void;
  validateField: (name: keyof T) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: () => void;
}

// Helper functions for form actions
function createFormValueSetter<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>,
) {
  return (name: keyof T, value: T[keyof T]) => {
    setState((previous) => ({
      ...previous,
      values: { ...previous.values, [name]: value },
      isDirty: true,
    }));
  };
}

function createFormErrorSetter<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>,
) {
  return (name: keyof T, error: string | null) => {
    setState((previous) => ({
      ...previous,
      errors: { ...previous.errors, [name]: error },
    }));
  };
}

function createFormTouchedSetter<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>,
) {
  return (name: keyof T, touched: boolean) => {
    setState((previous) => ({
      ...previous,
      touched: { ...previous.touched, [name]: touched },
    }));
  };
}

function createFormFieldValidator<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  state: FormState<T>,
  validationRules?: Record<keyof T, (value: unknown) => string | null>,
) {
  return (name: keyof T) => {
    if (!validationRules?.[name]) {
      return;
    }

    const error = validationRules[name](state.values[name]);
    setState((previous) => ({
      ...previous,
      errors: { ...previous.errors, [name]: error },
    }));
  };
}

function createFormValidator<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  state: FormState<T>,
  validationRules?: Record<keyof T, (value: unknown) => string | null>,
) {
  return () => {
    if (!validationRules) {
      return true;
    }

    const errors: Record<keyof T, string | null> = {} as Record<
      keyof T,
      string | null
    >;
    let isValid = true;

    for (const key of Object.keys(validationRules)) {
      const fieldName = key as keyof T;
      const error = validationRules[fieldName](state.values[fieldName]);
      errors[fieldName] = error;
      if (error) {
        isValid = false;
      }
    }

    setState((previous) => ({
      ...previous,
      errors,
      isValid,
    }));

    return isValid;
  };
}

function createFormReset<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  initialValues: T,
) {
  return () => {
    setState({
      values: initialValues,
      errors: {} as Record<keyof T, string | null>,
      touched: {} as Record<keyof T, boolean>,
      isValid: true,
      isSubmitting: false,
      isDirty: false,
    });
  };
}

function createFormSubmitter<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  state: FormState<T>,
  validateForm: () => boolean,
  onSubmit?: (values: T) => void | Promise<void>,
) {
  return async () => {
    if (!onSubmit) {
      return;
    }

    setState((previous) => ({ ...previous, isSubmitting: true }));

    try {
      const isValid = validateForm();
      if (isValid) {
        await onSubmit(state.values);
      }
    } catch {
      // Logging disabled
    } finally {
      setState((previous) => ({ ...previous, isSubmitting: false }));
    }
  };
}

function _createFormBusinessLogic<T extends Record<string, unknown>>(
  initialValues: T,
  validationRules?: Record<keyof T, (value: unknown) => string | null>,
  onSubmit?: (values: T) => void | Promise<void>,
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

    const actions = useMemo((): FormActions<T> => {
      const setValue = createFormValueSetter(setState);
      const setError = createFormErrorSetter(setState);
      const setTouched = createFormTouchedSetter(setState);
      const validateField = createFormFieldValidator(
        setState,
        state,
        validationRules,
      );
      const validateForm = createFormValidator(
        setState,
        state,
        validationRules,
      );
      const resetForm = createFormReset(setState, initialValues);
      const submitForm = createFormSubmitter(
        setState,
        state,
        validateForm,
        onSubmit,
      );

      return {
        setValue,
        setError,
        setTouched,
        validateField,
        validateForm,
        resetForm,
        submitForm,
      };
    }, [state, initialValues, onSubmit, validationRules]);

    return { state, actions };
  };
}

/**
 * Table/List business logic utilities
 */
interface TableState<T = unknown> {
  items: Array<T>;
  selectedItems: Array<T>;
  sortBy: string | null;
  sortDirection: "asc" | "desc";
  filterBy: string;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  isLoading: boolean;
}

interface TableActions<T = unknown> {
  setItems: (items: Array<T>) => void;
  selectItem: (item: T) => void;
  selectAll: () => void;
  deselectAll: () => void;
  sortBy: (field: string) => void;
  filter: (query: string) => void;
  paginate: (page: number) => void;
  setItemsPerPage: (count: number) => void;
}

// Helper functions for table actions
function createTableItemsSetter<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<TableState<T>>>,
) {
  return (items: Array<T>) => {
    setState((previous) => ({
      ...previous,
      items,
      totalItems: items.length,
      currentPage: 1,
    }));
  };
}

function createTableItemSelector<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<TableState<T>>>,
) {
  return (item: T) => {
    setState((previous) => {
      const isSelected = previous.selectedItems.includes(item);
      const selectedItems = isSelected
        ? previous.selectedItems.filter((selectedItem) => selectedItem !== item)
        : [...previous.selectedItems, item];

      return {
        ...previous,
        selectedItems,
      };
    });
  };
}

function createTableSelectAll<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<TableState<T>>>,
) {
  return () => {
    setState((previous) => ({
      ...previous,
      selectedItems: [...previous.items],
    }));
  };
}

function createTableDeselectAll<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<TableState<T>>>,
) {
  return () => {
    setState((previous) => ({
      ...previous,
      selectedItems: [],
    }));
  };
}

function createTableSorter<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<TableState<T>>>,
) {
  return (field: string) => {
    setState((previous) => {
      const isSameField = previous.sortBy === field;
      const isCurrentlyAsc = previous.sortDirection === "asc";
      const newDirection = isSameField && isCurrentlyAsc ? "desc" : "asc";

      return {
        ...previous,
        sortBy: field,
        sortDirection: newDirection,
      };
    });
  };
}

function createTableFilter<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<TableState<T>>>,
) {
  return (query: string) => {
    setState((previous) => ({
      ...previous,
      filterBy: query,
      currentPage: 1,
    }));
  };
}

function createTablePaginator<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<TableState<T>>>,
) {
  return (page: number) => {
    setState((previous) => ({
      ...previous,
      currentPage: page,
    }));
  };
}

function createTableItemsPerPageSetter<T extends Record<string, unknown>>(
  setState: React.Dispatch<React.SetStateAction<TableState<T>>>,
) {
  return (count: number) => {
    setState((previous) => ({
      ...previous,
      itemsPerPage: count,
      currentPage: 1,
    }));
  };
}

function _createTableBusinessLogic<T extends Record<string, unknown>>(
  initialItems: Array<T> = [],
  itemsPerPage = 10,
): BusinessLogicHook<{ state: TableState<T>; actions: TableActions<T> }, {}> {
  return () => {
    const [state, setState] = React.useState<TableState<T>>({
      items: initialItems,
      selectedItems: [],
      sortBy: null,
      sortDirection: "asc",
      filterBy: "",
      currentPage: 1,
      itemsPerPage,
      totalItems: initialItems.length,
      isLoading: false,
    });

    const actions = useMemo((): TableActions<T> => {
      const setItems = createTableItemsSetter(setState);
      const selectItem = createTableItemSelector(setState);
      const selectAll = createTableSelectAll(setState);
      const deselectAll = createTableDeselectAll(setState);
      const sortBy = createTableSorter(setState);
      const filter = createTableFilter(setState);
      const paginate = createTablePaginator(setState);
      const setItemsPerPage = createTableItemsPerPageSetter(setState);

      return {
        setItems,
        selectItem,
        selectAll,
        deselectAll,
        sortBy,
        filter,
        paginate,
        setItemsPerPage,
      };
    }, []);

    return { state, actions };
  };
}

/**
 * Modal/Dialog business logic utilities
 */
interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  size: ComponentSize;
  variant: ComponentVariant;
  closable: boolean;
  backdrop: boolean;
}

interface ModalActions {
  open: (config?: Partial<ModalState>) => void;
  close: () => void;
  toggle: () => void;
  setTitle: (title: string) => void;
  setContent: (content: React.ReactNode) => void;
  setSize: (size: ComponentSize) => void;
  setVariant: (variant: ComponentVariant) => void;
}

function _createModalBusinessLogic(
  initialState: Partial<ModalState> = {},
): BusinessLogicHook<{ state: ModalState; actions: ModalActions }, {}> {
  return () => {
    const [state, setState] = React.useState<ModalState>({
      isOpen: false,
      title: "",
      content: null,
      size: "md",
      variant: "primary",
      closable: true,
      backdrop: true,
      ...initialState,
    });

    const actions = useMemo(
      (): ModalActions => ({
        open: (config = {}) => {
          setState((previous) => ({
            ...previous,
            ...config,
            isOpen: true,
          }));
        },

        close: () => {
          setState((previous) => ({
            ...previous,
            isOpen: false,
          }));
        },

        toggle: () => {
          setState((previous) => ({
            ...previous,
            isOpen: !previous.isOpen,
          }));
        },

        setTitle: (title: string) => {
          setState((previous) => ({
            ...previous,
            title,
          }));
        },

        setContent: (content: React.ReactNode) => {
          setState((previous) => ({
            ...previous,
            content,
          }));
        },

        setSize: (size: ComponentSize) => {
          setState((previous) => ({
            ...previous,
            size,
          }));
        },

        setVariant: (variant: ComponentVariant) => {
          setState((previous) => ({
            ...previous,
            variant,
          }));
        },
      }),
      [],
    );

    return { state, actions };
  };
}

/**
 * Generic async data fetching business logic
 */
interface AsyncDataState<T = unknown> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

interface AsyncDataActions<T = any> {
  fetchData: () => Promise<void>;
  setData: (data: T) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  refetch: () => Promise<void>;
  clearData: () => void;
}

// Helper functions for async data actions
function createAsyncDataFetcher<T>(
  setState: React.Dispatch<React.SetStateAction<AsyncDataState<T>>>,
  fetchFunction: () => Promise<T>,
) {
  return async () => {
    setState((previous) => ({ ...previous, loading: true, error: null }));

    try {
      const data = await fetchFunction();
      setState((previous) => ({
        ...previous,
        data,
        loading: false,
        lastFetch: Date.now(),
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setState((previous) => ({
        ...previous,
        error: errorMessage,
        loading: false,
      }));
    }
  };
}

function createAsyncDataSetter<T>(
  setState: React.Dispatch<React.SetStateAction<AsyncDataState<T>>>,
) {
  return (data: T) => {
    setState((previous) => ({
      ...previous,
      data,
      lastFetch: Date.now(),
    }));
  };
}

function createAsyncErrorSetter<T>(
  setState: React.Dispatch<React.SetStateAction<AsyncDataState<T>>>,
) {
  return (error: string | null) => {
    setState((previous) => ({
      ...previous,
      error,
    }));
  };
}

function createAsyncLoadingSetter<T>(
  setState: React.Dispatch<React.SetStateAction<AsyncDataState<T>>>,
) {
  return (loading: boolean) => {
    setState((previous) => ({
      ...previous,
      loading,
    }));
  };
}

function createAsyncDataClearer<T>(
  setState: React.Dispatch<React.SetStateAction<AsyncDataState<T>>>,
) {
  return () => {
    setState({
      data: null,
      loading: false,
      error: null,
      lastFetch: null,
    });
  };
}

function shouldAutoFetch<T>(
  state: AsyncDataState<T>,
  cacheTimeout: number,
): boolean {
  return (
    !state.data &&
    !state.loading &&
    (!state.lastFetch || Date.now() - state.lastFetch > cacheTimeout)
  );
}

function _createAsyncDataBusinessLogic<T>(
  fetchFunction: () => Promise<T>,
  cacheTimeout: number = 5 * 60 * 1000, // 5 minutes
): BusinessLogicHook<
  { state: AsyncDataState<T>; actions: AsyncDataActions<T> },
  {}
> {
  return () => {
    const [state, setState] = React.useState<AsyncDataState<T>>({
      data: null,
      loading: false,
      error: null,
      lastFetch: null,
    });

    const actions = useMemo((): AsyncDataActions<T> => {
      const fetchData = createAsyncDataFetcher(setState, fetchFunction);
      const setData = createAsyncDataSetter(setState);
      const setError = createAsyncErrorSetter(setState);
      const setLoading = createAsyncLoadingSetter(setState);
      const clearData = createAsyncDataClearer(setState);

      const refetch = async () => {
        await fetchData();
      };

      return {
        fetchData,
        setData,
        setError,
        setLoading,
        refetch,
        clearData,
      };
    }, [fetchFunction]);

    // Auto-fetch if cache is expired
    React.useEffect(() => {
      if (shouldAutoFetch(state, cacheTimeout)) {
        actions.fetchData();
      }
    }, [
      state.data,
      state.loading,
      state.lastFetch,
      actions,
      cacheTimeout,
      state,
    ]);

    return { state, actions };
  };
}

// All types are already exported above - no need for re-export
