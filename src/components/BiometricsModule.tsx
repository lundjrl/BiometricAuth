import React from 'react';
import {Platform, Pressable} from 'react-native';
import {
  handleBiometrics,
  handleFaceID,
  handleTouchID,
} from '../services/AuthService';

export const BiometricsModule: React.FC = () => (
  <>
    {Platform.OS === 'ios' ? (
      <>
        <Pressable onPress={handleTouchID} style={{marginBottom: 80}}>
          Try iOS TouchID
        </Pressable>
        <Pressable onPress={handleFaceID}>Try iOS FaceID</Pressable>
      </>
    ) : (
      <Pressable onPress={handleBiometrics}>Try Android Biometrics</Pressable>
    )}
  </>
);
