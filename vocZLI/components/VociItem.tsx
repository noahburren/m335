import { StyleSheet, Text, View } from "react-native";
import type Voci from "../models/voci";

type VociItemProps = {
    voci: Voci;
};

export default function VociItem({ voci }: Readonly<VociItemProps>) {
    return (
        <View style={styles.card}>
            <Text style={styles.term}>{voci.term}</Text>
            <Text style={styles.translation}>{voci.translation}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
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
