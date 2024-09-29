import { StyleSheet, Text, View,Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link ,router} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const semesters = () => {
  const url = 'https://db.al-marwaziuniversity.so/api/report';

  const [balance, setBalance] = useState([]);
  const [secondData, setSecondData] = useState([]); // For the second API response
  const [ThirdData, setThirdData] = useState([]); // For the third API response
  const [error, setError] = useState(null); // To handle errors
  
  const fetchBalance = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        
        // Values for first API request
        const values1 = {
          sp: 540,
          std_id: userData.result.auto_id
        };
  
        // Values for second API request
        const values2 = {
          sp: 585, // Example value for second request
          std_id: userData.result.auto_id
        };
           // Values for second API request
           const values3 = {
            sp: 547, // Example value for second request
            std_id: userData.result.auto_id,
            from: 's',
            to: 'a' ,
          };
  
        // First API request
        const response1 = await axios.post(url, values1);
        const result1 = response1.data.result[0];
        setBalance(result1);
  
        // Second API request
        const response2 = await axios.post(url, values2);
        const result2 = response2.data.result[0];
        setSecondData(result2);  // Store the second response
        console.log('fee::',response2.data.result);
        // Third API request
        const response3 = await axios.post(url, values2);
        const result3 = response3.data.result[0];
        setThirdData(result2);  // Store the second response
        console.log('fee::',response3.data.result);
        
        

      }
    } catch (err) {
      setError(err.message);
    } finally {
      // setLoading(false); // Uncomment if using a loading state
    }
  };
  useEffect(() => {
    fetchBalance();
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.feature1} >
          <Image  source={require('../../assets/finance.jpg')}  style={styles.image}/>
          <Text style={styles.title}>Finance Information</Text>
        <Text style={styles.subtitle}>Al-Marwazi University Portal</Text>
        </View>
   
        <View style={styles.feature} >
          <Icon name="gift-outline" size={30} color="#FF9800"  />
          <Text style={styles.featureText}>Tuition Fee</Text>
          <Text style={styles.resultText}>${secondData?.fee}</Text>
        </View>
          <View style={styles.feature} >
          <Icon name="cash" size={30} color="#FF9800"  />
          <Text style={styles.featureText}>Balance</Text>
          <Text style={styles.resultText1}>${balance?.balance}</Text>
        </View>
        
        <Pressable style={styles.feature} onPress={() => router.push('/finance/report')}>
          <Icon name="percent" size={30} color="#9C27B0"  />
          <Text style={styles.featureText}>Finance Statement Detail</Text>
          <Icon name="arrow-right" size={25} color="black" style={styles.icon}/>

        </Pressable>
        <Pressable style={styles.feature} onPress={() => router.push('/finance/statement')}>
          <Icon name="file-document-outline" size={30} color="#9C27B0"  />
          <Text style={styles.featureText}>All Receipts</Text>
          <Icon name="arrow-right" size={25} color="black" style={styles.icon1}/>

        </Pressable>
    </View>
  )
}

export default semesters

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#236b17',
  },
  
  featuresContainer: {
    marginTop: 20,
  },
  image: {
    width: '100%',    // Make sure the image takes the full width of the container
    height: '100%',   // Make sure the image takes the full height of the container
    position: 'absolute',  // Positions the image behind the view
    top: 0,
    left: 0,
    borderRadius: 25,  // Optional: apply border radius to match the view
  },
  feature1: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
    borderRadius: 25,
    width: 370,   // Adjust size of the View
    height: 200,  // Adjust size of the View
    justifyContent: 'center',  // Center any content vertically
    alignItems: 'center',      // Center any content horizontally
    marginBottom: 20
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFF00',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFF00',
  },
  featureText: {
    fontSize: 18,
    marginLeft: 20,
    color: '#333',

  },
  resultText: {
    fontSize: 18,
    marginLeft: 128,
    color: 'blue',
    fontWeight: 'bold',

  },
  resultText1: {
    fontSize: 18,
    marginLeft: 150,
    color: '#236b17',
    fontWeight: 'bold',

    
  },
  icon:{
    marginLeft: 43
  },
  icon1:{
    marginLeft: 150
  }
 })


//  import React, { useState, useEffect } from 'react';
// import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
// import { Table, Row, Rows } from 'react-native-table-component';
// import { Text, Card } from 'react-native-elements';
// import { Link, useLocalSearchParams } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';


// // const App = () => {
//   // const tableHead = ['Subject', 'Marks', 'Status'];
//   // const tableData = [
//   //   ['الفرائض2', '59.5', 'passed'],
//   //   ['قاعة بحث', '72', 'passed'],
//   //   ['طرق التدريس', '73', 'passed'],
//   //   ['فقه العبادات4', '67', 'passed'],
//   // ];
//   const App = () => {
//     const tableHead = ['Date', 'Fee','Charge', 'Receipt', 'Balance'];
//     // const tableData = [
//     //   {course:'الفرائض2', total:'59.5', status:'passed'},
//     //   {course:'قاعة بحث', total:'72', status:'passed'},
//     //   {course:'طرق التدريس', total:'73', status:'passed'},
//     //   {course:'فقه العبادات4', total:'67', status:'passed'},
//     // ];


//   const [marks, setMarks] = useState([]);
//   const url = 'https://db.al-marwaziuniversity.so/api/report'
//     const { semester_id } = useLocalSearchParams();
//   const fetchMarks = async () => {
      
//     try {
//         const jsonValue = await AsyncStorage.getItem('user');
//     if (jsonValue != null) {
//         const userData = JSON.parse(jsonValue);
//         const values = {
//             sp: 547,
//             std_id: userData.result.auto_id,
            
//         }

//         const response = await axios.post(url,values);
        
//         const result = response.data.result;
//             setMarks(result);
        
//     }
        

       
//     } catch (err) {
//        // setError(err.message);
//        console.log('eeror', err)
//     } finally {
//       //  setLoading(false);
//     }
// };

// useEffect(()=>{
//     fetchMarks();
// },[])


//   const tableRows = marks.map(item => [item.date, item.Description,item.DR, item.CR, item.Balance]);
// // Step 1: Extract the 'total' values
// const totalValues = marks.map(item => parseFloat(item.total));

// // Step 2: Sum the values
// const sum = totalValues.reduce((acc, value) => acc + value, 0);
// const average = sum / marks.length;
// const roundedNumber = average.toFixed(2);

// console.log('Sum of totals:', sum);
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Card containerStyle={styles.card}>
//           <Text h3 style={styles.title}>Student statement</Text>
//           <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
//             <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
//             <Rows data={tableRows} textStyle={styles.text} />
//           </Table>
//         </Card>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#214923',
//   },
//   card: {
//     width: '100%',
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//     borderWidth: 0,
//     shadowColor: 'transparent',
//     borderRadius: 10,
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   head: {
//     height: 40,
//     backgroundColor: '#3bcd6b',
//   },
//   headText: {
//     margin: 6,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   text: {
//     margin: 6,
//     textAlign: 'center',
//   },
//   footer: {
//     height: 40,
//     backgroundColor: '#3bcd6b',
//   },
//   footerText: {
//     margin: 6,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#fff',
//   },
// });

// export default App;