import React from 'react';
import {
  OperationVariables,
  Query as ApolloQuery,
  QueryProps,
} from 'react-apollo';
import { App } from 'src/components/App/App';
import { Action, IAction } from 'src/components/BuilderComponents/Action';
import { Class } from 'src/components/BuilderComponents/Class';
import Component from 'src/components/BuilderComponents/Component';
import { Event, IEvent } from 'src/components/BuilderComponents/Event';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { Container } from 'src/components/BuilderComponents/Layout/Container';
import { ModelT } from 'src/components/BuilderComponents/Model';
import { CSSTemplate } from 'src/components/BuilderComponents/Variant/CSSTemplate';
import {
  IWorkflow,
  Workflow,
} from 'src/components/BuilderComponents/Workflow/Workflow';
import { WorkflowTemplate } from 'src/components/BuilderComponents/Workflow/WorkflowTemplate';
import Element from 'src/components/Element/Element';
import { Field } from 'src/components/Field/Field';
import { Page } from 'src/components/Page/Page';
import { User } from 'src/components/User/User';
import { ModelList, Models } from 'src/graphql/modelTypes';
/**
 * Add extra props to Apollo Query
 */
type MyQueryProps<T> = {
  useLoader?: boolean;
};

/**
 * Use displayName for type
 */
class Query<
  TData = any,
  TVariables = OperationVariables
> extends React.Component<QueryProps<TData> & MyQueryProps<TData>, TVariables> {
  render() {
    const { query, variables, displayName, useLoader = false } = this.props;
    return (
      <ApolloQuery query={query} variables={variables}>
        {results => {
          const { data, loading, error } = results;
          if (loading) return useLoader ? 'Loading...' : null;
          if (error) return `Error! ${error.message}`;

          // Use factory to build up results
          switch (displayName) {
            case Models.User:
              const user = data.user ? new User(data.user) : null;
              results.data = { user };
              break;

            case Models.App:
              results.data = { app: new App(data.app) };
              break;

            case Models.Component:
              const component = new Component(data.component);
              results.data = { component };
              break;

            case Models.Element:
              // TODO: Why does it fire when opening selectVariant popover
              const elements = data.elements
                ? data.elements.map(element => new Element(element))
                : [];
              results.data = {
                elements,
              };
              break;

            case Models.WorkflowTemplate:
              results.data = {
                workflowTemplate: new WorkflowTemplate(data),
              };
              break;

            case ModelList.Components:
              const components = Component.mapComponents(data.components);
              results.data = { components };
              break;

            case ModelList.CSSTemplates:
              const cssTemplates = CSSTemplate.mapCssTemplates(
                data.cssTemplates,
              );
              results.data = { cssTemplates };
              break;

            case Models.Event:
              const events: Model<IEvent>[] = Event.mapEvents(data.events);
              results.data = {
                events,
              };
              break;

            case Models.Workflow:
              const workflows: Model<IWorkflow>[] = Workflow.mapWorkflows(
                data.workflows,
              );
              results.data = {
                workflows,
              };
              break;

            case Models.Models:
              results.data = {
                models: ModelT.mapModels(data.models),
              };
              break;

            case Models.Fields:
              results.data = {
                fields: Field.mapFields(data.fields),
              };
              break;

            case Models.Model:
              results.data = {
                model: new ModelT(data.model),
              };
              break;

            case Models.Content:
              results.data = {
                model: new ModelT(data.model),
              };
              break;

            case ModelList.CSSClasses:
              const cssClasses = Class.mapClasses(data.cssClasses);
              results.data = { cssClasses };
              break;

            case Models.Action:
              const actions: Model<IAction>[] = Action.mapActions(data.actions);
              results.data = {
                actions,
              };
              break;

            case Models.Container:
              const containers = Container.mapContainers(data.containers);
              results.data = {
                containers,
              };
              break;

            case Models.Pages:
              const pages = Page.mapPages(data.me.apps[0].pages);
              results.data = {
                pages,
              };
              break;

            case Models.Page:
              results.data = {
                page: data.page ? new Page(data.page) : null,
              };
              break;

            case Models.Global:
              const app = new App(data.app);
              results.data = { global: app.global };
              break;

            default:
              break;
          }

          if (!results.data) {
            return <h3> No data! </h3>;
          }

          return <>{this.props.children(results)}</>;
        }}
      </ApolloQuery>
    );
  }
}

export default Query;
