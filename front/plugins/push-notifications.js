// plugins/push-notifications.js
export default async ({}) => {
  if (process.client) {
    // Wait for the service worker registration to complete
    const registration = await navigator.serviceWorker.ready;

    const runtimeConfig = useRuntimeConfig();
    // Use VAPID public key
    const applicationServerKey = urlB64ToUint8Array(
      runtimeConfig.public.vapidKey
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await registration.pushManager.subscribe(options);

    await fetch("/api/save-subscription", {
      method: "POST", // HTTP-Methodを指定する！
      headers: {
        "Content-Type": "application/json", // 追加する行
      },
      body: JSON.stringify(subscription), // リクエストボディーにフォームデータを設定
    });
  }
};

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
