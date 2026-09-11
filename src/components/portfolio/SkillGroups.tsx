import type { Skill } from "@/lib/api";
export function groupSkills(skills: Skill[]) {
  return Object.entries(
    skills.reduce<Record<string, Skill[]>>((groups, s) => {
      (groups[s.category] ??= []).push(s);
      return groups;
    }, {}),
  );
}
export function SkillGroups({ skills }: { skills: Skill[] }) {
  return (
    <div className="skill-groups">
      {groupSkills(skills).map(([category, items]) => (
        <div key={category}>
          <h3>{category}</h3>
          <div className="tag-list">
            {items.map((s) => (
              <span className="tag" key={s.id}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
