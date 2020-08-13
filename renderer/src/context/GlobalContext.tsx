import React, { createContext, useReducer, useContext } from 'react';

type fileOptions = 'width' | 'height' | 'quality' | 'outputFolder';

export type Action =
  | { type: 'CHANGE_FILE'; path: string }
  | { type: 'INC_STEP' }
  | {
      type: 'SET_FILE_OPTIONS';
      payload: Pick<State, fileOptions>;
    };

type State = typeof initialState;
type Dispatch = (action: Action) => void;

const initialState = {
  step: 1,
  path: '',
  width: 0,
  height: 0,
  quality: 100,
  outputFolder: '',
};

const reducer = (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case 'CHANGE_FILE':
      return {
        ...state,
        path: action.path,
      };
    case 'INC_STEP':
      return {
        ...state,
        step: state.step + 1,
      };
    case 'SET_FILE_OPTIONS':
      return {
        ...state,
        ...action.payload,
        step: state.step + 1,
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
