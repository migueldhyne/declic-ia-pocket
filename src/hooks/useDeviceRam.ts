import {useState, useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';

/**
 * Retourne la RAM totale de l'appareil en GB.
 * Inclut une marge système de 1.5GB pour le filtre des modèles.
 * Ex: téléphone 4GB → ramGB = 4, usableRamGB = 2.5
 */
export function useDeviceRam(): {
  ramGB: number;
  usableRamGB: number;
  isLoading: boolean;
} {
  const [ramGB, setRamGB] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DeviceInfo.getTotalMemory().then(bytes => {
      const gb = bytes / 1024 / 1024 / 1024;
      setRamGB(gb);
      setIsLoading(false);
    });
  }, []);

  // Marge système Android ~1.5GB
  const usableRamGB = Math.max(0, ramGB - 1.5);

  return {ramGB, usableRamGB, isLoading};
}
