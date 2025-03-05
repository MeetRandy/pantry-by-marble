import Divider from "@/components/ui/Divider";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    return (
        <SafeAreaView>
           <View style={styles.container}>
                <View style={styles.back}>
                    <Ionicons size={20} name={'chevron-back'} color="#54634B" />
                </View>
                <View>
                    <Text style={[styles.title]}>Profile</Text>
                    <Divider />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16
    },
    back: {
        marginBottom: 16
    },
    title: {
        fontSize: 40,
        color: '#54634B',
        fontFamily: 'AGaramondProBold',
        lineHeight: 50,
    },
})