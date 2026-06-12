module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: "#48a873",
        "primary-dark": "#358059",
        "primary-subtle": "#eaf6f0",
        sidebar: "#0f1e14",
        "sidebar-hover": "#192e1f",
        "sidebar-active": "#1f3d29",
        "sidebar-text": "#7aab8e",
        "sidebar-border": "#1c3022",
        canvas: "#f5f7f5",
        "card-border": "#dce8e2",
        ink: "#141f18",
        "ink-light": "#4a6655",
        "ink-muted": "#7a9484",
      }
    }
  },
  plugins: []
}
