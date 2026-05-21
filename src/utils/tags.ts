/**
 * Tag utility functions
 */

/**
 * Tag Metadata Manifest
 *
 * This file centralizes the icons and descriptions for all expertise areas.
 * Taxonomy is audited for Executive/Strategic impact.
 */

export interface TagMeta {
  description: string;
  icon: string;
  displayName?: string;
}

export const tagMetadata: Record<string, TagMeta> = {
  architecture: {
    description:
      "Designing resilient systems, navigating architectural pivots, and enforcing decoupling for long-term technical sustainability.",
    icon: "lucide:component",
  },
  "quality-engineering": {
    description:
      "Strategic quality frameworks and Test-Driven Development as a design philosophy for robust, verifiable codebases.",
    icon: "lucide:shield-check",
    displayName: "Quality Engineering",
  },
  ai: {
    description:
      "Strategic integration of Artificial Intelligence and Large Language Models into development workflows and enterprise architecture.",
    icon: "lucide:sparkles",
    displayName: "AI",
  },
  governance: {
    description:
      "Defining the standards and oversight required to maintain consistency across distributed teams and guide engineering excellence.",
    icon: "lucide:gavel",
  },
  optimization: {
    description:
      "Algorithmic efficiency, performance tuning, and the pursuit of optimal resource utilization.",
    icon: "lucide:gauge",
  },
  "algorithmic-strategy": {
    description:
      "Formal study of computational logic and efficient problem-solving patterns applied to complex business logic.",
    icon: "lucide:route",
    displayName: "Algorithmic Strategy",
  },
  resilience: {
    description:
      "Building systems that fail gracefully and maintain operational integrity under extreme conditions.",
    icon: "lucide:heart-pulse",
  },
  typescript: {
    description:
      "Leveraging static typing and modern language features to build scalable, type-safe web applications.",
    icon: "lucide:code-2",
    displayName: "TypeScript",
  },
  "agile-strategy": {
    description:
      "Iterative methodologies, data-driven forecasting, and strategic Scrum leadership focused on organizational velocity.",
    icon: "lucide:iteration-ccw",
    displayName: "Agile Strategy",
  },
  leadership: {
    description:
      "Strategic leadership and management principles for scaling high-performance engineering organizations.",
    icon: "lucide:award",
  },
  productivity: {
    description:
      "Optimizing workflow design, physical-digital toolsets, and high-focus productivity systems.",
    icon: "lucide:activity",
  },
  "systems-thinking": {
    description:
      "Analyzing complex interdependencies and feedback loops within technical and organizational ecosystems.",
    icon: "lucide:network",
    displayName: "Systems Thinking",
  },
  "design-patterns": {
    description:
      "The fundamental architectural principles of isolating distinct logic to minimize system-wide friction and improve testability.",
    icon: "lucide:layers",
    displayName: "Design Patterns",
  },
  "organizational-design": {
    description:
      "Building sovereign, high-performing teams through intentional structural design and cultural alignment.",
    icon: "lucide:users",
    displayName: "Organizational Design",
  },
  estimation: {
    description:
      "Data-driven techniques for navigating the Cone of Uncertainty and setting realistic stakeholder expectations.",
    icon: "lucide:timer",
  },
  "risk-management": {
    description:
      "Strategic management of known and unknown risks throughout the product development lifecycle.",
    icon: "lucide:shield-alert",
    displayName: "Risk Management",
  },
  "operational-metrics": {
    description:
      "Measuring and optimizing organizational throughput and value delivery using evidence-based performance indicators.",
    icon: "lucide:zap",
    displayName: "Operational Metrics",
  },
};

export const defaultTagMeta: TagMeta = {
  description: "Technical deep-dives and strategic observations.",
  icon: "lucide:tags",
};

/**
 * Normalizes a tag name into a URL-friendly slug.
 */
export function slugifyTag(tagName: string): string {
  return tagName.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Retrieves metadata for a given tag.
 */
export function getTagMeta(tagName: string): TagMeta {
  const slug = slugifyTag(tagName);
  return tagMetadata[slug] || defaultTagMeta;
}

/**
 * Formats a tag name for display (e.g., "advent-of-code" -> "Advent of Code").
 * Uses metadata overrides for specific casing (e.g., "TDD", "AI").
 */
export function formatTag(tagName: string): string {
  const slug = slugifyTag(tagName);
  const meta = tagMetadata[slug];

  if (meta?.displayName) return meta.displayName;

  return tagName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
