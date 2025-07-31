# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| 0.x.x   | :x:                |

## Reporting a Vulnerability

We take the security of LiqUIdify seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please DO NOT:

- Open a public GitHub issue
- Discuss the vulnerability publicly
- Exploit the vulnerability

### Please DO:

1. **Email us directly** at: security@liquidify.dev
2. **Include the following information:**
   - Type of vulnerability (XSS, CSRF, SQL Injection, etc.)
   - Component(s) affected
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

3. **Use our PGP key** (optional but recommended):
```
-----BEGIN PGP PUBLIC KEY BLOCK-----
[PGP KEY WOULD BE HERE]
-----END PGP PUBLIC KEY BLOCK-----
```

### What to Expect

- **Acknowledgment**: Within 24 hours
- **Initial Assessment**: Within 72 hours
- **Status Updates**: Every 72 hours
- **Resolution Timeline**: 
  - Critical: 7 days
  - High: 14 days
  - Medium: 30 days
  - Low: 90 days

## Security Measures

### Development Practices

1. **Code Review**: All code undergoes peer review
2. **Automated Scanning**: Regular dependency and code scanning
3. **Testing**: Security-focused test cases
4. **Dependencies**: Regular updates and audits

### Component Security

#### Input Sanitization
All user inputs are sanitized:

```javascript
// Example: GlassInput sanitization
import DOMPurify from 'dompurify';

function sanitizeInput(value) {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
}
```

#### XSS Prevention
React's built-in protections plus:

```javascript
// Safe HTML rendering
<GlassCard 
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(htmlContent)
  }}
/>
```

#### Content Security Policy
Recommended CSP headers:

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
```

### Authentication Components

If using authentication-related components:

```javascript
// Secure password input
<GlassInput
  type="password"
  autoComplete="current-password"
  minLength={8}
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
/>

// Secure form submission
<form onSubmit={handleSubmit} noValidate>
  <input type="hidden" name="csrf_token" value={csrfToken} />
  {/* form fields */}
</form>
```

## Security Checklist

### For Developers

- [ ] Never use `dangerouslySetInnerHTML` with user input
- [ ] Always validate and sanitize inputs
- [ ] Use HTTPS in production
- [ ] Implement CSRF protection
- [ ] Set secure HTTP headers
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting

### For Users

- [ ] Keep @liquidify/components updated
- [ ] Review component props for security
- [ ] Implement proper authentication
- [ ] Use HTTPS in production
- [ ] Set Content Security Policy
- [ ] Regular security audits
- [ ] Monitor for vulnerabilities

## Known Security Considerations

### Glass Effects
The glassmorphism effects use CSS backdrop-filter which can potentially expose underlying content. Ensure sensitive information is not placed behind glass components.

```javascript
// ❌ Bad: Sensitive data behind glass
<div className="sensitive-data">
  Credit Card: 1234-5678-9012-3456
</div>
<GlassModal isOpen={true}>
  {/* Modal content */}
</GlassModal>

// ✅ Good: Hide sensitive data when overlays are active
{!modalOpen && (
  <div className="sensitive-data">
    {/* Sensitive content */}
  </div>
)}
```

### Third-Party Integrations
When integrating with third-party services:

```javascript
// Sanitize external content
const ExternalContent = ({ htmlContent }) => {
  const sanitized = DOMPurify.sanitize(htmlContent, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
  });
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};
```

## Dependency Security

### Regular Audits

Run security audits regularly:

```bash
# NPM audit
npm audit

# Bun audit
bun audit

# Snyk scan
npx snyk test
```

### Automated Updates

Use Dependabot or similar:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
    security-updates-only: true
```

## Response Team

### Security Team Members
- **Security Lead**: security@liquidify.dev
- **Engineering Lead**: engineering@liquidify.dev
- **Community Manager**: community@liquidify.dev

### Disclosure Policy

1. **Private Disclosure**: 90 days before public disclosure
2. **CVE Assignment**: For verified vulnerabilities
3. **Security Advisory**: Published on GitHub
4. **Release Notes**: Included in patch releases

## Hall of Fame

We thank the following security researchers:

| Researcher | Vulnerability | Date |
|------------|---------------|------|
| [Name] | [Type] | [Date] |

## Resources

### Security Tools
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [CodeQL](https://codeql.github.com/)

### Best Practices
- [OWASP Secure Coding](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [React Security](https://react.dev/learn/security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### Contact
- **Email**: security@liquidify.dev
- **PGP Key**: [Link to key]
- **Security Page**: https://liquidify.dev/security

---

**Remember**: Security is everyone's responsibility. When in doubt, ask!