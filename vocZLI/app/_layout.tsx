import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
      <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#9e768c',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
      >
        <Stack.Screen
            name="index"
            options={{
              title: "Vokabeln",
            }}
        />
        <Stack.Screen
            name="learn"
            options={{
              title: "lernen",
            }}
        />
      </Stack>
  );
}