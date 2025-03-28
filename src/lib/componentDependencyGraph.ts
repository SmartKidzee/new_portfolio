/**
 * Component Dependency Graph
 * 
 * This module manages component dependency relationships,
 * enabling intelligent preloading strategies based on component usage patterns.
 */

interface DependencyNode {
  id: string;
  dependencies: string[];
  dependents: string[];
}

class ComponentDependencyGraph {
  private dependencies: Record<string, DependencyNode> = {};
  
  /**
   * Register a component with its dependencies
   */
  registerComponent(componentId: string, dependencies: string[] = []): void {
    // Create node if it doesn't exist
    if (!this.dependencies[componentId]) {
      this.dependencies[componentId] = {
        id: componentId,
        dependencies: [],
        dependents: []
      };
    }
    
    // Add dependencies
    dependencies.forEach(depId => {
      // Add unique dependency
      if (!this.dependencies[componentId].dependencies.includes(depId)) {
        this.dependencies[componentId].dependencies.push(depId);
      }
      
      // Create dependent node if it doesn't exist
      if (!this.dependencies[depId]) {
        this.dependencies[depId] = {
          id: depId,
          dependencies: [],
          dependents: []
        };
      }
      
      // Add this component as a dependent of the dependency
      if (!this.dependencies[depId].dependents.includes(componentId)) {
        this.dependencies[depId].dependents.push(componentId);
      }
    });
    
    console.log(`[DependencyGraph] Registered component ${componentId} with ${dependencies.length} dependencies`);
  }
  
  /**
   * Add a dependency relationship between components
   */
  addDependency(componentId: string, dependencyId: string): void {
    if (componentId === dependencyId) {
      console.warn(`[DependencyGraph] Cannot add self-dependency for ${componentId}`);
      return;
    }
    
    // Register components if they don't exist
    if (!this.dependencies[componentId]) {
      this.registerComponent(componentId);
    }
    
    if (!this.dependencies[dependencyId]) {
      this.registerComponent(dependencyId);
    }
    
    // Add dependency if not already present
    if (!this.dependencies[componentId].dependencies.includes(dependencyId)) {
      this.dependencies[componentId].dependencies.push(dependencyId);
      this.dependencies[dependencyId].dependents.push(componentId);
      console.log(`[DependencyGraph] Added dependency: ${componentId} -> ${dependencyId}`);
    }
  }
  
  /**
   * Check if componentA depends on componentB (directly or indirectly)
   */
  dependsOn(componentA: string, componentB: string): boolean {
    // If components don't exist, they don't depend on each other
    if (!this.dependencies[componentA] || !this.dependencies[componentB]) {
      return false;
    }
    
    // Check direct dependency
    if (this.dependencies[componentA].dependencies.includes(componentB)) {
      return true;
    }
    
    // Check indirect dependencies (recursively)
    return this.dependencies[componentA].dependencies.some(depId => 
      this.dependsOn(depId, componentB)
    );
  }
  
  /**
   * Get direct dependencies of a component
   */
  getDirectDependencies(componentId: string): string[] {
    if (!this.dependencies[componentId]) {
      return [];
    }
    return [...this.dependencies[componentId].dependencies];
  }
  
  /**
   * Get all dependencies of a component (direct and indirect)
   */
  getAllDependencies(componentId: string): string[] {
    if (!this.dependencies[componentId]) {
      return [];
    }
    
    const allDeps = new Set<string>();
    
    // Helper function to recursively collect dependencies
    const collectDeps = (id: string) => {
      const deps = this.dependencies[id]?.dependencies || [];
      deps.forEach(depId => {
        if (!allDeps.has(depId)) {
          allDeps.add(depId);
          collectDeps(depId);
        }
      });
    };
    
    // Start collection
    collectDeps(componentId);
    
    return Array.from(allDeps);
  }
  
  /**
   * Get direct dependents of a component
   */
  getDirectDependents(componentId: string): string[] {
    if (!this.dependencies[componentId]) {
      return [];
    }
    return [...this.dependencies[componentId].dependents];
  }
  
  /**
   * Get all dependents of a component (direct and indirect)
   */
  getAllDependents(componentId: string): string[] {
    if (!this.dependencies[componentId]) {
      return [];
    }
    
    const allDependents = new Set<string>();
    
    // Helper function to recursively collect dependents
    const collectDependents = (id: string) => {
      const dependents = this.dependencies[id]?.dependents || [];
      dependents.forEach(depId => {
        if (!allDependents.has(depId)) {
          allDependents.add(depId);
          collectDependents(depId);
        }
      });
    };
    
    // Start collection
    collectDependents(componentId);
    
    return Array.from(allDependents);
  }
  
  /**
   * Get a dependency chain between two components
   */
  getDependencyChain(fromId: string, toId: string): string[] | null {
    if (!this.dependencies[fromId] || !this.dependencies[toId]) {
      return null;
    }
    
    // If direct dependency, return simple chain
    if (this.dependencies[fromId].dependencies.includes(toId)) {
      return [fromId, toId];
    }
    
    // Use breadth-first search to find shortest path
    const queue: Array<{id: string, path: string[]}> = [
      {id: fromId, path: [fromId]}
    ];
    const visited = new Set<string>();
    
    while (queue.length > 0) {
      const {id, path} = queue.shift()!;
      
      if (visited.has(id)) continue;
      visited.add(id);
      
      // Check each dependency
      for (const depId of this.dependencies[id].dependencies) {
        const newPath = [...path, depId];
        
        if (depId === toId) {
          return newPath;
        }
        
        queue.push({id: depId, path: newPath});
      }
    }
    
    // No path found
    return null;
  }
  
  /**
   * Generate a graph representation of component dependencies
   */
  generateGraph() {
    const nodes: Array<{id: string, dependents: number, dependencies: number}> = [];
    const edges: Array<{from: string, to: string}> = [];
    
    // Create nodes and edges
    Object.values(this.dependencies).forEach(node => {
      nodes.push({
        id: node.id,
        dependents: node.dependents.length,
        dependencies: node.dependencies.length
      });
      
      node.dependencies.forEach(depId => {
        edges.push({
          from: node.id,
          to: depId
        });
      });
    });
    
    return { nodes, edges };
  }
  
  /**
   * Calculate dependency complexity for a component
   */
  calculateComplexity(componentId: string): number {
    if (!this.dependencies[componentId]) {
      return 0;
    }
    
    const allDeps = this.getAllDependencies(componentId);
    const directDeps = this.getDirectDependencies(componentId);
    
    // Complexity increases with both direct and indirect dependencies
    return directDeps.length + (allDeps.length - directDeps.length) * 0.5;
  }
}

// Create and export singleton instance
const componentDependencyGraph = new ComponentDependencyGraph();
export default componentDependencyGraph; 