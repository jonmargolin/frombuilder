import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>
    </QueryClientProvider>
);
