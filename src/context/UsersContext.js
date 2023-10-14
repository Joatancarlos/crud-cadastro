import React, { createContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserContext = createContext({});

export const UsersProvider = (props) => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('_users');
      if (value !== null) {
        dispatch({
          type: 'initUsers',
          payload: JSON.parse(value),
        })
      }
    } catch (e) {
      console.log(e);
    }
  };
  const INITIALSTATE = { users: [] };

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('_users', value);
    } catch (e) {
      console.log(e);
    }
  };
  
  const reducer = (state, action) => {
    switch(action.type) {
      case 'initUsers':
        return {
          users: action.payload,
        }
      case 'deleteUser':
        return {
          users: state.users.filter(u => u.id !== action.payload.id)
        }
      case 'createUser':
        return {
          users: [...state.users, {...action.payload, id: Math.random() }],
        }
      case 'updateUser':
        return {
          users: state.users.map(u => u.id === action.payload.id ? action.payload : u)
        }
    }
    return state;
  }
  
  const [state, dispatch] = useReducer(reducer, INITIALSTATE);

  // Toda vez que o state for alterado, o useEffect será executado

  useEffect(() => {
    storeData(JSON.stringify(state.users));
  }, [state.users]);
  
  return (
    <UserContext.Provider value={{
      state, dispatch
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext;
