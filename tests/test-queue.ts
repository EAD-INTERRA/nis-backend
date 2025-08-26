import { Queue } from 'bullmq';

const queue = new Queue('crm-sync-central-db', {
  connection: {
    host: 'localhost', // or 'host.docker.internal' if running inside Docker
    port: 6379,        // default Redis port
  },
});

async function addTestJob() {
  await queue.add('test-job', {
    action: 'create',
    model: 'account',
    payload: {
      id_c: 'test123',
      // ...other fields required by CreateAccountDto
    }
  });
  console.log('Test job added!');
}

addTestJob();