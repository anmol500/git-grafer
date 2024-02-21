const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const FILE_PATH = "./data.json";

// Change this part to use dynamic import
let random;

import("random").then((module) => {
    random = module.default;

    // Call makeCommit or any other function that depends on random here
    makeCommit(400); // For example
});

const makeCommit = n => {
    if (n === 0) return simpleGit().push();
    const x = random.int(0, 54);
    const y = random.int(4, 7);
    const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'd').format();

    const data = {
        date: DATE
    };
    console.log(DATE);
    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE}, makeCommit.bind(this, --n));
    });
};
