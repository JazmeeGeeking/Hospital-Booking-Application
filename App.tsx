import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import BookAppointmentScreen from './src/screens/BookAppointmentScreen';
import MyScheduleScreen from './src/screens/MyScheduleScreen';
import NearbyHospitalsScreen from './src/screens/NearbyHospitalsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for Explore tab (to include NearbyHospitals)
function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreMain" component={ExploreScreen} />
      <Stack.Screen 
        name="NearbyHospitals" 
        component={NearbyHospitalsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Nearby Hospitals',
          headerStyle: {
            backgroundColor: '#E3F2FD',
          },
          headerTintColor: '#007AFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Explore') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Book') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Schedule') {
              iconName = focused ? 'time' : 'time-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#999',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            paddingBottom: 8,
            paddingTop: 8,
            height: 65,
            shadowColor: '#007AFF',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen 
          name="Explore" 
          component={ExploreStack}
          options={{
            tabBarLabel: 'Explore',
          }}
        />
        <Tab.Screen 
          name="Book" 
          component={BookAppointmentScreen}
          options={{
            tabBarLabel: 'Book',
          }}
        />
        <Tab.Screen 
          name="Schedule" 
          component={MyScheduleScreen}
          options={{
            tabBarLabel: 'Schedule',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

