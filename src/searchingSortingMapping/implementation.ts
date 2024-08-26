export const transformData = (data) => {
  return data
    .filter((item) => item.isActive && item.scores.length > 0)
    .map((item) => ({
      id: item.id,
      name: item.name.toUpperCase(),
      averageScore:
        item.scores.reduce((acc, score) => acc + score, 0) / item.scores.length,
      tags: [...new Set(item.tags)],
    }))
    .sort((a, b) => b.averageScore - a.averageScore);
};
