export async function fetchUser(endPoint: string) {
  const response = await fetch(`http://localhost:8000/${endPoint}/`);
  const userData = await response.json();
  return userData;
}
