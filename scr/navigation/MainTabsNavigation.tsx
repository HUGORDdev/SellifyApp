import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreens from '../Screens/HomeScreens';
import ProfileScreen from '../Screens/ProfileScreen';
import CartScreen from '../Screens/CartScreen';
import { TabNavigatorParamlist } from '../Type';
import CustomsTabBar from '../componants/CustomsTabBar';

const MainTabsNavigation = () => {

    const Tab = createBottomTabNavigator<TabNavigatorParamlist>();

    return (
        <Tab.Navigator
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBar={((props) => <CustomsTabBar
                onChange={() => { }}
                data={[
                    { label: "Home", name: 'House', route: 'Home' },
                    { label: "Cart", name: 'ShoppingCart', route: 'Cart' },
                    { label: "Profile", name: 'User', route: 'Profile' },
                ]}
                {...props} />)}
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreens} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default MainTabsNavigation

const styles = StyleSheet.create({})