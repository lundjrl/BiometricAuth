import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

export const initBioMetrics = async () => {
  try {
    const {available, biometryType, error} =
      await rnBiometrics.isSensorAvailable();

    if (error) {
      throw Error(error);
    }

    if (!available) {
      // Do something if biometric auth isn't available
      console.log('Biometrics is not available');
      return;
    }

    return biometryType;
  } catch (error) {
    console.error(error);
  }
};

export const handleKeys = async () => {
  const {keysExist} = await rnBiometrics.biometricKeysExist();

  if (keysExist) {
    console.log('Keys exist');
  } else {
    console.log('Keys do not exist or were deleted');
    const {publicKey} = await rnBiometrics.createKeys();

    console.log(publicKey);
    // Send public key to server for auth
    // sendPublicKeyToServer(publicKey)
  }
};

export const handleSignature = async () => {
  const now = new Date().toLocaleDateString('en');
  const payload = `${now} + app sign in request`;
  const {success, signature} = await rnBiometrics.createSignature({
    promptMessage: 'Sign in',
    payload: payload,
  });

  if (success) {
    console.log(signature);
    // verifySignatureWithServer(signature, payload)
  }
};

export const handleTouchID = async () => {
  const biometryType = await initBioMetrics();

  if (biometryType === BiometryTypes.TouchID) {
    //do something face id specific
    await handleKeys();
    await handleSignature();
  }
};

export const handleFaceID = async () => {
  const biometryType = await initBioMetrics();

  if (biometryType === BiometryTypes.FaceID) {
    //do something face id specific
    await handleKeys();
    await handleSignature();
  }
};

export const handleBiometrics = async () => {
  const biometryType = await initBioMetrics();

  if (biometryType === BiometryTypes.Biometrics) {
    //do something face id specific
    await handleKeys();
    await handleSignature();
  }
};
