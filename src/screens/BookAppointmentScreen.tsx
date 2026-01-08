import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BookAppointmentScreen() {
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('');

  const dates = ['Today', 'Tomorrow', 'Wed, 15 Mar', 'Thu, 16 Mar', 'Fri, 17 Mar'];
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleBookAppointment = () => {
    if (!selectedTime) {
      Alert.alert('Select Time', 'Please select a time slot for your appointment.');
      return;
    }
    Alert.alert(
      'Appointment Booked!',
      `Your appointment with Dr. Sarah Wilson has been booked for ${selectedDate} at ${selectedTime}.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Blue Gloss */}
      <View style={styles.header}>
        <View style={styles.headerGloss}>
          <Text style={styles.headerTitle}>Book Appointment</Text>
        </View>
      </View>

      {/* Search Doctor with Blue Gloss */}
      <View style={styles.searchContainer}>
        <View style={styles.searchGloss}>
          <Ionicons name="search" size={22} color="#007AFF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctor or specialty"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Date Selection with Blue Gloss */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateButton,
                selectedDate === date && styles.selectedDateButton
              ]}
              onPress={() => setSelectedDate(date)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.dateText,
                selectedDate === date && styles.selectedDateText
              ]}>{date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Time Selection with Blue Gloss */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeButton,
                selectedTime === time && styles.selectedTimeButton
              ]}
              onPress={() => setSelectedTime(time)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.timeText,
                selectedTime === time && styles.selectedTimeText
              ]}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Appointment Details with Blue Gloss */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appointment Details</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailsGloss}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconGloss}>
                <Ionicons name="person" size={22} color="#007AFF" />
              </View>
              <Text style={styles.detailText}>Dr. Sarah Wilson</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailIconGloss}>
                <Ionicons name="medical" size={22} color="#007AFF" />
              </View>
              <Text style={styles.detailText}>Cardiologist</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailIconGloss}>
                <Ionicons name="location" size={22} color="#007AFF" />
              </View>
              <Text style={styles.detailText}>City Hospital, Room 302</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Book Button with Blue Gloss */}
      <TouchableOpacity 
        style={styles.bookButton}
        onPress={handleBookAppointment}
        activeOpacity={0.9}
      >
        <View style={styles.bookButtonGloss}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
          <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.buttonIcon} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 5,
  },
  headerGloss: {
    backgroundColor: '#E3F2FD',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  searchContainer: {
    margin: 20,
    marginTop: 15,
  },
  searchGloss: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#007AFF',
  },
  dateScroll: {
    flexDirection: 'row',
  },
  dateButton: {
    marginRight: 12,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  dateButtonGloss: {
    // Inner gloss for selected state
  },
  selectedDateButton: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#BBDEFB',
  },
  dateText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeButton: {
    width: '48%',
    marginBottom: 12,
    padding: 18,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  timeButtonGloss: {
    // Inner gloss for selected state
  },
  selectedTimeButton: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#BBDEFB',
  },
  timeText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsCard: {
    marginTop: 5,
  },
  detailsGloss: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  detailIconGloss: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  bookButton: {
    margin: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  bookButtonGloss: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#BBDEFB',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});
