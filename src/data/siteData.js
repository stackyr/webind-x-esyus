export const BRAND_CONFIG = {
  webind: {
    name: 'WEBIND',
    tagline: 'Web Experiences & Digital Interfaces',
    role: 'Frontend & Digital Experience',
    scope: [
      'High-performance business websites',
      'High-converting landing pages',
      'Modern headless e-commerce',
      'Interactive web applications',
      'SEO & Core Web Vitals optimization'
    ],
    accentColor: '#38BDF8',
    gradient: 'from-sky-500 to-blue-600',
    logo: '/logos/webind-circle.png',
  },
  esyus: {
    name: 'ESYUS Technology',
    tagline: 'Custom Software & Mobile Engineering',
    role: 'Core Systems & Mobile Apps',
    scope: [
      'Custom business software & ERPs',
      'iOS & Android mobile applications',
      'Scalable cloud APIs & microservices',
      'Database architecture & integrations',
      'Workflow automation & real-time telemetry'
    ],
    accentColor: '#818CF8',
    gradient: 'from-indigo-500 to-violet-600',
    logo: '/logos/esyus-circle.png',
  },
  contact: {
    email: 'hello@webind-esyus.com',
    emailSubject: 'Project Inquiry — WEBIND × ESYUS',
    phoneDisplay: '+1 (555) 019-2834',
    phoneRaw: '+15550192834',
    whatsappNumber: '+15550192834',
    whatsappPrefill: 'Hi WEBIND × ESYUS team, I would like to discuss a new digital project.',
    responseSla: 'Within 24 business hours',
    availability: 'Accepting select Q2–Q3 engagements',
    location: 'Distributed Studio · Global Delivery',
  },
}

export const TRUST_CAPABILITIES = [
  {
    title: 'Modern Web Architecture',
    subtitle: 'WEBIND lead',
    description: 'Sub-second load times, fluid micro-interactions, responsive precision across all viewports.',
    tag: 'Web & Interfaces'
  },
  {
    title: 'Custom Business Software',
    subtitle: 'ESYUS Technology lead',
    description: 'Bespoke backend systems, internal tools, and secure cloud infrastructures engineered for scale.',
    tag: 'Systems & Cloud'
  },
  {
    title: 'Cross-Platform Mobile Apps',
    subtitle: 'ESYUS Technology lead',
    description: 'Intuitive iOS & Android applications with native performance and offline-first capabilities.',
    tag: 'iOS & Android'
  },
  {
    title: 'Unified Delivery Model',
    subtitle: 'Coordinated execution',
    description: 'One single point of contact. No fragmented vendor silos between your website and your software.',
    tag: 'Full Alignment'
  }
]

export const SERVICES_DATA = [
  {
    id: 'web-development',
    lead: 'WEBIND',
    leadTag: 'Digital Experience Studio',
    title: 'Websites & Digital Experiences',
    badge: 'Frontend Excellence',
    headline: 'Websites that convert attention into measurable business growth.',
    description: 'We design and engineer bespoke web presences tailored to forward-thinking brands. From high-converting marketing flagships to headless e-commerce and fluid SaaS dashboards, every pixel is tuned for brand distinction, accessibility, and high performance.',
    outcomes: [
      'Sub-second first contentful paint and 95+ Google Lighthouse scores',
      'Immersive brand storytelling with restraint and editorial typography',
      'Conversion-engineered architecture with strategic CTA placement',
      'Seamless CMS integration for intuitive non-technical publishing'
    ],
    deliverables: ['Custom Brand Websites', 'Next-Gen E-Commerce', 'SaaS Marketing Hubs', 'Interactive Product Tours', 'Technical SEO & Performance Audits'],
    accent: 'sky',
    featured: true,
  },
  {
    id: 'custom-software',
    lead: 'ESYUS Technology',
    leadTag: 'Software Systems Partner',
    title: 'Custom Software & Cloud Systems',
    badge: 'Backend & Systems',
    headline: 'Robust infrastructure engineered for mission-critical operations.',
    description: 'Off-the-shelf software often forces your business into someone else’s workflow. ESYUS architects proprietary software engines, API middleware, and automated portals that adapt strictly to your operational model.',
    outcomes: [
      'Zero unnecessary recurring SaaS bloat through proprietary tools',
      'Enterprise-grade security, role-based access control and audit trails',
      'Scalable cloud infrastructure resilient under high transaction volume',
      'Automated data pipelines eliminating repetitive manual overhead'
    ],
    deliverables: ['Proprietary Business Portals', 'REST & GraphQL APIs', 'Cloud Microservices', 'Internal Automation Dashboards', 'Legacy Modernization'],
    accent: 'indigo',
    featured: false,
  },
  {
    id: 'mobile-applications',
    lead: 'ESYUS Technology',
    leadTag: 'Mobile Engineering Partner',
    title: 'Native & Cross-Platform Mobile Apps',
    badge: 'Mobile Core',
    headline: 'Fluid iOS and Android applications users keep on their home screen.',
    description: 'We turn complex workflows into tactile, gesture-driven mobile experiences. Leveraging React Native and native platform APIs, we ship apps that feel instantaneous, work offline, and integrate seamlessly with your backend.',
    outcomes: [
      'Fluid 60+ FPS animations with native touch responsiveness',
      'Offline caching and resilient background sync capabilities',
      'Streamlined App Store and Google Play compliance and release pipelines',
      'Deep integration with mobile hardware: biometrics, cameras, push notifications'
    ],
    deliverables: ['Consumer Mobile Apps', 'Enterprise Field Tools', 'On-Demand Service Platforms', 'Companion Device Control', 'App Store Publishing'],
    accent: 'cyan',
    featured: false,
  }
]

export const PARTNERSHIP_STEPS = [
  {
    number: '01',
    phase: 'Unified Discovery',
    owner: 'WEBIND × ESYUS',
    title: 'Discover & Align',
    description: 'We analyze your commercial goals and technical architecture in tandem. WEBIND maps the user journey and conversion funnels, while ESYUS blueprints the data schema, API contracts, and infrastructure requirements.',
    detail: 'Eliminates misalignments between frontend promises and backend reality before a single line of code is written.'
  },
  {
    number: '02',
    phase: 'Design & Experience',
    owner: 'WEBIND Lead',
    title: 'Design & Web Engine',
    description: 'WEBIND builds the digital identity, component architecture, and responsive web frontend using the Liquid Precision design system. High fidelity interactive prototypes ensure stakeholder consensus.',
    detail: 'Focuses on visual distinction, typography hierarchy, micro-interactions, and conversion performance.'
  },
  {
    number: '03',
    phase: 'Engineering Core',
    owner: 'ESYUS Technology Lead',
    title: 'Software & Mobile Engines',
    description: 'ESYUS crafts the software systems, authentication layers, databases, and native mobile clients. Continuous integration guarantees robust test coverage and secure data handling.',
    detail: 'Engineers custom APIs, automated business logic, and native iOS/Android builds synchronized with the web frontend.'
  },
  {
    number: '04',
    phase: 'Deployment & Growth',
    owner: 'WEBIND × ESYUS',
    title: 'Synchronized Launch',
    description: 'Both teams execute a coordinated rollout: web deployment, DNS optimization, App Store releases, and server monitoring. We complete full documentation and team training for seamless handover.',
    detail: 'One unified launch with zero hand-off friction, complete observability, and optional ongoing evolution support.'
  }
]

export const PROCESS_TIMELINE = [
  {
    step: '01',
    name: 'Discover',
    duration: 'Week 1–2',
    focus: 'Alignment & Scope Blueprint',
    points: [
      'Stakeholder in-depth discovery interviews',
      'Technical landscape & systems audit',
      'User personas & journey architecture',
      'Documented requirements specification'
    ]
  },
  {
    step: '02',
    name: 'Plan',
    duration: 'Week 2–3',
    focus: 'Architecture & Visual Language',
    points: [
      'Information architecture & wireframing',
      'Liquid Precision design system & component tokens',
      'API schema and database entity-relationship models',
      'Fixed deliverables schedule & milestone commitments'
    ]
  },
  {
    step: '03',
    name: 'Build',
    duration: 'Week 4–8',
    focus: 'Sprint-Based Iterative Engineering',
    points: [
      'Bi-weekly staging environment review releases',
      'Frontend web development (WEBIND)',
      'Backend systems & mobile clients (ESYUS)',
      'Rigorous cross-browser, device, and security testing'
    ]
  },
  {
    step: '04',
    name: 'Deliver',
    duration: 'Week 8–9+',
    focus: 'Production Launch & Handover',
    points: [
      'Zero-downtime production deployment',
      'App Store / Google Play review submission',
      'Comprehensive code repository & CMS handover',
      '30-day post-launch warranty & telemetry monitoring'
    ]
  }
]

export const CONCEPT_PROJECTS = [
  {
    id: 'concept-1',
    title: 'Aether Pay',
    clientLabel: 'Illustrative Concept Prototype',
    type: 'FinTech Banking & Cross-Border Portal',
    scope: 'Marketing Site + Web Dashboard + iOS/Android App',
    collaboration: 'WEBIND (Brand & Web) × ESYUS (Ledger & Mobile)',
    summary: 'A unified treasury management suite offering instant FX settlement, card issuance, and automated invoice reconciliation.',
    metrics: ['Sub-second latency', 'Multi-tenant RBAC', 'Biometric auth', '99.99% uptime target'],
    tags: ['Web Experience', 'Custom Software', 'Mobile App', 'FinTech'],
    gradient: 'from-blue-600/20 via-sky-500/10 to-transparent',
    accent: '#38BDF8',
  },
  {
    id: 'concept-2',
    title: 'Kroma Commerce',
    clientLabel: 'Illustrative Concept Prototype',
    type: 'Omnichannel Fashion & Luxury Goods Engine',
    scope: 'Headless Web Storefront + Warehouse Inventory System',
    collaboration: 'WEBIND (Storefront UX) × ESYUS (Inventory ERP & POS)',
    summary: 'Ultra-responsive headless shopping interface backed by an automated inventory orchestration engine synchronizing 14 physical flagships.',
    metrics: ['Lighthouse 98/100', '0.6s Time-to-Interactive', 'Live stock sync', 'Dynamic localized pricing'],
    tags: ['Headless E-Commerce', 'ERP Integration', 'Performance Web'],
    gradient: 'from-violet-600/20 via-indigo-500/10 to-transparent',
    accent: '#818CF8',
  },
  {
    id: 'concept-3',
    title: 'Apex Telemetry',
    clientLabel: 'Illustrative Concept Prototype',
    type: 'Commercial Fleet & Cold-Chain Logistics Hub',
    scope: 'Operations Control Room Web + Driver Handheld App',
    collaboration: 'WEBIND (Command UI) × ESYUS (Telemetry IoT Engine & Mobile)',
    summary: 'Real-time telemetry ingestion tracking 1,200+ freight vehicles, sensor temperatures, route optimization, and electronic proof of delivery.',
    metrics: ['WebSocket live tracking', 'Offline driver mode', 'Automated geofencing', 'Predictive route alerts'],
    tags: ['Business Software', 'Mobile Companion', 'Real-Time Data'],
    gradient: 'from-teal-600/20 via-cyan-500/10 to-transparent',
    accent: '#2DD4BF',
  },
  {
    id: 'concept-4',
    title: 'Novacare Health',
    clientLabel: 'Illustrative Concept Prototype',
    type: 'Specialized Clinical Care & Patient Record Hub',
    scope: 'Patient Web Portal + Practitioner Tablet Application',
    collaboration: 'WEBIND (Patient Portal) × ESYUS (HIPAA FHIR Backend & Tablet App)',
    summary: 'Secure patient intake, encrypted lab results access, telemedicine video consultations, and instant electronic health record sync.',
    metrics: ['HIPAA / SOC-2 compliance', 'End-to-end encryption', 'Telehealth video integration', 'HL7/FHIR compatibility'],
    tags: ['HealthTech', 'Custom Portal', 'Tablet Application'],
    gradient: 'from-indigo-600/20 via-sky-500/10 to-transparent',
    accent: '#6366F1',
  }
]

export const INQUIRY_OPTIONS = {
  services: [
    { id: 'website', label: 'Website Development', desc: 'Marketing site, landing page, or corporate redesign', partner: 'WEBIND' },
    { id: 'ecommerce', label: 'E-commerce Website', desc: 'Modern headless or Shopify custom digital commerce', partner: 'WEBIND' },
    { id: 'software', label: 'Custom Software & Systems', desc: 'Bespoke web platform, portal, ERP, or API integration', partner: 'ESYUS' },
    { id: 'mobile', label: 'Mobile Application', desc: 'Native or cross-platform iOS & Android mobile product', partner: 'ESYUS' },
    { id: 'complete', label: 'Complete Digital Solution', desc: 'Combined web presence, custom software backend, & mobile app', partner: 'WEBIND × ESYUS' },
    { id: 'other', label: 'Other / Specialized Consultation', desc: 'Technical scoping, audit, or custom advisory', partner: 'Both Partners' },
  ],
  budgets: [
    { id: 'tier-1', label: '$5,000 – $10,000', detail: 'Ideal for focused websites or MVP scopes' },
    { id: 'tier-2', label: '$10,000 – $25,000', detail: 'Comprehensive web flagships or targeted custom software' },
    { id: 'tier-3', label: '$25,000 – $50,000', detail: 'Full-stack software systems or native mobile applications' },
    { id: 'tier-4', label: '$50,000+', detail: 'Enterprise scale multi-platform digital solutions' },
    { id: 'tier-discuss', label: 'Let’s discuss / Unsure', detail: 'Need advisory guidance to determine scope & budget' },
  ],
  timelines: [
    { id: 'urgent', label: 'Immediate (< 4 weeks)', badge: 'Accelerated' },
    { id: 'standard', label: '1 to 2 months', badge: 'Standard Sprint' },
    { id: 'quarter', label: '2 to 4 months', badge: 'Comprehensive' },
    { id: 'flexible', label: 'Flexible / Discovery phase', badge: 'Phased' },
  ],
  contactMethods: [
    { id: 'email', label: 'Email Correspondence' },
    { id: 'whatsapp', label: 'WhatsApp Chat' },
    { id: 'video', label: 'Video Call (Google Meet / Zoom)' },
    { id: 'phone', label: 'Phone Call' },
  ]
}
