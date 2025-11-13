# Deployment Instructions for Vercel

## Prerequisites
- A Vercel account (free at [vercel.com](https://vercel.com))
- This project's code

## Deploying to Vercel

### Option 1: Connect GitHub Repository (Recommended)
1. Push your code to a GitHub repository
2. Log in to your Vercel account
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click "Deploy"

### Option 2: Deploy Using Vercel CLI
1. Install Vercel CLI globally:
   ```
   npm install -g vercel
   ```
2. Log in to your Vercel account:
   ```
   vercel login
   ```
3. Deploy the project:
   ```
   vercel
   ```
4. Follow the prompts to configure your project

## Environment Variables
If you're using environment variables for Firebase configuration, make sure to add them in your Vercel project settings:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Navigate to the "Domains" section
3. Add your custom domain
4. Follow the DNS configuration instructions

## Redeployment
Vercel automatically redeploys your application when you push changes to your connected Git repository.