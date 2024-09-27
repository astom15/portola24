const getClientId = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; _ga=`);
  if (parts.length === 2) {
    const gaCookieValue = parts.pop()?.split(";").shift();
    const clientId = gaCookieValue?.split(".").slice(2, 4).join(".");
    return clientId;
  }
  return null;
}


export const handleImageClick = (imageName: string, href: string) => {
  const gtag = (window as any).gtag as (...args: any[]) => void;
  gtag("event", "click", {
    event_category: "Image",
    event_label: imageName,
    value: 1,
  });

  const clientId = getClientId() || "510";

  const beaconData = new URLSearchParams({
    v: "1",
    tid: "G-W96DVZ8X4F",
    cid: clientId,
    t: "event",
    ec: "Image",
    ea: "click",
    el: imageName,
    ev: "1",
  });

  navigator.sendBeacon(
    "https://www.google-analytics.com/collect",
    beaconData.toString()
  );

  setTimeout(() => {
    window.open(href, "_blank"); 
  }, 100); 
};;