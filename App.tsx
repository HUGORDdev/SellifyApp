import 'react-native-reanimated'
import 'react-native-gesture-handler'
/*
import 'react-native-reanimated'
import 'react-native-gesture-handler'
*/
import { StyleSheet } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import RootNavigator from './scr/navigation/RootNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { persistor, store } from './scr/store'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <GestureHandlerRootView style={styles.safeareContenair} >
      <NavigationContainer>
        <Provider store={store}>

          <PersistGate persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  safeareContenair: {
    flex: 1
  }

})