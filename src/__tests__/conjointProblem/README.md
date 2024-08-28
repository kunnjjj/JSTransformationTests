# The Conjoint Problem

## Definition 1. Feature and Product

A product is defined by a combination of unique features, where each feature is associated with one of its possible values (unique among each feature). To fully specify a product, all the features must be included, with exactly one value selected for each feature. Every product must contain a combination of all available features, ensuring that no feature is missing in the final product configuration.

Consider the following example.

```
Feature = { featureID: string; values: string[] }

Sample Features: (*)
[
    {   
        featureID:'feature1',
        values:['feat_1_val_1','feat_1_val_2'],
    },
    {   
        featureID:'feature2',
        values:['feat_2_val_1','feat_2_val_2'],
    },
    {   
        featureID:'feature2',
        values:['feat_3_val_1','feat_3_val_2'],
    }
]

Total Combinations for products will be 8, These will be
[
    [{'feature1': 'feat_1_val_1', 'feature2': 'feat_2_val_1', 'feature3': 'feat_3_val_1'}],
    [{'feature1': 'feat_1_val_1', 'feature2': 'feat_2_val_1', 'feature3': 'feat_3_val_2'}],
    [{'feature1': 'feat_1_val_1', 'feature2': 'feat_2_val_2', 'feature3': 'feat_3_val_1'}],
    [{'feature1': 'feat_1_val_1', 'feature2': 'feat_2_val_2', 'feature3': 'feat_3_val_2'}],
    [{'feature1': 'feat_1_val_2', 'feature2': 'feat_2_val_1', 'feature3': 'feat_3_val_1'}],
    [{'feature1': 'feat_1_val_2', 'feature2': 'feat_2_val_1', 'feature3': 'feat_3_val_2'}],
    [{'feature1': 'feat_1_val_2', 'feature2': 'feat_2_val_2', 'feature3': 'feat_3_val_1'}],
    [{'feature1': 'feat_1_val_2', 'feature2': 'feat_2_val_2', 'feature3': 'feat_3_val_2'}]
]

Every product must contain a combination of all available features, ensuring that no feature is missing in the final product configuration.

(*) sample will be referenced later
```

## Definition 2. Exclusion Group

An Exclusion Group is a set of feature-value pairs that, when combined, must not be present in any valid product. Each Exclusion Group contains at least two features, and it specifies one value for each of these features. If a product contains all the feature-value pairs defined in an Exclusion Group, it is considered invalid and must be excluded from the list of possible products.

```
ExclusionGroup = { featureID:string; value:string }[]

Sample Exclusion Groups
[
    [
        { "featureID": "feature1", "value": "feat_1_val_1" },
        { "featureID": "feature2", "value": "feat_2_val_2" },
    ],
    [
        { "featureID": "feature1", "value": "feat_1_val_2" },
        { "featureID": "feature2", "value": "feat_2_val_1" },
        { "featureID": "feature3", "value": "feat_3_val_2" },
    ]
]

Any product with all these feature-value pairs, must be discarded. 
So now list of valid products from sample(*) will be

Valid Product Combinations
[
    [{'feature1': 'feat_1_val_1', 'feature2': 'feat_2_val_1', 'feature3': 'feat_3_val_1'}],
    [{'feature1': 'feat_1_val_1', 'feature2': 'feat_2_val_1', 'feature3': 'feat_3_val_2'}],
    [{'feature1': 'feat_1_val_2', 'feature2': 'feat_2_val_1', 'feature3': 'feat_3_val_1'}],
    [{'feature1': 'feat_1_val_2', 'feature2': 'feat_2_val_2', 'feature3': 'feat_3_val_1'}],
    [{'feature1': 'feat_1_val_2', 'feature2': 'feat_2_val_2', 'feature3': 'feat_3_val_2'}]
]

```

## Question

### Part 1 (Total Combinations)

Problem Statement: Assuming no exclusion groups, you are given a list of sample features, calculate the total number of product combinations possible for these features.

```
SAMPLE CASE: 
getTotalCombinations([
  {
    featureID: "feature1",
    values: ["feat_1_val_1", "feat_1_val_2"],
  },
  {
    featureID: "feature2",
    values: ["feat_2_val_1", "feat_2_val_2", "feature_2_val_3"],
  },
  {
    featureID: "feature3",
    values: ["feat_3_val_1", "feat_3_val_2", "feat_3_val_3", "feat_3_val_4"],
  },
])

Your function should return: 24 
```

### Part 2 (Redundant Exclusion Groups)

Description:
```
Consider 
    ExclusionGroupA = [
        { "featureID": "feature1", "value": "feat_1_val_1" },
        { "featureID": "feature2", "value": "feat_2_val_2" },
    ]
    ExclusionGroupB = [
        { "featureID": "feature1", "value": "feat_1_val_1" },
        { "featureID": "feature2", "value": "feat_2_val_2" },
        { "featureID": "feature3", "value": "feat_3_val_1" },
    ]

Any product excluded by ExclusionGroupA would have 'feature1':'feat_1_val_1' and 'feature2':'feat_2_val_2', ExclusionGroupB includes all the feature-value pairs in ExclusionGroupA plus an additional condition on feature3. If a product is excluded by ExclusionGroupB, it means that the product must also contain the feature-value pairs that ExclusionGroupA excludes.

Since ExclusionGroupA alone is sufficient to exclude these products, ExclusionGroupB is redundant.

```

Problem Statement: You are given a list of Exclusion Groups, you need to filter redundant exclusion groups. Return your result in the original order after filtering redundant groups.

```
SAMPLE CASE:
filterRedundantExclusionGroups({exclusionGroups:[
    [
        {
            "featureID": "feature_0",
            "value": "level_0_2"
        },
        {
            "featureID": "feature_1",
            "value": "level_1_1"
        }
    ],
    [
        {
            "featureID": "feature_0",
            "value": "level_0_2"
        },
        {
            "featureID": "feature_3",
            "value": "level_3_1"
        }
    ],
    [
        {
            "featureID": "feature_0",
            "value": "level_0_2"
        },
        {
            "featureID": "feature_1",
            "value": "level_1_1"
        },
        {
            "featureID": "feature_3",
            "value": "level_3_1"
        }
    ]
]})

should return: 
[
    [
        {
            "featureID": "feature_0",
            "value": "level_0_2"
        },
        {
            "featureID": "feature_1",
            "value": "level_1_1"
        }
    ],
    [
        {
            "featureID": "feature_0",
            "value": "level_0_2"
        },
        {
            "featureID": "feature_3",
            "value": "level_3_1"
        }
    ]
]

```

### Part 3 (Count Valid Features)

Problem Statement: You are given a list of features, and a list of exclusion groups at-most (2), You need to calculate, the total number of valid products. If a product contains all the feature-value pairs defined in an Exclusion Group, it is considered invalid.

```
SAMPLE CASE:

getValidProductsCount({
        features: [
          { featureID: "f1", values: ["l1-1", "l2-1", "l3-1", "l4-1", "l5-1"] },
          {
            featureID: "f2",
            values: ["l1-2", "l2-2", "l3-2", "l4-2", "l5-2", "l6-2", "l7-2"],
          },
          {
            featureID: "f3",
            values: ["l1-3", "l1-4"],
          },
        ],
        exclusionGroups: [
          [
            { featureID: "f1", value: "l1-1" },
            { featureID: "f3", value: "l1-3" },
          ],
        ],
      })

should return 63

```

## Constraints

### Problem 1

number of features <= 10
values for each feature <= 10

### Problem 2

number of exclusion groups <= 1000

### Problem 3

number of features <= 10

values for each feature <= 10

number of exclusion groups <= 2