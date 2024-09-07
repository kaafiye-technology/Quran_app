


import { StyleSheet, Text, View,TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const profile = () => {
  return (
    <ScrollView>
    <SafeAreaView>

        <Text style={styles.log1}>Welcome to University of Marwazi</Text>
        <Text style={styles.log2}>Welcome to the illustrious University of Marwazi and thank you for visiting its main website. Marwazi was founded by a group of dedicated Somali scholars and is committed to the development of human potential to contribute to the implementation of Somali national development plans. Marwazi will serve the Somali nation by providing its students with world-class and relevant knowledge, skills, and ethical and moral training necessary for the 21st Century.
 
We invite qualified faculty and talented Somali students to visit our university campuses and join the growing community of scholars at Marwazi.

All the best,</Text>
  <TouchableOpacity style={styles.logout} onPress={() => router.push('/users/login')}>            
          <Text style={styles.log}>Login</Text>
</TouchableOpacity>   </SafeAreaView> </ScrollView>  
  )
}

export default profile

const styles = StyleSheet.create({
    logout:{
        backgroundColor: '#e1e1e6',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 7,
        paddingHorizontal: 65,
        
        borderColor:'#e1e1e6'
        },
    log:{
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily:'arial',
    },
    log1:{
        fontSize: 20,
        color:'#214923',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily:'arial',
         
      },
      log2:{
        fontSize: 20,
        fontFamily:'arial',
        paddingLeft: 10
      },
})

