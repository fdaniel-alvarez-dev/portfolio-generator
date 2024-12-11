import React, { useState } from 'react';
import { Layout, Palette, Code, Save } from 'lucide-react';

// Definir interfaces para TypeScript
interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
}

interface FormData {
  name: string;
  title: string;
  description: string;
  skills: string;
  projects: Project[];
}

const PortfolioGenerator: React.FC = () => {
  // El resto del código del componente permanece igual
  ...
}

export default PortfolioGenerator;