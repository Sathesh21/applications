import React from "react";
import { FlatList, Platform, Button, Alert } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem"
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandeler = id => {
        props.navigation.navigate("EditProduct", { productId: id })
    }
    const deleteHandler = (id) => {
        Alert.alert("Are you sure , `Do you want to delete this item`", [
            { text: "No", style: "default" },
            {
                text: "Yes", style: "destructive", onPress: () => {
                    dispatch(productsActions.deleteProduct(id))

                }
            }
        ])
    }
    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={
                itemData =>
                    <ProductItem
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            editProductHandeler(itemData.item.id);
                        }}
                    >
                        <Button
                            color={Colors.primary}
                            title="Edit"
                            onPress={() => {
                                editProductHandeler(itemData.item.id);
                            }}
                        />
                        <Button
                            color={Colors.primary}
                            title="Delete"
                            onPress={deleteHandler.bind(this, itemData.item.id)}
                        />
                    </ProductItem>
            }
        />
    )
}

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: "your products",
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Add"
                iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
                onPress={() => {
                    navData.navigation.navigate("EditProduct")
                }}
            />
        </HeaderButtons>)

    }
}
export default UserProductScreen;

