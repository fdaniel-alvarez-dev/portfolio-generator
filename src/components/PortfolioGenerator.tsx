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

interface Template {
  name: string;
  colors: string[];
}

interface Templates {
  [key: string]: Template;
}

interface AIRecommendations {
  template: string;
  colors: string[];
}

export const PortfolioGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    title: '',
    description: '',
    skills: '',
    projects: []
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');

  // Templates predefinidos
  const templates: Templates = {
    modern: {
      name: 'Modern Minimal',
      colors: ['bg-gray-50', 'text-gray-900', 'bg-blue-600']
    },
    classic: {
      name: 'Classic Professional',
      colors: ['bg-white', 'text-gray-800', 'bg-green-600']
    },
    creative: {
      name: 'Creative Bold',
      colors: ['bg-purple-50', 'text-gray-900', 'bg-purple-600']
    }
  };

  // Simular ML para recomendaciones
  const getAIRecommendations = (data: FormData): AIRecommendations => {
    const recommendations: AIRecommendations = {
      template: data.title.toLowerCase().includes('developer') ? 'modern' : 'creative',
      colors: data.title.toLowerCase().includes('designer') ? 
        ['bg-purple-50', 'text-gray-900', 'bg-purple-600'] :
        ['bg-gray-50', 'text-gray-900', 'bg-blue-600']
    };
    return recommendations;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      { id: Date.now(), title: '', description: '', link: '' }
    ]);
  };

  const handleProjectChange = (id: number, field: keyof Project, value: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const handleGenerate = () => {
    const portfolioData = {
      ...formData,
      projects,
      template: selectedTemplate,
      generatedAt: new Date().toISOString()
    };

    // Guardar en localStorage
    localStorage.setItem('generatedPortfolio', JSON.stringify(portfolioData));

    // Obtener recomendaciones AI
    const recommendations = getAIRecommendations(formData);
    setSelectedTemplate(recommendations.template);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Smart Portfolio Generator</h1>
          <p className="text-gray-600">AI-assisted portfolio website generator for creatives</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Professional Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4">Projects</h2>
            {projects.map(project => (
              <div key={project.id} className="mb-4 p-4 border rounded-md">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                  className="w-full p-2 border rounded-md mb-2"
                />
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                  className="w-full p-2 border rounded-md mb-2"
                  rows={2}
                />
                <input
                  type="text"
                  placeholder="Project Link"
                  value={project.link}
                  onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            ))}
            <button
              onClick={handleAddProject}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors mt-2"
            >
              Add Project
            </button>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Template Selection</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(templates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTemplate(key)}
                  className={`p-4 border rounded-md text-left ${
                    selectedTemplate === key ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <h3 className="font-semibold">{template.name}</h3>
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors mt-4"
            >
              Generate Portfolio
            </button>

            {/* Preview Window */}
            <div className="mt-8 border rounded-md p-4">
              <h3 className="font-bold mb-2">Preview</h3>
              <div className={`${templates[selectedTemplate].colors[0]} p-4 rounded-md`}>
                <h1 className={`text-2xl font-bold ${templates[selectedTemplate].colors[1]}`}>
                  {formData.name || 'Your Name'}
                </h1>
                <p className="text-gray-600">{formData.title || 'Your Title'}</p>
                <p className="mt-2">{formData.description || 'Your description will appear here'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Portfolio Generator, Freddy Daniel Alvarez - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};