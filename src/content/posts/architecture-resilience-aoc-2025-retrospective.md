---
title: "I Killed the AoC Architecture Resilience Project on Day 4 (And Why It Was Good Governance)" 
description: "Day 4 required solving an iterative spatial problem. I used spatial indexing for efficient neighbor counting and a BFS simulation to model the cascading removal of paper rolls."
publishDate: 2025-12-08T15:53:00-06:00
author: Andy Carlberg
tags: ["Architecture", "Governance", "Resilience", "Strategic-Pivot", "TDD", "LLM", "Advent-of-Code"]
---

I set out to prove a point: that **architectural discipline** - like **Test-Driven
Development (TDD)**, **Make It Work, Make It Right, Make It Fast** iteration, and overall
**smart governance** - is the best way to manage a software project. For the first four
days of **Advent of Code**, we absolutely nailed it.

The premise was an experiment in **resilience**, stress-testing our governance against the
pressure cooker of daily puzzles. The goal wasn't just to solve the puzzle; it was to
**prove the strategy.**

As of Day 4, the experiment is **formally concluded**. I don't see this as a failure of
discipline. Instead, I see this as a **pragmatic strategic decision.** Here is the
rationale for the pivot, and the core lessons we successfully locked in.

---

## The Rationale for the Pivot

### Prioritization is the Ultimate Resilience Strategy

The most **resilient system** has a strong firewall between 'fun side project' and
'real-life priorities.' While AoC was a great proving ground, **real-world events like
family holiday commitments and end-of-year business demands took precedence.** It's hard
to justify fun but ultimately low-value coding challenges over attending holiday parties
with my kids.

Besides, the overall point was made. In any enterprise context, the moment you choose to
allocate **precious resources** (like my time) to a non-critical experiment after its key
learning objectives are met, you’ve committed a failure in **strategic governance.**
Stopping is the **most strategically sound choice** I could make right now. If we have
already learned and demonstrated what we can, continuing would just be a **waste of time**
we could better apply elsewhere.

### The Return on Strategy Taps Out

As the challenges progressed past Day 4, the nature of the solution shifted dramatically.
It went from requiring solid **system stability and change management** (where TDD
shines) to purely **algorithmic identification** (where your brain is the most important
tool).

The problems became less about *how to build a resilient system* and more about
recognizing a specific graph theory challenge. When that happens, the overhead of
maintaining enterprise-grade TDD starts generating **friction** rather than mitigating it.
I found the **strategic overhead** was actively impeding the **velocity of discovery** -
it proved its own limits in this specific domain.

---

## The Core Learnings Locked In

Despite the early pivot, the experiment successfully **validated several core
principles**. We got the data we came for:

1. **TDD as Governance, Always:** Our practice confirmed that **TDD’s primary value** is
  not driving the initial algorithm, but serving as a **robust governance mechanism** for
  change.

2. The first pass (**"Make It Work"**) usually solved the challenge, and the rigorous
  **"Make It Right"** step consistently identified and squashed subtle bugs in either
  the code or the test logic - demonstrating its power in **mitigating technical
  debt before it even felt real.**

3. **The Predictable Success of the Iterative Loop:** The **Make It Work, Make It Right,
  Make It Fast** process worked exactly as designed. The results were visible and
  reliable. We proved the strategy's validity against **early-stage complexity**.
  Continuing would have only reiterated the success for the same reasons. **We proved the
  hypothesis, case closed.**

### An Unintentional Study: The LLM in the Engine Room

The series unexpectedly became a useful test for integrating **AI** into my workflow. I used
**Gemini**, a general-purpose LLM, which was excellent for **boilerplate generation** and
structural code, but required **significant guidance and human verification** to ensure the
actual logic was correct.

This finding is **critical**: **Governance and validation remain human, architectural
responsibilities.** The AI is a powerful assistant, but the architect is still the only one
with the **strategic map.**

---

## Conclusion: The Ultimate Resilient Architecture

The experiment proved the strength of **enterprise discipline** against initial complexity.
The pivot proved the strength of **strategic prioritization** against real-world
constraints.

The **resilient strategist** is the one who chooses the right tool for the job. And the
ultimate **resilient architecture**? Knowing exactly when to clock out.
