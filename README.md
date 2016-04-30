# liberation:rest-jsend-error-handler

SimpleRest error middleware for converting thrown Meteor.Errors to JSON (according to JSend specification) and sending the response.
Based on [simple:rest-json-error-handler](https://github.com/stubailo/meteor-rest/tree/master/packages/rest-json-error-handler).

## Usage

Handle errors from all routes:

```js
JsonRoutes.ErrorMiddleware.use(RestMiddleware.handleErrorAsJsend);
```

Handle errors from one route:

```js
JsonRoutes.ErrorMiddleware.use(
  '/handle-error',
  RestMiddleware.handleErrorAsJsend
);
```

## Example

Response looks like:
```json
{
  "status": "error",
  "message": "Validation failed",
  "code": 400,
  "data": {
    "error": "validation-error",
    "reason": "Validation failed",
    "details": [
      {
        "name": "userId",
        "type": "invalid-value"
      }
    ]
  }
}
```
