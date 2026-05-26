import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyVociList() {
    return (
        <View style={styles.container}>
            <Ionicons name="book-outline" size={48} color="#8a8a8a" />
            <Text style={styles.text}>Noch keine Vokabeln vorhanden.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 24,
    },
    text: {
        marginTop: 8,
        fontSize: 16,
        color: "#666",
    },
});
