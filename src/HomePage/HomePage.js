import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function HomePage() {
  const chartRef = useRef(null); 

  useEffect(() => {
    const dataSource = {
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
          ]
        }
      ],
      labels: []
    };

    function getBudget() {
      axios.get('/budget')
        .then(function (res) {
          for (var i = 0; i < res.data.myBudget.length; i++) {
            dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
            dataSource.labels[i] = res.data.myBudget[i].title;
          }
          createChart(); 
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function createChart() {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: dataSource,
      });
    }

    getBudget();
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
    </div>
</main>
  );
}

export default HomePage;
