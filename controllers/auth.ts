export function estAutorise(role: string): boolean {
  return role === "admin";
}

export function messageIdentifiantsInvalides() {
  return "Email ou mot de passe incorrect."
}

module.exports = { estAutorise, messageIdentifiantsInvalides }