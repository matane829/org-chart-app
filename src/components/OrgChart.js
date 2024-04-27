import React, { useMemo } from 'react';
import { OrgChart } from 'd3-org-chart';
import jsPDF from 'jspdf';

export const OrgChartComponent = ({ data }) => {
  const d3Container = React.useRef(null);
  const chart = useMemo(() => new OrgChart(), []);

  const [ compact, setCompact ] = React.useState(false);
  const [ expandAll, setExpandAll ] = React.useState();
  const exportChart = {
    'Screen': () => chart.exportImg(),
    'PNG': () => chart.exportImg({ full: true }),
    'SVG': () => chart.exportSvg(),
    'PDF': () => downloadPdf()
  }

  React.useLayoutEffect(() => {
    if (data && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 120)
        .compact(compact)
        // the html for the card itself for the chart
        .nodeContent(({ data }) => `<div class="card" style='background-color: maroon;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center'><h1>${data.id}</h1></div>
        <button onclick="highlightToRoot('${data.id}')">Highlight to root</button>`)
        .render().fit();

        if(expandAll)
          chart.expandAll(true).render().fit();
        else if(expandAll === false)
          chart.collapseAll(true).render().fit();
      
  }
}, [data, chart, compact, expandAll]);

// highlighting to root
window.highlightToRoot = id => chart.clearHighlighting().setUpToTheRootHighlighted(id).render().fit();

  
  function filterChart(e) {
    // Get input value
    const value = e.target.value;

    // Clear previous higlighting
    chart.clearHighlighting().collapseAll();

    // Mark all previously expanded nodes for collapse
    // chartData.forEach((d) => (d._expanded = false));

    // Get chart nodes
    const chartData = chart.data();

    // Loop over data and check if input value matches any name
    chartData.forEach((d) => {
      if (value !== '' && d.name !== undefined && d.name.toLowerCase().includes(value.toLowerCase())) {
        // If matches, mark node as highlighted
        d._highlighted = true;
        d._expanded = true;
      }
    });

    // Update data and rerender graph
    chart.data(chartData).render().fit();

    console.log('filtering chart', value);
  }


  function downloadPdf() {
    chart.exportImg({
      save: false,
      full: true,
      onLoad: (base64) => {
        var pdf = new jsPDF();
        var img = new Image();
        img.src = base64;
        img.onload = function () {
          pdf.addImage(
            img,
            'JPEG',
            5,
            5,
            595 / 3,
            ((img.height / img.width) * 595) / 3
          );
          pdf.save('chart.pdf');
        };
      },
    });
  };

  const handleExport = () => {
    const selectedExportOption = document.getElementById('export').value;
    if (selectedExportOption && exportChart[selectedExportOption]) {
      exportChart[selectedExportOption]();
    }
  };
  
  return (
    <div>
      <button onClick={() => setCompact(!compact)}>{compact ? "Horizontial" : "Compact"}</button>
      <span>
        <label htmlFor="export">Export </label>
        <select name="export" id="export">
          {Object.keys(exportChart).map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <button onClick={handleExport}>↓</button>
      </span>
      <button onClick={() => {setExpandAll(!expandAll)}}>{expandAll ? "collapseAll" : "expandAll"}</button>
      <input type="search" placeholder="search by name" onInput={filterChart}/>
      
      <button onClick={() => chart.addNode({ "id": 14, "parentId": 1 })}>add node</button>
      <div className='container' ref={d3Container} />
    </div>
  );
};
