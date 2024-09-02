/**
 * @param
 * {
 *  parentRule:{id:string, values:string[]}
 *  childRule:{id:string, values:string[]}
 * }
 * @returns boolean
 */
const doesOverlap = ({ parentRule, childRule }) => {
  const childRuleConditionsSet = new Set(childRule.values);

  return parentRule.values.every((parentRuleCondition) =>
    childRuleConditionsSet.has(parentRuleCondition)
  );
};

/**
 * @param
 * {
 *  rule: {id:string, values:string[]}
 *  remainingRules:Array<{id:string,values:string[]}>
 * }
 * @returns string[]
 */
const getOverlappingIds = ({ rule: parentRule, remainingRules }) =>
  remainingRules
    .filter((childRule) => doesOverlap({ parentRule, childRule }))
    .map((rule) => rule.id);

/**
 * @param
 * {rules} Array<string[]>
 * @returns Array<{id:string, values:string[]}>
 */
const addIdsToRules = ({ rules }) =>
  rules.map((rule, index) => ({ id: index, values: rule }));

/**
 * Removes redundant rules from the list.
 *
 * @param {rules:Array<Array<string>>} rules - An array of rules, where each rule is an array of strings.
 * @returns {Array<Array<string>>} - The filtered array of rules with redundant rules removed.
 */
const filterRedundantRules = ({ rules: baseRules }) => {
  const rules = addIdsToRules({ rules: baseRules });

  const necessaryRuleIds = new Set(),
    redundantRuleIds = new Set();

  const rulesBySize = [...rules].sort(
    (ruleA, ruleB) => ruleA.values.length - ruleB.values.length
  );

  rulesBySize.forEach((rule, index) => {
    if (redundantRuleIds.has(rule.id)) return;

    necessaryRuleIds.add(rule.id);

    const overlappingIdsWithRule = getOverlappingIds({
      rule,
      remainingRules: rulesBySize.slice(index),
    });

    overlappingIdsWithRule.forEach((ruleId) => redundantRuleIds.add(ruleId));
  });

  return rules
    .filter((rule) => necessaryRuleIds.has(rule.id))
    .map((rule) => rule.values);
};

module.exports = filterRedundantRules;
