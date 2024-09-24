import StickerGrid from "./ImageGrid";
import './style.css'

const App: React.FC = () => (
  <>
    <div className="header">
      <h1 className="titleText">Who TF Did I Meet At</h1>
      <img
        className="portolaLogo"
        src="/images/pLogo.png"
        alt="portola logo"
      ></img>
    </div>
    <StickerGrid />
  </>
);

export default App;