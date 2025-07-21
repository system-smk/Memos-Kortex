// Configuration des particules
particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    color: { value: "#00eaff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#00eaff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      out_mode: "bounce"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: false }
    },
    modes: {
      repulse: { distance: 100 }
    }
  }
});
