module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ["airbnb", "prettier", "prettier/react"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: ["react", "prettier"],
    rules: {
        "no-underscore-dangle": "off",
    },
}
