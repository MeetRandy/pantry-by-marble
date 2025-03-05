import React from "react";
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { increaseQuantity, decreaseQuantity, removeItem } from "../../redux/cartSlice";
import { CartItem } from "../../redux/types";
import Divider from "@/components/ui/Divider";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
    const dispatch: AppDispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const deliveryFee = useSelector((state: RootState) => state.cart.deliveryFee);

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const total = subtotal + deliveryFee;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.back}>
                    <Ionicons size={20} name={'chevron-back'} color="#54634B" />
                </View>
                <View>
                    <Text style={[styles.title]}>Cart</Text>
                    <Divider />
                </View>
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }: { item: CartItem }) => (
                    <>
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.details}>
                                <Text>{item.name}</Text>
                                <Text style={styles.priceText}>R {item.price.toFixed(2)}</Text>

                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity style={styles.promoText} onPress={() => dispatch(removeItem(item.id))}>
                                        <Text style={styles.removeText}>Remove</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.quantityButton} onPress={() => dispatch(decreaseQuantity(item.id))}>
                                        <Icon name="remove" type="material" color="#2b3a24" size={18} />
                                    </TouchableOpacity>

                                    <Text>{item.quantity}</Text>

                                    <TouchableOpacity style={styles.quantityButton} onPress={() => dispatch(increaseQuantity(item.id))}>
                                        <Icon name="add" type="material" color="#2b3a24" size={18} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.divider} />

                    </>

                )}
            />
            {/* Promo Code Input */}
            <View style={styles.promoInputContainer}>
                <TextInput placeholder="Add your promo code" style={styles.promoInput} />
                <Text style={styles.applyDivider}>|</Text>
                <TouchableOpacity disabled style={styles.applyButton}>
                    <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
            </View>
            {/* Total Section */}
            <View style={styles.totalContainer}>
                <View style={styles.totalRow}>
                    <Text>Sub total</Text>
                    <Text style={styles.boldText}>R {subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text>Delivery</Text>
                    <Text style={styles.boldText}>R {deliveryFee.toFixed(2)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                    <Text style={styles.boldText}>Total</Text>
                    <Text style={styles.boldText}>R {total.toFixed(2)}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
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
    card: {
        flexDirection: "row",
        justifyContent: 'space-between',
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    priceText: {
        fontWeight: "bold",
        color: "#2b3a24",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: 10,
    },
    removeText: {
        color: "#2b3a24",
        fontWeight: "bold",
    },
    quantityButton: {
        borderWidth: 2,
        borderColor: "#2b3a24",
        borderRadius: 20,
        padding: 5,
        marginHorizontal: 5,
    },
    divider: {
        height: 1,
        backgroundColor: "#dcdcdc",
        marginVertical: 10,
    },
    promoInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 80,
        borderColor: '#54634B',
        borderWidth: 2,
    },
    promoInput: {
        flex: 1,
        padding: 8,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center'

    },
    promoText: {
        borderColor: '#54634B',
        borderRadius: 80,
        borderWidth: 2,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20

    },
    applyDivider:{
        marginHorizontal: 20
    },
    applyButton: {
        padding: 10,
        borderRadius: 5,
    },
    applyText: {
        color: "gray",
        fontFamily: 'Avenir',
        fontSize: 14
    },
    totalContainer: {
        backgroundColor: "#EBEAE4",
        padding: 16,
        borderRadius: 10,
        marginTop: 30,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    boldText: {
        fontWeight: "bold",
    },
    button: {
        backgroundColor: '#54634B',
        height: 58,
        width: 343,
        paddingTop: 20,
        paddingRight: 5,
        paddingBottom: 20,
        paddingLeft: 5,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: '#54634B',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        lineHeight: 15,
        justifyContent: 'center'
    }
});
