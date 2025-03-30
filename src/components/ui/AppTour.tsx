import { useEffect, useRef } from 'react';
import { driver, Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useTranslation } from 'react-i18next';

export const startAppTour = () => {
  localStorage.removeItem('app-tour-shown');
  const event = new CustomEvent("start-app-tour");
  window.dispatchEvent(event);
};

export function AppTour() {
  const { t } = useTranslation('common');
  const driverRef = useRef<Driver | null>(null);

  useEffect(() => {
    const tourShown = localStorage.getItem('app-tour-shown');
    
    const driverObj = driver({
      animate: true,
      overlayColor: 'rgba(0, 0, 0, 0.7)',
      stagePadding: 10,
      showProgress: true,
      showButtons: ["next", "previous", "close"],
      steps: [
        {
          element: "#app-container",
          popover: {
            title: t("tour.welcome.title"),
            description: t("tour.welcome.description"),
            side: "bottom",
            align: "center",
          }
        },
        {
          element: "[data-tour='new-user-button']",
          popover: {
            title: t("tour.newUser.title"),
            description: t("tour.newUser.description"),
            side: "bottom",
            align: "start",
          }
        },
        {
          element: "[data-tour='theme-button']",
          popover: {
            title: t("tour.theme.title"),
            description: t("tour.theme.description"),
            side: "bottom",
            align: "center",
          }
        },
        {
          element: ".language-switcher",
          popover: {
            title: t("tour.language.title"),
            description: t("tour.language.description"),
            side: "bottom",
            align: "center",
          }
        },
        {
          element: "[data-tour='users-table']",
          popover: {
            title: t("tour.table.title"),
            description: t("tour.table.description"),
            side: "top",
            align: "center",
          }
        }
      ],
      nextBtnText: t("buttons.next"),
      prevBtnText: t("buttons.previous"),
      doneBtnText: t("buttons.done"),
      onDestroyed: () => {
        localStorage.setItem('app-tour-shown', 'true');
      }
    });

    // Guardar la referencia en lugar de usar estado
    driverRef.current = driverObj;

    const handleStart = () => {
      if (driverRef.current) {
        driverRef.current.drive();
      }
    };

    window.addEventListener("start-app-tour", handleStart);

    if (!tourShown) {
      setTimeout(() => {
        if (driverRef.current) {
          driverRef.current.drive();
        }
      }, 3500);
    }

    return () => {
      window.removeEventListener("start-app-tour", handleStart);
      if (driverRef.current) {
        driverRef.current.destroy();
        driverRef.current = null;
      }
    };
  }, [t]);

  // Este componente no renderiza nada visible
  return null;
}

export default AppTour; 