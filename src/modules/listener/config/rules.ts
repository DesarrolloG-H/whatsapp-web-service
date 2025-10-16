export interface Rule {
  groupId: string
  patterns: RegExp[]
}

export const GROUP_RULES: Rule[] = [
  {
    groupId: '120363403865575440@g.us', // ejemplo Grupo A
    patterns: [
      /^OPCION:\s*(.+)\s*SEC:\s*(\d+)\s*LINEA:\s*(\d+)/i
    ]
  }
//   {
//     groupId: '120363284888888888@g.us', // Grupo B
//     keywords: ['consulta saldo']
//   }
]

export const findMatchingRule = (groupId: string, text: string) => {
  const rule = GROUP_RULES.find(r => r.groupId === groupId)
  if (!rule) return null

  for (const pattern of rule.patterns) {
    const match = text.match(pattern)
    if (match) {
      return {
        groupId,
        type: match[1]?.trim(),   // “Liberación de SEC” o “Bloqueo de SEC”
        sec: match[2],
        linea: match[3]
      }
    }
  }

  return null
}
