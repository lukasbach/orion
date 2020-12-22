import Analytics from 'analytics';
// @ts-ignore
import googleAnalytics from '@analytics/google-analytics';

const win = window as any;
win.dataLayer = win.dataLayer || [];
const gtag = (...args: any[]) => win.dataLayer.push(args);

let telemetryCall = (ev: string) => {};

if (!localStorage.getItem("no-telemetry") && !win.noTelemetry) {
  const analytics = Analytics({
    app: 'awesome-app',
    plugins: [
      googleAnalytics({
        trackingId: 'G-4B5ECK8F6Z'
      })
    ]
  });

  telemetryCall = (ev: string) => {
    analytics.track(ev, {'category': 'custom'});
  };
}

export { telemetryCall };
