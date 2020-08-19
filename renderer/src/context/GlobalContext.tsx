import React, { createContext, useReducer, useContext } from 'react';

type fileOptions = 'width' | 'height' | 'quality' | 'outputFolder';
type fileInitial = 'width' | 'height' | 'filePath';

export type Action =
  | { type: 'SET_FILE'; payload: Pick<State, fileInitial> }
  | { type: 'COMPRESS_IMAGE_START'; payload: Pick<State, fileOptions> }
  | { type: 'COMPRESS_IMAGE_SUCCESS'; payload: string }
  | { type: 'COMPRESS_IMAGE_ERROR'; payload: string }
  | { type: 'RESTART' }
  | { type: 'GO_BACK' };

type State = typeof initialState;
type Dispatch = (action: Action) => void;

const initialState = {
  step: 1,
  filePath: '',
  width: 0,
  height: 0,
  quality: 100,
  outputFolder: '',
  compressedImgPath: '',
  error: '',
  loading: false,
};

const reducer = (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case 'SET_FILE':
      return {
        ...state,
        ...action.payload,
        step: state.step + 1,
      };
    case 'COMPRESS_IMAGE_START':
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case 'COMPRESS_IMAGE_SUCCESS':
      return {
        ...state,
        step: state.step + 1,
        compressedImgPath: action.payload,
        loading: false,
      };
    case 'COMPRESS_IMAGE_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'RESTART':
      return {
        ...state,
        ...initialState,
      };
    case 'GO_BACK':
      return {
        ...state,
        step: state.step - 1,
      };
    default:
      return state;
  }
};

const GlobalContextState = createContext<State | undefined>(undefined);
const GlobalContextDispatch = createContext<Dispatch | undefined>(undefined);

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContextDispatch.Provider value={dispatch}>
      <GlobalContextState.Provider value={state}>
        {children}
      </GlobalContextState.Provider>
    </GlobalContextDispatch.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContextState);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a CountProvider');
  }
  return context;
};

export const useGlobalDispatch = () => {
  const context = useContext(GlobalContextDispatch);
  if (context === undefined) {
    throw new Error('useGlobalDispatch must be used within a CountProvider');
  }
  return context;
};

export const useGlobalContext = () => ({
  state: useGlobalState(),
  dispatch: useGlobalDispatch(),
});

export default GlobalContextProvider;
