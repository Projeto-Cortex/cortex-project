module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: "#1f9d5b",
        "primary-dark": "#1a8a50",
        "primary-subtle": "#eef7f1",
        sidebar: "#0d1a12",
        "sidebar-hover": "#15261a",
        "sidebar-active": "#1c3325",
        "sidebar-text": "#93a59b",
        "sidebar-border": "#1a2e20",
        canvas: "#f6f8f6",
        "card-border": "#e6ebe7",
        ink: "#0f1b14",
        "ink-light": "#5b6b61",
        "ink-muted": "#8a978f",
      }
    }
  },
  plugins: []
}
