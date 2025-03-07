export const metadata = {
    title: "Notice | Infinity Math Center",
    description: "Stay updated with the latest announcements, important dates, and academic notices from Infinity Math Center. Don't miss any crucial information about our programs and events.",
    keywords: [
      "Infinity Math Center notices", 
      "math coaching announcements", 
      "academic updates", 
      "important dates", 
      "math institute notices", 
      "exam schedules", 
      "class updates", 
      "student notices", 
      "Infinity Math Center news"
    ],
    openGraph: {
      title: "Notice | Infinity Math Center",
      description: "Stay updated with the latest announcements, important dates, and academic notices from Infinity Math Center. Don't miss any crucial information about our programs and events.",
      url: "https://infinitymathcenter.com/notice",
      siteName: "Infinity Math Center",
      type: "website",
      images: [
        {
          url: "/assets/images/notice-preview.webp",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
  
  export default function NoticeLayout({ children }) {
    return <>{children}</>;
  }
  