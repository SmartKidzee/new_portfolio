import React from "react";
import { useParams } from "react-router-dom";

export default function BlogPage() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="p-6">
      {/* Blog content removed */}
    </div>
  );
} 