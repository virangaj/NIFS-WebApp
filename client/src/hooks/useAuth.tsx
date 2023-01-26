import React, { useContext } from 'react';
import { ContextAuth, ContextDispatch } from '../store/Context';

export const useAuthState = () => useContext(ContextAuth);
export const useAuthDispatch = () => useContext(ContextDispatch);
