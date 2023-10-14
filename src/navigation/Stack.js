import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from '../views/UserList';
import UserForms from '../views/UserForms';
import { Button, Icon } from '@rneui/base';


const Stack = createNativeStackNavigator();


export default (props) => {
  return (
    <Stack.Navigator initialRouteName='UserList' screenOptions={screenOptions}>
        <Stack.Screen 
          name='UserList' 
          component={UserList}
          options={({ navigation }) => {
            return {
              title: 'Lista de usuários',
              headerRight: () => (
                <Button 
                  onPress={() => navigation.navigate('UserForm')}
                  type='clear'
                  icon={<Icon name="add" size={25} color="white" />}
                />
              ), 
            }
          }}
        />
        <Stack.Screen 
          name='UserForm' 
          component={UserForms} 
          options={{ title: 'Formulário de usuários'}} 
        />

    </Stack.Navigator>
  )
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
};