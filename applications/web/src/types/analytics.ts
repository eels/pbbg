export interface MeasurementProtocolEvent {
  name: string;
  params?: Record<string, any>;
}

export interface MeasurementProtocolPayload {
  client_id: string;
  events: MeasurementProtocolEvent[];
  non_personalized_ads: false;
  user_id?: string;
}
