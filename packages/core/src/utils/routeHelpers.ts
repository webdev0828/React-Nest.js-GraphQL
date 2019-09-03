import Router from 'src/route/Router';
import { QueryParams, RouteAction } from '../route/actions';

export const getQueryParam = (param, props) => {
  return props.route.query[param];
};

export interface IActionQueryProps {
  param: QueryParams;
  action: RouteAction;
}

export const getVisibilityFromURL = (
  { param, action }: IActionQueryProps,
  props,
) => {
  return getQueryParam(param, props) === action;
};

export const redirectTo = route => {
  Router.pushRoute(route);
};
