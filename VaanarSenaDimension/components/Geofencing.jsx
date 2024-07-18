import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import haversine from "haversine";
import NurseMarkerImage from "./Icons/nurse.png";
import PatientMarkerImage from "./Icons/patient.png";
import { Image } from "react-native";

const geofence = {
  center: {
    latitude: 18.55,
    longitude: 73.89,
  },
  radius: 500,
};

const Geofencing = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 18.551,
    longitude: 73.891,
  });
  const [insideGeofence, setInsideGeofence] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);

  const checkGeofence = (location) => {
    const distance = haversine(geofence.center, location, { unit: "meter" });
    if (distance <= geofence.radius) {
      setInsideGeofence(true);
      setAlertTriggered(false);
    } else {
      setInsideGeofence(false);
      if (!alertTriggered) {
        Alert.alert("Geofence Alert", "You have exited the geofenced area!");
        setAlertTriggered(true);
      }
    }
  };

  useEffect(() => {
    checkGeofence(userLocation);
  }, [userLocation]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUserLocation((prevLocation) => ({
        latitude: prevLocation.latitude + 0.0001,
        longitude: prevLocation.longitude + 0.0001,
      }));
    }, 2000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 20000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 18.55,
          longitude: 73.89,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        onUserLocationChange={(event) => {
          const { latitude, longitude } = event.nativeEvent.coordinate;
          setUserLocation({ latitude, longitude });
        }}
      >
        <Marker
          key="caregiver-location"
          coordinate={{
            latitude: 18.55,
            longitude: 73.89,
          }}
          title="Care Giver"
          description="This is care giver's location"
        >
          <Image source={NurseMarkerImage} style={{ width: 50, height: 50 }} />
        </Marker>
        <Marker
          key="patient-location"
          coordinate={
            userLocation.latitude && userLocation.longitude
              ? {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                }
              : {
                  latitude: 0,
                  longitude: 0,
                }
          }
          title="Patient"
          description="This is patient's location"
        >
          <Image source={PatientMarkerImage} style={{ width: 50, height: 50 }} />
        </Marker>
        <Circle
          center={geofence.center}
          radius={geofence.radius}
          strokeColor="rgba(0,0,255,0.5)"
          fillColor="rgba(0,0,255,0.2)"
        />
      </MapView>
      <View style={styles.status}>
        <Text>{insideGeofence ? "Inside Geofence" : "Outside Geofence"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  status: {
    position: "absolute",
    bottom: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
  },
});

export default Geofencing;
