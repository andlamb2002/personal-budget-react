import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';

function HomePage() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 
  const d3ChartRef = useRef(null);

  useEffect(() => {
    const getBudget = async () => {
      try {
        const response = await axios.get('/api/budget');
        const budget = response.data.myBudget;

        const dataSource = {
          datasets: [
            {
              data: budget.map(item => item.budget),
              backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
              ]
            }
          ],
          labels: budget.map(item => item.title)
        };

        createChart(dataSource);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const createChart = (dataSource) => {
      const ctx = chartRef.current.getContext('2d');
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: dataSource,
      });
    };


    getBudget();
  }, []);

  useEffect(() => {
    const getBudgetData = async () => {
      try {
        const response = await axios.get('/api/budgetData');
        const budgetData = response.data.myBudget;

        const dataSource = {
          datasets: [
            {
              data: budgetData.map(item => item.budget),
              backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#4caf50',
                '#9c27b0',
                '#ff1744',
              ]
            }
          ],
          labels: budgetData.map(item => item.title)
        };

        createD3Chart(dataSource);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const createD3Chart = (dataSource) => {
      d3.select(d3ChartRef.current).selectAll('*').remove();
      const width = 400;
      const height = 400;
    
      const svg = d3.select(d3ChartRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal()
        .domain(dataSource.labels)
        .range(dataSource.datasets[0].backgroundColor); 
    
      const pie = d3.pie()
        .value(d => d); 
    
      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    
      const arcs = svg.selectAll('arc')
        .data(pie(dataSource.datasets[0].data)) 
        .enter()
        .append('g')
        .attr('class', 'arc')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
      arcs.append('path')
        .attr('fill', (d, i) => color(dataSource.labels[i])) // Access color based on label index
        .attr('d', arc);
    
        arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '-0.5em')
        .attr('text-anchor', 'end')
        .text(d => `${dataSource.labels[d.index]}: ${d.data}`);
    };

    

    getBudgetData();
  }, []);

  return (
    <main className="center" id="main" role="main"> 

    <div className="page-area">

        <article>
            <h1>Stay on track</h1>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data... and this
                app will help you with that!
            </p>
        </article>

        <article>
            <h1>Alerts</h1>
            <p>
                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
            </p>
        </article>

        <article>
            <h1>Results</h1>
            <p>
                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                Also, they to live happier lives... since they expend without guilt or fear... 
                because they know it is all good and accounted for.
            </p>
        </article>

        <article>
            <h1>Free</h1>
            <p>
                This app is free!!! And you are the only one holding your data!
            </p>
        </article>

        <article>
            <h1>Stay on track</h1>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data... and this
                app will help you with that!
            </p>
        </article>

        <article>
            <h1>Alerts</h1>
            <p>
                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
            </p>
        </article>

        <article>
            <h1>Results</h1>
            <p>
                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                Also, they to live happier lives... since they expend without guilt or fear... 
                because they know it is all good and accounted for.
            </p>
        </article>

        <article>
          <h1>Chart</h1>
          <figure> 
            <canvas ref={chartRef} width="400" height="400" alt="Budget Chart" role="img"></canvas> 
          </figure>
        </article> 

        <article>
          <h1>D3 Chart</h1>
          <figure> 
            <div ref={d3ChartRef}></div>
          </figure>
        </article> 
    </div>
</main>
  );
}

export default HomePage;
