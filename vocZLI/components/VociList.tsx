import { FlatList, StyleSheet } from "react-native";
import type Voci from "../models/voci";
import EmptyVociList from "./EmptyVociList";
import VociItem from "./VociItem";

type VociListProps = {
    data: Voci[];
};

export default function VociList({ data }: Readonly<VociListProps>) {
    return (
        <FlatList
            data={data}
            contentContainerStyle={styles.content}
            keyExtractor={(item) => item.term}
            ListEmptyComponent={EmptyVociList}
            renderItem={({ item }) => <VociItem voci={item} />}
            style={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        alignSelf: "stretch",
        width: "100%",
    },
    content: {
        padding: 16,
    },
});
