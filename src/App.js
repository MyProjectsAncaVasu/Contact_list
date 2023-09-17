import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from './components';

import { NotFound, Home, Form } from './features';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />

        <Route path="/home" element={<Home />} />
        <Route path="/students_list/form" element={<Form />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
