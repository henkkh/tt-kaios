import React from 'react';
// import './App.css';

const APIURL = "https://teletekst-data.nos.nl/json?p=";


export interface TeleTekstObject {
  prevPage: string;
  nextPage: string;
  prevSubPage: string;
  nextSubPage: string;
  fastTextLinks: {
    title: string;
    page: string;
  }[];
  content: string;
}

export const getTeletekstPage = async ( pageNumber:number)  => {
  const res = await fetch(`${APIURL}${pageNumber}`);
  return res.json();
};



const App: React.FC = () => {

  const [pageData, setPageData] = React.useState<TeleTekstObject>({
    prevPage: "string",
    nextPage: "string",
    prevSubPage: "string",
    nextSubPage: "string",
    fastTextLinks: [],
    content: "loading ... "
  });
  React.useEffect(
    () => {
  
      getTeletekstPage(100).then( (pd) => {
        setPageData(pd );
      }).catch( (err) => {
        console.log( err);

      });
  
    }, []
  );
  
  
  return (
    <pre id="content" className="App" dangerouslySetInnerHTML={{__html:pageData.content}}/>
    );
}

export default App;
