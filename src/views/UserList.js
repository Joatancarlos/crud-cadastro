import { View, FlatList, Alert } from 'react-native';
import React, { useContext } from 'react';
import { Avatar, Button, Icon, ListItem } from '@rneui/base';
import UserContext from '../context/UsersContext';


const UserList = (props) => {
  const { state, dispatch } = useContext(UserContext)
  const confirmUserDeletion = (user) => {
    Alert.alert('Excluir usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          })
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  const getUser = ({ item: user }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm', user)}
      >
        <Avatar source={{ uri: user.avatarUrl}}/>
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <Button
          type='clear'
          onPress={() => props.navigation.navigate('UserForm', user)}
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          type='clear'
          onPress={() => confirmUserDeletion(user)}
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </ListItem>
    )
  };

  return (
    <View style={{flex: 1}}>
      <FlatList 
        data={state.users}
        keyExtractor={user => user.id.toString()}
        renderItem={getUser}
      />
    </View>
  )
}

export default UserList