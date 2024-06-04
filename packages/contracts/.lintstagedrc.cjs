module.exports = {
  '*.{js,ts,mts,mjs,cjs,cts,jsx,tsx,json}': ['biome check --apply'],
  '*.sol': ['forge fmt --check --root packages/contracts/'],
};
