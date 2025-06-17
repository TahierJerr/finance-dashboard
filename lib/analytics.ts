export function trackPageView(page: string) {
  if (typeof window !== "undefined") {
    console.log(`[Analytics] Page view: ${page}`);
  }
}
