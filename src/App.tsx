import StickerGrid from "./ImageGrid";
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
    <StickerGrid/>
  </>
);

export default App;