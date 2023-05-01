const data = {
  labels: ['high', 'moderate', 'low'],
  datasets: [{
    label: 'Voltmeter',
    data: [18, 12, 6],
    backgroundColor: [
      'rgba(255, 26, 104, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)'
    ],
    needleValue: 18, 
    borderColor: 'white',
    borderWidth: 1,
    cutout: '87%',
    circumference: 180,
    rotation: 270,
    borderRadius: 5
  }]
};

// gaugeNeedle block

const gaugeNeedle={
  id: 'gaugeNeedle',
  afterDatasetDraw(chart, args, options){
    const{ctx, config, data, chartArea:{top, bottom, left, right, 
      width, height}}=chart;

    ctx.save();
    console.log(data)
    const needleValue= data.datasets[0].needleValue;
    const dataTotal= data.datasets[0].data.reduce((a,b)=> a+b,0);
    const angle=Math.PI + (1 / dataTotal * needleValue * Math.PI);
   
    const cx=width/2;
    const cy=chart._metasets[0].data[0].y;
    console.log(chart._metasets[0].data[0].y);
    console.log(ctx.canvas.offsetTop);

    //needle
    ctx.translate(cx,cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0,-1);
    ctx.lineTo(height+ctx.canvas.offsetTop-100,0);
    ctx.lineTo(0,1);
    ctx.fillStyle="#444";
    ctx.fill();
    ctx.restore();

    //needle dot
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, 10);
    ctx.fill();
    ctx.restore();

    ctx.font='20px Helvetica';
    ctx.fillStyle='#444';
    ctx.fillText(needleValue+'%', cx, cy+20);
    ctx.textAlign='centre';
    ctx.restore();
  }
};

// config 
const config = {
  type: 'doughnut',
  data,
  options: {
    plugins:{
      legend:{
        display: false
      },
      tooltip:{
        yAlign: 'bottom',
        displayColors: false,
        callbacks:{
          labels: function(tooltipItem, data, value){
            const tracker= tooltipItem.dataset.needleValue;
            return 'Tracker Score: ${tracker}%';
          }
        }
      }
    }
  },
  plugins: [gaugeNeedle]   
};

// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

// Instantly assign Chart.js version
const chartVersion = document.getElementById('chartVersion');
chartVersion.innerText = Chart.version;


