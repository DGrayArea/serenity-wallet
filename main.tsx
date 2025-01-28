import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import { Buffer } from 'buffer';
import process from 'process';

window.Buffer = Buffer;
window.process = process;

import './index.css'
import { router } from './routes';
import { Toaster } from "@/components/ui/toaster"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
