import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./BlogCard";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import { Blog, blogs, searchBlogs, getBlogCategories } from "../data/blogs";

interface BlogListProps {
  limit?: number;
  showFilters?: boolean;
}

export default function BlogList({ limit, showFilters = true }: BlogListProps) {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  // Format categories for the dropdown
  const categories = [
    { label: "All Categories", value: "all" },
    ...getBlogCategories().map(category => ({
      label: category,
      value: category.toLowerCase()
    }))
  ];

  // Sort options
  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" }
  ];

  // Filter and sort blogs based on search query, category, and sort order
  const filterAndSortBlogs = useCallback(() => {
    setIsLoading(true);
    
    // First, filter by search query
    let results = searchQuery ? searchBlogs(searchQuery) : [...blogs];
    
    // Then filter by category
    if (selectedCategory !== "all") {
      results = results.filter(
        blog => blog.category.toLowerCase() === selectedCategory
      );
    }
    
    // Sort by date
    results.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    // Apply limit if specified
    if (limit && limit > 0) {
      results = results.slice(0, limit);
    }
    
    // Simulate loading
    setTimeout(() => {
      setFilteredBlogs(results);
      setIsLoading(false);
    }, 300);
  }, [searchQuery, selectedCategory, sortOrder, limit]);

  // Apply filters when inputs change
  useEffect(() => {
    filterAndSortBlogs();
  }, [filterAndSortBlogs]);

  // Handle search input changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle sort order changes
  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
  };

  return (
    <div className="w-full">
      {showFilters && (
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchBar onSearch={handleSearch} />
          
          <div className="flex gap-3">
            <FilterDropdown
              options={categories}
              selectedValue={selectedCategory}
              onSelect={handleCategoryChange}
              label="Category"
            />
            
            <FilterDropdown
              options={sortOptions}
              selectedValue={sortOrder}
              onSelect={handleSortOrderChange}
              label="Sort"
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="py-16 flex justify-center items-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    <BlogCard blog={blog} priority={index < 3} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-16 text-center bg-black/10 backdrop-blur-xl rounded-xl border border-white/10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No blogs found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  We couldn't find any blogs matching your search criteria. 
                  Try adjusting your filters or search query.
                </p>
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 