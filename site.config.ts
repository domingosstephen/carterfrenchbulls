/**
 * Site configuration — all placeholder tokens live here.
 * Never hardcode these values in templates.
 * Update this file when the breeder provides real values.
 */

const siteConfig = {
  // Identity
  kennelName: 'Carter French Bulls',
  breederName: 'Sandy Carter',
  siteUrl: 'https://carterfrenchbulls.com',
  domain: 'carterfrenchbulls.com',

  // Contact — EMAIL is still a placeholder
  phone: '{{PHONE}}',           // e.g. "+1 (555) 123-4567"
  email: '{{EMAIL}}',           // breeder's contact email — TO BE FILLED
  breederEmail: '{{BREEDER_EMAIL}}', // receives reservation requests — can be same

  // Registration — varies per puppy, discuss individually with buyer
  registry: '{{REGISTRY}}',    // Not AKC/CKC — confirm per-puppy with buyer

  // Pricing
  currency: 'USD' as 'USD' | 'CAD',
  price: 1200,

  // Reservation flow
  deposit: '{{DEPOSIT}}',          // e.g. "$300 non-refundable deposit"
  responseTime: '{{RESPONSE_TIME}}', // e.g. "within 24 hours"

  // Delivery
  deliveryOptions: '{{DELIVERY_OPTIONS}}', // e.g. "Pickup, ground transport, or flight nanny"

  // About
  yearsBreeding: '7+',

  // Social (optional, leave empty to hide)
  instagram: '',
  facebook: '',
} as const;

export default siteConfig;
export type SiteConfig = typeof siteConfig;
