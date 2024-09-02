# Filter Redundant Rules

You have a list of rules, where each rule consists of a set of conditions that determine if a product is `UNSUPPORTED`. A product is `UNSUPPORTED`
if it meets all the conditions of any rule.

Sometimes, one rule is fully covered by another rule that has more conditions. In such cases, the more detailed rule is unnecessary because the simpler rule already handles the scenario.

```
Example 

Rule_1 = ["condition1","condition2"]
Rule_2 = ["condition1","condition2","condition3"]

Rule_1 specifies that a product is excluded if it has both "condition1" and "condition2". Rule_2, on the other hand, specifies that a product is excluded if it has "condition1", "condition2", and also "condition3".

Since Rule_2 requires everything in Rule_1 plus an additional condition, any product eliminated by Rule_2's conditions (having all three conditions) will automatically meet Rule_1's conditions (having just the first two).

Hence Rule_2 is redundant.
```

The task is to remove these redundant rules and return the remaining rules in their original order.

```
Sample Case: 1

rules =
[
    ["condition1","condition2"],
    ["condition2","condition3"],
    ["condition1","condition2","condition4"]
]

after removing redundant rules.
[
    ["condition1","condition2"],
    ["condition2","condition3"],
]

Since rule ["condition1","condition2","condition4"], is already covered by ["condition1","condition2"], hence it is redundant.

```

```
Sample Case: 2

rules =
[
    ["condition1","condition2"],
    ["condition2","condition3"],
    ["condition1","condition3"]
]

after removing redundant rules.
[
    ["condition1","condition2"],
    ["condition2","condition3"],
    ["condition1","condition3"]
]

No rule is completely covered by another rule. Hence on filtering we get the original input.
```
