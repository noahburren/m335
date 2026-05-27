import {Alert, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImagePickerButtonProps {
    imageUri?: string;
    onImageSelected: (uri: string) => void;
}

export default function ImagePickerButton({
    imageUri,
    onImageSelected,
}: ImagePickerButtonProps) {
    const openCamera = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Fehler', 'Kamera-Zugriff benoetigt!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            onImageSelected(uri);
        }
    };

    const openGallery = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Fehler', 'Galerie-Zugriff benoetigt!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            onImageSelected(uri);
        }
    };

    const handlePress = () => {
        Alert.alert('Bild auswaehlen', 'Was moechtest du tun?', [
            {
                text: 'Foto aufnehmen',
                onPress: openCamera,
            },
            {
                text: 'Aus Galerie waehlen',
                onPress: openGallery,
            },
            {
                text: 'Abbrechen',
                style: 'cancel',
            },
        ]);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            {imageUri ? (
                <Image source={{uri: imageUri}} style={styles.image}/>
            ) : (
                <Text style={styles.placeholderText}>Bild hinzufuegen</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: '#e5e5e5',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderText: {
        color: '#666',
        textAlign: 'center',
    },
});
