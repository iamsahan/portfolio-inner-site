import './App.css';
import Desktop from './components/os/Desktop';
import { SettingsProvider } from './hooks/useSettings';

function App() {
    return (
        <div className="App">
            <SettingsProvider>
                <Desktop />
            </SettingsProvider>
        </div>
    );
}

export default App;
