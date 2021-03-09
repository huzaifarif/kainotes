import * as Template from '../templates';
import * as Controllers from './controllers';

const routes = {
  '/': { template: Template.listNote, controller: Controllers.listNote },
  '/new': { template: Template.createNote, controller: Controllers.createNote },
};

const getRouteContent = pathName => routes[pathName] ? routes[pathName].template : `<span>404 Not Found</span>`;
const getRouteController = pathName => routes[pathName] ? routes[pathName].controller : null;

export default { getRouteContent, getRouteController };