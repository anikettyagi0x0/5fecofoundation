export type NewsArticle = {
    id: string;
    slug: string; // The URL path, e.g., /news/saving-the-bengal-tiger
    title: string;
    excerpt: string;
    date: string;
    category: string;
    thumbnail: string;
  };
  
  export const featuredNews: NewsArticle[] = [
    {
      id: "n1",
      slug: "reforestation-milestone-2026",
      title: "50,000 Saplings Planted in the Western Ghats",
      excerpt: "Our 'Green Frontier' initiative hit a major milestone this month, restoring crucial wildlife corridors that had been lost to deforestation.",
      date: "May 15, 2026",
      category: "Habitat Restoration",
      thumbnail: "https://images.unsplash.com/photo-1611270404368-2a006f1d24c3?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "n2",
      slug: "elephant-rescue-assam",
      title: "Midnight Rescue: Saving a Stranded Elephant Calf",
      excerpt: "Our rapid response team navigated difficult terrain to reunite a separated calf with its herd near the Kaziranga border.",
      date: "May 08, 2026",
      category: "Field Rescue",
      thumbnail: "https://images.unsplash.com/photo-1564750975191-0ed807751c6b?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "n3",
      slug: "community-workshop-rajasthan",
      title: "Empowering Villages to Prevent Wildlife Conflict",
      excerpt: "Over 200 local farmers attended our latest grassroots education camp, learning safe, non-violent methods to protect their crops.",
      date: "April 28, 2026",
      category: "Community Outreach",
      thumbnail: "https://images.unsplash.com/photo-1533420803445-5d971e4cc4fa?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "n4",
      slug: "new-anti-poaching-tech",
      title: "Deploying Thermal Drones for Night Surveillance",
      excerpt: "With the help of our new tech partners, we are rolling out advanced drone monitoring to catch poachers before they strike.",
      date: "April 12, 2026",
      category: "Technology",
      thumbnail: "https://images.unsplash.com/photo-1542640244-7e672d6cb466?q=80&w=800&auto=format&fit=crop",
    }
 
  ];

  export const allNews: NewsArticle[] = [
    {
      id: "n5",
      slug: "reforestation-milestone-2026",
      title: "Advanced Veterinary Training Camp in Bhopal",
      excerpt: "Upskilling local veterinarians with the latest tranquilization and safe-transport techniques for large predators.",
      date: "March 22, 2026",
      category: "Training",
      thumbnail: "https://images.unsplash.com/photo-1579621970233-a3d24268e612?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "n6",
      slug: "school-awareness-program",
      title: "Sowing Seeds of Change in 50 Local Schools",
      excerpt: "Our education wing successfully wrapped up a month-long ecological awareness campaign for over 5,000 students.",
      date: "March 10, 2026",
      category: "Education",
      thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    }
  ];