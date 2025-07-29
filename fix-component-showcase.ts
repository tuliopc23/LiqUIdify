#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'libs/components/src/components/component-showcase/component-showcase.tsx';

try {
  let content = readFileSync(filePath, 'utf8');
  
  console.log('Fixing component-showcase.tsx parsing errors...');
  
  // Fix the malformed onClick handler
  content = content.replace(
    /variant="tertiary" onClick=\{\(\) =>\s*addToast\(\{\s*type: 'warning',\s*description: 'This is a warning message with action\.',\s*action: \{\s*label: 'Undo',\s*onClick: \(\) => console\.log\('Undo clicked'\),\s*\}\s*\}/,
    `variant="tertiary"
                      onClick={() =>
                        addToast({
                          type: 'warning',
                          description: 'This is a warning message with action.',
                          action: {
                            label: 'Undo',
                            onClick: () => console.log('Undo clicked'),
                          },
                        })
                      }`
  );
  
  // Fix malformed aria-label attributes
  content = content.replace(/aria-label="Glass card>">/g, 'aria-label="Glass card">');
  
  // Add missing closing brace for switch statement
  content = content.replace(
    /\s*\);\s*\};\s*return <div>\{renderSection\(\)\}<\/div>;\s*\}\);/,
    `        );
      }
    }
  };

  return <div>{renderSection()}</div>;
});`
  );
  
  writeFileSync(filePath, content);
  console.log('✅ Fixed component-showcase.tsx parsing errors');
  
} catch (error) {
  console.error('❌ Error fixing component-showcase.tsx:', error);
  process.exit(1);
}