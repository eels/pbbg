import * as seederFunctions from 'seeds';

async function executeSeederFunctions() {
  for (const seederFunction of Object.values(seederFunctions)) {
    await seederFunction();
  }
}

executeSeederFunctions();
