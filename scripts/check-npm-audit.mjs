import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const approvedAdvisory = 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf';
const severityRank = { low: 1, moderate: 2, high: 3, critical: 4 };

export function evaluateAuditReport(report) {
  const vulnerabilities = report?.vulnerabilities;
  if (!vulnerabilities || typeof vulnerabilities !== 'object' || Array.isArray(vulnerabilities)) {
    return { pass: false, reason: 'npm audit report has no valid vulnerabilities map.' };
  }

  const highPackages = Object.entries(vulnerabilities)
    .filter(([, item]) => severityRank[item?.severity] >= severityRank.high);

  function collectHighAdvisories(packageName, visited = new Set()) {
    if (visited.has(packageName)) return { advisories: [], invalid: false };
    visited.add(packageName);
    const vulnerability = vulnerabilities[packageName];
    if (!vulnerability || !Array.isArray(vulnerability.via)) {
      return { advisories: [], invalid: true };
    }

    const advisories = [];
    for (const via of vulnerability.via) {
      if (typeof via === 'string') {
        const nested = collectHighAdvisories(via, visited);
        if (nested.invalid) return nested;
        advisories.push(...nested.advisories);
      } else if (via && typeof via === 'object') {
        if (severityRank[via.severity] >= severityRank.high) advisories.push(via);
      } else {
        return { advisories: [], invalid: true };
      }
    }
    return { advisories, invalid: false };
  }

  for (const [packageName] of highPackages) {
    const result = collectHighAdvisories(packageName);
    if (result.invalid || result.advisories.length === 0) {
      return { pass: false, reason: `Cannot trace HIGH/CRITICAL finding for ${packageName}.` };
    }
    for (const advisory of result.advisories) {
      const approved = advisory.name === 'picomatch' && advisory.url === approvedAdvisory;
      if (!approved) {
        return {
          pass: false,
          reason: `Unapproved ${advisory.severity} advisory ${advisory.url || '(missing URL)'} affects ${packageName}.`,
        };
      }
    }
  }

  return {
    pass: true,
    sawApprovedAdvisory: highPackages.length > 0,
    reason: 'No unapproved HIGH/CRITICAL findings.',
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const command = process.platform === 'win32' ? (process.env.ComSpec || 'cmd.exe') : 'npm';
  const args = process.platform === 'win32'
    ? ['/d', '/s', '/c', 'npm.cmd audit --json']
    : ['audit', '--json'];
  const audit = spawnSync(command, args, {
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    shell: false,
    windowsHide: true,
  });

  if (audit.stdout) process.stdout.write(audit.stdout);
  if (audit.stderr) process.stderr.write(audit.stderr);
  if (audit.error) {
    console.error(`npm audit could not be executed: ${audit.error.message}`);
    process.exitCode = 1;
  } else {
    try {
      const report = JSON.parse(audit.stdout);
      if (report.error) throw new Error(report.error.summary || 'npm audit reported an execution error.');
      if (audit.status !== 0 && !report.vulnerabilities) {
        throw new Error(report.error?.summary || 'npm audit did not return a valid audit report.');
      }
      if (audit.status !== 0 && audit.status !== 1) {
        throw new Error(`npm audit exited unexpectedly with status ${audit.status}.`);
      }
      const result = evaluateAuditReport(report);
      if (!result.pass) throw new Error(result.reason);
      const counts = report.metadata?.vulnerabilities || {};
      console.log(`Audit counts: ${JSON.stringify(counts)}.`);
      console.log(`Security audit passed. ${result.reason}${result.sawApprovedAdvisory ? ' Temporary exception used: GHSA-fc5q-39xc-vjpf.' : ''}`);
    } catch (error) {
      console.error(`Security audit failed: ${error.message}`);
      process.exitCode = 1;
    }
  }
}
