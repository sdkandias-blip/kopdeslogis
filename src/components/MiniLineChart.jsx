import React from 'react';
import Chart from 'react-apexcharts';

const MiniLineChart = ({ data = [], categories = [], color = '#1f6c3a', showDots = true, reorderPoint = null, label = '' }) => {
  const options = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
      fontFamily: 'inherit',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      parentHeightOffset: 0
    },
    colors: [color],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.0,
        stops: [0, 100]
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 2.5
    },
    grid: {
      show: false,
      padding: { top: 10, bottom: 0, left: 10, right: 10 }
    },
    xaxis: {
      categories: categories.length ? categories : data.map((_, i) => i + 1),
      labels: {
        show: categories.length > 0,
        style: { colors: '#6b7280', fontSize: '10px', fontWeight: 500 },
        offsetY: -5
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      crosshairs: {
        show: true,
        position: 'back',
        stroke: { color: 'rgba(255,255,255,0.1)', width: 1, dashArray: 3 }
      }
    },
    yaxis: {
      show: false,
      min: Math.min(...data) * 0.8,
      max: Math.max(...data) * 1.1,
    },
    markers: {
      size: showDots ? 4 : 0,
      colors: ['#fff'],
      strokeColors: color,
      strokeWidth: 2,
      hover: { size: 6 }
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val) => val.toFixed(1) + ' Ton' },
      marker: { show: false },
      x: { show: false }
    },
    annotations: {
      yaxis: reorderPoint != null ? [
        {
          y: reorderPoint,
          borderColor: '#ba1a1a',
          strokeDashArray: 4,
          label: {
            borderColor: 'transparent',
            style: { color: '#ef4444', background: 'transparent', fontSize: '10px', fontWeight: 600 },
            text: 'Reorder Point',
            position: 'left',
            offsetX: 10
          }
        }
      ] : []
    }
  };

  const series = [{
    name: label.charAt(0).toUpperCase() + label.slice(1),
    data: data
  }];

  return (
    <div className="w-full h-full apexcharts-dark-theme-fix relative" style={{ minHeight: '120px' }}>
      <Chart options={options} series={series} type="area" width="100%" height="100%" />
    </div>
  );
};

export default MiniLineChart;
