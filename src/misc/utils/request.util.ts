export function toUpdateEntity<T>(entity: T, updateRequest: Partial<T>): T {
  const reducedEntity = Object.entries(updateRequest).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        (acc as any)[key] = value;
      }

      return acc;
    },
    entity,
  );

  return reducedEntity;
}
