# Portfolio Website

This is a modern portfolio website built using Next.js. The website showcases the portfolio owner's skills, projects, and background in a clean and responsive design.

## What's in it

- One page covering work at Duluin and GenTech AI, projects, background and contact
- Interactive schematics of the systems built at Duluin, drawn from the data in `data/work.js`
- Project pages generated from `data/projects.js`
- Light and dark themes, following the system setting until toggled

## Technologies Used

- Next.js 16 (pages router) and React 19
- Motion for animation, Lenis for smooth scrolling
- Plus Jakarta Sans and JetBrains Mono via `next/font`
- CSS Modules

### Bundler

`next build` uses Turbopack. `next dev` runs with `--webpack` for now, because Next.js 16.4.0's Turbopack dev server leaves page modules out of Pages Router client chunks, so pages fail to hydrate ([vercel/next.js#99789](https://github.com/vercel/next.js/issues/99789)). Once a fixed release is out, upgrade and drop `--webpack` from the `dev` script.

## Getting Started

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd portfolio-website
   ```

3. **Install dependencies**

   ```bash
   yarn install
   ```

4. **Run the development server**

   ```bash
   yarn dev
   ```

5. **Open your browser and visit**
   ```
   http://localhost:3000
   ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
