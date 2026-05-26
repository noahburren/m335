import { Text, View } from "react-native";
import VociList from "../components/VociList";
import vociList from "../data/vociList";
import styles from "../styles/indexStyles";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>VocZLI</Text>
            <Text style={styles.subtitle}>
                Meine Vokabel-Lern-App ({vociList.length} Vokabeln)
            </Text>
            <VociList data={vociList} />
        </View>
    );
}
