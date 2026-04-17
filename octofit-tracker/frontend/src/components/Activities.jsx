import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const url = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
    console.log('Fetching from:', url);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        setData(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-4">Activities</h1>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>{item.type}</td>
              <td>{item.duration}</td>
              <td>{item.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activities;