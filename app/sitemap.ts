import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mini-project-3-d048b2o1w-lyhou-phivs-projects.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://mini-project-3-d048b2o1w-lyhou-phivs-projects.vercel.app/abouthttps://mini-project-3-d048b2o1w-lyhou-phivs-projects.vercel.app/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://mini-project-3-d048b2o1w-lyhou-phivs-projects.vercel.app/policy',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: '',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}