export interface IRouteDefinition {
  method: string;
  path: string;
  handler: string | symbol;
}
