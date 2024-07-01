module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write --ignore-unknown', 'eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'npm run check-types',
  '*.{json,yaml}': ['prettier --write'],
};
