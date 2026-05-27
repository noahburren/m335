import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type Voci from "../models/voci";

type VociItemProps = {
    voci: Voci;
};

export default function VociItem({ voci }: Readonly<VociItemProps>) {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.75}
            onPress={() =>
                router.push(`/editVoci?term=${encodeURIComponent(voci.term)}`)
            }
            accessibilityRole="button"
            accessibilityLabel={`${voci.term} bearbeiten`}
        >
            {voci.imageUri ? (
                <Image source={{ uri: voci.imageUri }} style={styles.thumbnail} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Bild</Text>
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.term}>{voci.term}</Text>
                <Text style={styles.translation}>{voci.translation}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    placeholder: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: "#e5e5e5",
        alignItems: "center",
        justifyContent: "center",
    },
    placeholderText: {
        color: "#666",
        fontSize: 12,
    },
    textContainer: {
        flex: 1,
    },
    term: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
    },
    translation: {
        fontSize: 16,
    },
});
