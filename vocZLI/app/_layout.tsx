import { Stack } from "expo-router";
import { VociProvider } from "@/context/vociContext";

export default function RootLayout() {
  return (
    <VociProvider>
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
    </VociProvider>
  );
}
