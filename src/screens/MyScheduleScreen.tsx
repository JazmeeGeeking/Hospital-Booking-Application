import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
  Book: undefined;
  Schedule: undefined;
};

type ScheduleScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Schedule'>;

export default function MyScheduleScreen() {
  const navigation = useNavigation<ScheduleScreenNavigationProp>();

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '2:30 PM',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      status: 'upcoming',
      location: 'City Hospital',
      address: '123 Main Street, City Center',
      latitude: 37.78825,
      longitude: -122.4324,
    },
    {
      id: 2,
      doctor: 'Dr. James Brown',
      specialty: 'Dermatologist',
      date: 'Tomorrow',
      time: '10:00 AM',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      status: 'upcoming',
      location: 'Medical Center',
      address: '456 Health Avenue, Downtown',
      latitude: 37.78425,
      longitude: -122.4284,
    },
    {
      id: 3,
      doctor: 'Dr. Emily Davis',
      specialty: 'Pediatrician',
      date: 'Wed, 15 Mar',
      time: '3:45 PM',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      status: 'upcoming',
      location: "Children's Hospital",
      address: '789 Care Boulevard, Medical District',
      latitude: 37.79225,
      longitude: -122.4364,
    }
  ];

  const handleReschedule = (appointment: typeof appointments[0]) => {
    navigation.navigate('Book');
  };

  const handleCancel = (appointment: typeof appointments[0]) => {
    Alert.alert(
      'Cancel Appointment',
      `Are you sure you want to cancel your appointment with ${appointment.doctor}?`,
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes', 
          style: 'destructive',
          onPress: () => Alert.alert('Cancelled', 'Your appointment has been cancelled.')
        }
      ]
    );
  };

  const handleGetDirections = async (appointment: typeof appointments[0]) => {
    if (!appointment.latitude || !appointment.longitude) {
      Alert.alert('Error', 'Location information not available for this appointment.');
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&destination=${appointment.latitude},${appointment.longitude}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open maps application.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open directions.');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Blue Gloss */}
      <View style={styles.header}>
        <View style={styles.headerGloss}>
          <Text style={styles.headerTitle}>My Schedule</Text>
        </View>
      </View>

      {/* Upcoming Appointments with Blue Gloss */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {appointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentGloss}>
              <View style={styles.appointmentHeader}>
                <View style={styles.doctorInfo}>
                  <View style={styles.imageGloss}>
                    <Image 
                      source={{ uri: appointment.image }}
                      style={styles.doctorImage}
                    />
                  </View>
                  <View>
                    <Text style={styles.doctorName}>{appointment.doctor}</Text>
                    <Text style={styles.specialty}>{appointment.specialty}</Text>
                  </View>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Upcoming</Text>
                </View>
              </View>
              <View style={styles.appointmentDetails}>
                <View style={styles.detailItem}>
                  <View style={styles.detailIconGloss}>
                    <Ionicons name="calendar" size={18} color="#007AFF" />
                  </View>
                  <Text style={styles.detailText}>{appointment.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <View style={styles.detailIconGloss}>
                    <Ionicons name="time" size={18} color="#007AFF" />
                  </View>
                  <Text style={styles.detailText}>{appointment.time}</Text>
                </View>
                {appointment.location && (
                  <View style={styles.detailItem}>
                    <View style={styles.detailIconGloss}>
                      <Ionicons name="location" size={18} color="#007AFF" />
                    </View>
                    <Text style={styles.detailText}>{appointment.location}</Text>
                  </View>
                )}
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.directionsButton]}
                  onPress={() => handleGetDirections(appointment)}
                  activeOpacity={0.8}
                >
                  <View style={styles.directionsGloss}>
                    <Ionicons name="navigate" size={18} color="#007AFF" />
                    <Text style={styles.directionsText}>Directions</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.rescheduleButton]}
                  onPress={() => handleReschedule(appointment)}
                  activeOpacity={0.8}
                >
                  <View style={styles.rescheduleGloss}>
                    <Ionicons name="calendar-outline" size={18} color="#007AFF" />
                    <Text style={styles.rescheduleText}>Reschedule</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => handleCancel(appointment)}
                  activeOpacity={0.8}
                >
                  <View style={styles.cancelGloss}>
                    <Ionicons name="close-circle-outline" size={18} color="#F44336" />
                    <Text style={styles.cancelText}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Past Appointments with Blue Gloss */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Appointments</Text>
        <View style={styles.pastAppointmentCard}>
          <View style={styles.pastAppointmentGloss}>
            <View style={styles.appointmentHeader}>
              <View style={styles.doctorInfo}>
                <View style={styles.imageGloss}>
                  <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/men/22.jpg' }}
                    style={styles.doctorImage}
                  />
                </View>
                <View>
                  <Text style={styles.doctorName}>Dr. Michael Johnson</Text>
                  <Text style={styles.specialty}>General Physician</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, styles.completedBadge]}>
                <Text style={[styles.statusText, styles.completedText]}>Completed</Text>
              </View>
            </View>
            <View style={styles.appointmentDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar" size={18} color="#666" />
                <Text style={[styles.detailText, styles.pastDetailText]}>Mon, 13 Mar</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time" size={18} color="#666" />
                <Text style={[styles.detailText, styles.pastDetailText]}>11:30 AM</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
  appointmentCard: {
    marginBottom: 18,
  },
  appointmentGloss: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageGloss: {
    marginRight: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 30,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E3F2FD',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  statusText: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
    borderColor: '#C8E6C9',
  },
  completedText: {
    color: '#4CAF50',
  },
  appointmentDetails: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  detailIconGloss: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  detailText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
  },
  pastDetailText: {
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  directionsButton: {
    // Handled by inner View
  },
  directionsGloss: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BBDEFB',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  directionsText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
  },
  rescheduleButton: {
    // Handled by inner View
  },
  rescheduleGloss: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BBDEFB',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  rescheduleText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
  },
  cancelButton: {
    // Handled by inner View
  },
  cancelGloss: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFCDD2',
    shadowColor: '#F44336',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cancelText: {
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
  },
  pastAppointmentCard: {
    marginBottom: 20,
  },
  pastAppointmentGloss: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
