# Operational Manual // Srivatsa.LOG

## 1. Managing Blogs
All blog posts are stored in `src/content/blog/`.

### Adding a New Post
1. Create a new `.mdx` file in `src/content/blog/` (e.g., `new-system-architecture.mdx`).
2. Use the following frontmatter schema:
   ```markdown
   ---
   title: "System title"
   description: "Brief operational summary."
   pubDate: 2026-05-20
   author: "Srivatsa RV"
   tags: ["Architecture", "DevOps"]
   image: "" # Optional
   classification: "UNCLASSIFIED" # or "RESTRICTED", "EYES ONLY"
   ---
   
   Your content here...
   ```

### Embeds & Media
- **Images**: Place images in `public/images/`. Reference them as `![Alt Text](/images/filename.jpg)`.
- **Datawrapper/Iframes**: You can use standard HTML in MDX files.
  ```html
  <iframe title="Chart" src="..." class="w-full h-[400px] border border-hud-border"></iframe>
  ```

---

## 2. Managing Hobbies

### Karting Analytics
Data is driven by `src/data/karting.json`. To update the graph and stats:

1. Open `src/data/karting.json`.
2. Append a new session object to the list:
   ```json
   {
     "date": "2026-06-01",
     "track": "Pune Kartdome",
     "bestLap": 58.2,
     "laps": 15,
     "conditions": "Dry, Afternoon"
   }
   ```
   
**Note**: 
- **Track Time** is automatically calculated based on total `laps` (assuming avg 1 min/lap).
- **Graph** will automatically update to include the new point.

### Defense Journalism
To update the link or description, edit `src/pages/hobbies.astro`:
Search for the `hobbies` array and modify the `Defense Journalism` object.

---

## 3. Development & Deployment

### Mobile Optimization
- **Menu**: The mobile menu uses a fixed positioning strategy (`top-16`, `bottom-0`) to ensure full coverage without overlaying the header.
- **Theme**: It strictly follows the Light Theme (White Background) to match the landing page.
- **CTAs**: Hamburger menu is the primary navigation; Hero CTAs are secondary quick-links.

### Local Access
```bash
npm run dev
```
Open `http://localhost:4321`.

### Deployment
This system is configured for **Cloudflare Pages**.
1. Commit your changes:
   ```bash
   git add .
   git commit -m "update: added new blog log"
   ```
2. Push to main:
   ```bash
   git push origin main
   ```
3. Cloudflare will auto-build and deploy.
