import { Controller } from '@/web/types/http';
import { axiosInstance } from '@/web/server/utilities/axios';
import type { MeasurementProtocolEvent, MeasurementProtocolPayload } from '@/web/types/analytics';
import type { NextFunction, Request, Response } from 'express';

export default class SendAnalyticsEvent extends Controller {
  private headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  private parameters: Record<string, string | undefined> = {
    api_secret: process.env.API_ANALYTICS_SECRET,
    measurement_id: process.env.API_ANALYTICS_MEASUREMENT_ID,
  };

  public constructor() {
    super();
    this.handle = this.handle.bind(this);
    this.sendAnalyticsEvent = this.sendAnalyticsEvent.bind(this);
  }

  public async handle(_: Request, response: Response, next: NextFunction) {
    response.on('finish', this.sendAnalyticsEvent());
    next();
  }

  private sendAnalyticsEvent() {
    return async () => {
      const { API_ANALYTICS_ENABLED } = process.env;

      if (!API_ANALYTICS_ENABLED || API_ANALYTICS_ENABLED === 'false') {
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
  }
}
