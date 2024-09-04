import { createContext, useEffect, useReducer } from 'react';
import { signIn, signOut, signUp } from '@/api/User';
import UserProfileInterface from '@/interfaces/UserProfileInterface';
import SignUpInterface from '@/interfaces/SignUpInterface';
import { tokenName } from '@/config';
import { getUserByToken, setSession } from '@/utils/jwt';
import UserInterface from '@/interfaces/UserInterface';

interface AuthProvierContextType {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: UserProfileInterface | null;
  method: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  logoutOffline: () => void;
  register: (data: SignUpInterface) => Promise<void>;
};


interface Action {
  type: "INITIALIZE" | "LOGIN" | "LOGOUT" | "REGISTER";
  payload?: State;
}

interface State {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: UserProfileInterface | null;
}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state: State, action: Action) => {
    const { isAuthenticated, user } = action.payload!;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: State, action: Action) => {
    const { user } = action.payload!;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: State) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: State, action: Action) => {
    const { user } = action.payload!;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state: State, action: Action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext<AuthProvierContextType>({
  ...initialState,
  method: 'jwt',
  login: async (email: string, password: string) => { },
  logout: async () => { },
  logoutOffline: async () => { },
  register: async (data: SignUpInterface) => { },
});

// ----------------------------------------------------------------------

const AuthProvider = ({ children }: {
  children: JSX.Element | JSX.Element[]
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem(tokenName);
        if (accessToken) {
          setSession(accessToken);
          const user = await getUserByToken();
          if (user) {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user,
              },
            });
          } else {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        setSession()
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {

    // const { accessToken, user } = response.data;  accessToken should come from the backend but for now, is should the value VALID
    // user ALSO SHOULD COME FROM THE BACKEND
    const response = await signIn<UserInterface>({
      email,
      password,
    });
    if (response.data) {
      const { access, user } = response.data;
      if (!access || !user)
        throw new Error("signInError");

      if (access && user) {
        setSession(access);
        const user = await getUserByToken();
        if (user) {
          dispatch({
            type: 'LOGIN',
            payload: {
              user
            },
          });
        } else {
          throw new Error("signInError");
        }
      }
    } else {
      throw new Error("signInError");
    }
  };

  const register = async (data: SignUpInterface) => {
    const response = await signUp<UserInterface>(data);

    const { access, user } = response.data;

    window.localStorage.setItem(tokenName, access);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    await signOut();
    setSession();
    dispatch({ type: 'LOGOUT' });
  };

  const logoutOffline = () => {
    setSession();
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        logoutOffline,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };