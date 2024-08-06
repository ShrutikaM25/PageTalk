"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { getItem } from "@/lib/localStorageControl";

interface AppState {
    access_token: string;
    email: string;
    name: string;
    phone: number;
    user_id: string;
    current_pdf_id?: string;
    current_pdf_url?: string;
    current_pdf_name?: string;
}

interface AppProviderProps {
    children: ReactNode;
}

type Action =
    | { type: "UPDATE_EMAIL"; payload: string }
    | { type: "UPDATE_ACCESS_TOKEN"; payload: string }
    | { type: "UPDATE_NAME"; payload: string }
    | { type: "UPDATE_PHONE"; payload: number }
    | { type: "UPDATE_USER_ID"; payload: string }
    | {
          type: "UPDATE_USER_DETAILS";
          payload: {
              email: string;
              access_token: string;
              name: string;
              phone: number;
              user_id: string;
          };
      }
    | {
          type: "UPDATE_CURRENT_PDF";
          payload: {
              id: string;
              url: string;
              name: string;
          };
      }
    | { type: "RESET_CURRENT_PDF"; payload: string }
    | { type: "RESET_APP_STATE" };

const initialState: AppState = {
    access_token: getItem("access_token") || "",
    user_id: getItem("user_id") || "",
    email: getItem("email") || "",
    name: getItem("name") || "",
    phone: getItem("phone") || 0,
};

const AppContext = createContext<
    | {
          state: AppState;
          dispatch: React.Dispatch<Action>;
      }
    | undefined
>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "UPDATE_EMAIL":
            return { ...state, email: action.payload };
        case "UPDATE_ACCESS_TOKEN":
            return { ...state, access_token: action.payload };
        case "UPDATE_NAME":
            return { ...state, name: action.payload };
        case "UPDATE_PHONE":
            return { ...state, phone: action.payload };
        case "UPDATE_USER_ID":
            return { ...state, user_id: action.payload };
        case "UPDATE_USER_DETAILS":
            return { ...state, ...action.payload };
        case "UPDATE_CURRENT_PDF":
            return {
                ...state,
                current_pdf_id: action.payload.id,
                current_pdf_url: action.payload.url,
                current_pdf_name: action.payload.name,
            };
        case "RESET_CURRENT_PDF":
            return {
                ...state,
                current_pdf_id: undefined,
                current_pdf_url: undefined,
            };
        case "RESET_APP_STATE":
            return {
                access_token: "",
                email: "",
                name: "",
                phone: 0,
                user_id: "",
            };
        default:
            return state;
    }
};

/**
 * App Provider: Provides the app state and dispatch function to all components
 *
 * @param {ReactNode} children
 * @returns {ReactNode}
 * @example
 * <AppProvider>
 *  <App />
 * </AppProvider>
 *
 */
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

/**
 * App Context Hook: Returns the app state and dispatch function
 * @returns {AppState} state
 * @returns {React.Dispatch<Action>} dispatch
 * @example
 * const { state, dispatch } = useAppContext();
 * dispatch({ type: 'UPDATE_EMAIL', payload: newEmail });
 *
 * @date 01/01/2024 - 00:44:16
 */
const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export { AppProvider, useAppContext };

/*

    How to use the hook: 

    import { useAppContext } from '../path-to-AppContext';

    function MyComponent() {
    const { state, dispatch } = useAppContext();

    // Access and modify state as needed
    const handleEmailChange = (newEmail: string) => {
        dispatch({ type: 'UPDATE_EMAIL', payload: newEmail });
    };

    return (
        // Your component JSX
    );
    }

    export default MyComponent;

*/
