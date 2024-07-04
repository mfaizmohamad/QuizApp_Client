import { useEffect} from "react";
import {  useLocation} from "react-router-dom";


function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return(
    <div></div>
  );
}

export default App;
