# Adding New Projects

This directory contains all the individual project components that will be showcased in the platform.

## Project Structure

Each project should be in its own directory with the following structure:

```
projects/
  ├── project-name/
  │   ├── index.tsx        # Main project component
  │   ├── components/      # Project-specific components
  │   ├── styles/          # Project-specific styles (if needed)
  │   └── README.md        # Project documentation
```

## Adding a New Project

1. Create a new directory in the `projects` folder with your project name
2. Create an `index.tsx` file that exports your main project component
3. Add your project metadata to the `PROJECTS` array in `src/data/projects.ts`
4. Add any project-specific components and styles in their respective folders
5. Document your project in the README.md file

## Project Metadata

When adding a new project to `projects.ts`, include the following information:

```typescript
{
  id: 'unique-project-id',
  title: 'Project Title',
  description: 'Brief project description',
  tags: ['React', 'TypeScript', 'TailwindCSS'],
  image: 'URL to project preview image'
}
```

## Best Practices

1. Keep projects self-contained
2. Use TypeScript for type safety
3. Follow the existing project structure
4. Include proper documentation
5. Optimize images and assets
6. Test thoroughly before adding