# Deployment Protocol

## 1. Source Control Initialization

Establish the remote repository.

1.  Log in to GitHub and create a new public repository.
2.  Push the local code:
    ```bash
    git remote add origin https://github.com/<YOUR_USERNAME>/srivatsa-log.git
    git branch -M main
    git push -u origin main
    ```

## 2. Cloudflare Pages Configuration

1.  Log in to Cloudflare Dashboard.
2.  Navigate to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
3.  Select the repository.
4.  Configure Build Settings:
    *   **Framework Preset**: Astro
    *   **Build Command**: `npm run build`
    *   **Build Output Directory**: `dist`
5.  Save and Deploy.

## 3. Post-Deployment Verification

*   **DNS**: Configure custom domain in Cloudflare Project Settings.
*   **Analytics**: Verify PostHog event capture if configured.
*   **Uplink**: Validate share functionality on the live URL.
