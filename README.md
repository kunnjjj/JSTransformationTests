# Filter Redundant Rules

A product has a number of options based on some conditions, You have a list of rules. Each rule is a list of conditions. If all conditions of a rule are present in a product. It is `NOT` supported.

Sometimes, one rule is fully covered by another rule that has more conditions. In such cases, the more detailed rule is unnecessary because the simpler rule already covers the same scenario.
```
Example 

Rule_1 = ["condition1","condition2"]
Rule_2 = ["condition1","condition2","condition3"]

Rule_1 specifies that a product is excluded if it has both "condition1" and "condition2". Rule_2, on the other hand, specifies that a product is excluded if it has "condition1", "condition2", and also "condition3".

Since Rule_2 requires everything in Rule_1 plus an additional condition, any product eliminated by Rule_2's conditions (having all three conditions) will automatically meet Rule_1's conditions (having just the first two).

Hence Rule_2 is redundant.
```

Your task is to remove these unnecessary rules and return the remaining rules in the original order.

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
