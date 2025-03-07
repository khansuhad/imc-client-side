export const metadata = {
    title: "Admissions | Infinity Math Center",
    description: "Join Infinity Math Center and take the first step towards mastering mathematics. Learn about our admissions process, course offerings, and how to enroll in our expert-led math coaching programs.",
    keywords: [
      "Infinity Math Center admissions", 
      "math course enrollment", 
      "join math classes", 
      "math coaching registration", 
      "math tutoring admission", 
      "how to enroll in math classes", 
      "math education programs", 
      "math training admission", 
      "apply for math tutoring"
    ],
    openGraph: {
      title: "Admissions | Infinity Math Center",
      description: "Join Infinity Math Center and take the first step towards mastering mathematics. Learn about our admissions process, course offerings, and how to enroll in our expert-led math coaching programs.",
      url: "https://infinitymathcenter.com/admissions",
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
  export default function AdmissionLayout({ children }) {
    return <>{children}</>;
  }