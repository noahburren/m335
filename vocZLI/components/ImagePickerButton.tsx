import { copyImageToAppDirectory } from "@/utils/imageStorage";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ImagePickerButtonProps {
    imageUri?: string;
    onImageSelected: (uri: string) => void;
}

export default function ImagePickerButton({
    imageUri,
    onImageSelected,
}: ImagePickerButtonProps) {
    const handleSelectedResult = async (result: ImagePicker.ImagePickerResult) => {
        if (result.canceled || result.assets.length === 0) {
            return;
        }

        try {
            const permanentUri = await copyImageToAppDirectory(result.assets[0].uri);
            onImageSelected(permanentUri);
        } catch (error) {
            console.error("Bild konnte nicht gespeichert werden", error);
            Alert.alert("Fehler", "Bild konnte nicht gespeichert werden.");
        }
    };

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Fehler", "Kamera-Zugriff benötigt!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        await handleSelectedResult(result);
    };

    const openGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Fehler", "Galerie-Zugriff benötigt!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        await handleSelectedResult(result);
    };

    const handlePress = () => {
        Alert.alert("Bild auswählen", "Was möchtest du tun?", [
            {
                text: "Foto aufnehmen",
                onPress: openCamera,
            },
            {
                text: "Aus Galerie wählen",
                onPress: openGallery,
            },
            {
                text: "Abbrechen",
                style: "cancel",
            },
        ]);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <Text style={styles.placeholderText}>Bild hinzufügen</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: "#e5e5e5",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    placeholderText: {
        color: "#666",
        textAlign: "center",
    },
});
