
import { useState, useEffect } from 'react';
import { User } from '@/types/authTypes';

// List of possible avatar styles for generation
const AVATAR_STYLES = [
  "pixel-art",
  "micah",
  "adventurer",
  "adventurer-neutral",
  "big-ears",
  "big-smile",
  "bottts",
  "croodles",
  "identicon",
  "initials",
  "lorelei"
];

export function useAvatar(user: User | null) {
  const [currentAvatarStyle, setCurrentAvatarStyle] = useState("pixel-art");
  const [avatarSeed, setAvatarSeed] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Update avatar seed when user data is available
  useEffect(() => {
    if (user) {
      // Set avatar seed based on username or extract seed from existing avatarUrl
      if (user.avatarUrl && user.avatarUrl.includes('seed=')) {
        // Extract just the seed parameter from the URL to prevent nesting
        const seedMatch = user.avatarUrl.match(/seed=([^&]+)/);
        setAvatarSeed(seedMatch ? seedMatch[1] : user.username);
        
        // Extract avatar style from URL if available
        if (user.avatarUrl.includes('https://api.dicebear.com/7.x/')) {
          const styleMatch = user.avatarUrl.match(/7\.x\/([^/]+)\/svg/);
          if (styleMatch && AVATAR_STYLES.includes(styleMatch[1])) {
            setCurrentAvatarStyle(styleMatch[1]);
          }
        }
      } else {
        setAvatarSeed(user.username);
      }
    }
  }, [user]);
  
  /**
   * Generates a random seed for the avatar
   * @returns The new random seed
   */
  const generateRandomSeed = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    setAvatarSeed(randomString);
    return randomString;
  };

  /**
   * Changes the avatar style to the next one in the list
   * @returns The new avatar style
   */
  const changeAvatarStyle = () => {
    const currentIndex = AVATAR_STYLES.indexOf(currentAvatarStyle);
    const nextIndex = (currentIndex + 1) % AVATAR_STYLES.length;
    setCurrentAvatarStyle(AVATAR_STYLES[nextIndex]);
    return AVATAR_STYLES[nextIndex];
  };
  
  /**
   * Returns the current avatar URL based on the style and seed
   */
  const getAvatarUrl = () => {
    // Ensure the seed doesn't contain any URLs to prevent nesting
    let cleanSeed = avatarSeed;
    if (cleanSeed.includes('http')) {
      // If seed contains a URL, use only the username to prevent nesting
      cleanSeed = user?.username || 'user';
    }
    
    // Generate the avatar URL base
    const baseUrl = `https://api.dicebear.com/7.x/${currentAvatarStyle}/svg?seed=`;
    
    // Calculate maximum allowed seed length to stay under 255 characters
    const maxSeedLength = 250 - baseUrl.length;
    
    // Truncate the seed if necessary
    const truncatedSeed = cleanSeed.substring(0, maxSeedLength);
    
    // Return the final URL
    return `${baseUrl}${truncatedSeed}`;
  };
  
  return {
    avatarSeed,
    currentAvatarStyle,
    isUpdating,
    setIsUpdating,
    setAvatarSeed,
    setCurrentAvatarStyle,
    generateRandomSeed,
    changeAvatarStyle,
    getAvatarUrl,
    AVATAR_STYLES
  };
}
