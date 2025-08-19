async function loadChart() {
  const ctx = document.getElementById('trendChart').getContext('2d');

  // Load JSON data
  const response = await fetch('data/analysis.json');
  const data = await response.json();

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.quarters,
      datasets: [
        {
          label: 'Revenue (₹ Cr)',
          data: data.revenue,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Profit (₹ Cr)',
          data: data.profit,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: false,
      animation: {
        duration: 1500,
        easing: 'easeOutQuart'
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "₹ Cr" }
        },
        x: {
          title: { display: true, text: "Quarter" }
        }
      }
    }
  });
}

// Only load chart when slide is visible
Reveal.on('slidechanged', (event) => {
  if (event.currentSlide.querySelector('#trendChart')) {
    if (!window.chartLoaded) {
      loadChart();
      window.chartLoaded = true;
    }
  }
});
