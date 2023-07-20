self.addEventListener("push", function (event) {
  const data = event.data.json();
  const title = data.title || "";
  const body = data.body || "";

  const options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    actions: [
      {
        action: "explore",
        title: "Explore this new world",
      },
      {
        action: "close",
        title: "Close notification",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
