import bcrypt from "bcryptjs";

const utilisateurs = [
  { email: "admin@x.fr", hash: "$2b$10$7zB3Hl065E.k1DlhK9vC7exYfK3pC1V2Xm9P6G7R8S9T0U1V2W3Xy", role: "admin" },
];

export function estAutorise(role: string): boolean {
  return role === "admin";
}

export function messageIdentifiantsInvalides() {
  return "Email ou mot de passe incorrect."
}

export async function login(req: any, res: any) {
  const { email, motDePasse } = req.body;

  const user = utilisateurs.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({
      erreur: {
        code: "IDENTIFIANTS_INVALIDES",
        message: messageIdentifiantsInvalides()
      }
    });
  }
    const valide = await bcrypt.compare(motDePasse, user.hash);
  if (!valide) {
    return res.status(401).json({
      erreur: {
        code: "IDENTIFIANTS_INVALIDES",
        message: messageIdentifiantsInvalides()
      }
    });
  }
  return res.json({
    role: user.role
  });
}