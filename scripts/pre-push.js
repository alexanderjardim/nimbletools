#!/usr/bin/env node

import { execSync } from "child_process";

try {
  // Get the commits that are about to be pushed
  const commits = execSync("git log --oneline @{u}..HEAD", {
    encoding: "utf8",
  })
    .split("\n")
    .filter((line) => line.trim() !== "");

  if (commits.length === 0) {
    console.log("No new commits to push. Skipping pre-push formatting.");
    process.exit(0);
  }

  console.log(`Checking ${commits.length} commit(s) for files to format...`);

  // Get all files that have been modified in the commits to be pushed
  const filesToCheck = execSync("git diff --name-only @{u}..HEAD", {
    encoding: "utf8",
  })
    .split("\n")
    .filter((file) => file.trim() !== "");

  console.log("Files in commits to push:", filesToCheck);

  // Filter for files that should be formatted (TypeScript, JavaScript, JSON, etc.)
  const filesToFormat = filesToCheck.filter(
    (file) =>
      file.endsWith(".ts") ||
      file.endsWith(".tsx") ||
      file.endsWith(".js") ||
      file.endsWith(".jsx") ||
      file.endsWith(".json") ||
      file.endsWith(".css") ||
      file.endsWith(".scss") ||
      file.endsWith(".html") ||
      file.endsWith(".md"),
  );

  if (filesToFormat.length === 0) {
    console.log("No files to format in the commits to be pushed.");
    process.exit(0);
  }

  console.log("Files to format before push:", filesToFormat);

  // Check if any of these files need formatting
  const checkCommand = `npx prettier --check ${filesToFormat.join(" ")}`;
  try {
    execSync(checkCommand, { stdio: "pipe" });
    console.log("All files are properly formatted. Proceeding with push.");
  } catch (error) {
    console.log("Some files need formatting. Formatting them now...");

    // Format the files
    const formatCommand = `npx prettier --write ${filesToFormat.join(" ")}`;
    console.log("Running:", formatCommand);

    execSync(formatCommand, { stdio: "inherit" });

    // Check if any files were actually changed
    const statusOutput = execSync("git status --porcelain", {
      encoding: "utf8",
    });

    if (statusOutput.trim()) {
      console.log(
        "Files were reformatted. Please review the changes and commit them before pushing again.",
      );
      console.log("Modified files:");
      console.log(statusOutput);
      process.exit(1);
    } else {
      console.log("Files were already properly formatted.");
    }
  }

  console.log("Pre-push formatting check completed successfully!");
} catch (error) {
  console.error("Pre-push hook failed:", error?.message || error);
  process.exit(1);
}
