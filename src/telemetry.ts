import GA4React from 'ga-4-react';

const win = window as any;

let telemetryCall = (ev: string) => {};

if (!localStorage.getItem("no-telemetry") && !win.noTelemetry) {
  const ga4react = new GA4React('G-4B5ECK8F6Z');
  ga4react.initialize().then((ga4) => {
    ga4.gtag('event', 'init');
    telemetryCall = (ev: string) => {
      ga4.gtag('event', ev,)
    };
  },(err) => {
    console.error(err)
  });
}

export { telemetryCall };
