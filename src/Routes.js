import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import Home from './components/pages/Home'
import Project from './components/templates/Project'
import NotFound from './components/pages/NotFound'
import projects from './data/projects.json'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    {projects.map(project => (
      <Route
        key={project.slug}
        path={`/${project.slug}`}
        render={(props) =>
          <Project
            {...props}
            project={project} />
        }
      />
    ))}
    <Route component={NotFound} />
  </Switch>
)

export default Routes
