import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import ProjectImage from "./ProjectImage";
import ProjectImageGroup from "./ProjectImageGroup";
import Scope from "./Scope";

/**
 * Components made available to every .mdx file without an import.
 * `ProjectImage`, `ProjectImageGroup`, and `Scope` are registered here so they
 * work out of the box inside content files.
 */
export const mdxComponents: MDXRemoteProps["components"] = {
  ProjectImage,
  ProjectImageGroup,
  Scope,
};
