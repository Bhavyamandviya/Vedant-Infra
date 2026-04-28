/**
 * Single source of truth for the 5 project images shown in every
 * home-design hero. Order matters — heroes cycle in this order.
 *
 * `image` = the standard daytime shot.
 * `nightImage` = a real night photo where one exists. For projects
 * without a real night shot, Design 3 applies a CSS night-mode
 * filter (blue-shift, reduced brightness) so the slideshow still
 * has a unified midnight mood.
 */
export interface HeroProject {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  nightImage?: string;
  /** True if a real night photo is supplied; false ⇒ apply CSS night filter */
  hasNightPhoto?: boolean;
  bookingAvailable: boolean;
}

export const HERO_PROJECTS: HeroProject[] = [
  {
    slug: "royal-mansions",
    name: "Royal Mansions",
    tagline: "5BHK Ultra-Luxury Villa",
    image: "/vedant/royalmanison/House.jpg",
    nightImage: "/vedant/royalmanison/Side-night.jpg",
    hasNightPhoto: true,
    bookingAvailable: false,
  },
  {
    slug: "royal-heritage-villa",
    name: "Royal Heritage Villa",
    tagline: "5BHK Luxurious Villa",
    image: "/vedant/royalheritage/Building-Entrance.jpg",
    bookingAvailable: true,
  },
  {
    slug: "park-royal",
    name: "Park Royal",
    tagline: "4BHK + 2 Utility Villa",
    image: "/vedant/royalpark/Home-Front-Page.jpg",
    bookingAvailable: true,
  },
  {
    slug: "royal-crest",
    name: "Royal Crest",
    tagline: "4BHK Luxurious Bungalow",
    image: "/vedant/royalcrest/Cam_02.jpg",
    bookingAvailable: true,
  },
  {
    slug: "royal-green-park",
    name: "Royal Green Park",
    tagline: "Recently Completed Residences",
    image: "/vedant/ROYALGREENPARK/Entrance.jpg",
    bookingAvailable: false,
  },
];
