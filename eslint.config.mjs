import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // react-three-fiber drives WebGL buffers imperatively inside useFrame,
    // which is the documented R3F pattern but trips the React Compiler's
    // experimental ref/immutability rules. Scoped off for the 3D scenes only.
    files: [
      "src/components/hero/DataField.tsx",
      "src/components/signature/SignatureCluster.tsx",
    ],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
