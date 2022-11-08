# Archmage Plugin API typings
[![npm](https://img.shields.io/npm/v/@archmagelive/plugin-typings?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/@archmagelive/plugin-typings)

This repository contains the typings for the Archmage Plugin API.

## Usage

1. Installation
    ```sh
    npm i --save-dev @archmagelive/plugin-typings
    # or
    yarn add -D @archmagelive/plugin-typings
    # or
    pnpm add -D @archmagelive/plugin-typings
    ```

2. Configure _tsconfig.json_
    ```json
    {
        "compilerOptions": {
            "typeRoots": [
                "./node_modules/@types",
                "./node_modules/@archmagelive"
            ]
        }
    }
    ```
   
   The configuration above is needed for the TypeScript compiler to use type definitions found in both `./node_modules/@types` and `./node_modules/@archmagelive`. Normally, most external type definitions are from DefinitelyTyped and are installed in `/@types`, which included by TypeScript by default. Since we host the plugin typings separately, they are installed outside in `/@archmagelive` instead.

   Types should become globally available without needing to use import statements. We do it this way because the plugin API is part of the host environment, as opposed to being a package that a plugin includes.
