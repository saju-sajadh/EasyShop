import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { ClerkProvider } from '@clerk/clerk-expo';
import Stacks from './Stacks';
import * as SecureStore from 'expo-secure-store'


const clerkPubKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

function RootComponent() {
  const tokenCache = {
    async getToken(key) {
      try {
        const item = await SecureStore.getItemAsync(key)
        return item
      } catch (error) {
        console.error('SecureStore get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value)
      } catch (err) {
        return
      }
    },
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key.',
    )
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPubKey}> 
      <Stacks /> 
    </ClerkProvider>
  );
}

AppRegistry.registerComponent(appName, () => RootComponent);