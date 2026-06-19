export type WindowId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
  | "leadership"
  | "contact";

export type OpenWindow = {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
};
