export async function fetchUser(endPoint: string) {
  const response = await ftch(`http://localhost:8000/${endPoint}/`);
  const userData = await response.json();
  return userData;
}
