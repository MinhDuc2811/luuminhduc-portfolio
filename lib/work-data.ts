export const BSS_APPS = [
  {
    name: 'OPTIS Product Options, Variant',
    role: 'variant/option UI + admin CMS',
    rating: '4.9',
    reviews: '2,218',
    icon: '/apps/optis-options-icon.png',
    href: 'https://apps.shopify.com/product-options-by-bss',
  },
  {
    name: 'OP Color Swatch Variant Images',
    role: 'storefront swatches + gallery',
    rating: '5.0',
    reviews: '810',
    icon: '/apps/optis-swatch-icon.png',
    href: 'https://apps.shopify.com/optis-color-swatch-variants',
  },
]

export const SHOPIFY_WORK = {
  title: 'Shopify Apps — BSS Commerce',
  year: '2026',
  role: 'App Developer · NestJS + Remix/Polaris + Lit',
  description:
    'Shipped full-stack features for two "Built for Shopify" certified apps live on the App Store — storefront variant/option UI, an admin CMS with live preview, multi-language support, bulk import/export, and end-to-end ownership of merchant bug reports.',
  apps: BSS_APPS,
}

export const PROJECTS = [
  {
    name: 'RetroTrade',
    period: '09/2025 – 12/2025',
    image: '/projects/retrotrade.png',
    role: 'Fullstack Developer & Leader · team of 5',
    description:
      'A rental platform for sharing, renting, and reusing items. ID verification via OCR + face-matching, end-to-end rental flow, AES-signed e-contracts rendered to PDF, AI content moderation.',
    stack: ['Next.js', 'TypeScript', 'NodeJS', 'MongoDB', 'Socket.io', 'Twilio'],
    links: [
      { label: 'live', href: 'https://retrotrade.id.vn' },
      { label: 'github', href: 'https://github.com/dinhduclinh/RetroTrade' },
    ],
  },
  {
    name: 'Nutigo',
    period: '01/2025 – 03/2025',
    image: '/projects/nutigo.png',
    role: 'Fullstack Developer & Leader · team of 4',
    description:
      'A healthy-food distribution platform supporting wholesale ordering. Full MERN shopping flow with VNPay checkout, self-expiring discount engine via cron, AI chatbot (Gemini), production deploy on Docker + Linux.',
    stack: ['React', 'TypeScript', 'NodeJS', 'MongoDB', 'Firebase', 'Docker'],
    links: [
      { label: 'live', href: 'https://www.nutigo.id.vn' },
      { label: 'github', href: 'https://github.com/KetXanh/WDP301_PROJECT_8' },
    ],
  },
]
