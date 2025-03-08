export default {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  importOrder: [
    // react first
    '^react$',
    // other 3th party packages
    '<THIRD_PARTY_MODULES>',
    // shared packages
    // '^@shared',
    '^(@[/])',
    // imports starting with `../`
    '^([.][.][/])',
    // imports starting with `./`
    '^([.][/])',
    // Style imports
    '^.+\\.s?css$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
