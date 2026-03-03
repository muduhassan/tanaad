import React from 'react';
import { useTranslation } from 'react-i18next';

interface ToastProps {
  message: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000 }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="toast">
      {t(message)}
    </div>
  );
};

export default Toast;