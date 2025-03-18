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

  const [page, setPage] = React.useState<string>("100");
  
  let tto: TeleTekstObject;

  React.useEffect(
    () => {
      getTeletekstPage(page).then((pd:TeleTekstObject) => {
        tto = pd;
        tto.content = tto.content.replace(/href=\"#/g, "href=\"/?p=");
        document.getElementById("content")!!.innerHTML = tto.content;
      }).catch((err) => {
        console.log(err);
      });
  
    }, [page] 
  );

  // const params = new URLSearchParams(window.location.search);


  // Add event listeners
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    console.log(queryParams.get("p"));
    const urlPage = queryParams.get("p")?? "100";

    let enteredPage = 100;
    const downHandler= ( e:KeyboardEvent ) =>  {
      console.log( e.key);
      switch ( e.key) {
        case 'ArrowLeft':
          if ( tto.prevPage) setPage(tto.prevPage);
          return;
        case 'ArrowRight':
          if ( tto.nextPage) setPage(tto.nextPage);
          return;
        case 'ArrowDown':
          if ( tto.nextSubPage) setPage(tto.nextSubPage);
          return;
        case 'ArrowUp':
          if ( tto.prevSubPage) setPage(tto.prevSubPage);
          return;
      }
      if ( e.keyCode >= 48 && e.keyCode < 58 ) {
        if ( enteredPage > 99) enteredPage = 0;
        enteredPage = enteredPage * 10 + (e.keyCode - 48);
        return;
      }
      if ( e.keyCode === 13  ) {
        setPage( ""+enteredPage);
      }
      enteredPage = 0;
    }
    
    window.addEventListener('keydown', downHandler);
    //    // Check if we are in a client-side environment
    // if (typeof window !== 'undefined') {
    //     // Access the anchor using window.location.hash
    //     const anchor = window.location.hash;
    //     console.log('Anchor:', anchor);
    // }
    // Remove event listeners on cleanup
    setPage(urlPage);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount




  // <pre id="content" dangerouslySetInnerHTML={{ __html: pageData.content }}  />

  return (
    <pre id="content" > </pre>
  );
}

export default Teletekst;
