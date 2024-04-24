import React from 'react';
import { OrgChart } from 'd3-org-chart';

export const OrgChartComponent = ({ data }) => {
  const d3Container = React.useRef(null);
  let chart = new OrgChart();

  React.useLayoutEffect(() => {
    if (data && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 120)
        .nodeContent(({ data }) => `<div class="card"><h1>${data.id}</h1></div>`)
        .render();
    }
  }, [data, chart]);

  return (
    <div>
      Click node to trigger action in parent or &nbsp;
      <button onClick={() => chart.addNode({ "id": 11, "parentId": 1 })}>add node as root's child</button>
      <div className='container' ref={d3Container} />
    </div>
  );
};
