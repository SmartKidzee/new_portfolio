import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LikeButtonProps {
  blogId: string;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ blogId }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const heartCounter = useState(0)[0];

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setIsLoading(true);
        const likeRef = doc(db, "likes", blogId);
        const likeSnap = await getDoc(likeRef);
        
        if (likeSnap.exists()) {
          setLikes(likeSnap.data().count || 0);
        } else {
          // Initialize document if it doesn't exist
          await setDoc(likeRef, { count: 0 });
        }

        // Check if user has already liked this post (from localStorage)
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
        if (likedPosts[blogId]) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLikes();
  }, [blogId]);

  const createFloatingHearts = () => {
    // Create 5-8 hearts with random positions and scales
    const newHearts: FloatingHeart[] = [];
    const heartCount = Math.floor(Math.random() * 4) + 5; // 5-8 hearts
    
    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 60 - 30, // random x position between -30 and 30
        y: Math.random() * -20 - 10, // start above the button
        scale: Math.random() * 0.4 + 0.2, // random scale between 0.2 and 0.6
        rotation: Math.random() * 60 - 30, // random rotation
      });
    }
    
    setFloatingHearts([...floatingHearts, ...newHearts]);
    
    // Remove hearts after animation is complete
    setTimeout(() => {
      setFloatingHearts(hearts => hearts.filter(heart => 
        !newHearts.some(newHeart => newHeart.id === heart.id)
      ));
    }, 1500);
  };

  const handleLike = async () => {
    if (liked || isLoading) return; // Prevent multiple likes or clicking while loading
    
    try {
      // Trigger heart animation
      createFloatingHearts();
      
      // Optimistic update
      setLikes((prev) => prev + 1);
      setLiked(true);
      
      const likeRef = doc(db, "likes", blogId);
      await updateDoc(likeRef, { count: increment(1) });

      // Store liked post in localStorage to prevent multiple likes
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
      likedPosts[blogId] = true;
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    } catch (error) {
      // Revert on error
      console.error("Error updating likes:", error);
      setLikes((prev) => prev - 1);
      setLiked(false);
    }
  };

  return (
    <motion.div 
      className="flex items-center gap-2 relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Floating hearts animation */}
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              x: 0, 
              y: 0, 
              scale: heart.scale, 
              rotate: heart.rotation,
              opacity: 0.8 
            }}
            animate={{ 
              x: heart.x, 
              y: heart.y - 80, // Float upward
              opacity: 0,
              scale: heart.scale * 0.5,
              rotate: heart.rotation * 2
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute z-10 text-pink-500 fill-pink-500 pointer-events-none"
            style={{ left: "20px", bottom: "20px" }}
          >
            <Heart size={16} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: liked ? 1 : 1.05 }}
        whileTap={{ scale: liked ? 1 : 0.95 }}
        onClick={handleLike}
        disabled={liked || isLoading}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
          liked 
            ? "bg-pink-500/20 text-pink-300 border border-pink-500/30" 
            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
        }`}
      >
        <Heart 
          className={`${liked ? "fill-pink-500 text-pink-500" : "text-gray-400"} w-4 h-4`} 
        />
        <span className="text-sm font-medium">
          {liked ? "Liked" : "Like"}
        </span>
      </motion.button>
      
      <motion.span 
        className="text-sm font-medium text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {likes} {likes === 1 ? "like" : "likes"}
      </motion.span>
    </motion.div>
  );
};

export default LikeButton; 