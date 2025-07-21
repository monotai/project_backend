const controller = new notificationsController();

// Add a notification
controller.addNotification({ message: "New notification" });

// Get notifications
const all = controller.getNotifications();

// Clear notifications
controller.clearNotifications();
