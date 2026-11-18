# Temporary npm audit exception: GHSA-fc5q-39xc-vjpf

**Status:** temporary; introduced 2026-11-17. Review by 2026-12-17 and remove sooner when an upstream fix is available.

The full `npm audit --json` report remains visible in CI. The quality gate tolerates only HIGH/CRITICAL dependency paths whose HIGH/CRITICAL advisory leaves all resolve to the exact GitHub advisory `GHSA-fc5q-39xc-vjpf` for `picomatch`. Other HIGH or CRITICAL advisories, untraceable dependency paths, invalid audit output, and audit execution errors fail the job. Moderate findings remain visible in the full report and do not meet the configured blocking threshold.

The current npm audit identifies this advisory through development toolchain dependencies. The production-only audit reports no vulnerabilities. The advisory affects `picomatch` versions through 4.0.7 and currently lists no patched release. No user supplied application input was found being passed to picomatch; the remaining exposure is primarily CI/build tooling and a possible availability impact from crafted glob patterns.

This exception is not a claim that the vulnerable package is safe. It accepts that residual risk temporarily to keep lint, tests, coverage, build, and the security gate running while still failing closed on all other severe findings. CI runs with repository read-only permissions (`contents: read`).

**Approval:** the Product Owner authorized this exact, temporary exception as part of the implementation task on 2026-11-17.

**Removal condition:** remove the allowlist and this document as soon as a compatible patched `picomatch` version is available and validated, or if the advisory is withdrawn or reclassified. Re-run the full production and development audits after removal.
