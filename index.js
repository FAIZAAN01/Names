import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const generateRandomDate = () => {
  const weeks = random.int(0, 54);
  const days = random.int(0, 6);
  return moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(weeks, "w")
    .add(days, "d")
    .format();
};

const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    const date = generateRandomDate();
    const data = { date };
    console.log(`Commit #${i + 1}: ${date}`);

    await jsonfile.writeFile(path, data);
    await git.add([path]);
    await git.commit(date, { "--date": date });
  }

  // Push all commits at the end
  await git.push();
  console.log(`${n} commits pushed successfully!`);
};

// Example: create 100 commits
makeCommits(100).catch(console.error);
