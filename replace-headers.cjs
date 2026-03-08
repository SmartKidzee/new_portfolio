const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');
const searchString = 'text-3xl md:text-4xl font-bold inline-flex items-center bg-gradient-to-r from-vibrant-orange to-vibrant-orange-gradient py-2 px-6 rounded-lg shadow-lg';
const replaceString = 'font-[\'Anton\'] text-4xl md:text-5xl uppercase tracking-widest text-[#fd2601] drop-shadow-md inline-flex items-center';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(dir);
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  if (content.includes(searchString)) {
    content = content.split(searchString).join(replaceString);
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
    console.log(`Updated headers in ${file}`);
  }
});

console.log(`Total files updated: ${changedCount}`);
