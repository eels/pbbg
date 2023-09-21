import { Controller } from '@/http/types/http';
import { axiosInstance } from '@/http/utilities/axios';
import type { Context, Next } from 'hono';
import type { MeasurementProtocolEvent, MeasurementProtocolPayload } from '@/http/types/analytics';

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

  public async handle(context: Context, next: Next) {
    await next();
    await this.sendAnalyticsEvent(context);
  }

  private async sendAnalyticsEvent(context: Context) {
    const { API_ANALYTICS_ENABLED } = process.env;
    const url = new URL(context.req.url, `http://${context.req.header('host')}`);
    const location = url.toString();

    if (!API_ANALYTICS_ENABLED || API_ANALYTICS_ENABLED === 'false') {
      return;
    }

    const pageViewEvent: MeasurementProtocolEvent = {
      name: 'page_view',
      params: {
        page_location: location,
        page_title: context.req.url,
      },
    };

    const requestDurationEvent: MeasurementProtocolEvent = {
      name: 'request_duration',
      params: {
        duration: context.duration,
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
  }
}
