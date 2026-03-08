const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');
const replacements = {
  'soothing-bg-alt': 'vibrant-bg-alt',
  'soothing-bg': 'vibrant-bg',
  'soothing-teal': 'vibrant-orange',
  'soothing-blue': 'vibrant-orange-gradient',
  'soothing-lavender': 'vibrant-orange-light',
  'soothing-text': 'vibrant-text',
  'soothing-muted': 'vibrant-muted'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.html')) {
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
  
  for (const [key, value] of Object.entries(replacements)) {
    content = content.split(key).join(value);
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Total files updated: ${changedCount}`);
