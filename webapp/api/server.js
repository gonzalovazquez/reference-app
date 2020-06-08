/**
 * Returns a promise with from the Cluster API
 * @returns Promise
 */
export default async () => {
  const res = await fetch('api/todos')
  return res.json()
}
