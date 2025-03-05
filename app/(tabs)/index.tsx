import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.linksContainer}>
                <Link href="/about" style={styles.linkText}>About</Link>
                <Link href="/contact" style={styles.linkText}>Contact</Link>
            </View>
            <Text style={styles.nameText}>Francis Xavier C. Baclao</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linksContainer: {
        position: 'absolute',
        top: 40,
        flexDirection: 'row',
        gap: 20,
    },
    linkText: {
        color: 'gold',
        fontSize: 18,
    },
    nameText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'cyan',
        textAlign: 'center',
    },
});