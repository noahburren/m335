import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import initialVociList from "../data/vociList";
import type Voci from "../models/voci";
import { deleteStoredImage } from "@/utils/imageStorage";

interface VociContextType {
    vociList: Voci[];
    addVoci: (voci: Voci) => void;
    updateVoci: (term: string, updatedVoci: Voci) => void;
    removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);
const VOCIS_STORAGE_KEY = "vocis";

export function VociProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [vociList, setVociList] = useState<Voci[]>(initialVociList);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadVocis() {
            try {
                const storedVocis = await AsyncStorage.getItem(VOCIS_STORAGE_KEY);

                if (storedVocis !== null) {
                    setVociList(JSON.parse(storedVocis));
                }
            } catch (error) {
                console.error("Vocis konnten nicht geladen werden", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadVocis();
    }, []);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        async function saveVocis() {
            try {
                const jsonVocis = JSON.stringify(vociList);
                await AsyncStorage.setItem(VOCIS_STORAGE_KEY, jsonVocis);
            } catch (error) {
                console.error("Vocis konnten nicht gespeichert werden", error);
            }
        }

        saveVocis();
    }, [isLoading, vociList]);

    const addVoci = (voci: Voci) => {
        setVociList((currentVociList) => [...currentVociList, voci]);
    };

    const updateVoci = (term: string, updatedVoci: Voci) => {
        setVociList((currentVociList) =>
            currentVociList.map((voci) => {
                if (voci.term !== term) {
                    return voci;
                }

                if (voci.imageUri && voci.imageUri !== updatedVoci.imageUri) {
                    deleteStoredImage(voci.imageUri);
                }

                return updatedVoci;
            })
        );
    };

    const removeVoci = (term: string) => {
        setVociList((currentVociList) => {
            const vociToRemove = currentVociList.find((voci) => voci.term === term);
            deleteStoredImage(vociToRemove?.imageUri);

            return currentVociList.filter((voci) => voci.term !== term);
        });
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#9e768c" />
            </View>
        );
    }

    return (
        <VociContext.Provider
            value={{ vociList, addVoci, updateVoci, removeVoci }}
        >
            {children}
        </VociContext.Provider>
    );
}

export function useVoci() {
    const context = useContext(VociContext);

    if (!context) {
        throw new Error("useVoci muss innerhalb von VociProvider verwendet werden");
    }

    return context;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
