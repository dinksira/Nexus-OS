# Nexus OS

A cutting-edge, cyberpunk-inspired personal dashboard built with Next.js, React, and Tailwind CSS. Experience the future of personal productivity with this stunning glass-morphism interface.

## 🌐 Live Demo

**👉 [Experience Nexus OS Live](https://nexus-elzmc767s-dinksiras-projects.vercel.app/)**

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Site-green?style=for-the-badge&logo=vercel)](https://nexus-elzmc767s-dinksiras-projects.vercel.app/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](https://nexus-elzmc767s-dinksiras-projects.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nexus-elzmc767s-dinksiras-projects.vercel.app/)

## ✨ Features

### 🎨 **Visual Design**
- **Cyber-Glass Morphism** - Advanced glass effects with backdrop blur
- **Holographic Glows** - Neon pink, blue, and mint accent shadows
- **Dark Futuristic Theme** - Perfect for developers and tech enthusiasts
- **Smooth Animations** - Floating particles and transition effects
- **Responsive Design** - Works perfectly on all devices

### 🛠️ **Functional Widgets**
- **Smart Task Manager** - AI-prioritized tasks with progress tracking
- **Crypto Command Center** - Real-time cryptocurrency price tracking
- **Health & Wellness Tracker** - Biometric monitoring with visual charts
- **Media Fusion Player** - Integrated music and audio controls
- **System Status Monitor** - Real-time performance metrics

### 🎯 **Interactive Elements**
- **Collapsible Sidebar** - Auto-expands on hover, manual toggle
- **Voice Command Ready** - AI assistant integration prepared
- **Drag & Drop Interface** - Widget rearrangement capability
- **Keyboard Shortcuts** - Efficient navigation controls
- **Real-time Updates** - Live data across all widgets

## 🏗️ Tech Stack

### **Frontend**
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v3** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### **UI/UX**
- **Glass Morphism** - Advanced CSS backdrop filters
- **Custom Animations** - Keyframe-based effects
- **Responsive Grid** - CSS Grid and Flexbox layout
- **Icon System** - Material Symbols integration

### **State Management**
- **React Context API** - Global state management
- **useReducer Hook** - Complex state logic
- **Custom Hooks** - Reusable stateful logic

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/dinksira/nexus-os.git
cd nexus-os
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
nexus-os/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles and Tailwind
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Main dashboard page
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   │   ├── SideNavBar/  # Collapsible navigation
│   │   │   ├── TopNavBar/   # Header with search
│   │   │   └── Background/  # Animated background
│   │   ├── widgets/         # Dashboard widgets
│   │   │   ├── SmartTaskManager/
│   │   │   ├── CryptoCommandCenter/
│   │   │   ├── HealthWellnessTracker/
│   │   │   └── MediaFusionPlayer/
│   │   └── ui/              # Reusable UI components
│   │       ├── CyberGlassCard/
│   │       └── ProgressRing/
│   └── contexts/
│       └── AppContext.tsx   # Global state management
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Customization

### Colors and Themes
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  neon: {
    pink: '#FF00E5',    // Cyber pink
    blue: '#00BFFF',    // Electric blue
    mint: '#00FFC2'     // Matrix green
  }
}
```

### Adding New Widgets
1. Create component in `src/components/widgets/`
2. Import and add to `src/app/page.tsx`
3. Update state in `AppContext` if needed

### Modifying Layout
- **Sidebar**: `src/components/layout/SideNavBar/`
- **Header**: `src/components/layout/TopNavBar/`
- **Background**: `src/components/layout/Background/`

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v3 with JIT compiler for optimal performance.

### Next.js
Configured with App Router for modern React development.

### Fonts
- **Orbitron** - Futuristic headings
- **Inter** - Clean body text
- **Material Symbols** - Icon system

## 🚀 Deployment

This project is automatically deployed on Vercel. Every push to the main branch triggers a new deployment.

**Live Site**: [https://nexus-elzmc767s-dinksiras-projects.vercel.app/](https://nexus-elzmc767s-dinksiras-projects.vercel.app/)

### Deploy Your Own
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dinksira/nexus-os)

## 📱 Screenshots

*Visit the [live site](https://nexus-elzmc767s-dinksiras-projects.vercel.app/) to experience the full cyber-glass interface!*

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**Dink Sira**
- GitHub: [@dinksira](https://github.com/dinksira)
- Project: [Nexus OS](https://nexus-elzmc767s-dinksiras-projects.vercel.app/)

## 🙏 Acknowledgments

- Inspired by cyberpunk aesthetics and modern UI design trends
- Built with Next.js and Tailwind CSS
- Icons by Material Symbols
- Fonts: Orbitron and Inter

---

<div align="center">

**⭐ Don't forget to star this repository if you find it helpful!**

[![Star History Chart](https://api.star-history.com/svg?repos=dinksira/nexus-os&type=Date)](https://star-history.com/#dinksira/nexus-os&Date)

</div>
```

## 🎯 **Key Updates Made:**

1. **Added Live Demo section** at the very top with prominent badges
2. **Professional badges** for version, demo status, and tech stack
3. **Clear call-to-action** buttons and links
4. **Deployment section** with Vercel deploy button
5. **Enhanced author section** with your GitHub profile
6. **Star history chart** at the bottom for engagement
7. **Professional formatting** throughout
