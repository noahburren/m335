import VociDetail from "@/components/VociDetail";
import { useVoci } from "@/context/vociContext";
import type Voci from "@/models/voci";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EditVoci() {
    const router = useRouter();
    const { term } = useLocalSearchParams<{ term?: string }>();
    const { vociList, updateVoci, removeVoci } = useVoci();
    const selectedTerm = Array.isArray(term) ? term[0] : term;
    const voci = vociList.find((item) => item.term === selectedTerm);

    const handleSave = (updatedVoci: Voci) => {
        if (!selectedTerm) {
            return;
        }

        updateVoci(selectedTerm, updatedVoci);
        router.back();
    };

    const handleDelete = () => {
        if (!selectedTerm) {
            return;
        }

        removeVoci(selectedTerm);
        router.back();
    };

    const handleCancel = () => {
        router.back();
    };

    if (!voci) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundTitle}>Vokabel nicht gefunden</Text>
                <Text style={styles.notFoundText}>
                    Die angeforderte Vokabel kann nicht bearbeitet werden.
                </Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.backButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Zurueck</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <VociDetail
                voci={voci}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notFoundContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f0f3",
        padding: 24,
    },
    notFoundTitle: {
        marginBottom: 8,
        fontSize: 24,
        fontWeight: "700",
        color: "#2c2430",
        textAlign: "center",
    },
    notFoundText: {
        marginBottom: 20,
        fontSize: 16,
        color: "#5f5260",
        textAlign: "center",
    },
    backButton: {
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#9e768c",
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    buttonPressed: {
        opacity: 0.75,
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
