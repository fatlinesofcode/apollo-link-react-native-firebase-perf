import { ApolloLink } from 'apollo-link';
import * as firebase from 'firebase/app';
declare const createFPMLink: (perf: () => (firebase.performance.Performance | undefined), debug?: boolean) => ApolloLink;
export default createFPMLink;
