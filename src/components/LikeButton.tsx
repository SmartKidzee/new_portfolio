import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface LikeButtonProps {
  blogId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ blogId }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleLike = async () => {
    if (liked || isLoading) return; // Prevent multiple likes or clicking while loading
    
    try {
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
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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