# apollo-link-react-native-firebase-perf

Firebase Performance Monitoring for Apollo GraphQL Client using Apollo Link

## Installing / Getting Started

```sh
npm install apollo-link-react-native-firebase-perf
```

### Prerequisites

* Apollo Link: ^1.2.14
* @react-native-firebase/app: ^7.2.1
* @react-native-firebase/perf: ^7.1.4
* react-native: ^0.62.2

```ts
// Add import for Apollo Link
import ApolloLink from 'apollo-link';

// Add import for @react-native-firebase
import perf from '@react-native-firebase/perf';

// Add the import for this library
import createFPMLink from 'apollo-link-react-native-firebase-perf';

// ...
ApolloLink.from([
  createFPMLink(perf, true /* debug: true/false for logging to console */),
  // ...
]);
```

## License

This project is licensed under the MIT License - see the
[license] file for details.
