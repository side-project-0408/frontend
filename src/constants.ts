interface Option {
  readonly label: string;
  readonly value: string;
}

export const SELECT_POSITION_OPTION = [
  { id: 1, value: "frontend" },
  { id: 2, value: "backend" },
  { id: 3, value: "designer" },
  { id: 4, value: "pm" },
  { id: 5, value: "ios" },
  { id: 6, value: "android" },
  { id: 7, value: "devops" },
];

export const YEAR_OPTION = [
  { id: 1, value: "0" },
  { id: 2, value: "1" },
  { id: 3, value: "2" },
  { id: 4, value: "3" },
  { id: 5, value: "4" },
  { id: 6, value: "5" },
  { id: 7, value: "6" },
];

export const SELECT_OPTION: readonly Option[] = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Nextjs", value: "nextjs" },
  { label: "Java", value: "java" },
  { label: "Spring", value: "spring" },
  { label: "Nodejs", value: "nodejs" },
  { label: "Nestjs", value: "nestjs" },
  { label: "Go", value: "go" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Express", value: "express" },
  { label: "MySQL", value: "mysql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "Python", value: "python" },
  { label: "Diango", value: "Diango" },
  { label: "php", value: "php" },
  { label: "GraphQL", value: "graphql" },
  { label: "Firebase", value: "firebase" },
  { label: "Flutter", value: "flutter" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "ReactNative", value: "reactnative" },
  { label: "Unity", value: "unity" },
  { label: "AWS", value: "aws" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "Docker", value: "docker" },
  { label: "Git", value: "git" },
  { label: "Figma", value: "figma" },
  { label: "Zeplin", value: "zeplin" },
  { label: "Jest", value: "jest" },
  { label: "C", value: "C" },
];
