import {useState, useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';

/**
 * Retourne la RAM totale de l'appareil en GB, ainsi qu'une estimation de la
 * RAM "utilisable" pour le filtrage des modèles IA proposés à l'utilisateur.
 *
 * Formule hybride :
 * - Téléphones <= 6 Go de RAM totale : usableRamGB = ramGB - 1.5
 *   (une marge fixe suffit, ces appareils ont généralement peu d'apps
 *   gourmandes en arrière-plan et la RAM annoncée est assez fiable).
 * - Téléphones > 6 Go de RAM totale : usableRamGB = ramGB / 3
 *   (sur certains appareils récents/haut de gamme, la RAM réellement
 *   disponible pour une app est beaucoup plus faible que la RAM totale
 *   annoncée — observé notamment sur Motorola Edge 30 Pro où un modèle
 *   de ~4 Go devient déjà difficile à charger malgré 12 Go de RAM totale).
 *
 * Ex: téléphone 4 Go  → ramGB = 1.5,  usableRamGB = 2.5  (formule -2.5)
 * Ex: téléphone 6 Go  → ramGB = 3.5,  usableRamGB = 4.5  (formule -2.5)
 * Ex: téléphone 12 Go → ramGB = 4.8, usableRamGB = 4    (formule /2.5)
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

  const RAM_THRESHOLD_GB = 6;
  const SYSTEM_MARGIN_GB = 2.5;
  const HIGH_RAM_DIVISOR = 2.5;

  const usableRamGB =
    ramGB <= RAM_THRESHOLD_GB
      ? Math.max(0, ramGB - SYSTEM_MARGIN_GB)
      : ramGB / HIGH_RAM_DIVISOR;

  return {ramGB, usableRamGB, isLoading};
}
