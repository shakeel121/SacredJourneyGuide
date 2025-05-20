// Content section structure
export interface ContentSection {
  title: string;
  content: string;
}

// Content structure with sections
export interface Content {
  sections: ContentSection[];
}
