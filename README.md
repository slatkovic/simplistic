# simplistic
A simple Javascript-based dependency injection module

### Motivation

[Dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) leads to better component encapsulation, increases testability and promotes configurability. Components can expose clear interfaces, there's no need to override the NodeJS module resolution logic in unit tests and it's actually easy to write real unit tests.

### Features

- Supports pure components as components are not aware of the container
- Easily isolates system dependencies
- Caches dependencies
- Allows for dependency expansion using multiple dependency files (think universal apps)

### Example usage

```javascript

import containerFactory from 'simplistic';

const container = containerFactory();

var dependencies = {
  request: () => require('request'),
  
  apiClient: () => {
    const component = require('/some/api/client/implementation.js');
    return component(
      container.wire('request')
    );
  }

};

export default container.build(dependencies);

```



