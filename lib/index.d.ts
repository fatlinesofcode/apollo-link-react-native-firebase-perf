import { ApolloLink } from 'apollo-link';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebasePerformanceTypes } from '@react-native-firebase/perf';
declare const createFPMLink: (perf: (ReactNativeFirebase.FirebaseModuleWithStatics<FirebasePerformanceTypes.Module, FirebasePerformanceTypes.Statics>), debug?: boolean) => ApolloLink;
export default createFPMLink;
