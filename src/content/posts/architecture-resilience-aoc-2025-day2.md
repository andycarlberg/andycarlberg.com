---
title: 'Discipline of Resilience: AoC Day 2 - Stress-Testing TDD and Resilience Architecture'
description: "A Principal Architect's breakdown of AoC Day 2. See how TDD and architectural
  discipline hold up under new requirements, and the limits of AI in generating governed
  tests."
publishDate: 2025-12-02T15:53:00-06:00
author: Andy Carlberg
---

I continue my series focusing on the deliberate application of **enterprise architectural**
**discipline** to the simple, low-stakes problems presented by Advent of Code.

Day 2, the **Gift Shop Challenge**, presented a puzzle that didn't directly build on Day 1's
logic, but instead offered a new opportunity to stress-test my strategic foundation:
**Test-Driven Development (TDD)** and **Architectural Separation of Concerns**.

-----

## The Strategic Rationale

My goal remains to **deliberately stretch technical muscles** that focus on governance and
system resilience. Today's solution would determine if my Day 1 architectural decisions held
up when faced with a wholly different problem set.

I applied my core methodology—**Make it Work, Make it Right, Make it Fast**—within my
established architectural principles (**TYPESCRIPT** for type safety and **Governance**). This
allowed me to focus my strategic questions for Day 2:

- **Continuity Check**: Could I re-use the wrapper (`index.ts`) architecture?

- **Advanced TDD**: Could I strategically leverage AI to accelerate the test definition phase
  while still maintaining ownership of the governance?

- **Optimization Discipline**: Could I execute the full process, even when the initial
  implementation seemed deceptively simple?

-----

## Day 2 Solve: The Gift Shop Challenge

### The Problem Description (Part 1)

The **Gift Shop Challenge** required me to analyze a set of ID ranges and sum all *invalid
product IDs*. An invalid ID is defined as any number made up of some sequence of digits
repeated exactly twice (e.g., 6464 is 64 repeated twice). The complexity lay in parsing the
input, handling ranges, and mathematically determining these repetitive patterns across
varying number lengths.

### 1\. Initial Architecture Application

To apply the strategic principle of **Architectural Separation of Concerns**, I isolated the
core logic from external, messy dependencies. This ensures high testability and component
reusability:

- `index.ts` (The Wrapper): This is a simple CLI layer dedicated only to handling messy I/O,
  such as file system operations (`fs`) and argument parsing (`process.argv`). I keep this
  simple and **deliberately exclude it from unit testing.**

- `solution.ts` (The Core Logic): This file is dedicated solely to the arithmetic logic of the
  puzzle. By isolating the business logic here, I remove the need for complex mocking in my tests
  and greatly improve the testability of the algorithm. This separation is fundamental to building
  scalable, low-friction systems.

### 2\. Advanced TDD: Leveraging AI as a Strategic Accelerator

To test the next level of TDD automation, I provided **Gemini** with the full problem prompt and
asked it to scaffold the entire test suite.

This strategic outsourcing immediately yielded a **significant reduction in manual effort** and
provided a complete suite that implicitly defined the necessary interface for my solution:

```typescript
class Solution {
    // run solution for complete input
    solve(input: string): number;
    // Detect if a given number is an invalid ID
    isInvalid(input: number | string): boolean;
}
```

#### The Strategic Critique: AI for Governance

While the AI provided exceptional speed and rigor—identifying edge cases, boundary conditions,
and invalid inputs I hadn't yet considered—it also demonstrated key limitations that highlight
the continued necessity of human oversight:

- Logical Confusion: The AI added test cases based on confusion with the problem logic
  (e.g., testing `1111`'s validity or handling leading zeros, which the prompt explicitly
  rules out).

- AI Transparency: Fascinatingly, the AI's internal confusion was sometimes visible within
  its own generated comments, reinforcing the need for **governance**: AI is an exceptional
  tool for generating boilerplate, but the architect's primary role remains critically
  validating the *intent* of the test cases against the business requirements.

### 3\. Implementation Phase: Make It Work

With the interface defined, I began implementation:

- Initial solve: I started by implementing the `isInvalid` helper function. Though the
  generated interface expected a number, I initially defaulted to a simpler string
  comparison (splitting the number string in half). This covered all the helper tests but
  felt like a naive solution, which is acceptable for this phase.

- Parsing Friction: The `solve` function required gnarly parsing logic for the nested data
  string (multiple comma-separated, dash-delineated ranges). While I strategically trimmed
  whitespace (assuming generous input handling), the resulting parsing logic was complex and
  difficult to read.

### 4\. Architecture Phase: Make It Right

I focused on eliminating the friction introduced by the parsing logic:

- Code Governance: I extracted the complex parsing into its own function and added explicit
  error handling for invalid range formats (generally ignoring them).

- Type Clarity: I defined a more explicit `Range` type, replacing the generic array return
  value to ensure stronger **type safety** and readability across the codebase.

### 5\. Optimization Phase: Make It Fast

As anticipated, the initial "Make it Work" solution was inefficient due to iterating over
*every single number* in the given ranges.

- The Strategic Pivot: The goal shifted from iterative searching to **mathematical
  optimization**. I was able to use math trickery to surgically locate the few numbers that
  are actual invalid IDs, rather than iterating over millions of valid numbers.

- TDD Validation: This complex math was prone to off-by-one errors. The comprehensive test
  suite - even the initial AI-generated cases - proved invaluable here, immediately
  highlighting flaws in the calculation logic.

- Architectural Cost: Due to this **mathematical optimization**, the helper function
  `isInvalid` and its entire test suite became obsolete and were removed, a clear case where
  **performance needs dictated a change to the initial architecture.**

-----

## Part 2: The Payoff of Architecture

### The Critical Change in Requirements

Part 2 expanded the definition of an invalid ID to any sequence of digits repeated **at least**
**twice** (e.g., `123|123|123` or `1|1|1|1|1`).

Because my solution followed the principles of separation and optimization:

1. **TDD Resilience:** The automated test cases were efficiently updated for the new
  requirement. Importantly, 8 of the original tests still passed, proving my underlying
  input handling and structural logic was robust.

2. **Core Logic Update:** I updated the mathematical logic to account for sequences repeating
  $2, 3, 4,$ or more times. Although I again required some research to correctly apply the
  new math, my disciplined use of TDD meant I had a safety net to validate the updated
  optimization logic instantly.

-----

## View the Full Codebase

The complete, final, and tested TYPESCRIPT solution for Day 2 is available for review on
GitHub, demonstrating the implementation of the TDD and architectural principles discussed
here.

**[View the Advent of Code 2025 Repository on GitHub](https://github.com/andycarlberg/advent-of-code-2025)**

Day 2 demonstrated the meaning of resilient architecture. While the need for **mathematical**
**optimization** forced an intentional break from the initial code design, the established
boundaries (TDD and Architectural Separation) ensured the pivot was **safe, governed, and**
**low-friction**, proving that process outweighs initial implementation choices.
