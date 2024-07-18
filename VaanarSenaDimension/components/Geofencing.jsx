import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import haversine from "haversine";
import NurseMarkerImage from "./Icons/nurse.png";
import PatientMarkerImage from "./Icons/patient.png";
import { Image } from "react-native";
import * as Location from "expo-location";

const Geofencing = () => {
  const [patientLocation, setPatientLocation] = useState({
    latitude: 18.551,
    longitude: 73.891,
  });
  const [careGiverLocation, setCareGiverLocation] = useState({
    latitude: 18.551,
    longitude: 73.891,
  });

  const geofence = {
    center: {
      latitude: careGiverLocation.latitude,
      longitude: careGiverLocation.longitude,
    },
    radius: 1000,
  };

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
    checkGeofence(patientLocation);
  }, [patientLocation]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPatientLocation((prevLocation) => ({
        latitude: prevLocation.latitude + 0.0012,
        longitude: prevLocation.longitude + 0.0012,
      }));
    }, 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationError("Location permission denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCareGiverLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    };

    getLocation();
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
          console.log("this is event", event.nativeEvent);
          const { latitude, longitude } = event.nativeEvent.coordinate;
          console.log("this is latitude: ", latitude);
          console.log("this is longitude: ", longitude);
          setCareGiverLocation({ latitude, longitude });
        }}
      >
        <Marker
          key="caregiver-location"
          coordinate={{
            latitude: careGiverLocation.latitude,
            longitude: careGiverLocation.longitude,
          }}
          title="Care Giver"
          description="This is care giver's location"
        >
          <Image source={NurseMarkerImage} style={{ width: 50, height: 50 }} />
        </Marker>
        <Marker
          key="patient-location"
          coordinate={{
            latitude: patientLocation.latitude,
            longitude: patientLocation.longitude,
          }}
          title="Patient"
          description="This is patient's location"
        >
          <Image
            source={PatientMarkerImage}
            style={{ width: 50, height: 50 }}
          />
        </Marker>
        <Circle
          center={geofence.center}
          radius={geofence.radius}
          strokeColor="rgba(245, 233, 233)"
          fillColor={
            insideGeofence ? "rgba(0,0,255,0.2)" : "rgba(237, 33, 37,0.5)"
          }
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
