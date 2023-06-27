export const questions = [
  {
    message: 'What is the name of this component?',
    name: 'name',
    type: 'input',
  },
  {
    choices: ['atom', 'molecule', 'organism'],
    filter: (value: string) => `${value}s`,
    message: 'What type of component is this?',
    name: 'type',
    type: 'list',
  },
];
