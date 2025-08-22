// Component Preview Enhancement for LiqUIdify Docs
// This script enables interactive component previews within Mintlify documentation

(function() {
  'use strict';

  // Initialize component previews when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponentPreviews);
  } else {
    initComponentPreviews();
  }

  function initComponentPreviews() {
    // Add theme toggle functionality to preview containers
    addThemeToggles();
    
    // Initialize interactive component demos
    initInteractiveDemos();
    
    // Enhance code groups for component previews
    enhanceCodeGroups();
    
    // Add copy-to-clipboard functionality
    addCopyButtons();
  }

  function addThemeToggles() {
    const previews = document.querySelectorAll('.liquid-component-preview');
    
    previews.forEach(preview => {
      if (preview.dataset.themeToggle === 'true') {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/30 transition-all duration-200';
        toggleButton.textContent = 'Toggle Theme';
        toggleButton.onclick = () => togglePreviewTheme(preview);
        
        preview.style.position = 'relative';
        preview.appendChild(toggleButton);
      }
    });
  }

  function togglePreviewTheme(preview) {
    if (preview.classList.contains('dark-preview')) {
      preview.classList.remove('dark-preview');
      preview.classList.add('light-preview');
    } else if (preview.classList.contains('light-preview')) {
      preview.classList.remove('light-preview');
      preview.classList.add('dark-preview');
    } else {
      preview.classList.add('dark-preview');
    }
  }

  function initInteractiveDemos() {
    const interactiveDemos = document.querySelectorAll('.interactive-demo');
    
    interactiveDemos.forEach(demo => {
      // Add hover effects for interactive elements
      demo.addEventListener('mouseenter', () => {
        demo.style.transform = 'scale(1.02)';
        demo.style.transition = 'transform 0.2s ease-out';
      });
      
      demo.addEventListener('mouseleave', () => {
        demo.style.transform = 'scale(1)';
      });
    });
  }

  function enhanceCodeGroups() {
    const codeGroups = document.querySelectorAll('.code-group.component-demo');
    
    codeGroups.forEach(group => {
      const tabs = group.querySelectorAll('[role="tab"]');
      const previewTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes('preview')
      );
      
      if (previewTab) {
        previewTab.addEventListener('click', () => {
          // Add special styling when preview tab is active
          setTimeout(() => {
            const activePanel = group.querySelector('[role="tabpanel"]:not([hidden])');
            if (activePanel && !activePanel.querySelector('.component-showcase')) {
              const showcase = document.createElement('div');
              showcase.className = 'component-showcase';
              showcase.innerHTML = activePanel.innerHTML;
              activePanel.innerHTML = '';
              activePanel.appendChild(showcase);
            }
          }, 100);
        });
      }
    });
  }

  function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-group.component-demo pre');
    
    codeBlocks.forEach(block => {
      if (!block.querySelector('.copy-button')) {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 hover:opacity-100 transition-opacity duration-200';
        copyButton.textContent = 'Copy';
        copyButton.onclick = () => copyToClipboard(block.textContent, copyButton);
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
        
        // Show copy button on hover
        block.addEventListener('mouseenter', () => {
          copyButton.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', () => {
          copyButton.style.opacity = '0';
        });
      }
    });
  }

  function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.className = button.className.replace('bg-gray-700', 'bg-green-600');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.className = button.className.replace('bg-green-600', 'bg-gray-700');
      }, 2000);
    });
  }

  // Add CSS custom properties for theme switching
  function injectThemeVariables() {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --liquid-preview-bg-light: rgba(255, 255, 255, 0.8);
        --liquid-preview-bg-dark: rgba(17, 24, 39, 0.8);
        --liquid-preview-border-light: rgba(229, 231, 235, 0.8);
        --liquid-preview-border-dark: rgba(75, 85, 99, 0.8);
      }
      
      .liquid-component-preview.light-preview {
        background: var(--liquid-preview-bg-light);
        border-color: var(--liquid-preview-border-light);
      }
      
      .liquid-component-preview.dark-preview {
        background: var(--liquid-preview-bg-dark);
        border-color: var(--liquid-preview-border-dark);
        color: white;
      }
    `;
    document.head.appendChild(style);
  }

  injectThemeVariables();
})();

// Export utility functions for use in component examples
window.LiqUIdifyDocs = {
  createComponentExample: function(componentName, variants = []) {
    return {
      name: componentName,
      variants: variants,
      render: function(container, variant = 'default') {
        const demo = variants.find(v => v.name === variant);
        if (demo && demo.render) {
          container.innerHTML = '';
          demo.render(container);
        }
      }
    };
  },
  
  addLiveExample: function(selector, component, variant = 'default') {
    const containers = document.querySelectorAll(selector);
    containers.forEach(container => {
      component.render(container, variant);
    });
  }
};
