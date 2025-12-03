---
title: 'Architecture & Resilience: Advent of Code 2025 Day 3 – Maximizing Battery Joltage'
description: "The Day 3 challenge demanded maximizing a 12-digit sequence, testing our system's
 architectural resilience. See the journey from flawed assumptions to implementing the optimized
 stack, ensuring robustness against extreme scale via BigInt."
publishDate: 2025-12-03T15:53:00-06:00
author: Andy Carlberg
---


Day 3 presented a fascinating sequence manipulation problem. My initial assumptions about data
structures led to a flawed implementation, but TDD and persistent debugging eventually pointed the
way to a highly optimized solution for both parts. The biggest challenge? Realizing the **O(N)**
algorithm for Part 1, and then correctly applying a different **O(N)** algorithm (the stack) for
Part 2.

---

## Testing the Boundaries (TDD Setup)

As with the previous days, I used Gemini to generate a comprehensive test suite. This was
important, as it immediately raised important edge cases:

* **Implicit Constraints:** The initial tests assumed the input should be handled robustly, even
  including non-digit characters and lines with too few batteries. I decided to filter non-
  standard input, focusing on lines that met the minimal requirements (at least two batteries for
  Part 1).
* **The BigInt Revelation:** For Part 2, Gemini's generated tests immediately incorporated **BigInt**
  for the expected values, alerting me early that the final sum would exceed JavaScript's safe
  integer limit. This saved significant debugging time later.
* **Catching Test Issues:** Ironically, the generated suite itself had two flaws (misplaced comments
  being included as input and incorrect expected values). This experience reinforced the key lesson
  from Day 2: while the AI is a **powerful TDD accelerant**, it still requires **careful human
  validation** of its output, especially concerning specific input formats and core problem logic,
  to ensure architectural **robustness**.

---

## Part 1: Finding the Max Two-Digit Joltage

The initial goal was to find the largest two-digit number formed by any pair of digits in the bank
sequence, where the tens digit must appear *before* the ones digit in the sequence. This seemingly
simple task became an early test of my ability to resist premature complexity and simplify my
state management.

### Make it Work: The Flawed Queue and the Logical Breakthrough

My initial approach was driven by a premature assumption about the data structure:

1.  **Initial Misstep (The Queue):** I believed a custom `Queue` was the solution, allowing me to
  maintain the last two digits and check their resulting joltage. This failed because I was only
  comparing the incoming digit to the *front* of the queue, completely missing the comprehensive
  check needed to find the maximum possible pair across the entire sequence.
2.  **Debugging & Realization:** After several failing tests, I realized the core problem wasn't
  queue management; it was determining the best possible result from the entire bank in a single
  pass. The solution needed a **greedy algorithm** that tracked the best overall result, not just
  the last two digits.
3.  **The O(N) Breakthrough:** The necessary logic was realized: at any point, the maximum
  joltage is either the `currentMax` found so far, OR the new joltage formed by pairing the
  **highest preceding digit found so far** (`bestTensDigit`) with the current incoming digit. This
  single-pass comparison was the key to an efficient **O(N)** solution.

### Make it Right: Refactoring for Clarity and Resilience

Once the logic was functionally correct, the focus shifted to code hygiene and architectural
clarity. This phase strongly echoed lessons learned in previous days regarding **separation of
concerns** and **state simplification**.

1.  **Lessons in Abstraction and State:** My initial custom `Queue` class was clumsy. It was doing
  too much, tracking an underlying array while trying to manage the overall maximum. This
  highlights the need to start with the simplest, clearest state representation possible.
2.  **Refactoring to Minimal State:** The most significant clarity improvement came from
  refactoring the "queue-like" logic to track only two essential pieces of state:

* `currentMax`: The best result found globally so far.
* `bestTensDigit`: The single most valuable digit seen previously (the best candidate for the
    tens place).
3.  **Encapsulation of Business Logic:** By focusing the class only on these two pieces of state
  and implementing the two-step greedy logic, the solution became transparent and resilient. The
  complex multi-case comparison was elegantly replaced by two simple, ordered checks, making the
  logic much easier to understand.

### Make it Fast: Optimization and Efficiency

With the correct **O(N)** algorithm in place, the solution was already as fast as possible in terms
of **Big O complexity**, as there's no way to avoid iterating over every digit in the input bank.

* **Optimal Time Complexity:** The reliance on the single-pass **greedy algorithm** ensured the
  complexity remained linear, **O(N)**.
* Any additional changes would provide minimal benefit and reduce the clarity unless you're very
  familiar with JavaScript's idiosyncrasies.

---

## Part 2: Maximizing the Twelve-Digit Sequence

The constraint changed from finding the largest 2-digit number to finding the largest 12-digit
number by dropping any extra digits.

### Make it Work: The Stack

My initial assumption was that this was a queue problem, but it turns out that the true required
structure is a **stack** (LIFO: Last-In, First-Out).

1.  **Stack Logic:** To form the largest number, every digit must be as large as possible, placed
  as far to the left as possible.
2.  **The Greedy Rule:** When a new digit arrives, if it is larger than the digit currently at the
  top of our sequence (stack), I **pop** the smaller digit off the stack, effectively deleting it,
  because putting the larger digit to the left yields a bigger number. This process continues until
  the stack top is greater than the new digit, or I run out of allowed drops.
3.  **No Prefill:** I initially tried to prefill the stack but realized that this could add digits
  that should have been greedily dropped earlier. The solution must rely on the **always-add**
  strategy: always push the `currentDigit` after the deletions, ensuring it's available for
  comparison with future digits.

The final structure was a single loop using a simple array as a stack, relying on `pop()` and
`push()`.

```javascript
// Simplified logic for greedy deletion
while (digitsToDrop > 0 && currentDigit > stack[stack.length - 1]) {
    stack.pop();
    digitsToDrop--;
}
stack.push(currentDigit);
```

A final debug session was necessary to fix a regex error that excluded '0' from valid banks, which
caused one of the new test cases to fail. Once fixed, all tests passed.

### Make it Right (Clarity)

The main cleanup focused on clarity:

* Constants: Defined `SEQUENCE_LENGTH = 12` to eliminate **magic numbers**.
* Naming: Some variable names could be cleaned up for clarity.

### Make it Fast (Constant Factor Optimization)

As in Part 1, no further optimization was possible without sacrificing clarity.

---

## View the Full Codebase

The complete, final, and tested TypeScript solution for Day 2 is available for review on
GitHub, demonstrating the implementation of the TDD and architectural principles discussed
here.

**[View the Advent of Code 2025 Repository on GitHub](https://github.com/andycarlberg/advent-of-code-2025)**

This process, driven by TDD, proved that even when initial assumptions are wrong, persistent
testing and refactoring lead to the most correct and optimized solution.
