
export const INSTAGRAM_URL = 'https://www.instagram.com/SarinApex/'

export const NAV_LINKS = [
  { label: 'Portfolio', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#styles' },
  { label: 'Gallery', href: '#studio' },
  { label: 'Contact', href: '#contact' },
] as const

export const SLIDER_IMAGES = [
  { src: '/slider-1.png', title: 'Architectural Study 01', caption: 'Architectural Design · Portfolio' },
  { src: '/slider-2.png', title: 'Digital Space 02', caption: '3D Modeling · Portfolio' },
  { src: '/slider-3.png', title: 'Visual Composition 03', caption: 'Architectural Graphics · Portfolio' },
] as const

export type GalleryCategory =
  | 'Architectural Design'
  | 'BIM & Modeling'
  | '3D Visualization'
  | 'Structural Modeling'
  | 'Architectural Graphics'
  | 'Digital Design'

export const GALLERY_FILTERS = [
  'All',
  'Architectural Design',
  'BIM & Modeling',
  '3D Visualization',
  'Structural Modeling',
  'Architectural Graphics',
  'Digital Design',
] as const

export type GalleryItem = {
  src: string
  title: string
  category: GalleryCategory
  span: 'tall' | 'wide' | 'normal'
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { src: '/gallery-blackwork-1.png', title: 'Architectural Composition 01', category: 'Architectural Graphics', span: 'tall' },
  { src: '/gallery-fineline-1.png', title: 'Digital Modeling 01', category: 'BIM & Modeling', span: 'normal' },
  { src: '/gallery-realism-1.jpg', title: 'Spatial Visualization 01', category: '3D Visualization', span: 'normal' },
  { src: '/gallery-geometric-1.png', title: 'Architectural Study 01', category: 'Architectural Design', span: 'wide' },
  { src: '/gallery-ornamental-1.jpg', title: 'Visual Design 01', category: 'Digital Design', span: 'tall' },
  { src: '/gallery-custom-1.png', title: '3D Spatial Study 02', category: '3D Visualization', span: 'normal' },
  { src: '/gallery-blackwork-2.jpg', title: 'Graphic Presentation 02', category: 'Architectural Graphics', span: 'normal' },
  { src: '/gallery-fineline-2.jpg', title: 'Architectural Modeling 02', category: 'BIM & Modeling', span: 'tall' },
  { src: '/gallery-realism-2.jpg', title: 'Spatial Composition 02', category: 'Architectural Design', span: 'wide' },
  { src: '/gallery-geometric-2.jpg', title: 'Digital Design 02', category: 'Digital Design', span: 'normal' },
  { src: '/gallery-ornamental-2.jpg', title: 'Visual Study 03', category: 'Architectural Graphics', span: 'normal' },
  { src: '/gallery-custom-2.jpg', title: 'Structural Model Study 01', category: 'Structural Modeling', span: 'tall' },
]

export const STYLES = [
  {
    name: 'BIM',
    src: '/gallery-blackwork-2.jpg',
    description: 'Exploring Building Information Modeling to develop organized digital representations of architectural projects and support efficient design workflows.',
  },
  {
    name: 'Modeling',
    src: '/gallery-fineline-1.jpg',
    description: 'Creating and refining digital architectural and structural models with attention to accuracy, geometry, and technical details.',
  },
  {
    name: 'Visualization',
    src: '/gallery-realism-1.jpg',
    description: 'Transforming architectural concepts into three-dimensional visual experiences through modeling and rendering tools such as SketchUp and Enscape.',
  },
  {
    name: 'Graphics',
    src: '/gallery-ornamental-1.jpg',
    description: 'Combining visual composition, image editing, and graphic communication to create clear and engaging architectural presentations.',
  },
  {
    name: 'Technology',
    src: '/gallery-custom-1.png',
    description: 'Exploring digital workflows and AI-powered tools to support architectural design, visualization, and creative content production.',
  },
] as const

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Explore',
    description: 'Understanding the architectural concept, project requirements, visual references, and technical objectives.',
  },
  {
    number: '02',
    title: 'Develop',
    description: 'Translating ideas into digital drawings and 3D models using architectural design and modeling tools.',
  },
  {
    number: '03',
    title: 'Refine',
    description: 'Reviewing model details, improving visual compositions, and refining digital representations with attention to accuracy.',
  },
  {
    number: '04',
    title: 'Present',
    description: 'Preparing architectural graphics and visual presentations to communicate design ideas clearly and effectively.',
  },
] as const

// Client testimonials will be added when authentic feedback is available.
export const QUOTES = [] as const

export const INSTAGRAM_GRID = [
  {
    src: '/instagram/post-1.jpg',
    href: 'https://www.instagram.com/reel/De_lvTAIahR/?utm_source=ig_web_copy_link&mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    alt: 'Concrete facade study at golden hour',
  },
  {
    src: '/instagram/post-2.jpg',
    href: 'https://www.instagram.com/p/YYYYYYYYYYY/',
    alt: 'Staircase detail in black and white',
  },
]

export const PROJECT_TYPE_OPTIONS = [
  'Architectural Design',
  'BIM & Digital Modeling',
  'Structural Steel Modeling',
  '3D Visualization & Rendering',
  'Architectural Graphics',
  'Digital Content Creation',
  'Other / Not Sure',
]
