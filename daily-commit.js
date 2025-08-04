const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Configuration
const REPO_PATH = process.cwd(); // Uses current directory
const COMMIT_FILE = 'daily-activity.txt';

// AVII Pattern Configuration
// This creates a pattern that spells "AVII" across weeks
// Each letter is 5 rows tall and uses different commit intensities
const AVII_PATTERN = {
    // A pattern (5x4)
    A: [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1]
    ],
    // V pattern (5x4)
    V: [
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 0],
        [0, 0, 1, 0]
    ],
    // I pattern (5x3)
    I: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 1]
    ],
    // Second I pattern (5x3)
    I2: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 1]
    ]
};

// Function to get current week pattern intensity
function getPatternIntensity(date = new Date()) {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    const weekNumber = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    
    // Create a repeating pattern that cycles through A-V-I-I every 14 weeks
    const patternCycle = Math.floor(weekNumber / 14) % 1; // Repeat every 14 weeks
    const weekInCycle = weekNumber % 14;
    
    let pattern, colOffset;
    
    if (weekInCycle < 4) {
        // Letter A (weeks 0-3)
        pattern = AVII_PATTERN.A;
        colOffset = weekInCycle;
    } else if (weekInCycle < 8) {
        // Letter V (weeks 4-7)
        pattern = AVII_PATTERN.V;
        colOffset = weekInCycle - 4;
    } else if (weekInCycle < 11) {
        // First I (weeks 8-10)
        pattern = AVII_PATTERN.I;
        colOffset = weekInCycle - 8;
    } else {
        // Second I (weeks 11-13)
        pattern = AVII_PATTERN.I2;
        colOffset = weekInCycle - 11;
    }
    
    // Map Sunday-Saturday to array indices (Sunday = 0, Monday = 1, etc.)
    const rowIndex = dayOfWeek;
    
    if (rowIndex < pattern.length && colOffset < pattern[rowIndex].length) {
        return pattern[rowIndex][colOffset];
    }
    
    return 0; // Default to low activity
}

// Function to determine number of commits based on pattern
function getCommitCount(intensity) {
    const baseCommits = 3; // Minimum commits per day
    const patterns = {
        0: baseCommits,           // Low activity days
        1: baseCommits + 7        // High activity days (pattern days)
    };
    
    return patterns[intensity] || baseCommits;
}

// Function to generate random content
function generateRandomContent() {
    const activities = [
        'Learning new programming concepts',
        'Practicing coding challenges',
        'Working on personal projects',
        'Exploring new technologies',
        'Reading documentation',
        'Refactoring code',
        'Writing unit tests',
        'Updating project dependencies',
        'Improving code documentation',
        'Optimizing performance'
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const timestamp = new Date().toISOString();
    const randomNumber = Math.floor(Math.random() * 10000);
    
    return `Daily Activity Log - ${timestamp}
Activity: ${randomActivity}
Session ID: ${randomNumber}
Progress: Making consistent contributions to maintain coding habits.

Lines of thought:
${Math.floor(Math.random() * 100)} ideas explored today
${Math.floor(Math.random() * 50)} problems solved
${Math.floor(Math.random() * 20)} new concepts learned

Keep coding, keep growing! 🚀
`;
}

// Function to execute git commands
function executeGitCommand(command) {
    try {
        const result = execSync(command, { 
            cwd: REPO_PATH, 
            encoding: 'utf8',
            stdio: 'inherit'
        });
        return result;
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error.message);
        process.exit(1);
    }
}

// Function to check if git repo exists
function checkGitRepo() {
    try {
        execSync('git status', { cwd: REPO_PATH, stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

// Main function to make daily commit
function makeDailyCommit() {
    console.log('🤖 Starting todo daily commit process...');
    
    const intensity = getPatternIntensity(new Date());
    const commitCount = getCommitCount(intensity);
    
    // console.log(`🌟 Today's commit pattern intensity: ${intensity}, Total Commits: ${commitCount}`);
    
    // Check if we're in a git repository
    if (!checkGitRepo()) {
        console.log('❌ Not in a git repository. Initializing...');
        executeGitCommand('git init');
        console.log('✅ Git repository initialized');
    }
    
    // Generate random content
    const content = generateRandomContent();
    const filePath = path.join(REPO_PATH, COMMIT_FILE);
    
    // Write content to file
    try {
        fs.writeFileSync(filePath, content);
        // console.log(`✅ Generated random content in ${COMMIT_FILE}`);
    } catch (error) {
        console.error('❌ Error writing file:', error.message);
        process.exit(1);
    }
    
    // Git operations
    try {
        // Execute commits based on pattern
        for (let i = 0; i < commitCount; i++) {
            console.log(`📝 Creating commit ${i + 1}/${commitCount}`);
            generateCommit();
        }
        
        // Try to push all commits at once
        try {
            executeGitCommand('git push');
            console.log('✅ All commits pushed to remote repository');
        } catch (error) {
            console.log('⚠️ Could not push to remote. You may need to set up a remote repository first.');
            console.log('   Run: git remote add origin <your-repo-url>');
        }
        
    } catch (error) {
        console.error('❌ Error during git operations:', error.message);
        process.exit(1);
    }

    console.log('🎉 Daily commit process completed!');
}

function generateCommit() {
    // Generate new content for each commit
    const content = generateRandomContent();
    const filePath = path.join(REPO_PATH, COMMIT_FILE);
    
    // Write content to file
    try {
        fs.writeFileSync(filePath, content);
    } catch (error) {
        console.error('❌ Error writing file:', error.message);
        return;
    }
    
    executeGitCommand(`git add ${COMMIT_FILE}`);
    
    // Check if there are changes to commit
    try {
        execSync('git diff --staged --exit-code', { cwd: REPO_PATH, stdio: 'ignore' });
        // console.log('ℹ️ No changes to commit');
        return;
    } catch (error) {
        // There are changes, continue with commit
    }
    
    // Commit with random message
    const commitMessages = [
        'Daily coding activity update',
        'Maintaining streak with daily practice',
        'Regular progress check-in',
        'Daily development log update',
        'Consistent coding habit maintenance',
        'Daily contribution to keep momentum',
        'Regular activity logging',
        'Keeping the coding streak alive',
        'AVII pattern commit for better visibility',
        'Building consistent GitHub activity'
    ];
    
    const randomMessage = commitMessages[Math.floor(Math.random() * commitMessages.length)];
    const commitCommand = `git commit -m "${randomMessage}"`;
    
    executeGitCommand(commitCommand);
    console.log('✅ Commit created successfully');
    
}

// Check if running directly
if (require.main === module) {
    makeDailyCommit();
    console.log('commit done ...')
}

module.exports = { makeDailyCommit };
