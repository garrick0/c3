/**
 * Workspace - Manages multiple projects/codebases
 * Allows users to work with multiple projects simultaneously
 */

import { Project } from './Project.js';
import type { Configuration } from './Project.js';

export class Workspace {
  private projects: Map<string, Project> = new Map();

  constructor(
    public readonly id: string,
    public readonly defaultConfig: Configuration
  ) {}

  /**
   * Add a project to the workspace
   * Stub: Stores in map
   */
  addProject(project: Project): void {
    this.projects.set(project.id, project);
  }

  /**
   * Remove a project from workspace
   * Stub: Deletes from map
   */
  removeProject(projectId: string): void {
    this.projects.delete(projectId);
  }

  /**
   * Find project by codebase path
   * Stub: Iterates through projects
   */
  findProjectByPath(codebasePath: string): Project | null {
    for (const project of this.projects.values()) {
      if (project.codebase.rootPath === codebasePath) {
        return project;
      }
    }
    return null;
  }

  /**
   * Get project by ID
   * Stub: Map lookup
   */
  getProject(projectId: string): Project | undefined {
    return this.projects.get(projectId);
  }

  /**
   * Get all projects in workspace
   * Stub: Returns array of projects
   */
  getAllProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  /**
   * Get total number of projects
   */
  getProjectCount(): number {
    return this.projects.size;
  }
}
