This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## WhatsApp Integration

This project includes WhatsApp messaging integration using the Interakt API for automated notifications.

### Features

- **Registration Confirmations** - Automatic WhatsApp messages when users complete registration
- **Payment Notifications** - Instant confirmation messages for successful payments
- **Abstract Submissions** - Notifications when abstracts are submitted for review
- **Group Registration** - Confirmation messages for group registration approvals
- **Welcome Messages** - Event details and welcome messages

### Setup

1. **Get Interakt API Key:**

   - Sign up at [https://www.interakt.shop/](https://www.interakt.shop/)
   - Get your API key from [https://app.interakt.ai/settings/developer-setting](https://app.interakt.ai/settings/developer-setting)

2. **Configure Environment:**

   ```bash
   # Add to your .env.local file
   INTERAKT_API_KEY=your_api_key_here
   ```

3. **Create Templates:**

   - See `WHATSAPP_SETUP.md` for detailed template creation instructions
   - Create required templates in your Interakt dashboard
   - Wait for WhatsApp approval (24-48 hours)

4. **Test Integration:**
   - Visit `/admin/whatsapp` to access the test panel
   - Send test messages to verify integration
   - Monitor logs for any issues

### Admin Panel

Access the WhatsApp admin panel at `/admin/whatsapp` to:

- Test different message types
- Verify template functionality
- Check integration status
- Access quick links to Interakt dashboard

For detailed setup instructions, see `WHATSAPP_SETUP.md`.

#1e8f26, #c12b23, #eacf34
