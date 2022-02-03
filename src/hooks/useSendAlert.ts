import { COMMON_ERROR_MSG } from '@config';

import { store } from 'react-notifications-component';

export default function useSendAlert() {
  const sendAlert = (
    type: any,
    title: string,
    message: string,
    errors: { [key: string | number]: any } = null
  ) => {
    store.addNotification({
      title: title,
      message:
        (errors ? `${message}\n${JSON.stringify(errors, null, 2)}` : message) ??
        COMMON_ERROR_MSG,
      type: type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true,
        pauseOnHover: true,
        showIcon: true,
      },
    });
  };
  return sendAlert;
}
