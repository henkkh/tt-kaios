import React from 'react';

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
  
      getTeletekstPage(101).then( (pd) => {
        let tto: TeleTekstObject = pd;
        tto.content = tto.content.replace(/..xF...;/g,"&nbsp;"); 
        setPageData( tto);
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
