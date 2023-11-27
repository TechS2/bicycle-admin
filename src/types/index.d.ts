type MerchantWebhook = {
    id: string;
    event_version: string;
    create_time: string;
    resource_type: string;
    event_type: string;
    summary: string;
    resource: {
      partner_client_id: string;
      links: Array<{ href: string; rel: string; method: string }>;
      merchant_id: string;
      tracking_id: string;
    };
    links: Array<{ href: string; rel: string; method: string }>;
  }

  type ProductProp  =  {
    id: number
    name: string
    code: string
    active: boolean
    image: string
    description: string
    price: string
    size: string
}