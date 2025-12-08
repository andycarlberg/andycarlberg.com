---
title: 'Architecture & Resilience: AoC 2025 - Day 4: Printing Department'
description: "Day 4 required solving an iterative spatial problem. I used spatial indexing for efficient neighbor counting and a BFS simulation to model the cascading removal of paper rolls."
publishDate: 2025-12-04T15:53:00-06:00
author: Andy Carlberg
tags: ["Algorithm", "Spatial-Indexing", "BFS", "Data-Structures", "Optimization", "TDD", "LLM", "Architecture", "Advent-of-Code"]
---

## The Challenge: Spatial Indexing and Iterative Collapse

Day 4 presented a **spatial problem** involving rolls of paper (`@`) stored in a warehouse grid,
requiring me to count how many rolls are **accessible**. A roll is accessible if it has **fewer
than four** adjacent rolls (checking all 8 surrounding positions).

---

### Part 1: Initial Accessibility

The first part required a simple snapshot: how many rolls are accessible *right
now*?

### Part 2: Cascading Removal

The second part introduced a simulation: Accessible rolls are removed, potentially making *more*
rolls accessible. I had to calculate the **total** number of rolls that could be removed through
this iterative, cascading process. This transformed the problem from a simple count into a complex
**wave propagation** simulation.

---

## TDD and the Architectural Process

My test-driven development (TDD) process highlighted the inherent difficulty of these spatial logic
puzzles, even for advanced AI tools.

### LLM Struggles with Logic

As in previous days, I leveraged Google Gemini to generate a test suite. However, the LLM
consistently provided tests with **incorrect logic or expected values** for edge cases.

I noticed that the LLM often tried to apply a simplified, non-spatial rule or simply miscounted the
number of accessible rolls. For example, in a **dense block**, the LLM failed to identify that many
rolls on the perimeter were still blocked by **4 or more neighbors**.

**I think this is a very important thing to point out:** Even though Gemini could correctly process
the main example (likely by simply extracting the known correct result), it fundamentally struggled
to generate **reliable test cases** for the subtle boundary conditions. I ultimately used the
structural boilerplate from Gemini but had to write **all the inputs and expected values myself**
to ensure accuracy. This reinforced the need for a **human-in-the-loop** to validate core domain
logic.

---

## Part 1: From Naive Loops to Spatial Indexing

I continued trying to work through the classic Make it Work, Make it Right, Make it Fast
development loop that I have used for previous days in this year's challenge.

### 1. Make it Work: The Naive Solution

My initial solution used nested `for` loops to iterate through the entire grid, and for every roll
(`@`), it ran **eight separate checks** for adjacent positions.

While this was functional, it was inefficient for several reasons: it wasted time iterating over
empty spaces (`.`) and the check logic was verbose.

### 2. Make it Right: Encapsulation and Constants

To clean up the code, I consolidated the eight separate checks into a single constant array of
**neighbor offsets** (`[-1, -1]`, `[0, 1]`, etc.) and used a loop to apply them. This resulted in
significantly cleaner and more maintainable code by replacing long, repetitive checks.

### 3. Make it Fast: Pre-calculating Adjacency (Spatial Indexing)

The true performance optimization came from avoiding the repeated calculation of neighbor counts.
Instead of checking a roll's neighbors every time, I pre-calculated the neighbor count for *every*
cell in a **single pass** over the input. This is a form of **spatial indexing**.

1.  **Iterate Over All Rolls:** In one pass, I iterate only over the rolls (`@`).

2.  **Propagate Count:** For every roll found, I iterate over its 8 neighbors and **increment a
    count grid** at that neighbor's coordinate.

3.  **Final Tally:** After the single pass, the count grid holds the exact number of adjacent rolls
    for every cell. I simply iterate one last time to count how many cells with an `@` have a final
    count of `<4`.

This approach converts a complex, potentially slow `O(N)` operation into a highly efficient
`O(R * C)` operation with minimal overhead.

---

## Part 2: Breadth-first Search

Part 2 required a simulation. My optimized Part 1 solution provided the perfect starting point: the
ability to quickly determine initial accessibility.

### The BFS Simulation

The cascade effect is best solved using a **Breadth-First Search (BFS)**.

1.  **Initial Queue:** I use the pre-calculated counts from Part 1 to populate a **Set** with the
    coordinates of all initially accessible rolls. I use a **Set** because it guarantees
    **uniqueness**, preventing a single roll from being added to the queue multiple times if freed
    by several neighbors simultaneously.

2.  **The Loop:** While the queue contains rolls to remove:

* **Process Roll:** I dequeue one roll.
* **Safety Check:** I use a separate **Set** (`removedRolls`) to ensure I **never double-
    count** a roll that was processed earlier.
* **Decrement Counts:** For all 8 neighbors of the removed roll, I **decrement** their count in
    the adjacency grid.
* **Propagation:** If a neighbor is an unremoved roll and its new count drops to **`<4`**, it
    becomes the newest candidate and is immediately added to the `removableQueue`.

This iterative process continues until the wave of removal stops, leaving me with the final,
correct total. By starting from the "Make it Fast" solution from Part 1, I had a clean foundation
to build this resilient, high-performance simulation.

---

## View the Full Codebase

The complete, final, and tested TypeScript solution for Day 4 is available for review on GitHub,
demonstrating the implementation of the TDD and architectural principles discussed here.

**[View the Advent of Code 2025 Repository on GitHub](https://github.com/andycarlberg/advent-of-code-2025)**

Day 4 reinforced that **resilience** isn't just about handling large numbers; it's about choosing
the right **data structure** and **algorithmic strategy** (like spatial indexing and BFS) to model
complex, real-world dependencies. The lesson from the LLM struggle is clear: human intuition is
still paramount when validating the subtle, spatial logic required to build a robust system.
