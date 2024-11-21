import Header from "./components/Header";
import Card from "./components/Card";
import jobs from './data/data.json';

function App() {
  return (
    <>
      <div className="container">
      <div className="row">      
            <Header />  
          {jobs.map((job) => (
          <Card
            key={job.id}
            company={job.company}
            logo={job.logo}
            position={job.position}
            postedAt={job.postedAt}
            contract={job.contract}
            location={job.location}
          />
        ))}
        </div>
</div>
    </>
  );
}

export default App;
