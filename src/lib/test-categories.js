const fetch = require('node-fetch');

async function test() {
  try {
    const res = await fetch('https://inspodaily.online/wp-json/wp/v2/categories');
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

test();
