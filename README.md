# Travel Destinations React App

A beautiful React frontend application that displays a curated list of travel destinations around the world. Built with React functional components, TypeScript, and styled with Tailwind CSS.

## Features

- 🌍 Display of 6 amazing travel destinations
- 📱 Responsive design (mobile, tablet, desktop)
- 🎨 Beautiful UI with Tailwind CSS styling
- ⚡ Fast and lightweight - no backend required
- 🔧 Built with modern React functional components
- 📍 Interactive icons and hover effects

## Travel Destinations Included

- **Santorini, Greece** - Stunning Greek island with white-washed buildings and blue-domed churches
- **Kyoto, Japan** - Ancient capital featuring thousands of temples and traditional architecture
- **Machu Picchu, Peru** - The legendary 'Lost City of the Incas' in the Andes Mountains
- **Bali, Indonesia** - Tropical paradise with lush rice terraces and pristine beaches
- **Iceland** - Land of fire and ice with dramatic waterfalls and Northern Lights
- **Marrakech, Morocco** - Vibrant city with bustling souks and rich cultural history

## Tech Stack

- **React 18** - Modern React with functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **shadcn/ui** - High-quality UI components

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/prathyushabathula/travel-planner-react.git
   cd travel-planner-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   The app will be running at `http://localhost:5173`

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Starts the development server with hot reload.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`
Builds the app for production to the `dist` folder.
The build is minified and optimized for best performance.

### `npm run preview`
Serves the production build locally for testing.

### `npm run lint`
Runs ESLint to check for code quality issues.

## Project Structure

```
travel-planner-react/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   └── ui/            # shadcn/ui components
│   ├── App.tsx            # Main application component
│   ├── App.css            # Global styles
│   ├── index.css          # Tailwind CSS imports
│   └── main.tsx           # Application entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## Customization

### Adding New Destinations

To add new travel destinations, edit the `travelDestinations` array in `src/App.tsx`:

```typescript
const travelDestinations: TravelDestination[] = [
  {
    id: 7,
    name: "Your Destination",
    location: "Country/Region",
    description: "Amazing description of your destination..."
  },
  // ... existing destinations
]
```

### Styling

The app uses Tailwind CSS for styling. You can customize:

- **Colors**: Modify the color scheme in `src/App.tsx`
- **Layout**: Adjust grid columns and spacing
- **Components**: Update shadcn/ui components in `src/components/ui/`

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to Static Hosting

The built files in the `dist` folder can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions to deploy from the `dist` folder
- **AWS S3**: Upload the `dist` folder contents to an S3 bucket

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/prathyushabathula/travel-planner-react/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer: [@prathyushabathula](https://github.com/prathyushabathula)

---

**Happy Traveling! 🌍✈️**

Built with ❤️ using React and Tailwind CSS
