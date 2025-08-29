#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

try {
    // Get staged files
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
        .split('\n')
        .filter(file => file.trim() !== '');

    console.log('Staged files:', stagedFiles);

    // Filter for TypeScript source files in src/ (not test files)
    const sourceFiles = stagedFiles.filter(file =>
        file.startsWith('src/') &&
        file.endsWith('.ts') &&
        !file.endsWith('.test.ts') &&
        !file.endsWith('.d.ts')
    );

    console.log('Source files to check:', sourceFiles);

    if (sourceFiles.length === 0) {
        console.log('No source files staged. Skipping unit tests.');
        process.exit(0);
    }

    // Find corresponding test files
    const testFiles = [];
    for (const sourceFile of sourceFiles) {
        const testFile = sourceFile.replace(/\.ts$/, '.test.ts');
        if (fs.existsSync(testFile)) {
            testFiles.push(testFile);
        }
    }

    console.log('Test files to run:', testFiles);

    if (testFiles.length === 0) {
        console.log('No corresponding test files found. Skipping unit tests.');
        process.exit(0);
    }

    // Run vitest on the specific test files
    const testCommand = `npx vitest run ${testFiles.join(' ')}`;
    console.log('Running:', testCommand);

    execSync(testCommand, { stdio: 'inherit' });

    console.log('All relevant unit tests passed!');

} catch (error) {
    console.error('Pre-commit hook failed:', error.message);
    process.exit(1);
}