# Filter Redundant Rules

You have a list of rules. Each rule is a list of conditions. If all the conditions in a rule are met, the rule is considered satisfied.

Sometimes, one rule is fully covered by another rule that has more conditions. In such cases, the more detailed rule is unnecessary because the simpler rule already covers the same scenario.

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