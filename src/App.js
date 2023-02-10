import React from "react";
import _ from 'lodash';

import logo from './logo.svg';
import './App.css';

function Election() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    let eventSource = new EventSource("http://localhost:9002/election-results");
    eventSource.onmessage = e => {
      updateElection(JSON.parse(e.data));
    }
  }, []);

  const updateElection = (election) => {
    setData([...election])
  }

  return (
    <div>
      {data.map((p) =>
        <div key={p.id}>
          <h1>Election {p.id}</h1>

          <div className="election">
            {_.orderBy(p.candidates, ['votes', 'fullName'], ['desc', 'asc']).map((c) =>
            <div key={c.id} className="card" data-id={c.id}>
              <div className="votes">{c.votes}</div>
              <div className="profile">
                <img src={c.photo} alt={c.fullName} className="thumbnail" width="180" height="180"/>
              </div>
              <h3 className="name">{c.fullName}</h3>
              <p className="title">{c.jobTitle}</p>
              <a className="description" href={"mailto:" + c.email} target="_blank" rel="noreferrer">{c.email}</a>
              { c.phone ? <a className="description" href={"tel:" + c.phone} target="_blank" rel="noreferrer">{c.phone}</a> : ''}
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div>
      <header>
        <img src={logo} alt="logo" />
      </header>
      <main>
        <Election />
      </main>
    </div>
  );
}

export default App;
