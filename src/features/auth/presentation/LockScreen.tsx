import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';
import { Colors } from '../../../constants/Colors';
import GlassCard from '../../../components/GlassCard';
import BackgroundElements from '../../../components/BackgroundElements';
import { Lock, Delete, Fingerprint, ShieldCheck } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const LockScreen = ({ navigation }: any) => {
  const [pin, setPin] = useState('');
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const code = '1234';

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (compatible && enrolled) {
        handleBiometricAuth();
      }
    })();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Вход в FemFit AI ✨',
        fallbackLabel: 'Использовать PIN-код',
        disableDeviceFallback: false,
      });

      if (result.success) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.replace('Dashboard');
      }
    } catch (error) {
      console.error('Biometric error:', error);
    }
  };

  const handlePress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (newPin === code) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.replace('Dashboard');
      } else if (newPin.length === 4) {
        setTimeout(() => {
          setPin('');
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }, 500);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F0F1E', '#1A1A2E', '#20162E']} style={StyleSheet.absoluteFill}>
        <BackgroundElements />
      </LinearGradient>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={styles.glow} />
            <ShieldCheck size={48} color={Colors.light.roseGold} style={styles.lockIcon} />
          </View>

          <Text style={styles.title}>Введите секретный код</Text>

          <View style={styles.dotsRow}>
            {[1, 2, 3, 4].map((i) => (
              <View 
                key={i} 
                style={[
                  styles.dot, 
                  pin.length >= i && styles.dotActive
                ]} 
              />
            ))}
          </View>

          <View style={styles.numpad}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((val, i) => (
              <TouchableOpacity
                key={i}
                style={styles.numItem}
                onPress={() => handlePress(val)}
                activeOpacity={0.7}
              >
                <GlassCard style={styles.numCard}>
                  <Text style={styles.numText}>{val}</Text>
                </GlassCard>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.numItem}
              onPress={handleBiometricAuth}
              activeOpacity={0.7}
            >
              <GlassCard style={[styles.numCard, styles.biometricCard]}>
                <Fingerprint size={32} color={Colors.light.roseGold} />
              </GlassCard>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.numItem}
              onPress={() => handlePress('0')}
              activeOpacity={0.7}
            >
              <GlassCard style={styles.numCard}>
                <Text style={styles.numText}>0</Text>
              </GlassCard>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.numItem}
              onPress={handleDelete}
              activeOpacity={0.7}
            >
              <GlassCard style={styles.numCard}>
                <Delete size={28} color="#FFF" opacity={0.5} />
              </GlassCard>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.6}>
            <Text style={styles.forgotText}>Забыли код?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1E'
  },
  safeArea: {
    flex: 1
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  iconContainer: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  glow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light.roseGold,
    opacity: 0.15
  },
  lockIcon: {
    zIndex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 50,
    letterSpacing: -0.5
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 60
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'rgba(229, 180, 162, 0.3)'
  },
  dotActive: {
    backgroundColor: Colors.light.roseGold,
    borderColor: Colors.light.roseGold,
    shadowColor: Colors.light.roseGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.85,
    justifyContent: 'center'
  },
  numItem: {
    width: '31%',
    aspectRatio: 1,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  numCard: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.05)'
  },
  biometricCard: {
    backgroundColor: 'rgba(229, 180, 162, 0.1)'
  },
  numText: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: '700'
  },
  forgotBtn: {
    marginTop: 60
  },
  forgotText: {
    color: Colors.light.roseGold,
    opacity: 0.6,
    fontWeight: '800',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1
  }
});

export default LockScreen;
