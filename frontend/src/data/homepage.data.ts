import { CarouselHeroProps } from "@/components/designs/herobanners/carouselHero";
import { ExperienceCardProps } from "@/components/designs/contentPieces/experienceCard";
import { TextAndListProps } from "@/components/designs/textComponents/textAndList";
import { FeatureBoxesProps } from "@/components/designs/textComponents/featureBoxes";
import { AccordionProps } from "@/components/designs/textComponents/accordion";
import { GridCarouselProps } from "@/components/designs/carousels/gridCarousel";
import { Testimonials3Props } from "@/components/designs/testimonials/testimonials3";
import { ContactCloserProps } from "@/components/designs/miscellaneous/contactCloser";
import { NavbarProps, BaseFooterProps } from "@/types/navbar";
import { Facebook } from "lucide-react";

export const carouselHeroData: CarouselHeroProps = {
  subTitle: "",
  title: "Attention to Detail is the Key! No other Cleaning will do.",
  description: `Are you tired of:

•	the bigger Cleaning Companies that promise   top quality cleaning?
•	not knowing who the cleaners are?
•	not receiving the quality cleaning you expect for your hard earned money?

Well! Look no further! I have the solution for you! 
I specialize in customized cleaning solutions with a personal touch and comparable prices.`,
  buttonText: "Get Started",
  items: [
    {
      image: {
        src:'https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20230225_154832_resized-bmZv5sMrMjfwPHyNHU7gLqH1dyMiN5.jpg',
        alt:'Barb holding a bird',
        
      },
      description: "Pet friendly cleaning services",
      objectContain: true
    },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084631_resized-5sBNryIVUI6tFavIaKjfwaZx2JJcxx.jpg",
        alt: "Clean and organized home space"
      },
      description: "Come home to a spotless sanctuary—your stress melts away"
    },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084605_resized-5U3djxW6WBu2pk4VaBMf0DNJ7Gp6QN.jpg",
        alt: "Professional cleaning service in action"
      },
      description: "Over 20+ years of house cleaning experience, building lasting client relationships."
    },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084605_resized-xvW80LnskvtXcrpv5qcD0DEvadFCoL.jpg",
        alt: "Sparkling clean kitchen"
      },
      description: "I clean your house and take away your dirt"
    },
    {
      image: {
        src:'https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20230428_111518_resized%281%29-DZIejTOayAlmTIKbRLiKf4mcwvOXJL.jpg',
        alt:'Dog at the top of the stairs'
      },
      description: "Pet friendly cleaning services"
    },
  ],
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid"
  }
};

export const experienceCardData: ExperienceCardProps = {
  title: "Why Choose BTQ Cleaning Services?",
  description: `With over 20+ years of cleaning experience, I've built lasting relationships with clients who have become friends and family. I started cleaning in 2012, my cleaning services has grown through referrals and word of mouth. Clients often tell me I have a gift with cleaning and that I help remove stress—when you come home to a clean house, you can relax after a hard day's work without worrying about cleaning. Your kids are happy with tidy rooms, and your pets get hugs and kisses while I work.`,

  subTitle: "No other Cleaning will do!",
  buttonText: "Learn More",
  images: {
    main: {
      src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084620_resized_1-BpRo4DkkTJhKHWFH7E6Oei3txNTNe3.jpg",
      alt: "Professional Halifax house cleaning services with over 20 years of experience"
    }
  },
  array: [
    {
      type: "StandardText",
      title: "Personalized Cleaning Plans"
    },
    {
      type: "StandardText",
      title: "Eco-Friendly & Pet-Safe Products"
    },
    {
      type: "StandardText",
      title: "Bonded, Insured & Reliable"
    },
    {
      type: "StandardText",
      title: "The Pet Whisper"
    },
    {
      type: "StandardText",
      title: "All Ages Welcome"
    }
  ],
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid"
  }
};

export const textAndListData: TextAndListProps = {
  subTitle: "",
  title: "Discover the BTQ Cleaning Services Difference",
  description: `I clean your home the way you want—every home and owner is different. I bring all the products and gear needed to do
the job right, including environmentally and pet-friendly products. My vacuum backpack cleaner with 3 filters ensures
dust doesn’t enter your home. I clean your home and take away your dirt!`,
  images: {
    main: {
      src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084620_resized_1-E95WQzSZzrr5SFukh9W43XO6q6HZG6.jpg",
      alt: "Quality Halifax house cleaning services commitment"
    }
  },
  textArray: [
    {
      title: "Customized for Every Home",
      description: `
      Every home is unique, every client/family is different, so is my cleaning solution. I tailor my approach to match your specific preferences and needs.
      `
    },
    {
      title: "20+ Years of Experience",
      description: `
      Started cleaning houses in 2012, with over 20 years of house cleaning services experience total. Most clients come from referrals and word of mouth.
      `
    },
    {
      title: "All Your Needs Covered",
      description: "Serving clients of all ages—from families with kids and pets to elders with disabilities. I show pets respect and gentleness, earning me the nickname 'Pet Whisper' from clients."
    },
    {
      title: "Advanced Equipment",
      description: "Using a professional vacuum backpack cleaner with 3 filters that ensures dust doesn't enter your home during cleaning."
    }
  ],
  array: [],
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid"
  }
};

export const featureBoxesData: FeatureBoxesProps = {
  array: [
    {
      type: "StandardText",
      title: "Regular Home Cleaning",
      description: `Attention to detail for every room in your home, customized to your preferences. I bring all the products and gear, including eco-friendly and pet-friendly supplies.`
    },
    {
      type: "StandardText",
      title: "Deep Cleaning",
      description: `During the seasons changing or special events, I provide detail cleaning for: interior windows/frames, doors & frames, baseboards, entry closets floors, oven interior & exterior, fridge interior & exterior, microwave interior & exterior, Laundry done but not put away, change bedding, dishes and put away, kitchen cupboards & drawers.`
    },
    {
      type: "StandardText",
      title: "Specialized Cleaning",
      description: "Serving all clients—from families with kids and pets to elders with disabilities. Your pets get extra love while I work, and your home gets the attention it deserves."
    },
    {
      type: "StandardText",
      title: "Move-In/Move-Out Cleaning",
      description: `Comprehensive cleaning services for your transition. Whether you're moving in or moving out, I ensure your space is spotless and ready for your new beginning.`
    }
  ],
  title: "My Services",
  description: `Every home is unique, and so is my cleaning service. I clean houses the way you want, I also bring all the products and gear needed to do the job right.`,
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid"
  }
};

export const accordionData: AccordionProps = {
  array: [
    {
      type: "StandardText",
      title: "What areas do you serve?",
      description: "BTQ Cleaning Services cover various neighborhoods throughout Halifax and surrounding areas. Please contact us at 902-220-1089 or btqcleaningservices@gmail.com for specific locations."
    },
    {
      type: "StandardText",
      title: "Do you bring your own supplies?",
      description: "Yes! I bring all necessary cleaning supplies and equipment, including eco-friendly and pet-friendly products. My professional vacuum backpack cleaner with 3 filters ensures thorough cleaning without dust entering your home."
    },
    {
      type: "StandardText",
      title: "How do I book a service?",
      description: `Booking is simple! Call 902-220-1089, email btqcleaningservices@gmail.com, or message me on Facebook.
We'll work together to find a schedule that is convenient for both of us.`
    },
    {
      type: "StandardText",
      title: "Are you bonded and insured?",
      description: "Yes, I am bonded, dependable, and reliable. I take pride in my work and build solid relationships with clients based on trust and satisfaction. Upon request, I can provide a criminal background check record."
    },
    {
      type: "StandardText",
      title: "Do you clean for families with pets?",
      description: "Absolutely! I'm known as the 'Pet Whisper' by my clients. I show pets respect and gentleness while cleaning. Your pets get hugs and kisses, and I ensure all products used are pet-friendly and safe."
    }
  ],
  title: "Frequently Asked Questions",
  description: "Here are some common questions I receive from my clients.",
  buttonText: "Contact Us",
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid"
  }
};

export const gridCarouselData: GridCarouselProps = {
  subTitle: "BTQ Cleaning Services Gallery",
  title: "Transformations I Create",
  description: "Browse through my gallery to see the beautiful clean spaces my cleaning service have achieved for my clients.",
  items: [
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084631_resized-ManjhNN4PIatLWjgdCahwOLNhzNlgS.jpg",
        alt: "Clean and organized living space"
      }
    },
    // {
    //   image: {
    //     src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084631_resized-wNtSVgSn9is2SFzSWdFZm8UXFhi72p.jpg",
    //     alt: "Spotless bathroom transformation"
    //   }
    // },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084654_resized-1lBcw6JvrJFAct1aVahh77sTOTwCae.jpg",
        alt: "Professional Halifax house cleaning services kitchen cleaning"
      }
    },
    // {
    //   image: {
    //     src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084654_resized-TPsES7RNyd3QXPQ8YygZbQj8MnDVUj.jpg",
    //     alt: "Immaculate bedroom organization"
    //   }
    // },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084848_resized-Lcvt64PSXzOKpzBLwWKg14Gn79ReqA.jpg",
        alt: "Sparkling clean home interior"
      }
    },
    // {
    //   image: {
    //     src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084848_resized-qHaKunaqI45f8WzJymes8fZ4cZTIr0.jpg",
    //     alt: "Perfectly organized space"
    //   }
    // },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_084605_resized-yt5zbS0MrJnxWrC7ibNlIm50JW3t6K.jpg",
        alt: "Professional Halifax house cleaning services deep cleaning result"
      }
    },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20250603_092053-PREzMSBbfdQ1iRhjCKgvycGxelqg3C.jpg",
        alt: "Halifax house cleaning services transformation result"
      }
    },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_085215_resized-pzfwJ2Z80eLTnKe1BTfkBCu8UUPMV9.jpg",
        alt: "Professional Halifax house cleaning services bathroom cleaning"
      }
    },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20180815_085027_resized-2zEL1NiNrQg4NcuXakx14BnlFW5nJm.jpg",
        alt: "Halifax house cleaning services immaculate home space"
      }
    },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20230315_191800_resized-1oHBlFWjnb7dxevCJ80r3LO12NARrh.jpg",
        alt: "Spotless Halifax house cleaning services result"
      }
    },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20230225_154832_resized-bmZv5sMrMjfwPHyNHU7gLqH1dyMiN5.jpg",
        alt: "Barb holding a bird - pet-friendly cleaning services"
      }
    },
    {
      image: {
        src: "https://maf7vdyjaxjtyxfd.public.blob.vercel-storage.com/users/692bbf5c91423b9780010fe4/20230428_111518_resized%281%29-DZIejTOayAlmTIKbRLiKf4mcwvOXJL.jpg",
        alt: "Dog at the top of the stairs - pet-friendly cleaning services"
      }
    }
  ],
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid"
  }
};

export const testimonials3Data: Testimonials3Props = {
  testimonials: [
    {
      name: "Sarah L.",
      role: "Homeowner",
      quote: "BTQ's Halifax house cleaning services transformed my home! I couldn't be happier with the results."
    },
    {
      name: "Mark T.",
      role: "Business Owner",
      quote: "Dependable and thorough! They always exceed my expectations."
    },
    {
      name: "Emily R.",
      role: "Client",
      quote: "I love coming home to a clean house. Thank you for your amazing service!"
    }
  ],
  title: "Client Testimonials",
  description: "Hear what our satisfied clients have to say about BTQ Cleaning Services.",
  array: [],
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid"
  }
};

export const contactCloserData: ContactCloserProps = {
  title: "Ready for a Spotless Home?",
  description: "Contact me today to schedule for your free consultation. Experience the joy of a clean space tailored to your needs. I clean your house and take away your dirt—so you can relax after a hard day's work. I look forward to serving you!",
  buttonText: "Get in Touch",
  email: "btqcleaningservices@gmail.com",
  phone: "902-220-1089",
  facebookUrl: "https://www.facebook.com/profile.php?id=61584047477031",
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid"
  }
};

export const navbarData: NavbarProps = {
  logoText: "BTQ Cleaning",
  tabs: [
    {
      type: "scroll",
      label: "Home",
      scrollTo: "hero"
    },
    {
      type: "scroll",
      label: "About",
      scrollTo: "about"
    },
    {
      type: "scroll",
      label: "Services",
      scrollTo: "services"
    },
    {
      type: "scroll",
      label: "Gallery",
      scrollTo: "gallery"
    },
    {
      type: "scroll",
      label: "Testimonials",
      scrollTo: "testimonials"
    },
    {
      type: "scroll",
      label: "Contact",
      scrollTo: "contact"
    }
  ],
  sticky: true,
  alignment: "left",
  buttonText: "Get Started",
  ctaDestination: "contact",
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid"
  }
};

export const footerData: BaseFooterProps = {
  brandName: "BTQ Cleaning",
  contact: {
    email: "btqcleaningservices@gmail.com",
    phone: "902-220-1089"
  },
  navItems: [
    {
      name: "Home",
      href: "#hero"
    },
    {
      name: "About",
      href: "#about"
    },
    {
      name: "Services",
      href: "#services"
    },
    {
      name: "Gallery",
      href: "#gallery"
    },
    {
      name: "Testimonials",
      href: "#testimonials"
    },
    {
      name: "FAQ",
      href: "#faq"
    },
    {
      name: "Contact",
      href: "#contact"
    }
  ],
  socialLinks: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61584047477031",
      icon: Facebook
    }
  ],
  developerCredit: {
    name: "By focusflow software",
    href: "https://focusflowsoftware.com"
  }
};