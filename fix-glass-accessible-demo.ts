#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'libs/components/src/components/glass-accessible-demo/glass-accessible-demo.tsx';

try {
  let content = readFileSync(filePath, 'utf8');
  
  console.log('Fixing glass-accessible-demo.tsx parsing errors...');
  
  // Fix the malformed onClick handler formatting
  content = content.replace(
    /type="button" onClick=\{validateAccessibility\}/,
    `type="button"
              onClick={validateAccessibility}`
  );
  
  // Fix malformed htmlFor attributes
  content = content.replace(
    /htmlFor="foreground-setfgcoloretargetvalue-classnameh-10-w-full-cursor-pointer-rounded-aria-labelforeground-color-picker--3xlfot"/,
    'htmlFor="foreground-color"'
  );
  
  content = content.replace(
    /htmlFor="background-setbgcoloretargetvalue-classnameh-10-w-full-cursor-pointer-rounded-aria-labelbackground-color-picker--l96jku"/,
    'htmlFor="background-color"'
  );
  
  // Fix corresponding input IDs
  content = content.replace(
    /id="input-1-17ae86"/,
    'id="foreground-color"'
  );
  
  content = content.replace(
    /id="input-2-f6jo5o"/,
    'id="background-color"'
  );
  
  writeFileSync(filePath, content);
  console.log('✅ Fixed glass-accessible-demo.tsx parsing errors');
  
} catch (error) {
  console.error('❌ Error fixing glass-accessible-demo.tsx:', error);
  process.exit(1);
}