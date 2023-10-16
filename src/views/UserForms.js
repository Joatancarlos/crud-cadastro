import { View, Text, StyleSheet, Button, Image, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import UserContext from '../context/UsersContext';

import avatares from '../data/avatares.mock';
import { Input, Icon } from '@rneui/base';

const UserForms = ({ route, navigation }) => {
  
  const { dispatch } = useContext(UserContext);
  const [user, setUser] = useState(route.params || {});
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = () => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(email)) setIsEmailValid(false);
    else setIsEmailValid(true);
  };

  const validateName = () => !name ? setIsNameValid(false) : setIsNameValid(true);

  const validateAllInputs = () => {
    if (!name || !email) {
      validateName();
      validateEmail();
      return false;
    }
    return true;
  }

  const handlePressInputs = () => {
    const returnValidations = validateAllInputs();
    if (!returnValidations) return;
    dispatch({
      type: user.id ? 'updateUser' : 'createUser',
      payload: user,
    })
    navigation.goBack()
   }

   const componentErrorMessage = (message) => (
    <Text>
      <Icon name="info" size={15} color="red" /> {message}
    </Text>
   )

  return (
    <View style={style.form}>
      <Input 
        label='Nome'
        onChangeText={(name) => {
          setUser({...user, name})
          setName(name)
        }}
        placeholder='Informe o nome'
        value={user.name}
        leftIcon={<Icon type='font-awesome' name="user" size={20} color="black" />}
        inputStyle={ { paddingStart: 10 } }
        errorMessage={ !isNameValid 
          ? componentErrorMessage('O nome é obrigatório!')
          : null
        }
        errorStyle={{ fontSize: 13 }}
      />
      <Input
        label='E-mail'
        onChangeText={(email) => {
          setUser({...user, email})
          setEmail(email)
        }}
        placeholder='Informe o e-mail'
        value={user.email}
        leftIcon={<Icon name="email" size={20} color="black" />}
        inputStyle={ { paddingStart: 10 } }
        errorMessage={ !isEmailValid 
          ? componentErrorMessage('E-mail inválido!')
          : null
        }
        errorStyle={{ fontSize: 13 }}
      />

      <Input
        label='Selecione um avatar'
        inputContainerStyle={ { display: 'none' } }
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20 }}>
        {avatares.map((avatar) => (
          <Pressable
          key={`${avatar.avatarUrl}`}
          onPress={() => {
            setUser({ ...user, avatarUrl: avatar.avatarUrl });
          }}
          style={style.avatar}
          >
            <Image
              source={{ uri: avatar.avatarUrl }}
              style={{ width: 50, height: 50 }}
            />
          </Pressable>
        ))
        }
      </View>

      <Button 
        title='Salvar'
        onPress={handlePressInputs}
      />
    </View>
  )
}

const style = StyleSheet.create({
  form: {
    padding: 12,
  },
  avatar: ({ pressed }) => [
    {
      backgroundColor: pressed
        ? 'rgb(210, 230, 255)'
        : 'white'
    },
    {
      borderRadius: 10,
      padding: 10,
    },
  ],
})

export default UserForms