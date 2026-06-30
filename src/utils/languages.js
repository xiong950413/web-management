/**
 * 常见编程语言对应的 GitHub 颜色
 */
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  PowerShell: '#012456',
  Lua: '#000080',
  Scala: '#c22d40',
  R: '#198CE7',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Perl: '#0298c3',
  ObjectiveC: '#438eff',
  Zig: '#ec915c',
  Julia: '#a270ba',
  Nim: '#ffc200',
  OCaml: '#3be133',
  'F#': '#b845fc',
  Groovy: '#4298b8',
  Makefile: '#427819',
  Dockerfile: '#384d54',
  Jupyter: '#DA5B0B',
  TeX: '#3D6117',
}

export function getLanguageColor(language) {
  return LANGUAGE_COLORS[language] || '#8b8b8b'
}
