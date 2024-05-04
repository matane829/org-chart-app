import React from 'react';
import './index.css';
import { OrgChartComponent } from './components/OrgChart';

function App() {
const [data, setData] = React.useState([
{'id': 'mahlaka first', 'parentId': null, 'level': 'mahlaka'},
{'id': 'first', 'parentId': 'mahlaka first', 'level': 'class'},
{'id': 'subfirst', 'parentId': 'first', 'level': 'subclass'},
{'id': 'subsubfirst', 'parentId': 'subfirst', 'level': 'subsubclass'},
{'id': 'subsubsecond', 'parentId': 'subfirst', 'level': 'subsubclass'},
{'id': 'subsecond', 'parentId': 'first', 'level': 'subclass'},
{'id': 'second', 'parentId': 'mahlaka first', 'level': 'class'},
{'id': 'subthird', 'parentId': 'second', 'level': 'subclass'},
{'id': 'subfourth', 'parentId': 'second', 'level': 'subclass'},
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
