import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import VociList from "../components/VociList";
import vociList from "../data/vociList";
import styles from "../styles/indexStyles";

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VocZLI</Text>
            <Text style={styles.subtitle}>
                Meine Vokabel-Lern-App ({vociList.length} Vokabeln)
            </Text>
            <VociList data={vociList} />
            <Pressable
                style={({ pressed }) => [
                    styles.fab,
                    pressed && styles.fabPressed,
                ]}
                onPress={() => router.push("/learn")}
                accessibilityLabel="Vokabeln lernen starten"
            >
                <Ionicons name="play" size={28} color="#fff" />
            </Pressable>
        </View>
    );
}
