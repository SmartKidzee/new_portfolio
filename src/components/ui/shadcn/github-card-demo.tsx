import React from "react";
import { GithubCard } from "./github-card";

export const GithubCardDemo = () => {
  return (
    <div className="max-w-md mx-auto py-6">
      <GithubCard 
        name="John Developer"
        username="jsdev"
        bio="Full-stack developer passionate about React, TypeScript, and building beautiful UIs"
        avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
        stats={{
          repos: 87,
          followers: 2453,
          following: 76
        }}
        languages={[
          { name: "React", color: "#61dafb", percentage: 45 },
          { name: "TypeScript", color: "#3178c6", percentage: 30 },
          { name: "Node.js", color: "#8cc84b", percentage: 15 },
          { name: "CSS", color: "#563d7c", percentage: 10 }
        ]}
        theme="dark"
        accentColor="#61dafb"
        withAnimation={true}
      />
    </div>
  );
}; 