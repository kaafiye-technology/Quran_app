import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing icons
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const AttendanceScreen = () => {
  // Default selected item (value)
  const [selectedItem, setSelectedItem] = useState({ name: 'All', value: '1' });
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Modal visibility state

  // Options with both name and value
  const options = [
    { name: 'All', value: '1' },
    { name: 'Course', value: '2' },
  ];

  const handleSelect = (item) => {
    setSelectedItem(item);
    setDropdownVisible(false); // Close the modal when an item is selected
  };

  const data = [
    {
      name: 'Absent',
      population: 79.55,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Present',
      population: 20.45,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dropdownContainer}>
        {/* Custom Dropdown */}
        <Text style={styles.modalTitle}>Choose Course</Text>

        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(true)}
        >
          {/* Display the name of the selected item */}
          <Text style={styles.dropdownButtonText}>{selectedItem.name}</Text>
          <Icon name={isDropdownVisible ? "chevron-up" : "chevron-down"} size={15} color="#333" />
        </TouchableOpacity>

        {/* Modal for Dropdown */}
        <Modal
          transparent={true}
          visible={isDropdownVisible}
          animationType="slide"
          onRequestClose={() => setDropdownVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Choose Course</Text>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => handleSelect(option)}
                >
                  <Text style={styles.modalItemText}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>

      <Text style={styles.headerText}>Rate of Absents and Presents</Text>

      <PieChart
        data={data}
        width={screenWidth * 0.9}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          <Icon name="calendar" size={20} color="#333" /> Total periods:
          <Text style={styles.boldText}> 44</Text>
        </Text>
        <Text style={styles.detailText}>
          <Icon name="check-circle" size={20} color="green" /> Present periods:
          <Text style={styles.boldText}> 35</Text>
        </Text>
        <Text style={styles.detailText}>
          <Icon name="times-circle" size={20} color="red" /> Absent periods:
          <Text style={styles.boldText}> 9</Text>
        </Text>
        <Text style={styles.detailText}>
          <Icon name="percent" size={20} color="#333" /> Attendance rate:
          <Text style={styles.boldText}> 20.45%</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  dropdownContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: 370,
    height: 50,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
 modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  marginBottom: 10,
  padding: 10,                // Add padding to make the title more noticeable
  borderRadius: 5,   
},

  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  detailsContainer: {
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AttendanceScreen;
