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

type GoogleTokenProp = {
  cg_access_token:string
  cg_refresh_token:string
  cg_scope:string
  cg_token_type:string
  cg_expiry_date:number|string
}