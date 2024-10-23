import React, { useState } from "react";
import { SafeAreaView,View,Text,StyleSheet,Image, TextInput, TouchableOpacity } from "react-native";
import { form, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


export default function Login(){
    const url = 'https://quraan.kaafiye.com/api/report'
    const [values, setValues] = useState({
        sp: 558,
        username: '',
        password: ''
    })


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState(null);
    const clearUserData = async () => {
        try {
          await AsyncStorage.removeItem('user');
          console.log('User data removed');
        } catch (error) {
          console.error('Error removing user data:', error);
        }
      };

     // clearUserData();
    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(url,values);
            if(response.data.result.length == 0){
                setError('ID-ga iyo Password-ka waa qalad');
            }else{
                setData(response.data.result);
                const result = response.data.result[0];
                     try {
         await AsyncStorage.setItem('user', JSON.stringify({result }));
                        
                        //Alert.alert('Data saved');
                    } catch (error) {
                        console.error('Error saving data', error);
                    }
              router.push('/')  ;
            }

            console.log('url:', url, 'values:', values, 'response:', response.data)

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    


    console.log('values:', values, 'data:', data);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#071533'}}>
        <View style={styles.container}>
    
        <View style={styles.header}>
    <Image source={{uri: 'https://quraan.kaafiye.com/uploads/ktc_edit_sp/logo/logoquranuniversity.jpeg_ktceditsp_20240606070706.jpeg' }} style={styles.headerImg} alt='Logo' />
    <Text style={styles.title}>مرحبا بكم في برنامج تيسير</Text>
        </View>
    
    <View style={styles.form}>
    
    <View style={styles.input}> 
        <Text style={styles.inputLabel}>Student ID</Text>
        <TextInput style={styles.inputControl} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Student ID" placeholderTextColor="#6b7280"  onChangeText={(val) => setValues({...values, username : val})}/>
    </View>
    
    
    <View style={styles.input}> 
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput style={styles.inputControl} secureTextEntry placeholder="********" placeholderTextColor="#6b7280"  onChangeText={(val) => setValues({...values, password : val})}/>
    </View>
    <View style={styles.formAction}>
 <Button title="Signin" buttonStyle={styles.btn} onPress={handleLogin} />
       {error && <Text style={styles.error}>Error: {error}</Text>}

    </View>
 
    </View>
    
      </View>
        </SafeAreaView>
      );
}


const styles = StyleSheet.create({
    container:{
        padding: 24,
        flex: 1,
    },
    header:{
    marginVertical: 36,
    },
    text:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '900',
        color:'white'
      }, 
    headerImg:{
        width: 100,
        height: 100,
        alignSelf: 'center',
       marginBottom:36,
       borderRadius: 60,
    },
    title:{
        fontSize: 27,
        fontWeight: '700',
        color: '1e1e1e',
        marginBottom: 6,
        textAlign: 'center',
        color: 'white',

    },
    input:{
        marginBottom: 16,
    },
    inputLabel:{
        fontSize:  17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
        color: 'white',
    },
    inputControl:{
        height: 44,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',



    },
    form:{
       marginBottom: 24,
       flex: 1,

    },
    formAction:{
        marginVertical: 24,
    },
    btn:{
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#06ab8b',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#06ab8b',



        },
        error:{
            paddingVertical: 7,
            textAlign: 'center',
            marginTop: 1,
            borderRadius: 12,
            color: 'red',
            fontWeight: '700'
               },
        btnText: {
            fontSize: 18,
            fontWeight: '600',
            color: '#',
        }

    
});