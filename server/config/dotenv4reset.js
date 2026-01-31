import dotenv from 'dotenv';
import { fileURLToPath } from 'url'
import path from 'path'
import { dirname, resolve } from 'path'

// In package.json, run dev runs in the top directory while run comment runs at the top directory as well but goes into the config directory, so the "parent" directory is different for each case, and using the absolute path is necessary.

// This will tell you exactly where it is looking, and it will show two different paths depending on if run dev or comment is used.
console.log("From dotenv4reset: Searching for .env at:", path.resolve('../.env'));
dotenv.config({ path: '../.env' });

// This says: "Go to the config folder, then up one, then find .env"
// const __dirname = dirname(fileURLToPath(import.meta.url))
// dotenv.config({ path: resolve(__dirname, '../.env') }) 
