import { Controller } from '@pbbg/http/lib/types/http';
import { axiosInstance } from '@/api/utilities/axios';
import type { MeasurementProtocolEvent, MeasurementProtocolPayload } from '@/api/types/analytics';
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

  public async handle(request: Request, response: Response, next: NextFunction) {
    response.on('finish', this.sendAnalyticsEvent(request, response));
    next();
  }

  private sendAnalyticsEvent(request: Request, response: Response) {
    return async () => {
      const { API_ANALYTICS_ENABLED } = process.env;
      const location = new URL(request.url, `http://${request.headers.host}`).toString();

      if (!API_ANALYTICS_ENABLED || API_ANALYTICS_ENABLED === 'false') {
        return;
      }

      const pageViewEvent: MeasurementProtocolEvent = {
        name: 'page_view',
        params: {
          page_location: location,
          page_title: request.url,
        },
      };

      const requestDurationEvent: MeasurementProtocolEvent = {
        name: 'request_duration',
        params: {
          duration: response.duration,
          page_location: location,
        },
      };

      const payload: MeasurementProtocolPayload = {
        client_id: 'test-user',
        events: [pageViewEvent, requestDurationEvent],
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
