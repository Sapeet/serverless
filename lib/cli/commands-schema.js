/**
 * Serverless Framework Default Command Schema.
 * In earlier versions of the Framework, there were multiple schemas
 * for providers and being in or outside of a Service.
 * In V.4 we have a single schema for all commands, since
 * we only support the AWS provider.
 */

'use strict';

const globalOptions = require('./commands-options-schema');

const commands = (module.exports = new Map());

commands.commonOptions = globalOptions;

commands.set('', {
  usage: 'Interactive Quickstart',
  serviceDependencyMode: 'optional',
  hasAwsExtension: true,
  options: {
    'help-interactive': {
      usage: 'Show this message',
      type: 'boolean',
    },
    'name': {
      type: 'string',
      usage: 'Name for the service.',
    },
    'template': {
      type: 'string',
      usage: 'Name of template for the service.',
    },
    'template-path': {
      type: 'string',
      usage: 'Template local path for the service.',
    },
    'template-url': {
      type: 'string',
      usage: 'Template url for the service.',
    },
    'function': {
      usage: 'Name of the function you would like the dev mode activity feed to observe.',
      type: 'string',
      shortcut: 'f',
    },
  },
  lifecycleEvents: ['initializeService', 'setupAws', 'autoUpdate', 'end'],
});

commands.set('config credentials', {
  usage: 'Configures a new provider profile for the Serverless Framework',
  hasAwsExtension: true,
  options: {
    provider: {
      type: 'string',
      usage: 'Name of the provider. Supported providers: aws',
      required: true,
      shortcut: 'p',
    },
    key: {
      type: 'string',
      usage: 'Access key for the provider',
      shortcut: 'k',
      required: true,
    },
    secret: {
      type: 'string',
      usage: 'Secret key for the provider',
      shortcut: 's',
      required: true,
    },
    profile: {
      type: 'string',
      usage: 'Name of the profile you wish to create. Defaults to "default"',
      shortcut: 'n',
    },
    overwrite: {
      usage: 'Overwrite the existing profile configuration in the credentials file',
      shortcut: 'o',
      type: 'boolean',
    },
  },
  lifecycleEvents: ['config'],
});

commands.set('config', {
  usage: 'Configure Serverless',
  options: {
    autoupdate: {
      usage: 'Turn on auto update mechanism (turn off via "--no-autoupdate")',
      type: 'boolean',
    },
  },
  lifecycleEvents: ['config'],
});

commands.set('plugin install', {
  usage: 'Install and add a plugin to your service',
  options: {
    name: {
      type: 'string',
      usage: 'The plugin name',
      required: true,
      shortcut: 'n',
    },
  },
  lifecycleEvents: ['install'],
  serviceDependencyMode: 'required',
});

commands.set('plugin uninstall', {
  usage: 'Uninstall and remove a plugin from your service',
  options: {
    name: {
      type: 'string',
      usage: 'The plugin name',
      required: true,
      shortcut: 'n',
    },
  },
  lifecycleEvents: ['uninstall'],
  serviceDependencyMode: 'required',
});

commands.set('print', {
  usage: 'Print your compiled and resolved config file',
  hasAwsExtension: true,
  options: {
    format: {
      type: 'string',
      usage: 'Print configuration in given format ("yaml", "json", "text"). Default: yaml',
    },
    path: {
      type: 'string',
      usage: 'Optional period-separated path to print a sub-value (eg: "provider.name")',
    },
    transform: {
      type: 'string',
      usage: 'Optional transform-function to apply to the value ("keys")',
    },
  },
  lifecycleEvents: ['print'],
  serviceDependencyMode: 'required',
});

commands.set('package', {
  usage: 'Packages a Serverless Service',
  hasAwsExtension: true,
  options: {
    'package': {
      type: 'string',
      usage: 'Output path for the package',
      shortcut: 'p',
    },
    'minify-template': {
      usage: 'Minify the AWS CloudFormation template for AWS packages',
      type: 'boolean',
    },
  },
  lifecycleEvents: [
    'cleanup',
    'initialize',
    'setupProviderConfiguration',
    'createDeploymentArtifacts',
    'compileLayers',
    'compileFunctions',
    'compileEvents',
    'finalize',
  ],
  serviceDependencyMode: 'required',
});

commands.set('deploy', {
  groupName: 'main',
  usage: 'Deploy a Serverless service',
  options: {
    'conceal': {
      usage: 'Hide secrets from the output (e.g. API Gateway key values)',
      type: 'boolean',
    },
    'package': {
      type: 'string',
      usage: 'Path of the deployment package',
      shortcut: 'p',
    },
    'force': {
      usage: 'Forces a deployment to take place',
      type: 'boolean',
    },
    'aws-s3-accelerate': {
      usage: 'Enables S3 Transfer Acceleration making uploading artifacts much faster.',
      type: 'boolean',
    },
    'enforce-hash-update': {
      usage:
        'Enforces new function version by overriding descriptions across all your functions. To be used only when migrating to new hashing algorithm.',
      type: 'boolean',
    },
    'minify-template': {
      usage: 'Minify the CloudFormation template',
      type: 'boolean',
    },
  },
  lifecycleEvents: ['deploy', 'finalize'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('deploy function', {
  groupName: 'main',
  usage: 'Deploy a single function from the service',
  options: {
    'function': {
      type: 'string',
      usage: 'Name of the function',
      shortcut: 'f',
      required: true,
    },
    'force': {
      usage: 'Forces a deployment to take place',
      type: 'boolean',
    },
    'update-config': {
      usage: 'Updates function configuration, e.g. Timeout or Memory Size without deploying code',
      shortcut: 'u',
      type: 'boolean',
    },
  },
  lifecycleEvents: ['initialize', 'packageFunction', 'deploy'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('deploy list', {
  usage: 'List deployed version of your Serverless Service',
  options: {},
  lifecycleEvents: ['log'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('deploy list functions', {
  usage: 'List all the deployed functions and their versions',
  options: {},
  lifecycleEvents: ['log'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('info', {
  groupName: 'main',
  usage: 'Display information about the service',
  options: {
    conceal: {
      usage: 'Hide secrets from the output (e.g. API Gateway key values)',
      type: 'boolean',
    },
  },
  lifecycleEvents: ['info'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('invoke', {
  groupName: 'main',
  usage: 'Invoke a deployed function',
  options: {
    function: {
      type: 'string',
      usage: 'The function name',
      required: true,
      shortcut: 'f',
    },
    qualifier: {
      type: 'string',
      usage: 'Version number or alias to invoke',
      shortcut: 'q',
    },
    path: {
      type: 'string',
      usage: 'Path to JSON or YAML file holding input data',
      shortcut: 'p',
    },
    type: {
      type: 'string',
      usage: 'Type of invocation',
      shortcut: 't',
    },
    log: {
      usage: 'Trigger logging data output',
      shortcut: 'l',
      type: 'boolean',
    },
    data: {
      type: 'string',
      usage: 'Input data',
      shortcut: 'd',
    },
    raw: {
      usage: 'Flag to pass input data as a raw string',
      type: 'boolean',
    },
    context: {
      type: 'string',
      usage: 'Context of the service',
    },
    contextPath: {
      type: 'string',
      usage: 'Path to JSON or YAML file holding context data',
    },
  },
  lifecycleEvents: ['invoke'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('invoke local', {
  groupName: 'main',
  usage: 'Invoke function locally',
  options: {
    'function': {
      type: 'string',
      usage: 'Name of the function',
      shortcut: 'f',
      required: true,
    },
    'path': {
      type: 'string',
      usage: 'Path to JSON or YAML file holding input data',
      shortcut: 'p',
    },
    'data': {
      type: 'string',
      usage: 'input data',
      shortcut: 'd',
    },
    'raw': {
      usage: 'Flag to pass input data as a raw string',
      type: 'boolean',
    },
    'context': {
      type: 'string',
      usage: 'Context of the service',
    },
    'contextPath': {
      type: 'string',
      usage: 'Path to JSON or YAML file holding context data',
      shortcut: 'x',
    },
    'env': {
      usage: 'Override environment variables. e.g. --env VAR1=val1 --env VAR2=val2',
      shortcut: 'e',
      type: 'multiple',
    },
    'docker': {
      usage: 'Flag to turn on docker use for node/python/ruby/java',
      type: 'boolean',
    },
    'docker-arg': {
      type: 'string',
      usage: 'Arguments to docker run command. e.g. --docker-arg "-p 9229:9229"',
    },
  },
  lifecycleEvents: ['loadEnvVars', 'invoke'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('logs', {
  groupName: 'main',
  usage: 'Output the logs of a deployed function',
  options: {
    function: {
      type: 'string',
      usage: 'The function name',
      required: true,
      shortcut: 'f',
    },
    tail: {
      usage: 'Tail the log output',
      shortcut: 't',
      type: 'boolean',
    },
    startTime: {
      type: 'string',
      usage:
        'Logs before this time will not be displayed. Default: `10m` (last 10 minutes logs only)',
    },
    filter: {
      type: 'string',
      usage: 'A filter pattern',
    },
    interval: {
      type: 'string',
      usage: 'Tail polling interval in milliseconds. Default: `1000`',
      shortcut: 'i',
    },
  },
  lifecycleEvents: ['logs'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('metrics', {
  usage: 'Show metrics for a specific function',
  options: {
    function: {
      type: 'string',
      usage: 'The function name',
      shortcut: 'f',
    },
    startTime: {
      type: 'string',
      usage: 'Start time for the metrics retrieval (e.g. 1970-01-01)',
    },
    endTime: {
      type: 'string',
      usage: 'End time for the metrics retrieval (e.g. 1970-01-01)',
    },
  },
  lifecycleEvents: ['metrics'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('remove', {
  usage: 'Remove Serverless service and all resources',
  options: {},
  lifecycleEvents: ['remove'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('rollback', {
  usage: 'Rollback the Serverless service to a specific deployment',
  options: {
    timestamp: {
      type: 'string',
      usage: 'Timestamp of the deployment (list deployments with `serverless deploy list`)',
      shortcut: 't',
      required: false,
    },
  },
  lifecycleEvents: ['initialize', 'rollback'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('rollback function', {
  usage: 'Rollback the function to the previous version',
  options: {
    'function': {
      type: 'string',
      usage: 'Name of the function',
      shortcut: 'f',
      required: true,
    },
    'function-version': {
      type: 'string',
      usage: 'Version of the function',
      required: true,
    },
  },
  lifecycleEvents: ['rollback'],
  serviceDependencyMode: 'required',
  hasAwsExtension: true,
});

commands.set('test', {
  usage: 'Run HTTP tests',
  options: {
    function: {
      type: 'string',
      usage: 'Specify the function to test',
      shortcut: 'f',
    },
    test: {
      type: 'string',
      usage: 'Specify a specific test to run',
      shortcut: 't',
    },
  },
  lifecycleEvents: ['test'],
  hasAwsExtension: true,
  serviceDependencyMode: 'required',
});