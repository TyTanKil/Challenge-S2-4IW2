const Shippo = require('shippo');

const shippo = Shippo('shippo_test_88ff84a020ef24e069a7922f0e77f24720e221f6');

async function run() {
    const result = await shippo.addresses.list();

    // Handle the result
    console.log(result);
}

run();