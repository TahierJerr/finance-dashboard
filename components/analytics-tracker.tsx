"use client"

import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

interface AnalyticsTrackerProps {
  page: string;
}

export function AnalyticsTracker({ page }: AnalyticsTrackerProps) {
  useEffect(() => {
    trackPageView(page);
  }, [page]);
  return null;
}
