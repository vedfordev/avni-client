//-------------------------------------------------------------------------------------------------
// Create a singleton instance of the bugsnag client so we don't have to duplicate our configuration
// anywhere.
//-------------------------------------------------------------------------------------------------
// https://docs.bugsnag.com/platforms/react-native/#basic-configuration
import { Client, Configuration } from 'bugsnag-react-native';
const configuration = new Configuration();
configuration.autoNotify = false;
console.log("Creating new instance of Bugsnag");
const client = new Client(configuration);
//-------------------------------------------------------------------------------------------------
export default client;