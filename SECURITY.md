# Security Policy

## Supported Versions

We actively support the following versions of Glass UI with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| 0.x.x   | :x:                |

## Reporting a Vulnerability

The Glass UI team takes security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them by emailing: **security@glass-ui.dev**

Include the following information in your report:
- A detailed description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any suggested fixes or mitigations

### What to Expect

1. **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours.

2. **Investigation**: We will investigate and validate the reported vulnerability within 7 days.

3. **Resolution**: We will work to resolve confirmed vulnerabilities according to the following timeline:
   - **Critical**: Within 7 days
   - **High**: Within 14 days
   - **Medium**: Within 30 days
   - **Low**: Within 60 days

4. **Disclosure**: We will coordinate with you on the timing of any public disclosure.

### Security Best Practices for Users

To help ensure the security of your applications when using Glass UI:

1. **Keep Updated**: Always use the latest version of Glass UI
2. **Dependency Auditing**: Regularly audit your dependencies using `npm audit`
3. **Content Security Policy**: Implement proper CSP headers in your applications
4. **Input Validation**: Always validate and sanitize user inputs in your applications
5. **Bundle Analysis**: Monitor your bundle size and dependencies

### Known Security Considerations

#### Client-Side Rendering
Glass UI is designed for client-side rendering. Be aware of:
- XSS vulnerabilities when rendering user-generated content
- Proper sanitization of dynamic content

#### Dependencies
We regularly audit our dependencies for security vulnerabilities:
- All dependencies are scanned using automated security tools
- We promptly update dependencies when security patches are available

### Vulnerability Disclosure Timeline

When we receive a security report:
1. We confirm the receipt within 48 hours
2. We work to reproduce and validate the issue
3. We develop and test a fix
4. We prepare a security advisory
5. We release the fix and publish the advisory
6. We credit the reporter (unless they prefer to remain anonymous)

### Bug Bounty Program

We currently do not have a formal bug bounty program, but we deeply appreciate security researchers who help us keep Glass UI secure.

### Contact

For any security-related questions or concerns, please contact:
- **Email**: security@glass-ui.dev
- **PGP Key**: Available upon request

---

Thank you for helping keep Glass UI and our users safe! 