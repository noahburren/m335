import {router, Stack} from "expo-router";
import { VociProvider } from "@/context/vociContext";
import {Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";

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
                headerRight: () => (
                    <Pressable
                        onPress={() => router.push("/addVoci")}
                        accessibilityLabel="Neue Vokabel hinzufügen"
                    >
                        <Ionicons name="add" size={35} color="#fff"/>
                    </Pressable>
                ),
            }}
        />
        <Stack.Screen
            name="learn"
            options={{
              title: "lernen",
            }}
        />
          <Stack.Screen
              name="addVoci"
              options={{
                  title: "Neue Vokabel",
                  presentation: 'modal',
                  headerLeft: () => (
                      <Pressable
                          onPress={() => router.back()}
                          accessibilityLabel="Abbrechen"
                      >
                          <Ionicons name="chevron-back" size={32} color="#fff"/>
                      </Pressable>
                  ),
              }}
          />
          <Stack.Screen
              name="editVoci"
              options={{
                  title: "Vokabel bearbeiten",
                  presentation: 'modal',
                  headerLeft: () => (
                      <Pressable
                          onPress={() => router.back()}
                          accessibilityLabel="Abbrechen"
                      >
                          <Ionicons name="chevron-back" size={32} color="#fff"/>
                      </Pressable>
                  ),
              }}
          />
      </Stack>
    </VociProvider>
  );
}
