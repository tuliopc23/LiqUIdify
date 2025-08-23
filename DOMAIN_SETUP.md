# Domain Setup Guide

This guide covers setting up custom domains for all LiqUIdify deployment targets.

## 🌐 Domain Structure

- **Documentation**: `docs.useliquidify.dev` (Mintlify)
- **Storybook**: `storybook.useliquidify.dev` (Vercel)
- **Main Site**: `useliquidify.dev` (Future - main marketing site)

## 📚 Documentation Domain (Mintlify)

### Mintlify Dashboard Configuration

1. **Login to Mintlify Dashboard**:
   - Go to [dashboard.mintlify.com](https://dashboard.mintlify.com)
   - Select your LiqUIdify project

2. **Configure Custom Domain**:
   - Navigate to **Settings** → **Domain Setup**
   - Enter: `docs.useliquidify.dev`
   - Save configuration

### DNS Configuration

Add the following DNS record with your domain provider:

```dns
Type: CNAME
Name: docs
Value: cname.vercel-dns.com.
TTL: Auto (or 300)
```

### Verification Steps

1. **DNS Propagation**: Wait 5-15 minutes for DNS propagation
2. **SSL Certificate**: Mintlify automatically provisions SSL certificates
3. **Verification**: Test at `https://docs.useliquidify.dev`

## 📖 Storybook Domain (Vercel)

### Vercel Dashboard Configuration

1. **Access Project Settings**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your Storybook project
   - Navigate to **Settings** → **Domains**

2. **Add Custom Domain**:
   - Click **Add Domain**
   - Enter: `storybook.useliquidify.dev`
   - Click **Add**

### DNS Configuration

Add the following DNS record with your domain provider:

```dns
Type: CNAME
Name: storybook
Value: cname.vercel-dns.com.
TTL: Auto (or 300)
```

### Domain Verification

If using Vercel as your domain provider, you may need to add a verification TXT record:

```dns
Type: TXT
Name: _vercel
Value: [verification-code-provided-by-vercel]
TTL: Auto (or 300)
```

## ⚙️ Provider-Specific Instructions

### Cloudflare Users

If using Cloudflare for DNS:

1. **Security Settings**:
   - Go to **SSL/TLS** → **Overview**
   - Set encryption mode to **Full (strict)**

2. **Proxy Settings**:
   - For documentation (`docs`): Can be proxied ✅
   - For Storybook (`storybook`): Can be proxied ✅

### GoDaddy Users

1. **DNS Management**:
   - Login to GoDaddy Account Manager
   - Go to **My Products** → **DNS**
   - Add CNAME records as specified above

2. **Propagation Time**:
   - Typically 1-24 hours for full propagation

### Namecheap Users

1. **DNS Management**:
   - Login to Namecheap account
   - Go to **Domain List** → **Manage**
   - Select **Advanced DNS** tab
   - Add CNAME records as specified

## 🔍 Domain Status Verification

### Check DNS Propagation

Use these tools to verify DNS setup:

```bash
# Command line check
nslookup docs.useliquidify.dev
nslookup storybook.useliquidify.dev

# Online tools
# - whatsmydns.net
# - dnschecker.org
```

### SSL Certificate Verification

```bash
# Check SSL certificate
openssl s_client -connect docs.useliquidify.dev:443 -servername docs.useliquidify.dev
openssl s_client -connect storybook.useliquidify.dev:443 -servername storybook.useliquidify.dev
```

## 📋 Configuration Files Updated

The following configuration files have been updated with the new domains:

### Documentation (`apps/docs/docs.json`)

```json
{
  "metadata": {
    "og:url": "https://docs.useliquidify.dev",
    "og:image": "https://docs.useliquidify.dev/og-image.png"
  },
  "navigation": {
    "anchors": [
      {
        "anchor": "Storybook",
        "href": "https://storybook.useliquidify.dev"
      }
    ]
  }
}
```

### Library Package (`package.json`)

```json
{
  "homepage": "https://docs.useliquidify.dev"
}
```

### Storybook (`apps/storybook/vercel.json`)

- Domain will be configured in Vercel dashboard
- DNS points to Vercel's infrastructure

## 🚀 Post-Setup Validation

After configuring both domains, verify the complete setup:

### 1. Documentation Site

- ✅ `https://docs.useliquidify.dev` loads correctly
- ✅ Custom CSS and component previews work
- ✅ Search functionality works
- ✅ All internal links resolve correctly

### 2. Storybook Site

- ✅ `https://storybook.useliquidify.dev` loads correctly
- ✅ All stories render properly
- ✅ Interactive controls work
- ✅ Component documentation displays

### 3. Cross-Site Links

- ✅ Documentation → Storybook links work
- ✅ Storybook → Documentation references work
- ✅ Social media meta tags display correct URLs

## 🔧 Troubleshooting

### Common Issues

1. **DNS Not Propagating**:
   - Wait up to 24 hours for full propagation
   - Clear local DNS cache: `sudo dscacheutil -flushcache` (macOS)
   - Try different DNS servers (8.8.8.8, 1.1.1.1)

2. **SSL Certificate Issues**:
   - Mintlify: Contact support if SSL doesn't provision automatically
   - Vercel: Check domain verification requirements

3. **404 Errors**:
   - Verify DNS CNAME targets are correct
   - Check that deployments are active on both platforms

4. **Mixed Content Warnings**:
   - Ensure all internal links use HTTPS
   - Update any hardcoded HTTP references

### Support Contacts

- **Mintlify**: [support@mintlify.com](mailto:support@mintlify.com) or in-dashboard chat
- **Vercel**: [vercel.com/help](https://vercel.com/help) or community forums

## 📈 Monitoring

### Performance Monitoring

- **Documentation**: Monitor via Mintlify dashboard analytics
- **Storybook**: Monitor via Vercel analytics dashboard

### Uptime Monitoring

Consider setting up uptime monitoring for both domains:

- UptimeRobot
- Pingdom
- StatusPage

## 🔄 Future Considerations

### Main Domain (`useliquidify.dev`)

When ready to set up the main marketing site:

```dns
Type: A
Name: @
Value: [hosting-provider-ip]

Type: CNAME
Name: www
Value: useliquidify.dev
```

### Additional Subdomains

Potential future subdomains:

- `api.useliquidify.dev` - API documentation
- `blog.useliquidify.dev` - Company blog
- `status.useliquidify.dev` - Status page
