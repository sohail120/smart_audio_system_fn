import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import { appRoutes } from "./appRoutes";
import UploadFile from "../pages/UploadFile";
import ProcessingProgress from "../pages/ProcessingProgress";
import ResultsPage from "../pages/Result";

function AppRouting() {
  return (
    <Routes>
      <Route path={appRoutes.home} element={<Home />} />
      <Route path={`${appRoutes.processingProgress}/:id`} element={<ProcessingProgress />} />
      
      <Route path={appRoutes.uploadFile} element={<UploadFile />} />
      <Route path={`${appRoutes.result}/:id`} element={<ResultsPage />} />

      <Route path="/about" element={<About />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouting;
