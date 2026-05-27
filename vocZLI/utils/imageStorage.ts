import { Directory, File, Paths } from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

const IMAGE_DIRECTORY_NAME = "voci-images";

function getImageDirectory() {
    const imageDirectory = new Directory(Paths.document, IMAGE_DIRECTORY_NAME);
    imageDirectory.create({ idempotent: true, intermediates: true });
    return imageDirectory;
}

export async function copyImageToAppDirectory(imageUri: string) {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 800 } }],
        {
            compress: 0.7,
            format: ImageManipulator.SaveFormat.JPEG,
        }
    );

    const imageDirectory = getImageDirectory();
    const sourceFile = new File(manipulatedImage.uri);
    const targetFile = new File(
        imageDirectory,
        `voci-image-${Date.now()}-${Math.round(Math.random() * 1_000_000)}.jpg`
    );

    sourceFile.copy(targetFile);

    if (sourceFile.exists) {
        sourceFile.delete();
    }

    return targetFile.uri;
}

export function deleteStoredImage(imageUri?: string) {
    if (!imageUri) {
        return;
    }

    try {
        const imageDirectory = getImageDirectory();

        if (!imageUri.startsWith(imageDirectory.uri)) {
            return;
        }

        const imageFile = new File(imageUri);

        if (imageFile.exists) {
            imageFile.delete();
        }
    } catch (error) {
        console.error("Bild konnte nicht gelöscht werden", error);
    }
}
