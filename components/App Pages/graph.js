import ReactApexChart from 'react-apexcharts';

function MyChart({ data, label, title }) {
  const options = {
    series: [{
      name: label,
      data: data
    }],
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: title,
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: false
    },
    legend: {
      horizontalAlign: 'left'
    }
  };

  return <ReactApexChart options={options} series={options.series} type="area" height={350} />;
}

export default MyChart;