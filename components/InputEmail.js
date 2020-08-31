import React,{useState} from 'react';
import { Input} from '@ui-kitten/components';

const TextInput = props =>{
    const[Email,setEmail] = useState('');
    const emailHandler = entredEmail=>{
           setEmail(entredEmail);
           //console.log(entredEmail)
    }

    return (
        <Input placeholder='Email' style={{marginBottom:5}} onChangeText = {emailHandler} value={Email}/>
    );
};
export default TextInput;
