export const INSTAGRAM_URL = 'https://instagram.com/'

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Practice', href: '#about' },
  { label: 'Approach', href: '#styles' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
] as const

export const SLIDER_IMAGES = [
  { src: '/slider-1.png', title: 'Civic Thresholds', caption: 'Cultural · Berlin · 2024' },
  { src: '/slider-2.png', title: 'House in Stillness', caption: 'Residential · Kyoto · 2023' },
  { src: '/slider-3.png', title: 'Museum of Light', caption: 'Public · Copenhagen · 2025' },
] as const

export type GalleryCategory = 'Civic' | 'Residential' | 'Interiors' | 'Cultural' | 'Landscape' | 'Experimental'

export const GALLERY_FILTERS = ['All', 'Civic', 'Residential', 'Interiors', 'Cultural', 'Landscape', 'Experimental'] as const

export type GalleryItem = { src: string; title: string; category: GalleryCategory; span: 'tall' | 'wide' | 'normal' }

export const GALLERY_ITEMS: GalleryItem[] = [
  { src: '/gallery-blackwork-1.png', title: 'Concrete Sequence', category: 'Civic', span: 'tall' },
  { src: '/gallery-fineline-1.png', title: 'Courtyard House', category: 'Residential', span: 'normal' },
  { src: '/gallery-realism-1.jpg', title: 'Forest Residence', category: 'Residential', span: 'normal' },
  { src: '/gallery-geometric-1.png', title: 'Civic Monument', category: 'Civic', span: 'wide' },
  { src: '/gallery-ornamental-1.jpg', title: 'Room for Memory', category: 'Interiors', span: 'tall' },
  { src: '/gallery-custom-1.png', title: 'Light Pavilion', category: 'Experimental', span: 'normal' },
  { src: '/gallery-blackwork-2.jpg', title: 'Archive Extension', category: 'Cultural', span: 'normal' },
  { src: '/gallery-fineline-2.jpg', title: 'Linear Garden', category: 'Landscape', span: 'tall' },
  { src: '/gallery-realism-2.jpg', title: 'Stone House', category: 'Residential', span: 'wide' },
  { src: '/gallery-geometric-2.jpg', title: 'Urban Field', category: 'Civic', span: 'normal' },
  { src: '/gallery-ornamental-2.jpg', title: 'Material Study', category: 'Interiors', span: 'normal' },
  { src: '/gallery-custom-2.jpg', title: 'Atmosphere I', category: 'Experimental', span: 'tall' },
]

export const STYLES = [
  { name: 'Context', src: '/gallery-blackwork-2.png', description: 'Architecture begins with attention to place — its climate, memory, material and daily rituals.' },
  { name: 'Material', src: '/gallery-fineline-1.png', description: 'Honest materials, carefully detailed. Tactility and aging are part of the design from day one.' },
  { name: 'Light', src: '/gallery-realism-1.png', description: 'Spaces shaped by shadow, reflection and the changing character of natural light.' },
  { name: 'Continuity', src: '/gallery-ornamental-1.png', description: 'Interiors, landscape and structure considered as one quiet, continuous composition.' },
  { name: 'Specificity', src: '/gallery-custom-1.png', description: 'Every project is drawn from scratch for its people, place and particular future.' },
] as const

export const PROCESS_STEPS = [
  { number: '01', title: 'Listen', description: 'Every project starts with a conversation about people, place, constraints and possibility.' },
  { number: '02', title: 'Frame', description: 'We test the brief through drawings, models and material studies until the central idea is clear.' },
  { number: '03', title: 'Make', description: 'A close collaboration with craftspeople, consultants and builders turns the idea into a precise place.' },
  { number: '04', title: 'Stay', description: 'We remain involved through completion, refining the details that make architecture feel inevitable.' },
] as const

export const QUOTES = [
  { text: 'They gave our building a sense of calm we did not know how to ask for. Every decision feels inevitable.', author: 'E. Laurent', meta: 'Private residence' },
  { text: 'The studio listened before it drew. The result is generous, practical and completely its own.', author: 'N. Okafor', meta: 'Cultural project' },
  { text: 'A rare combination of rigor and warmth. They made a complex process feel deeply human.', author: 'J. Meyer', meta: 'Hospitality interior' },
] as const

export const INSTAGRAM_GRID = ['/insta-1.png', '/insta-2.png', '/insta-3.png', '/insta-4.png', '/gallery-blackwork-1.png', '/gallery-geometric-1.png']

export const PROJECT_TYPE_OPTIONS = ['Residential', 'Civic & Cultural', 'Interiors', 'Landscape', 'Experimental / Not sure']
