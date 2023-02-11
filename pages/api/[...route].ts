//@ts-ignore
import wasm from '../../wasm/pkg/wasm_bg.wasm?module';

import { Hono } from 'hono';
import { handle } from 'hono/nextjs';

export const config = {
  runtime: 'edge',
};

const app = new Hono();

app.get('/hello', async (c) => {
  const { exports } = (await WebAssembly.instantiate(wasm)) as any;

  // Set up a place for a return value on the stack
  const retptr = exports.__wbindgen_add_to_stack_pointer(-16);

  exports.greet(retptr);

  // Cast the shared memory buffer to 32 bit words to retrieve the
  // pointer to the returned string and the string's length
  const memoryWords = new Int32Array(exports.memory.buffer);

  const str = memoryWords[retptr / 4 + 0];
  const len = memoryWords[retptr / 4 + 1];

  // Cast the shared memory buffer to octets to convert to a
  // JavaScript string
  const memoryBytes = new Uint8Array(exports.memory.buffer);
  const strBytes = memoryBytes.subarray(str, str + len);

  const greeting = new TextDecoder('utf-8', {
    ignoreBOM: true,
    fatal: true,
  }).decode(strBytes);

  // Clean up the stack and free the memory
  exports.__wbindgen_add_to_stack_pointer(16);
  exports.__wbindgen_free(str, len);

  return c.json({
    message: greeting,
  });
});

app.get('/world', async (c) => {
  return c.json({
    message: 'Another Route!',
  });
});

//@ts-ignore
export default handle(app, '/api');
