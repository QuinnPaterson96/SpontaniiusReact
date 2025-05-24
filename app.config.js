export default {
  expo: {
    name: "Spontaniius",
    slug: "spontaniius",
    icon: "./assets/images/icon.png",
    android: {
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "READ_PHONE_STATE",
        "POST_NOTIFICATIONS",
        "WRITE_EXTERNAL_STORAGE",
        "READ_EXTERNAL_STORAGE",
        "RECEIVE_BOOT_COMPLETED",
        "FOREGROUND_SERVICE",
        "WAKE_LOCK",
        "com.google.android.c2dm.permission.RECEIVE"
      ],
      useNextNotificationsApi: true,
      package: "com.spontaniius",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff"
      },
      config: {
        googleMaps: {
          apiKey: "AIzaSyD8afMLq2baCUnYoXDrwsuhn8ghU9WVF9E"
        }
      }
    },
    plugins: [
      "expo-notifications",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Spontaniius to access your location.",
          locationWhenInUsePermission:
            "Allow Spontaniius to access your location while the app is in use."
        }
      ],
    ]
  }
};
