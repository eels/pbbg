import { axiosInstance } from '@/web/server/utilities/axios';
import type { AsyncHandler } from '@/web/types/http';
import type { MeasurementProtocolEvent, MeasurementProtocolPayload } from '@/web/types/analytics';
import type { Response } from 'express';

export class SendAnalyticsEvent {
  public static handle: AsyncHandler = async (_, response, next) => {
    response.on('finish', this.sendAnalyticsEvent(response));
    next();
  };

  private static headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  private static parameters: Record<string, string | undefined> = {
    api_secret: process.env.ANALYTICS_API_API_SECRET,
    measurement_id: process.env.ANALYTICS_API_MEASUREMENT_ID,
  };

  private static sendAnalyticsEvent = (_: Response) => {
    return async () => {
      const { ANALYTICS_API_ENABLED } = process.env;

      if (!ANALYTICS_API_ENABLED || ANALYTICS_API_ENABLED === 'false') {
        return;
      }

      const pageViewEvent: MeasurementProtocolEvent = {
        name: 'page_view',
        params: {
          page_location: '',
          page_title: '',
        },
      };

      const payload: MeasurementProtocolPayload = {
        client_id: 'test-user',
        events: [pageViewEvent],
        non_personalized_ads: false,
      };

      await axiosInstance('https://www.google-analytics.com/mp/collect', {
        data: payload,
        headers: this.headers,
        method: 'POST',
        params: this.parameters,
      });
    };
  };
}
