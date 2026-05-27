import {useRouter} from "expo-router";
import {useVoci} from "@/context/vociContext";
import Voci from "@/models/voci";
import {StyleSheet, View} from "react-native";
import VociDetail from "@/components/VociDetail";

export default function AddVoci() {
    const router = useRouter();
    const {addVoci} = useVoci();

    const handleAdd = (newVoci : Voci) => {
        addVoci(newVoci);
        router.back();
    }

    return (
        <View style={styles.container}>
            <VociDetail onSave={handleAdd}></VociDetail>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
