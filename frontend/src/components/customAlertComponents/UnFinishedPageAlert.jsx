import { Alert } from "./CustomAlert";

let isAlertActive = false;

export function UnFinishedPageAlert() {
  if (!isAlertActive) {
    isAlertActive = true;
    Alert.fire({
      icon: "warning",
      title: "This page is not yet completed.",
      text: "This page is not yet completed.",
    }).finally(() => {
      isAlertActive = false;
    });
  }
}
