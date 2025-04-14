import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Define the tech item type
interface TechItem {
  id: string;
  name: string;
  icon: any; // Using any for simplicity, you might want to type this properly
  category: string;
}

// Define a Firestore-compatible tech item (without icon function)
interface FirestoreTechItem {
  id: string;
  name: string;
  category: string;
}

// Define the Tech Card data structure
export interface TechCardData {
  photo: string | null;
  name: string;
  bio: string;
  role: string;
  theme: string;
  customThemeFrom?: string;
  customThemeTo?: string;
  languages: TechItem[];
  frameworks: TechItem[];
  ai: TechItem[];
  tools: TechItem[];
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  image?: string; // The generated image URL
}

// Define a Firestore-compatible tech card data structure
interface FirestoreTechCardData {
  photo: string | null;
  name: string;
  bio: string;
  role: string;
  theme: string;
  customThemeFrom?: string;
  customThemeTo?: string;
  languages: FirestoreTechItem[];
  frameworks: FirestoreTechItem[];
  ai: FirestoreTechItem[];
  tools: FirestoreTechItem[];
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  image?: string;
}

/**
 * Save a tech card to Firestore
 * @param data The tech card data to save
 * @returns The ID of the saved document
 */
export const saveTechCard = async (data: TechCardData): Promise<string> => {
  try {
    // Create a Firestore-compatible version of the data
    const firebaseData: FirestoreTechCardData = {
      photo: data.photo,
      name: data.name,
      bio: data.bio,
      role: data.role,
      theme: data.theme,
      customThemeFrom: data.customThemeFrom,
      customThemeTo: data.customThemeTo,
      socials: data.socials,
      // Don't save the full image data URL to Firestore due to size limitations
      // Just store an indicator that the image exists
      image: data.image ? 'generated' : undefined,
      
      // Process tech items to remove icon functions which Firestore can't store
      languages: data.languages.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
      })),
      frameworks: data.frameworks.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
      })),
      ai: data.ai.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
      })),
      tools: data.tools.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
      }))
    };
    
    try {
      // Try to save to Firestore
      const docRef = await addDoc(collection(db, "cards"), {
        ...firebaseData,
        createdAt: Timestamp.now(),
      });
      console.log("✅ Tech card saved with ID:", docRef.id);
      return docRef.id;
    } catch (firestoreError) {
      // If we get a permissions error, generate a temporary ID instead
      // This is a fallback until Firebase rules are properly configured
      console.warn("⚠️ Firestore write failed, using temporary ID. Please update Firestore rules.", firestoreError);
      
      // Generate a unique ID to use as a fallback
      const tempId = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
      
      // Store in localStorage as a temporary measure
      try {
        localStorage.setItem(`tech-card-${tempId}`, JSON.stringify({
          ...firebaseData,
          createdAt: new Date().toISOString()
        }));
      } catch (localStorageError) {
        console.warn("Failed to save to localStorage:", localStorageError);
      }
      
      // Show an alert to the user with instructions
      alert(`IMPORTANT: Your Firebase rules need to be updated to save cards.\n\nPlease update your Firestore security rules to allow write access to the "cards" collection.\n\nAs a temporary workaround, we're generating a local ID for your card.`);
      
      return tempId;
    }
  } catch (error) {
    console.error("❌ Error saving tech card:", error);
    throw error;
  }
}; 