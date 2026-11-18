import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAuditReport } from './check-npm-audit.mjs';

const approved = {
  name: 'picomatch',
  severity: 'high',
  url: 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf',
};

function report(vulnerabilities) {
  return { vulnerabilities };
}

test('allows only the approved picomatch HIGH advisory, including a transitive chain', () => {
  const result = evaluateAuditReport(report({
    picomatch: { severity: 'high', via: [approved] },
    vite: { severity: 'high', via: ['picomatch'] },
  }));
  assert.equal(result.pass, true);
  assert.equal(result.sawApprovedAdvisory, true);
});

test('allows a clean report without requiring the temporary exception', () => {
  assert.equal(evaluateAuditReport(report({})).pass, true);
});

test('does not block on MODERATE advisories', () => {
  assert.equal(evaluateAuditReport(report({
    dependency: { severity: 'moderate', via: [{ name: 'dependency', severity: 'moderate', url: 'https://example.test/moderate' }] },
  })).pass, true);
});

test('blocks a different HIGH advisory, including one affecting picomatch', () => {
  for (const advisory of [
    { name: 'picomatch', severity: 'high', url: 'https://github.com/advisories/GHSA-other' },
    { name: 'other-package', severity: 'high', url: 'https://github.com/advisories/GHSA-other' },
  ]) {
    assert.equal(evaluateAuditReport(report({ [advisory.name]: { severity: 'high', via: [advisory] } })).pass, false);
  }
});

test('blocks CRITICAL and mixed approved plus unapproved findings', () => {
  const critical = { name: 'critical-package', severity: 'critical', url: 'https://github.com/advisories/GHSA-critical' };
  assert.equal(evaluateAuditReport(report({ critical: { severity: 'critical', via: [critical] } })).pass, false);
  const otherHigh = { name: 'vite', severity: 'high', url: 'https://github.com/advisories/GHSA-other' };
  assert.equal(evaluateAuditReport(report({
    picomatch: { severity: 'high', via: [approved] },
    vite: { severity: 'high', via: [otherHigh] },
  })).pass, false);
});

test('fails closed on malformed or untraceable high findings', () => {
  assert.equal(evaluateAuditReport({}).pass, false);
  assert.equal(evaluateAuditReport(report({ broken: { severity: 'high', via: ['missing'] } })).pass, false);
});
