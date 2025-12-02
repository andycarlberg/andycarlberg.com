---
title: 'Discipline of Resilience: Enterprise Architecture in AoC Day 1'
description: "Architects don't just solve problems; we prevent them. See why applying
  enterprise-grade TDD and strategic overkill to Advent of Code is the only way to build
  resilience. Day 1."
publishDate: 2025-12-01T10:00:00-06:00
author: Andy Carlberg
---

I'm returning to **Advent of Code (AoC)** this year, with the new, more manageable
**12-day format**. In the past, end-of-year deadlines and holiday season pressures
consistently caused me to drop out so the shorter commitment is attractive. This year,
I'm treating AoC not just as a technical challenge, but as a deliberate exercise in
applying large-scale **architectural discipline**—Test-Driven Development (TDD) and
strategic optimization—to small, contained problems. The goal is to build solutions that
are robust, maintainable, and built on a foundation of sound engineering principles that
will carry us through the list of challenges.

---

## The Strategic Rationale

The fundamental idea behind this project is to practice skills that scale. **Yes, this
level of TDD and architectural separation is overkill for a 12-day coding challenge—and
that is precisely the point.** These simple, contained problems provide a low-stakes
environment to exercise and refine the critical discipline needed for massive enterprise
systems.

This project is a dedicated effort to **deliberately stretch technical muscles** that
often get sidelined in executive work:

- **Practicing TDD:** Creating an environment where tests are non-negotiable—a core
  strategy for **risk mitigation**.
- **Structured Problem-Solving:** Applying the deliberate **"Make it work, make it
  right, make it fast"** methodology to walk through optimization from the ground up.
- **Refining Code Governance:** Ensuring the final solution is not just correct, but
  robust and maintainable through careful language and architectural choices.

---

## Architectural Strategy: Reliability and Governance

My approach prioritizes creating a foundation that is easy to modify, test, and
understand—the core tenets of resilient **technology governance**.

### 1. Methodology: Make it Work, Make it Right, Make it Fast

This simple sequence ensures we prioritize functionality, clean architecture, and
performance in that order:

1. **Functionality:** Solve the immediate problem.
2. **Readability/Architecture:** Refactor for clean separation of concerns and maintainability.
3. **Performance:** Optimize the solution only after it is correct and cleanly structured.

### 2. Technology Choice: TYPESCRIPT

I chose **TYPESCRIPT** to prioritize **governance and reliability** in the codebase.
TYPESCRIPT provides superior **type safety** and robust tooling, allowing me to focus
mental energy on complex logic and architecture rather than chasing avoidable runtime
errors—a low-friction engineering environment. Plus I'm already familiar with the syntax
and can focus on the other architectural patterns I'm aiming targeting for practice.

---

## Day 1 Solve: The Safe Dial Challenge

### The Problem Description (Part 1)

Day 1 presented the **Safe Dial** challenge. The goal was to calculate the final position
of a dial after following a series of instructions (e.g., `R10`, `L5`). The dial has
positions '0' through '99'. The core requirement was to count the number of instructions
that resulted in the dial **stopping exactly at position 0**. This scenario is perfect
for practicing TDD and handling modular arithmetic.

### 1. Initial Architecture Application

To apply the strategic principle of **Architectural Separation of Concerns**, we isolated
the core logic from external, messy dependencies. This ensures high testability and
component reusability:

- **`index.ts` (The Wrapper):** This is a simple CLI layer dedicated only to handling messy
  I/O, such as file system operations (`fs`) and argument parsing (`process.argv`). We keep
  this simple and **deliberately exclude it from unit testing.**
- **`safedial.ts` (The Core Logic):** This file is dedicated solely to the arithmetic and
  movement logic of the puzzle. By isolating the business logic here, we remove the need
  for complex mocking in our tests and greatly improve the testability of the algorithm.
  This separation is fundamental to building scalable, low-friction systems.

### 2. TDD Phase: Building Robust Test Cases

Adhering to TDD, I wrote the comprehensive test suite first. This created a complete
specification for the code before it was ever written, ensuring **governance over the
required behavior**.

Crucially, I leveraged an **AI tool** (in this case, Google's Gemini) to generate the
initial set of test cases and associated Jest boilerplate. While I maintain a healthy
skepticism regarding the long-term architectural implications of generative AI, its
immediate utility as a tactical tool to **eliminate manual friction** was undeniable here.
This provided a **significant reduction in manual effort**, immediately allowing me to
shift my focus from the repetitive mechanics of testing to the strategic identification of
complex scenarios. I was able to spend my limited time defining:

- The puzzle's official example.
- Rigorous **Boundary Conditions** (e.g., testing wrapping behavior at the dial limits).
- **Edge Cases** to ensure the system handles invalid input gracefully (e.g., empty strings,
  whitespace, negative ticks, and invalid starting letters—all of which must throw clear
  errors).

By offloading the repetitive scaffolding, the AI tool helped ensure the final architecture
was robust and minimized the initial friction in the development process.

### 3. Implementation Phase: Make It Work

The initial solution used regex to split instructions and the **modulo function** for
movement wrapping. Initial test failures immediately required us to address real-world
input problems, specifically handling **leading/trailing whitespace** and empty lines.
Robust systems must anticipate and mitigate this kind of input friction.

### 4. Architecture Phase: Make It Right

With the logic validated, we focused on **readability and governance**: we replaced "magic
strings" for direction with a proper TYPESCRIPT `enum` and split the complex instruction
parsing regex into its own dedicated function. This clean separation ensures the
instruction processing is isolated from the main control flow, improving maintainability.

### 5. Optimization Phase: Make It Fast

For a low-complexity problem, optimization was an architectural choice. Instead of
repeatedly parsing the instruction string inside the main execution loop (heavy string
work), we extracted the parsing step to happen *once* before the loop begins. While this
doesn't technically improve the Big-O complexity or anything, it isolates the simple
arithmetic inside the loop, allowing the JAVASCRIPT JIT compiler to focus on optimizing
the number crunching, thereby reducing system overhead.

---

## Part 2: The Payoff of Architecture

### The Critical Change in Requirements

Part 2 introduced a small but critical change to the counting requirement. Instead of
counting when the dial **stops exactly at 0**, the new instruction was to count every
instance where the dial **passes through or ends on 0** during a move. This update
increased the complexity of the movement arithmetic, requiring us to calculate "crossings"
rather than just the final modulo remainder.

Because our architecture followed the principles of separation of concerns and TDD:

1. **Test Update:** Only the *expected values* in our existing test suite needed to be
   calculated and updated. No structural changes to the tests were required.
2. **Code Update:** The complex new logic (especially for handling left turns and crossings)
   was contained entirely within the isolated `doInstruction` function. The rest of the
   system (the execution loop, the input parsing, and the I/O wrapper) remained
   untouched, demonstrating the **resilience of the architecture** against changing
   requirements.

---

### View the Full Codebase

The complete, final, and tested TYPESCRIPT solution for Day 1 is available for review on
GitHub, demonstrating the implementation of the TDD and architectural principles discussed
here.

[**View the Advent of Code 2025 Repository on GitHub**](https://github.com/andycarlberg/advent-of-code-2025)

By applying foundational engineering discipline, even a simple puzzle is transformed into a
robust, modifiable, and low-friction solution.
