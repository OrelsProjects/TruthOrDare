export const canUseNotifications = () => {
  return (
    ("Notification" in window || "PushManager" in window) &&
    "serviceWorker" in navigator
  );
};

export const isMobilePhone = () => {
  if (typeof window === "undefined") return false;
  if (typeof navigator === "undefined") return false;
  if (!navigator.userAgent) return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};
