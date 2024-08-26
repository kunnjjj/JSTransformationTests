import { transformData } from "./implementation";

describe("transformData", () => {
  test("correctly transforms and sorts active users by average score", () => {
    const input = [
      {
        id: 1,
        name: "Alice",
        isActive: true,
        scores: [80, 90, 100],
        tags: ["a", "b", "a"],
      },
      { id: 2, name: "Bob", isActive: false, scores: [60, 70], tags: ["c"] },
      {
        id: 3,
        name: "Charlie",
        isActive: true,
        scores: [70, 80, 90],
        tags: ["b", "b"],
      },
    ];

    const expectedOutput = [
      { id: 1, name: "ALICE", averageScore: 90, tags: ["a", "b"] },
      { id: 3, name: "CHARLIE", averageScore: 80, tags: ["b"] },
    ];

    expect(transformData(input)).toEqual(expectedOutput);
  });

  test("handles empty input array", () => {
    expect(transformData([])).toEqual([]);
  });

  test("filters out users with no scores", () => {
    const input = [
      { id: 1, name: "Alice", isActive: true, scores: [], tags: ["a", "b"] },
      {
        id: 2,
        name: "Bob",
        isActive: true,
        scores: [70, 80],
        tags: ["c", "c"],
      },
    ];

    const expectedOutput = [
      { id: 2, name: "BOB", averageScore: 75, tags: ["c"] },
    ];

    expect(transformData(input)).toEqual(expectedOutput);
  });

  test("removes duplicate tags and handles mixed case names", () => {
    const input = [
      {
        id: 1,
        name: "alice",
        isActive: true,
        scores: [50, 60],
        tags: ["a", "A", "b", "B"],
      },
    ];

    const expectedOutput = [
      { id: 1, name: "ALICE", averageScore: 55, tags: ["a", "b", "A", "B"] },
    ];

    expect(transformData(input)).toEqual(expectedOutput);
  });

  test("correctly handles large datasets and edge cases", () => {
    const input = [
      {
        id: 1,
        name: "User1",
        isActive: true,
        scores: Array(10000).fill(10),
        tags: ["a", "b"],
      },
      {
        id: 2,
        name: "User2",
        isActive: true,
        scores: Array(10000).fill(20),
        tags: ["c", "d"],
      },
    ];

    const expectedOutput = [
      { id: 2, name: "USER2", averageScore: 20, tags: ["c", "d"] },
      { id: 1, name: "USER1", averageScore: 10, tags: ["a", "b"] },
    ];

    expect(transformData(input)).toEqual(expectedOutput);
  });
});
