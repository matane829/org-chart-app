import React from 'react';
import './index.css';
import { OrgChartComponent } from './components/OrgChart';

function App() {
  const [data, setData] = React.useState([
    {"id": 1, "parentId": null, "name": "CEO", "position": "Chief Executive Officer", "department": "Executive", "imageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150"},
    {"id": 2, "parentId": 1, "name": "CTO", "position": "Chief Technology Officer", "department": "Executive", "imageUrl": "https://images.unsplash.com/photo-1504198322255-cfa6b4c0d9e6?w=150&h=150"},
    {"id": 3, "parentId": 1, "name": "CFO", "position": "Chief Financial Officer", "department": "Executive", "imageUrl": "https://images.unsplash.com/photo-1518186285589-39eaeb71f92b?w=150&h=150"},
    {"id": 4, "parentId": 2, "name": "Engineering Manager", "position": "Engineering Manager", "department": "Engineering", "imageUrl": "https://images.unsplash.com/photo-1533089860897-1982c38e7750?w=150&h=150"},
    {"id": 5, "parentId": 2, "name": "Product Manager", "position": "Product Manager", "department": "Product Management", "imageUrl": "https://images.unsplash.com/photo-1525878703-18353d1ea5ee?w=150&h=150"},
    {"id": 6, "parentId": 3, "name": "Finance Manager", "position": "Finance Manager", "department": "Finance", "imageUrl": "https://images.unsplash.com/photo-1508106110456-6f0e9f43de31?w=150&h=150"},
    {"id": 7, "parentId": 3, "name": "Accountant", "position": "Accountant", "department": "Finance", "imageUrl": "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=150&h=150"},
    {"id": 8, "parentId": 4, "name": "Senior Engineer", "position": "Senior Engineer", "department": "Engineering", "imageUrl": "https://images.unsplash.com/photo-1510022890891-9c3c3ebb65b3?w=150&h=150"},
    {"id": 9, "parentId": 4, "name": "Software Engineer", "position": "Software Engineer", "department": "Engineering", "imageUrl": "https://images.unsplash.com/photo-1508163226959-49b48f17f2d8?w=150&h=150"},
    {"id": 10, "parentId": 5, "name": "Product Analyst", "position": "Product Analyst", "department": "Product Management", "imageUrl": "https://images.unsplash.com/photo-1533149710928-9bff5d40f782?w=150&h=150"},
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
