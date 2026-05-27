import Voci from "@/models/voci";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type VociDetailProps =
    | {
    voci?: undefined;
    onSave: (voci: Voci) => void;
}
    | {
    voci: Voci;
    onSave: (voci: Voci) => void;
    onDelete: (voci: Voci) => void;
};

export default function VociDetail(props: Readonly<VociDetailProps>) {
    const { voci, onSave } = props;
    const [term, setTerm] = useState(voci?.term ?? "");
    const [translation, setTranslation] = useState(voci?.translation ?? "");
    const isEditing = voci !== undefined;

    useEffect(() => {
        setTerm(voci?.term ?? "");
        setTranslation(voci?.translation ?? "");
    }, [voci]);

    const handleSave = () => {
        const trimmedTerm = term.trim();
        const trimmedTranslation = translation.trim();

        if (trimmedTerm === "" || trimmedTranslation === "") {
            Alert.alert("Fehler", "Bitte beide Felder ausfüllen");
            return;
        }

        if (isEditing) {
            const updatedVoci: Voci = {
                ...voci,
                term: trimmedTerm,
                translation: trimmedTranslation,
            };
            onSave(updatedVoci);
        } else {
            const newVoci: Voci = {
                term: trimmedTerm,
                translation: trimmedTranslation,
            };
            onSave(newVoci);
            setTerm("");
            setTranslation("");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{isEditing ? "Vokabel bearbeiten" : "Neue Vokabel"}</Text>

                <Text style={styles.label}>Term</Text>
                <TextInput
                    style={styles.input}
                    value={term}
                    onChangeText={setTerm}
                    placeholder="Term eingeben"
                    placeholderTextColor="#9a8d96"
                />

                <Text style={styles.label}>Translation</Text>
                <TextInput
                    style={styles.input}
                    value={translation}
                    onChangeText={setTranslation}
                    placeholder="Translation eingeben"
                    placeholderTextColor="#9a8d96"
                />

                <Pressable
                    style={({ pressed }) => [
                        styles.primaryButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={handleSave}
                >
                    <Text style={styles.buttonText}>Speichern</Text>
                </Pressable>

                {isEditing && (
                    <>
                        <Pressable
                            style={({ pressed }) => [
                                styles.deleteButton,
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={() => props.onDelete(voci)}
                        >
                            <Text style={styles.buttonText}>Löschen</Text>
                        </Pressable>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f0f3",
        padding: 24,
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        marginBottom: 24,
        fontSize: 28,
        fontWeight: "700",
        color: "#2c2430",
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: "700",
        color: "#3f2b3a",
    },
    input: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#d8cbd3",
        borderRadius: 8,
        backgroundColor: "#fbfafb",
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#2c2430",
    },
    primaryButton: {
        marginTop: 12,
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#9e768c",
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    secondaryButton: {
        marginTop: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#9e768c",
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    deleteButton: {
        marginTop: 12,
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#b64040",
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    buttonPressed: {
        opacity: 0.75,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
    },
    secondaryButtonText: {
        color: "#9e768c",
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
    },
});
