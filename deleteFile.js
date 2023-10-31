import simpleGit from 'simple-git';

// Replace with the path to your Git repository
const repoPath = 'https://github.com/tony464us2012/Shop-109';

// Replace 'file-to-delete' with the actual file you want to remove
const filePath = '/frontend/src/images';

const git = simpleGit(repoPath);

async function deleteFileFromHistory() {
  try {
    // Run Git command to remove the file from history
    await git.raw(['filter-branch', '--force', '--index-filter', `git rm --cached --ignore-unmatch ${filePath}`, '--prune-empty', '--tag-name-filter', 'cat', '--', '--all']);

    console.log(`File '${filePath}' removed from history.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

deleteFileFromHistory();