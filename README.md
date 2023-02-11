# Vercel Edge Functions + Hono Router + Wasm + Rust

This example shows the following:

1. You are able to write Rust code inside `wasm/src`
1. The Rust code gets compiled to WebAssembly
1. The WebAssembly code is used in an API Route using the Edge Runtime
1. This API Route can be deployed to [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)
1. The [Hono Router](https://github.com/honojs/hono) is used to write all routes in a single API Route

> **Note:** This example is using Next.js "headless" through the local dev server, using `next dev` to serve API Routes. It's _not_ doing any rendering of pages, so React is not being used. Why? [Hono](https://honojs.dev/) does not currently work with vanilla Vercel Edge Functions, which are served through `vercel dev`. Hono `v3` adds support for Next.js, which enabled me to create this example.

## Example

- https://hono-rust-wasm.vercel.app/api/hello
- https://hono-rust-wasm.vercel.app/api/world

## Running Locally

```
pnpm i
pnpm dev
```
