
const win = window as any;
win.dataLayer = win.dataLayer || [];
const gtag = (...args: any[]) => win.dataLayer.push(args);

let telemetryCall = (ev: string) => {};

if (!localStorage.getItem("no-telemetry") && !win.noTelemetry) {
  gtag('js', new Date());
  gtag('config', 'G-4B5ECK8F6Z');
  telemetryCall = (ev: string) => {
    gtag('event', ev, { 'event_category': ev });
  }
}

export { telemetryCall };