import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import {Provider} from "react-redux";
import { setupStore } from './Providers/StoreProvider/store';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </BrowserRouter>
    </Provider>

)
