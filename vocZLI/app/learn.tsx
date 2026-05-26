import { StyleSheet, Text, View } from "react-native";

export default function LearnScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vokabeln lernen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
    },
});
