import * as Notifications from 'expo-notifications';

const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status === 'granted') {
    console.log('Notification permission granted');
  } else {
    Alert.alert('Permission Denied', 'Notification access is required.');
  }
};
