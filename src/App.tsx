import { MotionConfig } from 'framer-motion';
import { Desktop } from './components/Desktop';

function App() {
  return <MotionConfig reducedMotion="user"><Desktop /></MotionConfig>;
}

export default App;
