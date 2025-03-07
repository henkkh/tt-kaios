import React from 'react';


const APIURL = "https://teletekst-data.nos.nl/json?p=";

const notFoundHtml = `<pre id="content" tabindex="10">                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
  Pagina niet gevonden...
  Ga terug naar de <a class="cyan" href="/?p=100">startpagina</a>
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
</pre>
`;

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

const getTeletekstPage = async (pageNumber: string) => {
  return await fetch(`${APIURL}${pageNumber}`).then( res => res.json())
  .catch( reason => ({"content": notFoundHtml }));
};







const Teletekst: React.FC<any> = () => {

  const [pageData, setPageData] = React.useState<TeleTekstObject>({
    prevPage: "",
    nextPage: "",
    prevSubPage: "",
    nextSubPage: "",
    fastTextLinks: [],
    content: "loading ... "
  });

  let tto: TeleTekstObject;


  const displayPage = (pageNumber:string) => {
    getTeletekstPage(pageNumber).then((pd) => {
      tto = pd;
      tto.content = tto.content.replace(/href=\"#/g, "href=\"/?p=");
      setPageData(tto);

    }).catch((err) => {
      console.log(err);
    });
  }




  React.useEffect(
    () => {

    }, [] 
  );

  const params = new URLSearchParams(window.location.search);


  // Add event listeners
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    console.log(queryParams.get("p"));
    displayPage(queryParams.get("p")?? "100");

    let enteredPage = 100;
    const downHandler= ( e:KeyboardEvent ) =>  {
      switch ( e.key) {
        case 'ArrowLeft':
          if ( tto.prevPage) displayPage(tto.prevPage);
          return;
        case 'ArrowRight':
          if ( tto.nextPage) displayPage(tto.nextPage);
          return;
        case 'ArrowDown':
          if ( tto.nextSubPage) displayPage(tto.nextSubPage);
          return;
        case 'ArrowUp':
          if ( tto.prevSubPage) displayPage(tto.prevSubPage);
          return;
      }
      if ( e.keyCode >= 48 && e.keyCode < 58 ) {
        if ( enteredPage > 99) enteredPage = 0;
        enteredPage = enteredPage * 10 + (e.keyCode - 48);
        return;
      }
      if ( e.keyCode === 13  ) {
        displayPage( ""+enteredPage);
      }
      enteredPage = 0;
    }
    
    window.addEventListener('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount





  return (
    <pre id="content" dangerouslySetInnerHTML={{ __html: pageData.content }}  />
  );
}

export default Teletekst;
