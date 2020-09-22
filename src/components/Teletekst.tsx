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

const getTeletekstPage = async (pageNumber: string) => {
  const res = await fetch(`${APIURL}${pageNumber}`);
  return res.json();
};







const Teletekst: React.FC<any> = (props) => {

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
      tto.content = tto.content.replace(/..xF...;/g, "&nbsp;");
      setPageData(tto);
    }).catch((err) => {
      console.log(err);
    });
  }


  
  React.useEffect(
    () => {
      let pageNumber = props.location.hash ? props.location.hash.substr(1) : 100;
      displayPage(pageNumber);

    }, [props] //run effect when props (pagenumber changes)
  );

  // Add event listeners
  React.useEffect(() => {
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
