import LazyImage from "./LazyImage";
import './style.css'

const App: React.FC = () => (
  <>
    <div className="header">
      <h1 className="titleText">Who The Fuck Did I Meet at</h1>
      <img 
        className="portolaLogo"
        src="/images/pLogo.png"
        alt="portola logo"
      ></img>
    </div>
    <LazyImage
      lqip="/images/lqip/andre-lqip.jpg"
      src="/images/andre.png"
      alt="andre"
      href="https://www.instagram.com/dre_yonce/"
    ></LazyImage>
  </>
);

export default App;