import { createRoot } from 'react-dom/client';
import { Calculator } from './Calculator';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Calculator />);
