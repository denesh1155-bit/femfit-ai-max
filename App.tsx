import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Auth Features
import LockScreen from './src/features/auth/presentation/LockScreen';
import OnboardingScreen from './src/features/auth/presentation/OnboardingScreen';

// Dashboard & Stats
import DashboardScreen from './src/features/dashboard/presentation/DashboardScreen';
import StepsTrackerScreen from './src/features/dashboard/presentation/StepsTrackerScreen';

// Cycle & Health
import CycleScreen from './src/features/cycle/presentation/CycleScreen';
import HealthProfileScreen from './src/features/health_profile/presentation/HealthProfileScreen';

// AI & Scanner
import AICoachScreen from './src/features/ai_coach/presentation/AICoachScreen';
import VoiceModeScreen from './src/features/ai_coach/presentation/VoiceModeScreen';
import BarcodeScannerScreen from './src/features/barcode/presentation/BarcodeScannerScreen';
import BarcodeResultScreen from './src/features/barcode/presentation/BarcodeResultScreen';
import BarcodeHistoryScreen from './src/features/barcode/presentation/BarcodeHistoryScreen';
import FoodScannerScreen from './src/features/food_recognition/presentation/FoodScannerScreen';
import FoodResultScreen from './src/features/food_recognition/presentation/FoodResultScreen';

// Other
import PaywallScreen from './src/features/subscription/presentation/PaywallScreen';
import SettingsScreen from './src/features/settings/presentation/SettingsScreen';
import { NotificationService } from './src/services/NotificationService';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Final T3 - Activate Push Notifications from Lesya
    NotificationService.requestPermissions();
    NotificationService.scheduleDefaults();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Lock"
          screenOptions={{ 
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
        >
          {/* Main Flow */}
          <Stack.Screen name="Lock" component={LockScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="HealthProfile" component={HealthProfileScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />

          {/* Features */}
          <Stack.Screen name="Cycle" component={CycleScreen} />
          <Stack.Screen name="Steps" component={StepsTrackerScreen} />
          <Stack.Screen name="AICoach" component={AICoachScreen} />
          <Stack.Screen name="Voice" component={VoiceModeScreen} />
          <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
          <Stack.Screen name="BarcodeResult" component={BarcodeResultScreen} />
          <Stack.Screen name="BarcodeHistory" component={BarcodeHistoryScreen} />
          <Stack.Screen name="FoodScanner" component={FoodScannerScreen} />
          <Stack.Screen name="FoodResult" component={FoodResultScreen} />

          {/* System */}
          <Stack.Screen name="Paywall" component={PaywallScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
