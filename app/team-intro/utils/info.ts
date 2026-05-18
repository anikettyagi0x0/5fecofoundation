export type TeamMember = {
    id: string;
    name: string;
    role: string;
    category: "Board of Directors" | "Core Team" | "Field Volunteers";
    image: string;
    socials?: {
      linkedin?: string;
      twitter?: string;
      instagram?: string;
    };
  };
  
  export const teamMembers: TeamMember[] = [
    // --- Board of Directors ---
    {
      id: "b1",
      name: "Sorabh Rana",
      role: "Founder & President",
      category: "Board of Directors",
      image: "https://img.magnific.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg",
      socials: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: "b2",
      name: "Gaurav Rana",
      role: "Vice President",
      category: "Board of Directors",
      image: "https://img.magnific.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg",
      socials: {
        linkedin: "#",
      },
    },
    {
      id: "b3",
      name: "Bharti",
      role: "Treasurer",
      category: "Board of Directors",
      image: "https://img.magnific.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg",
      socials: {
        linkedin: "#",
        instagram: "#",
      },
    },
  
    // --- Core Team ---
    {
      id: "c1",
      name: "Sorabh Rana",
      role: "Rescue Operations Manager",
      category: "Core Team",
      image: "https://img.magnific.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg",
      socials: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: "c2",
      name: "Arjun Nair",
      role: "Habitat Restoration Lead",
      category: "Core Team",
      image: "https://img.magnific.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg",
    },
    {
      id: "c3",
      name: "Kavya Patel",
      role: "Community Education Director",
      category: "Core Team",
      image: "https://img.magnific.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg",
    },
    {
      id: "c4",
      name: "Sameer Reddy",
      role: "Anti-Poaching Tech Specialist",
      category: "Core Team",
      image: "https://img.magnific.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg",
    },
  
    // --- Field Volunteers ---
    {
      id: "v1",
      name: "Aarti Krishnan",
      role: "Senior Field Volunteer",
      category: "Field Volunteers",
      image: "https://img.magnific.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg",
    },
    {
      id: "v2",
      name: "Rahul Verma",
      role: "Logistics & Supply Volunteer",
      category: "Field Volunteers",
      image: "https://img.magnific.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg",
    },
  ];