export const metadata = {
    title: "Gallery | Infinity Math Center",
    description: "Explore our gallery to see moments of learning, student achievements, and engaging math sessions at Infinity Math Center. Witness how we make mathematics fun and interactive through our innovative teaching approach.",
    keywords: [
      "Infinity Math Center gallery", 
      "math learning photos", 
      "student achievements", 
      "math coaching images", 
      "interactive math sessions", 
      "math education visuals", 
      "test preparation events", 
      "math workshops", 
      "math center photos"
    ],
    openGraph: {
      title: "Gallery | Infinity Math Center",
      description: "Explore our gallery to see moments of learning, student achievements, and engaging math sessions at Infinity Math Center. Witness how we make mathematics fun and interactive through our innovative teaching approach.",
      url: "https://infinitymathcenter.com/gallery",
      siteName: "Infinity Math Center",
      type: "website",
      images: [
        {
          url: "/assets/images/logo.webp",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
  export default function GalleryLayout({ children }) {
    return <>{children}</>;
  }