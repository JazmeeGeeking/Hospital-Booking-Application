import { Platform } from 'react-native';

// Conditionally import expo-location only on native platforms
let Location: any = null;
if (Platform.OS !== 'web') {
  try {
    Location = require('expo-location');
  } catch (e) {
    console.warn('expo-location not available');
  }
}

export interface LocationData {
  latitude: number;
  longitude: number;
}

export interface Hospital {
  id: number;
  name: string;
  specialty?: string;
  address: string;
  latitude: number;
  longitude: number;
  rating?: number;
  distance?: number;
}

/**
 * Request location permissions
 */
export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'web' || !Location) {
    // Web doesn't support location permissions the same way
    return false;
  }
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}

/**
 * Get user's current location
 */
export async function getCurrentLocation(): Promise<LocationData | null> {
  if (Platform.OS === 'web') {
    // Web fallback - use browser geolocation API or return default
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => {
            // Fallback to default location if geolocation fails
            resolve({
              latitude: 37.78825,
              longitude: -122.4324,
            });
          }
        );
      });
    }
    // Default location for web if geolocation not available
    return {
      latitude: 37.78825,
      longitude: -122.4324,
    };
  }

  if (!Location) {
    // Location module not available (shouldn't happen on native, but handle gracefully)
    return {
      latitude: 37.78825,
      longitude: -122.4324,
    };
  }

  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
}

/**
 * Calculate distance between two coordinates (in kilometers)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

/**
 * Get nearby hospitals/doctors (mock data with distance calculation)
 */
export function getNearbyHospitals(
  userLocation: LocationData,
  hospitals: Hospital[]
): Hospital[] {
  return hospitals
    .map((hospital) => ({
      ...hospital,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        hospital.latitude,
        hospital.longitude
      ),
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}

/**
 * Open directions in external maps app
 */
export async function openDirections(
  destination: { latitude: number; longitude: number },
  destinationName?: string
): Promise<void> {
  try {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}${
      destinationName ? `&destination_place_id=${destinationName}` : ''
    }`;
    
    // For iOS, use Apple Maps
    const iosUrl = `maps://maps.apple.com/?daddr=${destination.latitude},${destination.longitude}`;
    
    // Try to open the URL (this will use the default maps app)
    // Note: In a real app, you'd use Linking.openURL() with proper platform detection
    console.log('Opening directions to:', destination);
    // This would typically use Linking.openURL(url) but we'll handle it in the component
  } catch (error) {
    console.error('Error opening directions:', error);
  }
}

