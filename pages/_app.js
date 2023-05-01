import '@/styles/globals.css'

//Internal Import
import { VotingProvider } from '@/context/Voter';
import  NavBar  from "../components/NavBar/NavBar";



const App = ({ Component, pageProps }) => (
  <VotingProvider>
  <div>
  <NavBar />
    <div>
    <Component {...pageProps}/>
  </div>
  </div>
  </VotingProvider>
);

export default App;