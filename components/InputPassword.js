import React,{useState} from 'react';
import { Input} from '@ui-kitten/components';

const InputPassword = props=>{

    const[password,setpassword] = useState('');
    const passwordHandler = entredpassword=>{
           setpassword(entredpassword);
           
         
    }
    return (
        <Input placeholder='password' onChangeText={passwordHandler} secureTextEntry={true} value ={password}/>

    );
};
export default InputPassword;
