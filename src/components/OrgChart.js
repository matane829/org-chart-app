import React, { useMemo } from 'react';
import { OrgChart } from 'd3-org-chart';
import jsPDF from 'jspdf';
import * as d3 from 'd3';

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

  React.useEffect(() => {
    if (!data || !d3Container.current)
      return;

    const style = `
    background-color: #748eff;
    border-radius: 40px;
    border: 1px solid #E4E2E9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
  `

    function handleNodeClick(e, d){
      chart.clearHighlighting().setHighlighted(d.data.id).render();;
    }

    chart
      .container(d3Container.current)
      .data(data)
      .nodeWidth(d => 300)
      .nodeHeight(d => 180)
      .compact(compact)
      .onNodeClick(d => handleNodeClick(this, d))
      // node draw style
      .nodeUpdate(function (d) {
        d3.select(this)
        .select('.node-rect')
        .attr("stroke", d => d.data._highlighted || d.data._upToTheRootHighlighted ? '#E27396' : 'none')
        .attr("stroke-width", d.data._highlighted || d.data._upToTheRootHighlighted ? 10 : 1)
        .attr('rx', 40)
      })
      // link draw style 
      .linkUpdate(function (d) {
        d3.select(this)
        .attr("stroke", d => d.data._upToTheRootHighlighted ? '#E27396' : '#E4E2E9')
        .attr("stroke-width", d => d.data._upToTheRootHighlighted ? 10 : 5)
        
        if (d.data._upToTheRootHighlighted) 
          d3.select(this).raise()
      })
      .nodeContent( ({ data }) => `
        <div className="card" style='${style}'>
          <div className="card-data">
            <h1>${data.id}</h1>
          </div>
          <div className="card-menu">
            <button onclick="handleAddNode(event, '${data.id}')">add node</button>
            <button onclick="handleRemoveNode(event, '${data.id}')">delete node</button>
            <button onclick="handleHighlightToRoot(event, '${data.id}')">highlight to root</button>
          </div>
        </div>
      `)
      .render().fit();

      if(expandAll)
        chart.expandAll(true).render().fit();
      else if(expandAll === false)
        chart.collapseAll(true).render().fit();
    

}, [data, chart, compact, expandAll]);

  // highlighting to root
  window.handleRemoveNode = (e, id) => {
    e.stopPropagation();
    chart.removeNode(id);
  }
  window.handleHighlightToRoot = (e, id) => {
    e.stopPropagation();
    chart.clearHighlighting().setUpToTheRootHighlighted(id).render().fit();
  };
  
  window.handleAddNode = (e, parentId) => {
    e.stopPropagation();
    // chart.addNode({ parentId, id}).setExpanded(id).setCentered(parentId).render();
  }


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
      <button onClick={() => chart.clearHighlighting()}>Clear</button>
      <button onClick={() => chart.zoomIn()}>+</button>
      <button onClick={() => chart.zoomOut()}>-</button>

      <div ref={d3Container} />
    </div>
  );
};
