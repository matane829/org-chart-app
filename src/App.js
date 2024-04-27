import React from 'react';
import './index.css';
import { OrgChartComponent } from './components/OrgChart';

function App() {
const [data, setData] = React.useState([
  {"id": 1, "parentId": null, "name": "CEO", "position": "Chief Executive Officer", "department": "Executive"},
  {"id": 2, "parentId": 1, "name": "CTO", "position": "Chief Technology Officer", "department": "Executive"},
  {"id": 3, "parentId": 1, "name": "CFO", "position": "Chief Financial Officer", "department": "Executive"},
  {"id": 4, "parentId": 1, "name": "COO", "position": "Chief Operating Officer", "department": "Executive"},
  {"id": 5, "parentId": 2, "name": "Engineering Manager", "position": "Engineering Manager", "department": "Engineering"},
  {"id": 6, "parentId": 2, "name": "Software Engineer", "position": "Software Engineer", "department": "Engineering"},
  {"id": 7, "parentId": 2, "name": "Quality Assurance Engineer", "position": "Quality Assurance Engineer", "department": "Engineering"},
  {"id": 8, "parentId": 3, "name": "Finance Manager", "position": "Finance Manager", "department": "Finance"},
  {"id": 9, "parentId": 3, "name": "Accountant", "position": "Accountant", "department": "Finance"},
  {"id": 10, "parentId": 3, "name": "Financial Analyst", "position": "Financial Analyst", "department": "Finance"},
  {"id": 11, "parentId": 4, "name": "Operations Manager", "position": "Operations Manager", "department": "Operations"},
  {"id": 12, "parentId": 4, "name": "Administrative Assistant", "position": "Administrative Assistant", "department": "Operations"},
  {"id": 13, "parentId": 4, "name": "Human Resources Manager", "position": "Human Resources Manager", "department": "Human Resources"}
]);

  return (
    <div className="App">
      <OrgChartComponent
        data={data}
        setData={data => setData(data)}
      />
    </div>
  );
}

export default App;
