export interface BrandItem {
  _id: string;
  image: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface BrandResponse {
  data: BrandItem[];
}

export interface CategoryItem {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface CategoryResponse {
  data: CategoryItem[];
}

interface Price {
  $numberDecimal: string;
}

export interface ProductItem {
  _id: string;
  images: string[];
  title: string;
  description?: string;
  category?: CategoryItem;
  brand?: BrandItem;
  sizes?: string[];
  price: Price;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ProductResponse {
  data: ProductItem[];
  page: number;
  pagesCount: number;
}

export interface AutomaticTax {
  enabled: boolean;
  status?: any;
}

export interface CustomText {
  shipping_address?: any;
  submit?: any;
}

export interface Address {
  city: string;
  country: string;
  line1: string;
  line2?: any;
  postal_code: string;
  state: string;
}

export interface CustomerDetails {
  address: Address;
  email: string;
  name: string;
  phone: string;
  tax_exempt: string;
  tax_ids: any[];
}

export interface Metadata {}

export interface InvoiceData {
  account_tax_ids?: any;
  custom_fields?: any;
  description?: any;
  footer?: any;
  metadata: Metadata;
  rendering_options?: any;
}

export interface InvoiceCreation {
  enabled: boolean;
  invoice_data: InvoiceData;
}

export interface Metadata2 {}

export interface PaymentMethodOptions {}

export interface PhoneNumberCollection {
  enabled: boolean;
}

export interface TotalDetails {
  amount_discount: number;
  amount_shipping: number;
  amount_tax: number;
}

export interface getPaymentResponse {
  id: string;
  object: string;
  after_expiration?: any;
  allow_promotion_codes?: any;
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: AutomaticTax;
  billing_address_collection: string;
  cancel_url: string;
  client_reference_id?: any;
  consent?: any;
  consent_collection?: any;
  created: number;
  currency: string;
  custom_fields: any[];
  custom_text: CustomText;
  customer?: any;
  customer_creation: string;
  customer_details: CustomerDetails;
  customer_email?: any;
  expires_at: number;
  invoice?: any;
  invoice_creation: InvoiceCreation;
  livemode: boolean;
  locale?: any;
  metadata: Metadata2;
  mode: string;
  payment_intent: string;
  payment_link?: any;
  payment_method_collection: string;
  payment_method_options: PaymentMethodOptions;
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: PhoneNumberCollection;
  recovered_from?: any;
  setup_intent?: any;
  shipping_address_collection?: any;
  shipping_cost?: any;
  shipping_details?: any;
  shipping_options: any[];
  status: string;
  submit_type?: any;
  subscription?: any;
  success_url: string;
  total_details: TotalDetails;
  url?: any;
}
