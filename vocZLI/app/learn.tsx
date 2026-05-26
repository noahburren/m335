import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import vociList from "@/data/vociList";

export default function LearnScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const currentVoci = vociList[currentIndex];

    const handleNext = (wasCorrect: boolean) => {
        if (wasCorrect) {
            setCorrectCount(correctCount + 1);
        } else {
            setWrongCount(wrongCount + 1);
        }

        setShowTranslation(false);

        if (currentIndex + 1 >= vociList.length) {
            router.back();
            return;
        }

        setCurrentIndex(currentIndex + 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.progress}>
                {currentIndex + 1} / {vociList.length}
            </Text>
            <Text style={styles.stats}>
                Richtig: {correctCount} | Falsch: {wrongCount}
            </Text>

            <View style={styles.card}>
                <Text style={styles.term}>{currentVoci.term}</Text>
                {showTranslation && (
                    <Text style={styles.translation}>
                        {currentVoci.translation}
                    </Text>
                )}
            </View>

            {!showTranslation && (
                <Pressable
                    style={({ pressed }) => [
                        styles.primaryButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => setShowTranslation(true)}
                >
                    <Text style={styles.buttonText}>Übersetzung zeigen</Text>
                </Pressable>
            )}

            {showTranslation && (
                <View style={styles.answerButtons}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.answerButton,
                            styles.wrongButton,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={() => handleNext(false)}
                    >
                        <Text style={styles.buttonText}>Nicht gewusst</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.answerButton,
                            styles.correctButton,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={() => handleNext(true)}
                    >
                        <Text style={styles.buttonText}>Gewusst</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f4f0f3",
        padding: 24,
    },
    progress: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "700",
        color: "#3f2b3a",
    },
    stats: {
        marginTop: 8,
        marginBottom: 48,
        fontSize: 16,
        color: "#5f4d58",
    },
    card: {
        width: "100%",
        minHeight: 240,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 32,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 8,
    },
    term: {
        fontSize: 40,
        fontWeight: "700",
        textAlign: "center",
        color: "#2c2430",
    },
    translation: {
        marginTop: 24,
        fontSize: 28,
        fontWeight: "600",
        textAlign: "center",
        color: "#70566a",
    },
    primaryButton: {
        marginTop: 40,
        minWidth: 220,
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#9e768c",
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    answerButtons: {
        width: "100%",
        flexDirection: "row",
        gap: 12,
        marginTop: 40,
    },
    answerButton: {
        flex: 1,
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    correctButton: {
        backgroundColor: "#2f8f46",
    },
    wrongButton: {
        backgroundColor: "#c2413d",
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
});
