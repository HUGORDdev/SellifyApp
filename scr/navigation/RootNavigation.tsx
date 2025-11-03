import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabsNavigation from './MainTabsNavigation';
import { RootStackParamlist } from '../Type';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamlist>();

const RootNavigator  = ()=>{

  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name="MainTabs" component={MainTabsNavigation} />
      <Stack.Screen name="ProductDetail" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}
export default RootNavigator